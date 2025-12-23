$file = "c:\Users\erade\Downloads\shcs-ppl\pasien\riwayat-surat.html"
$content = Get-Content $file -Encoding UTF8 -Raw

# Fix corrupted icons
$content = $content -replace '<i>ðŸ </i>','<i>🏠</i>'
$content = $content -replace '<i>ðŸ"…</i>','<i>📅</i>'
$content = $content -replace '<i>ðŸ"‹</i>','<i>📋</i>'
$content = $content -replace '<i>ðŸ"„</i>','<i>📄</i>'
$content = $content -replace '<i>ðŸ"œ</i>','<i>📜</i>'
$content = $content -replace '<i>ðŸ'¤</i>','<i>👤</i>'
$content = $content -replace '<i>ðŸ'¬</i>','<i>💬</i>'

$content | Set-Content $file -Encoding UTF8 -NoNewline

Write-Host "Icons fixed successfully!" -ForegroundColor Green
