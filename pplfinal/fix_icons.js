const fs = require('fs');

const filePath = 'c:\\Users\\erade\\Downloads\\shcs-ppl\\pasien\\riwayat-surat.html';

// Read file
let content = fs.readFileSync(filePath, 'utf8');

// Replacements
const replacements = [
  ['ðŸ ', '🏠'],     // Beranda
  ['ðŸ"…', '📅'],     // Jadwal Dokter
  ['ðŸ"‹', '📋'],     // Status Antrean
  ['ðŸ"„', '📄'],     // Permohonan Surat
  ['ðŸ"œ', '📜'],     // Riwayat Surat
  ['ðŸ'¤', '👤'],     // Profil
  ['ðŸ'¬', '💬'],     // Chatbot
];

let count = 0;
replacements.forEach(([oldIcon, newIcon]) => {
  const before = content;
  content = content.split(oldIcon).join(newIcon);
  if (content !== before) count++;
});

// Write file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`Icons fixed successfully! Made ${count} types of replacements.`);
