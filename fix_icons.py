import codecs

file_path = r'c:\Users\erade\Downloads\shcs-ppl\pasien\riwayat-surat.html'

# Read the file with UTF-8 encoding
with codecs.open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace corrupted icons with proper emojis
replacements = [
    ('<i>ðŸ </i>', '<i>🏠</i>'),
    ('<i>ðŸ"…</i>', '<i>📅</i>'),
    ('<i>ðŸ"‹</i>', '<i>📋</i>'),
    ('<i>ðŸ"„</i>', '<i>📄</i>'),
    ('<i>ðŸ"œ</i>', '<i>📜</i>'),
    ('<i>ðŸ'¤</i>', '<i>👤</i>'),
    ('<i>ðŸ'¬</i>', '<i>💬</i>'),
]

for old, new in replacements:
    content = content.replace(old, new)

# Write back with UTF-8 encoding
with codecs.open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Icons fixed successfully!')
