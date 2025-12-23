# 🏥 Smart Health Center Service - Panduan Penggunaan

## 📋 Daftar Akun Demo

Gunakan akun berikut untuk login sesuai role:

### 👤 PASIEN
- **Username:** pasien / pasien@email.com
- **Password:** pasien123
- **Role:** Pilih "Pasien"
- **Akses:** Portal Pasien (11 halaman)

### 👨‍⚕️ TENAGA MEDIS
- **Username:** staf / staf@email.com
- **Password:** staf123
- **Role:** Pilih "Tenaga Medis"
- **Akses:** Portal Tenaga Medis (5 halaman)

### 🩺 DOKTER
- **Username:** dokter / dokter@email.com
- **Password:** dokter123
- **Role:** Pilih "Dokter"
- **Akses:** Portal Dokter (3 halaman)

### 👨‍💼 ADMIN
- **Username:** admin / admin@email.com
- **Password:** admin123
- **Role:** Pilih "Admin"
- **Akses:** Portal Admin (6 halaman)

---

## 🚀 Cara Menjalankan Aplikasi

### **Metode 1: Langsung Buka File**
1. Buka folder: `c:\Users\erade\Downloads\Praktikum 10\`
2. Double-click file **`index.html`** untuk membuka halaman utama
3. Klik tombol "Login" di halaman utama
4. Pilih role yang diinginkan dan login

### **Metode 2: Langsung ke Login**
1. Buka file **`login.html`** langsung
2. Masukkan username/email
3. Masukkan password
4. **PENTING:** Pilih role yang sesuai di dropdown
5. Klik tombol "Login"

---

## 🔐 Sistem Keamanan

### **Proteksi Akses Role-Based**
Setiap portal dilindungi dengan validasi JavaScript:

- ✅ **Pasien** hanya bisa akses Portal Pasien
- ✅ **Tenaga Medis** hanya bisa akses Portal Tenaga Medis
- ✅ **Dokter** hanya bisa akses Portal Dokter
- ✅ **Admin** hanya bisa akses Portal Admin

Jika mencoba akses portal lain, akan muncul alert dan redirect ke login.

### **Session Management**
- Login menyimpan data ke `sessionStorage`
- Logout menghapus semua session
- Session tidak persisten (hilang jika browser ditutup)

---

## 📁 Struktur Folder & File

```
Praktikum 10\
│
├── css\
│   └── style.css                  # Global stylesheet (600+ baris)
│
├── index.html                     # ⭐ Halaman utama (landing page)
├── login.html                     # 🔐 Halaman login dengan validasi role
├── logout.html                    # 🚪 Halaman logout & clear session
├── register.html                  # 📝 Registrasi pasien baru
│
├── pasien\                        # 👤 PORTAL PASIEN (11 halaman)
│   ├── dashboard.html             #    - Dashboard ringkasan
│   ├── antrean.html               #    - Pendaftaran antrean online
│   ├── status-antrean.html        #    - Status antrean real-time
│   ├── permohonan-surat.html      #    - Ajukan surat keterangan
│   ├── riwayat-surat.html         #    - Riwayat surat yang diajukan
│   ├── jadwal-dokter.html         #    - Lihat jadwal praktek dokter
│   ├── chatbot.html               #    - Asisten virtual chatbot
│   └── profil.html                #    - Kelola profil & ubah password
│
├── staf\                          # 👨‍⚕️ PORTAL TENAGA MEDIS (5 halaman)
│   ├── dashboard.html             #    - Dashboard monitoring
│   ├── daftar-antrean.html        #    - Lihat semua antrean
│   ├── kelola-antrean.html        #    - Kelola antrean (panggil, skip, selesai)
│   ├── validasi-surat.html        #    - Validasi surat keterangan
│   └── hasil-pemeriksaan.html     #    - Input hasil pemeriksaan
│
├── dokter\                        # 🩺 PORTAL DOKTER (3 halaman)
│   ├── dashboard.html             #    - Dashboard praktek
│   ├── daftar-pasien.html         #    - Daftar pasien hari ini
│   └── rekam-medis.html           #    - Rekam medis lengkap (SOAP)
│
└── admin\                         # 👨‍💼 PORTAL ADMIN (6 halaman)
    ├── dashboard.html             #    - Dashboard sistem
    ├── kelola-pengguna.html       #    - Manajemen user semua role
    ├── kelola-jadwal.html         #    - Manajemen jadwal dokter
    ├── kelola-pengumuman.html     #    - Manajemen pengumuman
    ├── laporan.html               #    - Laporan & analytics
    └── pengaturan.html            #    - Pengaturan sistem

TOTAL: 25 halaman HTML
```

---

## ✨ Fitur Unggulan

### **Portal Pasien**
- ✅ Pendaftaran antrean online
- ✅ Tracking status antrean real-time
- ✅ Permohonan surat keterangan online
- ✅ Chatbot asisten virtual
- ✅ Lihat jadwal dokter
- ✅ Kelola profil

### **Portal Tenaga Medis**
- ✅ Monitoring semua antrean
- ✅ Panggil/kelola antrean pasien
- ✅ Validasi surat keterangan
- ✅ Input hasil pemeriksaan
- ✅ Cek tanda vital pasien

### **Portal Dokter**
- ✅ Daftar pasien hari ini dengan tanda vital
- ✅ Rekam medis elektronik (SOAP)
- ✅ Input pemeriksaan lengkap
- ✅ Riwayat kunjungan pasien
- ✅ Manajemen resep & surat keterangan
- ✅ Hasil laboratorium

### **Portal Admin**
- ✅ Manajemen user (CRUD)
- ✅ Kelola jadwal dokter
- ✅ Kelola pengumuman
- ✅ Laporan & analytics
- ✅ Pengaturan sistem lengkap
- ✅ Backup & restore database

---

## 🎨 Teknologi yang Digunakan

- **HTML5** - Semantic markup
- **CSS3** - Responsive design, gradients, animations
- **Vanilla JavaScript** - Validasi, interaktivitas, session management
- **No Framework** - Pure HTML/CSS/JS

---

## ⚠️ Catatan Penting

1. **Ini adalah prototype/demo** - Data bersifat statis (hardcoded)
2. **Tidak ada backend** - Belum terhubung ke database atau server
3. **Session tidak persisten** - Hilang saat browser ditutup
4. **Untuk production**, perlu:
   - Backend API (Node.js/PHP/Python)
   - Database (MySQL/PostgreSQL)
   - Authentication yang aman
   - HTTPS & enkripsi
   - Validasi server-side

---

## 🐛 Troubleshooting

### **Problem: Login tapi masuk ke portal yang salah**
**Solusi:** 
1. Pastikan memilih role yang benar di dropdown
2. Clear browser cache: `Ctrl+Shift+Delete`
3. Buka di Incognito/Private mode
4. Gunakan file `logout.html` untuk clear session

### **Problem: Alert "Akses ditolak" terus muncul**
**Solusi:**
1. Buka `logout.html` untuk clear session
2. Login ulang dengan role yang sesuai
3. Pastikan JavaScript browser aktif

### **Problem: CSS tidak tampil**
**Solusi:**
1. Pastikan file `css/style.css` ada
2. Check path relative sudah benar
3. Refresh browser: `Ctrl+F5`

---

## 📞 Support

Jika ada pertanyaan atau masalah, silakan hubungi:
- **Developer:** [Your Name]
- **Email:** [Your Email]
- **Tanggal:** 27 November 2025

---

**© 2025 Smart Health Center Service. All Rights Reserved.**
