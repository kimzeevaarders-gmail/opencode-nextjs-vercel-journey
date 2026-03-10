$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$stateDir = Join-Path $repoRoot ".opencode\runtime"
$logDir = Join-Path $stateDir "logs"
$issueFile = Join-Path $stateDir "latest-issue.txt"
$reviewFile = Join-Path $stateDir "latest-review.md"
$developerFile = Join-Path $stateDir "developer-handoff.md"
$questionFile = Join-Path $stateDir "developer-questions.md"
$answerFile = Join-Path $stateDir "product-owner-answers.md"
$deployFile = Join-Path $stateDir "latest-deploy.txt"

New-Item -ItemType Directory -Force -Path $stateDir | Out-Null
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$logPath = Join-Path $logDir ("run-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".log")

function Write-Log {
  param([string]$Message)

  $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
  Add-Content -Path $logPath -Value $line
  Write-Host $line
}

function Invoke-Agent {
  param(
    [string]$Agent,
    [string]$Prompt
  )

  $command = "npx opencode-ai run --agent $Agent --format default --title `"autonomous-$Agent`" `"$Prompt`""
  Write-Log "Running $Agent"
  cmd /c $command 2>&1 | Tee-Object -FilePath $logPath -Append
}

function Get-OpenIssueNumber {
  $issueNumber = ""

  try {
    $issueNumber = gh issue list --state open --limit 100 --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>$null
  } catch {
    Write-Log "Unable to inspect open GitHub issues. Falling back to product-owner issue creation."
    return ""
  }

  if ($null -eq $issueNumber) {
    return ""
  }

  return $issueNumber.ToString().Trim()
}

function Get-TrimmedFileContent {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    return ""
  }

  return (Get-Content $Path -Raw).Trim()
}

function Clear-LoopFile {
  param([string]$Path)

  if (Test-Path $Path) {
    Remove-Item $Path -Force
  }
}

function Close-IssueAfterApproval {
  param(
    [string]$IssueNumber,
    [string]$ReviewContent
  )

  $commentBody = $ReviewContent.Trim()

  if (-not $commentBody) {
    $commentBody = "APPROVED`n`nReviewer approved the implementation and the issue is now closed."
  }

  gh issue comment $IssueNumber --body $commentBody | Tee-Object -FilePath $logPath -Append
  if ($LASTEXITCODE -ne 0) {
    throw "gh issue comment failed for issue #$IssueNumber"
  }

  gh issue close $IssueNumber | Tee-Object -FilePath $logPath -Append
  if ($LASTEXITCODE -ne 0) {
    throw "gh issue close failed for issue #$IssueNumber"
  }
}

if ($env:OPENCODE_AUTONOMOUS_ENABLED -ne "1") {
  Write-Log "Autonomous workflow is disabled. Set OPENCODE_AUTONOMOUS_ENABLED=1 to allow real runs."
  exit 0
}

$isDryRun = $env:OPENCODE_AUTONOMOUS_DRY_RUN -eq "1"

Write-Log "Using OpenAI Codex runtime via opencode.json configuration."

if ($isDryRun) {
  Write-Log "Dry run enabled. Commit, push, issue closure, and production deploy will be skipped."
}

$issueNumber = Get-OpenIssueNumber

if ($issueNumber) {
  Set-Content -Path $issueFile -Value $issueNumber
  Write-Log "Continuing existing open GitHub issue #$issueNumber before creating a new one."
} else {
  $poPrompt = @"
You are the product owner for this repository.
First check whether this repository already has an open GitHub issue that should be completed before creating more backlog.
If an open issue already exists, write only that issue number to $issueFile and append a one-paragraph summary to $logPath.
If no open issue exists, invent one high-value, low-risk improvement that makes the site more learnful or attractive for beginners exploring OpenCode, coding, Next.js, Vercel, and GitHub.
Create a GitHub issue for that idea with a concise title, why, scope, acceptance criteria, and developer handoff.
After choosing or creating the issue, write only the issue number to $issueFile.
Also append a one-paragraph summary to $logPath.
"@

  Invoke-Agent -Agent "product-owner" -Prompt $poPrompt
}

if (-not (Test-Path $issueFile)) {
  Write-Log "No issue number was produced. Exiting."
  exit 1
}

$issueNumber = (Get-Content $issueFile | Select-Object -First 1).Trim()

Clear-LoopFile -Path $questionFile
Clear-LoopFile -Path $answerFile

