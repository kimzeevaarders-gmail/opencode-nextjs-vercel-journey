$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$loopScript = Join-Path $PSScriptRoot "nightly-agent-loop.ps1"

Write-Host "Starting development loop from $repoRoot"

$env:OPENCODE_AUTONOMOUS_ENABLED = "1"

powershell.exe -ExecutionPolicy Bypass -File $loopScript
