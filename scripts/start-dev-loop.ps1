$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$loopScript = Join-Path $PSScriptRoot "nightly-agent-loop.ps1"

Write-Host "Starting development loop from $repoRoot"

if ($env:OPENCODE_AUTONOMOUS_ENABLED -ne "1" -or $env:OPENCODE_ALLOW_COSTS -ne "1") {
  Write-Host "Cost safety is still active. This run will stop before making real provider-backed agent calls."
}

powershell.exe -ExecutionPolicy Bypass -File $loopScript
