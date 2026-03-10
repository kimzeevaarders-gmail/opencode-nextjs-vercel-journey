$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$stateDir = Join-Path $repoRoot ".opencode\runtime"
$logDir = Join-Path $stateDir "logs"
$issueFile = Join-Path $stateDir "latest-issue.txt"
$reviewFile = Join-Path $stateDir "latest-review.md"
$developerFile = Join-Path $stateDir "developer-handoff.md"
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

if ($env:OPENCODE_AUTONOMOUS_ENABLED -ne "1") {
  Write-Log "Autonomous workflow is disabled. Set OPENCODE_AUTONOMOUS_ENABLED=1 to allow real runs."
  exit 0
}

$ollamaExe = "C:\Users\Gebruiker\AppData\Local\Programs\Ollama\ollama.exe"

if (-not (Test-Path $ollamaExe)) {
  Write-Log "Ollama is not installed. Install the local runtime before starting the autonomous workflow."
  exit 1
}

try {
  & $ollamaExe list | Out-Null
} catch {
  Write-Log "Ollama is installed but not responding. Start Ollama and pull the configured model first."
  exit 1
}

$endTime = (Get-Date).Date.AddHours(22)

if ((Get-Date) -ge $endTime) {
  Write-Log "End time already passed. Exiting."
  exit 0
}

$poPrompt = @"
You are the product owner for this repository.
Invent one high-value, low-risk improvement that makes the site more learnful or attractive for beginners exploring OpenCode, coding, Next.js, Vercel, and GitHub.
Create a GitHub issue for that idea with a concise title, why, scope, acceptance criteria, and developer handoff.
After creating the issue, write only the issue number to $issueFile.
Also append a one-paragraph summary to $logPath.
"@

Invoke-Agent -Agent "product-owner" -Prompt $poPrompt

if (-not (Test-Path $issueFile)) {
  Write-Log "No issue number was produced. Exiting."
  exit 1
}

$issueNumber = (Get-Content $issueFile | Select-Object -First 1).Trim()

$developerPrompt = @"
Read GitHub issue #$issueNumber in this repository and implement it.
Use the issue acceptance criteria exactly.
Run validation commands that make sense.
Write a short implementation handoff for the reviewer to $developerFile.
If reviewer feedback already exists in $reviewFile, address it and mention how you resolved it.
Stop if the local time is after 22:00.
"@

Invoke-Agent -Agent "developer" -Prompt $developerPrompt

$reviewerPrompt = @"
Review the implementation for GitHub issue #$issueNumber.
Read the developer handoff from $developerFile if it exists.
If the work is good, write APPROVED to $reviewFile plus a short approval note.
If the work needs changes, write REQUEST_CHANGES and list the exact fixes in $reviewFile.
Stop if the local time is after 22:00.
"@

Invoke-Agent -Agent "reviewer" -Prompt $reviewerPrompt

if (Test-Path $reviewFile) {
  $reviewContent = Get-Content $reviewFile -Raw

  if ($reviewContent -match "REQUEST_CHANGES" -and (Get-Date) -lt $endTime) {
    $developerRevisionPrompt = @"
Read GitHub issue #$issueNumber and reviewer feedback in $reviewFile.
Resolve the requested changes if possible before 22:00.
Update $developerFile with a concise fix summary for the reviewer.
"@

    Invoke-Agent -Agent "developer" -Prompt $developerRevisionPrompt

    $reviewerRecheckPrompt = @"
Re-review the updated work for GitHub issue #$issueNumber.
Read the latest developer handoff from $developerFile.
Write APPROVED or REQUEST_CHANGES to $reviewFile with a concise note.
Stop if the local time is after 22:00.
"@

    Invoke-Agent -Agent "reviewer" -Prompt $reviewerRecheckPrompt
  }
}

if (Test-Path $reviewFile) {
  $finalReview = Get-Content $reviewFile -Raw

  if ($finalReview -match "APPROVED") {
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
      git push origin main | Tee-Object -FilePath $logPath -Append
      Add-Content -Path $deployFile -Value "Pushed issue #$issueNumber to main for production deployment."
      Write-Log "Changes pushed to main. Vercel should deploy production automatically."
    } else {
      Write-Log "Nothing changed after review approval, so no commit or push was needed."
    }
  } else {
    Write-Log "Review did not end in APPROVED. Skipping commit and deploy."
  }
}

Write-Log "Autonomous workflow finished."
