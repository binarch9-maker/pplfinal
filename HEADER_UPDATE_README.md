# Header Update - Notifikasi & User Profile Dropdown

## Perubahan yang Dilakukan

### 1. File Baru Dibuat
- `css/header-styles.css` - CSS untuk notifikasi dan user profile dropdown
- `js/header-common.js` - JavaScript untuk toggle notifikasi dan user dropdown
- `_header-template.html` - Template header yang bisa dicopy ke file lain

### 2. File yang Sudah Diupdate
✅ `pasien/dashboard.html` - Header lengkap dengan notifikasi & user dropdown
✅ `pasien/antrean.html` - Header lengkap dengan notifikasi & user dropdown

### 3. File yang Perlu Diupdate (Tinggal Copypaste)
⏳ `pasien/status-antrean.html`
⏳ `pasien/permohonan-surat.html`
⏳ `pasien/riwayat-surat.html`
⏳ `pasien/jadwal-dokter.html`
⏳ `pasien/chatbot.html`
⏳ `pasien/profil.html`

## Fitur Header Baru

### Notifikasi Bell
- Bell icon dengan badge counter (4 notifikasi)
- Dropdown dengan 4 jenis notifikasi:
  - ✅ Success (hijau) - Surat diterbitkan
  - ℹ️ Info (biru) - Nomor antrean, permohonan diproses
  - ⚠️ Warning (orange) - Jadwal kontrol
- Tombol "Tandai Sudah Dibaca"
- Link "Lihat Semua"

### User Profile Dropdown
- Avatar dengan inisial nama (otomatis dari session)
- Nama user (dari sessionStorage)
- Role badge ("Pasien")
- Dropdown menu:
  - 👤 Profil Saya
  - ⚙️ Pengaturan
  - 🚪 Logout (merah)

### Navigation Menu
- Dashboard link (tanpa dropdown)
- Layanan dropdown dengan 6 menu:
  - 📋 Daftar Antrean
  - ⏱️ Status Antrean
  - 📄 Permohonan Surat
  - 📚 Riwayat Surat
  - 👨‍⚕️ Jadwal Dokter
  - 💬 Chatbot
- Active page ditandai dengan background biru dan font bold

## Cara Update File Lain

### Langkah 1: Tambahkan CSS & JS di `<head>`
```html
<link rel="stylesheet" href="../css/header-styles.css">
<script src="../js/header-common.js"></script>
```

### Langkah 2: Ganti `<header>` dan `<nav>`
Copy dari file `_header-template.html` mulai dari:
- `<header>` sampai `</header>`
- `<nav>` sampai `</nav>`

### Langkah 3: Sesuaikan Active Page
Pada bagian dropdown "Layanan", tambahkan styling untuk page yang aktif:
```html
<!-- Contoh untuk halaman status-antrean.html -->
<a href="status-antrean.html" style="background: #f5f9fc; color: #1a8bd3; font-weight: 600;">
  ⏱️ Status Antrean
</a>
```

### Langkah 4: Sesuaikan Navigation di Dashboard
Untuk halaman Dashboard, ubah link Dashboard menjadi active:
```html
<a href="dashboard.html" style="color: #1a8bd3; text-decoration: none; font-weight: 600; padding: 0.5rem 0; border-bottom: 2px solid #1a8bd3;">
  🏠 Dashboard
</a>
```

## Struktur Header Baru

```
┌─ HEADER ─────────────────────────────────────┐
│ [Logo]              [🔔 4] [👤 Demo Pasien ▼]│
└──────────────────────────────────────────────┘
┌─ NAV ────────────────────────────────────────┐
│ [🏠 Dashboard] [📋 Layanan ▼]                │
└──────────────────────────────────────────────┘
```

## Design Specs

### Colors
- Primary Blue: #1a8bd3
- Text Dark: #2c4964
- Text Muted: #5f7a95
- Success Green: #00897b
- Warning Orange: #ff9800
- Error Red: #d32f2f

### Typography
- User Name: 0.9rem, font-weight: 600
- User Role: 0.75rem, color: #5f7a95
- Notification Title: 0.9rem, font-weight: bold
- Notification Text: 0.85rem

### Spacing
- Header padding: default
- Notification dropdown width: 380px
- User dropdown width: 240px
- Icon sizes: 20px (dropdown), 24px (bell)
- Avatar size: 32px

### Interactive States
- Hover: Background #f5f9fc for items
- Active dropdown: Arrow rotates 180deg
- Unread notifications: Background #f0f7ff
- Dropdown shadow: 0 8px 24px rgba(0,0,0,0.15)

## Testing Checklist

- [ ] Notifikasi bell dapat diklik dan menampilkan dropdown
- [ ] User profile dapat diklik dan menampilkan dropdown  
- [ ] Dropdown layanan dapat dibuka dan menutup
- [ ] Clicking outside menutup semua dropdown
- [ ] Username dari session ditampilkan dengan benar
- [ ] Avatar menampilkan inisial yang benar
- [ ] Active page ditandai dengan jelas
- [ ] Responsive pada layar kecil
- [ ] All links berfungsi dengan benar

## Notes

- JavaScript menggunakan `sessionStorage` untuk username
- Default username: "Demo Pasien"
- Badge count (4) adalah static, nanti bisa dynamic dari backend
- Notifikasi content adalah dummy data
- CSS menggunakan external file untuk reusability
