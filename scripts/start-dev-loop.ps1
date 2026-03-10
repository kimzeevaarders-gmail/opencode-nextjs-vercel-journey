[CmdletBinding()]
param(
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$serverPort = 4096
$serverUrl = "http://127.0.0.1:$serverPort"
$serverProcess = $null

function Test-OpencodeServer {
  param(
    [string]$ServerHost,
    [int]$Port
  )

  $client = New-Object System.Net.Sockets.TcpClient

  try {
    $async = $client.BeginConnect($ServerHost, $Port, $null, $null)
    $connected = $async.AsyncWaitHandle.WaitOne(1000, $false)

    if (-not $connected) {
      return $false
    }

    $client.EndConnect($async)
    return $true
  } catch {
    return $false
  } finally {
    $client.Dispose()
  }
}

function Ensure-OpencodeServer {
  if (Test-OpencodeServer -ServerHost "127.0.0.1" -Port $serverPort) {
    Write-Host "Using existing OpenCode server at $serverUrl"
    return $null
  }

  $process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npx opencode-ai serve --port $serverPort" -PassThru

  for ($attempt = 0; $attempt -lt 20; $attempt++) {
    Start-Sleep -Milliseconds 500

    if (Test-OpencodeServer -ServerHost "127.0.0.1" -Port $serverPort) {
      Write-Host "Started OpenCode server at $serverUrl"
      return $process
    }
  }

  throw "Failed to start OpenCode server at $serverUrl"
}

function Stop-OpencodeServer {
  param($Process)

  if ($null -ne $Process -and -not $Process.HasExited) {
    Stop-Process -Id $Process.Id -Force
  }
}

Write-Host "Starting development loop from $repoRoot"

try {
  $serverProcess = Ensure-OpencodeServer

  $commandText = "/start-dev-loop"

  if ($DryRun) {
    $commandText = "/start-dev-loop dry-run"
    Write-Host "Dry run enabled: commit, push, issue closure, and production deploy will be skipped."
  }

  cmd.exe /c "npx opencode-ai run --attach $serverUrl --command $commandText"
} finally {
  Stop-OpencodeServer -Process $serverProcess
}
