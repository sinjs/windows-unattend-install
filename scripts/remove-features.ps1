Get-WindowsOptionalFeature -Online |
Where-Object -Property 'FeatureName' -In -Value @(
  'Microsoft-SnippingTool';
) | Disable-WindowsOptionalFeature -Online -Remove -NoRestart *>&1 >> "$env:TEMP\remove-features.log";