while ($true) {
  $developerPrompt = @"
Before you start coding, check this repository for open GitHub issues and confirm you are implementing an existing open ticket before a newly created one when appropriate.
Read GitHub issue #$issueNumber in this repository.
If the ticket is still unclear in a way that would materially change the implementation, write concise blocking questions to $questionFile and wait for product-owner answers instead of guessing.
If product-owner answers already exist in $answerFile, use them to continue.
Once the work is clear enough, implement the issue, use the acceptance criteria exactly, run validation commands that make sense, and write a short implementation handoff for the reviewer to $developerFile.
If reviewer feedback already exists in $reviewFile, address it and mention how you resolved it.
"@

  Invoke-Agent -Agent "developer" -Prompt $developerPrompt

  $pendingQuestions = Get-TrimmedFileContent -Path $questionFile

  if (-not $pendingQuestions) {
    break
  }

  $poClarificationPrompt = @"
Read GitHub issue #$issueNumber in this repository.
The developer has blocking clarification questions in $questionFile.
Answer them directly and concretely in $answerFile so implementation can continue without guessing.
Do not create a new issue unless the existing issue is truly wrong for the task.
"@

  Invoke-Agent -Agent "product-owner" -Prompt $poClarificationPrompt
  Clear-LoopFile -Path $questionFile
}

while ($true) {
  $reviewerPrompt = @"
Review the implementation for GitHub issue #$issueNumber.
Read the developer handoff from $developerFile if it exists.
If the work is good, write APPROVED to $reviewFile plus a short approval note.
If the work needs changes, write REQUEST_CHANGES and list the exact fixes in $reviewFile.
"@

  Invoke-Agent -Agent "reviewer" -Prompt $reviewerPrompt

  if (-not (Test-Path $reviewFile)) {
    break
  }

  $reviewContent = Get-Content $reviewFile -Raw

  if ($reviewContent -notmatch "REQUEST_CHANGES") {
    break
  }

  $developerRevisionPrompt = @"
Read GitHub issue #$issueNumber and reviewer feedback in $reviewFile.
Resolve the requested changes if possible.
If anything is still unclear, write concise blocking questions to $questionFile so the product-owner can answer them in $answerFile.
After resolving the requested changes, update $developerFile with a concise fix summary for the reviewer.
"@

  Invoke-Agent -Agent "developer" -Prompt $developerRevisionPrompt

  $pendingQuestions = Get-TrimmedFileContent -Path $questionFile

  while ($pendingQuestions) {
    $poClarificationPrompt = @"
Read GitHub issue #$issueNumber in this repository and the developer's blocking questions in $questionFile.
Answer them directly and concretely in $answerFile so implementation can continue without guessing.
"@

    Invoke-Agent -Agent "product-owner" -Prompt $poClarificationPrompt
    Clear-LoopFile -Path $questionFile

    $developerFollowUpPrompt = @"
Read GitHub issue #$issueNumber, reviewer feedback in $reviewFile, and product-owner answers in $answerFile.
Use those answers to finish the requested fixes.
If anything is still unclear, write concise blocking questions to $questionFile.
When the fixes are complete, update $developerFile with a concise fix summary for the reviewer.
"@

    Invoke-Agent -Agent "developer" -Prompt $developerFollowUpPrompt
    $pendingQuestions = Get-TrimmedFileContent -Path $questionFile
  }
}

if (Test-Path $reviewFile) {
  $finalReview = Get-Content $reviewFile -Raw

  if ($finalReview -match "APPROVED") {
    if ($isDryRun) {
      Add-Content -Path $deployFile -Value "Dry run approved for issue #$issueNumber. Commit, push, issue closure, and production deployment were skipped."
      Write-Log "Review approved during dry run. Skipping commit, push, issue closure, and production deploy."
      Write-Log "Autonomous workflow finished."
      exit 0
    }

    Write-Log "Review approved. Preparing commit and push."

    $branchStatus = git status --short

    if ($branchStatus) {
      git add .
      $commitMessage = "Autonomous delivery for issue #$issueNumber"
      $env:GIT_AUTHOR_NAME = "Kim Zeevaarders"
      $env:GIT_AUTHOR_EMAIL = "kimzeevaarders@gmail.com"
      $env:GIT_COMMITTER_NAME = "Kim Zeevaarders"
      $env:GIT_COMMITTER_EMAIL = "kimzeevaarders@gmail.com"
      git commit -m $commitMessage | Tee-Object -FilePath $logPath -Append
      if ($LASTEXITCODE -ne 0) {
        throw "git commit failed for issue #$issueNumber"
      }
      git push origin main | Tee-Object -FilePath $logPath -Append
      if ($LASTEXITCODE -ne 0) {
        throw "git push failed for issue #$issueNumber"
      }
      Add-Content -Path $deployFile -Value "Pushed issue #$issueNumber to main for production deployment."
      Write-Log "Changes pushed to main. Vercel should deploy production automatically."
    } else {
      Write-Log "Nothing changed after review approval, so no commit or push was needed."
    }

    Close-IssueAfterApproval -IssueNumber $issueNumber -ReviewContent $finalReview
    Write-Log "Reviewer comment posted and issue closed after approval."
  } else {
    Write-Log "Review did not end in APPROVED. Skipping commit and deploy."
  }
}

Write-Log "Autonomous workflow finished."
