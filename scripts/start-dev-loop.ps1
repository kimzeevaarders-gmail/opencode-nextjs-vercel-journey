[CmdletBinding()]
param(
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$loopScript = Join-Path $PSScriptRoot "autonomous-dev-loop.ps1"

Write-Host "Starting development loop from $repoRoot"

$env:OPENCODE_AUTONOMOUS_ENABLED = "1"

if ($DryRun) {
  $env:OPENCODE_AUTONOMOUS_DRY_RUN = "1"
  Write-Host "Dry run enabled: commit, push, and production deploy will be skipped."
} else {
  $env:OPENCODE_AUTONOMOUS_DRY_RUN = "0"
}

powershell.exe -ExecutionPolicy Bypass -File $loopScript
