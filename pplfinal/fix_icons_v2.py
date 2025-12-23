# -*- coding: utf-8 -*-
file_path = r'c:\Users\erade\Downloads\shcs-ppl\pasien\riwayat-surat.html'

# Read with UTF-8-SIG to handle BOM
with open(file_path, 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Count replacements
replacements_made = 0

# Replace corrupted Beranda icon
if 'ðŸ ' in content:
    content = content.replace('ðŸ ', '🏠')
    replacements_made += content.count('🏠')

# Replace corrupted Jadwal Dokter icon  
if 'ðŸ"…' in content:
    old_count = content.count('ðŸ"…')
    content = content.replace('ðŸ"…', '📅')
    replacements_made += old_count

# Replace corrupted Status Antrean icon
if 'ðŸ"‹' in content:
    old_count = content.count('ðŸ"‹')
    content = content.replace('ðŸ"‹', '📋')
    replacements_made += old_count

# Replace corrupted Permohonan Surat icon
if 'ðŸ"„' in content:
    old_count = content.count('ðŸ"„')
    content = content.replace('ðŸ"„', '📄')
    replacements_made += old_count

# Replace corrupted Riwayat Surat icon
if 'ðŸ"œ' in content:
    old_count = content.count('ðŸ"œ')
    content = content.replace('ðŸ"œ', '📜')
    replacements_made += old_count

# Replace corrupted Profil icon
if 'ðŸ'¤' in content:
    old_count = content.count('ðŸ'¤')
    content = content.replace('ðŸ'¤', '👤')
    replacements_made += old_count

# Replace corrupted Chatbot icon
if 'ðŸ'¬' in content:
    old_count = content.count('ðŸ'¬')
    content = content.replace('ðŸ'¬', '💬')
    replacements_made += old_count

# Write back with UTF-8 BOM
with open(file_path, 'w', encoding='utf-8-sig') as f:
    f.write(content)

print(f'Icons fixed successfully! Made {replacements_made} replacements.')
