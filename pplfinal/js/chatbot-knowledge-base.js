// Shared Knowledge Base untuk semua chatbot
const chatbotKnowledgeBase = {
  'jam operasional': {
    response: 'Jam operasional puskesmas:\n\n⏰ Senin - Jumat: 08:00 - 16:00 WIB\n⏰ Sabtu: 08:00 - 13:00 WIB\n⏰ Minggu & Libur Nasional: Tutup\n\nUntuk pendaftaran antrean online bisa dilakukan kapan saja!'
  },
  'jadwal dokter': {
    response: 'Untuk melihat jadwal lengkap dokter, silakan kunjungi menu "Jadwal Dokter".\n\nJadwal dokter hari ini:\n• dr. Ahmad Fauzi - Poli Umum (08:00-13:00)\n• drg. Siti Nurhaliza - Poli Gigi (08:00-14:00)\n• dr. Dewi Lestari, Sp.OG - Poli KIA (09:00-12:00)'
  },
  'daftar antrean': {
    response: 'Cara mendaftar antrean online:\n\n1️⃣ Klik menu "Daftar Antrean"\n2️⃣ Pilih tanggal kunjungan\n3️⃣ Pilih poli/layanan\n4️⃣ Pilih dokter (opsional)\n5️⃣ Isi keluhan Anda\n6️⃣ Klik "Daftar Antrean"\n\n✅ Nomor antrean akan langsung muncul dan bisa dipantau secara real-time!'
  },
  'layanan': {
    response: 'Layanan yang tersedia di puskesmas:\n\n🏥 Poli Umum\n🦷 Poli Gigi\n👶 Poli KIA (Kesehatan Ibu dan Anak)\n👴 Poli Lansia\n💉 Poli TB\n🥗 Poli Gizi\n💉 Imunisasi\n🔬 Laboratorium\n💊 Apotek\n\nSemua layanan dapat diakses setelah mendaftar antrean!'
  },
  'surat': {
    response: 'Jenis surat yang bisa diajukan:\n\n✅ Surat Keterangan Sehat\n🤒 Surat Keterangan Sakit\n🏥 Surat Rujukan\n\nCara mengajukan:\n1. Klik menu "Permohonan Surat"\n2. Pilih jenis surat\n3. Isi formulir\n4. Tunggu validasi (1-2 hari kerja)\n5. Unduh surat di menu "Riwayat Surat"\n\nCatatan: Anda perlu datang untuk pemeriksaan jika diperlukan!'
  },
  'lokasi': {
    response: 'Informasi Kontak Puskesmas:\n\n📍 Alamat: Jl. Kesehatan No. 123, Kota Sehat, Provinsi Sejahtera, 12345\n\n📞 Telepon: (021) 1234-5678\n📱 WhatsApp: 0812-3456-7890\n✉️ Email: info@smarthealthcenter.id\n\n⏰ Jam Pelayanan:\nSenin-Jumat: 08:00-16:00\nSabtu: 08:00-13:00\nMinggu: Tutup'
  },
  'bpjs': {
    response: 'Persyaratan untuk pasien BPJS:\n\n📋 Dokumen yang harus dibawa:\n• Kartu BPJS Kesehatan (asli)\n• KTP (asli)\n• Kartu Keluarga (fotocopy)\n\n✅ Pastikan:\n• Faskes Tingkat 1 terdaftar di puskesmas ini\n• Kartu BPJS masih aktif\n• Iuran sudah dibayar\n\n💡 Untuk rujukan ke RS, harus ada surat rujukan dari dokter puskesmas.'
  },
  'biaya': {
    response: 'Informasi biaya layanan:\n\n✅ GRATIS untuk:\n• Warga setempat dengan KTP\n• Pasien BPJS (semua layanan ditanggung)\n\n💰 Pasien Umum (Non-BPJS):\n• Pemeriksaan Umum: Rp 20.000\n• Pemeriksaan Gigi: Rp 30.000\n• Surat Keterangan: Rp 10.000\n• Laboratorium: Sesuai jenis pemeriksaan\n\nUntuk informasi detail, hubungi (021) 1234-5678'
  },
  'sakit kepala': {
    response: 'Untuk sakit kepala/migrain, disarankan konsultasi dengan Poli Umum. Hindari pemicu stress, cukup istirahat, dan minum air putih. Jika berkelanjutan, segera periksa ke dokter. 🧠'
  },
  'batuk': {
    response: 'Untuk batuk dan pilek, Poli Umum dapat membantu. Istirahat cukup, minum air hangat, dan hindari makanan yang mengiritasi. Jika tidak membaik dalam 1 minggu, periksa ke dokter. 🤧'
  },
  'demam': {
    response: 'Demam bisa ditangani di Poli Umum. Kompres dengan air hangat, minum banyak air, dan istirahat. Jika suhu di atas 39°C atau tidak turun dalam 3 hari, segera konsultasi dengan dokter. 🌡️'
  },
  'diare': {
    response: 'Untuk diare, Poli Umum siap melayani. Perbanyak minum elektrolit, hindari makanan berlemak. Jika diare berkepanjangan atau ada darah, segera periksa ke dokter. 💧'
  },
  'asma': {
    response: 'Poli Umum dapat menangani asma dan sesak napas. Hindari alergen pemicu, gunakan obat sesuai resep dokter. Jika serangan parah, jangan tunda untuk ke dokter. 💨'
  },
  'diabetes': {
    response: 'Poli Umum melayani pemeriksaan dan pengelolaan diabetes. Jaga pola makan sehat, olahraga teratur, dan kontrol gula darah secara berkala. 🩸'
  },
  'hipertensi': {
    response: 'Hipertensi dapat ditangani di Poli Umum. Batasi garam, olahraga rutin, dan hindari stress. Periksa tekanan darah secara berkala. 🩹'
  },
  'gigi': {
    response: 'Poli Gigi kami menyediakan layanan pembersihan gigi, perawatan gigi berlubang, dan pencabutan gigi. Sikat gigi 2x sehari dan gunakan benang gigi. 🦷'
  },
  'alergi': {
    response: 'Poli Umum mengkhususkan diri menangani alergi. Hindari pemicu alergi Anda, dan segera konsultasi untuk obat yang tepat. 🧴'
  }
};
