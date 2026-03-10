$taskName = "OpenCode Multi-Agent Tonight"
$scriptPath = "C:\Users\Gebruiker\Documents\opencode-nextjs-vercel-journey\scripts\autonomous-dev-loop.cmd"
$startTime = [datetime]::Today.AddHours(21).AddMinutes(25)

if ((Get-Date) -gt $startTime) {
  $startTime = $startTime.AddDays(1)
}

$action = New-ScheduledTaskAction -Execute $scriptPath
$trigger = New-ScheduledTaskTrigger -Once -At $startTime
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 1)

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null
Write-Host "Scheduled task '$taskName' for $startTime"
