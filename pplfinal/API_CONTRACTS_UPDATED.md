# API Contracts - Smart Health Center Service
## Updated with Actual Web Page Attributes

---

## 1. AUTENTIKASI

### 1.1 Login Admin
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/auth/login/admin` | POST | None | `{ "email": "admin@puskesmas.com", "password": "password123" }` | `{ "success": true, "data": { "token": "eyJhbGc...", "user": { "id": 1, "nama": "Admin Sistem", "email": "admin@puskesmas.com", "role": "admin" } } }` | `{ "success": false, "message": "Email atau password salah", "errors": { "email": ["Kredensial tidak valid"] } }` |

### 1.2 Login Dokter
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/auth/login/dokter` | POST | None | `{ "email": "dokter@puskesmas.com", "password": "password123" }` | `{ "success": true, "data": { "token": "eyJhbGc...", "user": { "id": 1, "nama": "dr. Ahmad Fauzi", "email": "dokter@puskesmas.com", "role": "dokter", "sip": "123456789", "spesialisasi": "Penyakit Dalam", "poli": "Poli Umum" } } }` | `{ "success": false, "message": "Email atau password salah" }` |

### 1.3 Login Tenaga Medis/Staf
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/auth/login/staf` | POST | None | `{ "email": "staf@puskesmas.com", "password": "password123" }` | `{ "success": true, "data": { "token": "eyJhbGc...", "user": { "id": 1, "nama": "Sri Wahyuni", "email": "staf@puskesmas.com", "role": "tenaga_medis" } } }` | `{ "success": false, "message": "Email atau password salah" }` |

### 1.4 Login Pasien
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/auth/login/pasien` | POST | None | `{ "nik": "3201012345678901", "password": "password123" }` atau `{ "no_rm": "RM-2024-001234", "password": "password123" }` | `{ "success": true, "data": { "token": "eyJhbGc...", "user": { "id": 1, "nik": "3201012345678901", "no_rm": "RM-2024-001234", "nama_lengkap": "Ahmad Ridwan", "email": "ahmad@email.com", "no_telepon": "0812-3456-7890", "role": "pasien" } } }` | `{ "success": false, "message": "NIK atau password salah" }` |

### 1.5 Register Pasien
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/auth/register/pasien` | POST | None | `{ "nik": "3201012345678901", "nama_lengkap": "Ahmad Ridwan", "tanggal_lahir": "1990-01-15", "jenis_kelamin": "Laki-laki", "alamat": "Jl. Merdeka No. 123, Jakarta", "no_telepon": "0812-3456-7890", "email": "ahmad@email.com", "password": "password123", "password_confirmation": "password123" }` | `{ "success": true, "data": { "no_rm": "RM-2025-001234", "message": "Registrasi berhasil. Silakan login dengan NIK dan password Anda" } }` | `{ "success": false, "message": "Validasi gagal", "errors": { "nik": ["NIK sudah terdaftar"], "email": ["Email sudah digunakan"] } }` |

### 1.6 Logout
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/auth/logout` | POST | Bearer Token | `{}` | `{ "success": true, "message": "Logout berhasil" }` | `{ "success": false, "message": "Token tidak valid" }` |

### 1.7 Refresh Token
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/auth/refresh` | POST | Bearer Token | `{}` | `{ "success": true, "data": { "token": "eyJhbGc..." } }` | `{ "success": false, "message": "Token tidak valid atau expired" }` |

---

## 2. ADMIN - DASHBOARD

### 2.1 Get Dashboard Statistics
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/dashboard/stats` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": { "total_pasien": 1189, "pasien_hari_ini": 45, "total_dokter": 12, "dokter_aktif": 10, "total_staf": 6, "antrean_aktif": 23, "surat_pending": 8, "pengumuman_aktif": 15 } }` | `{ "success": false, "message": "Unauthorized" }` |

### 2.2 Get Activity Logs
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/dashboard/activity-logs` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": [{ "id": 1, "timestamp": "2025-11-27T10:30:00Z", "user": "dr. Ahmad Fauzi", "activity": "Menambahkan rekam medis untuk pasien RM-2024-001234", "type": "info" }] }` | `{ "success": false, "message": "Unauthorized" }` |

---

## 3. ADMIN - KELOLA PENGGUNA

### 3.1 Get Users by Role
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/users?role=pasien` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": [{ "id": 1, "nik": "3201012345678901", "no_rm": "RM-2024-001234", "nama_lengkap": "Ahmad Ridwan", "email": "ahmad@email.com", "no_telepon": "0812-3456-7890", "alamat": "Jl. Merdeka No. 123", "status": "Aktif", "tanggal_daftar": "2024-01-15" }], "total": 1189 }` | `{ "success": false, "message": "Unauthorized" }` |

### 3.2 Get Doctors List
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/users?role=dokter` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": [{ "id": 1, "nama": "dr. Ahmad Fauzi", "email": "ahmad.fauzi@puskesmas.com", "no_telepon": "0821-9876-5432", "sip": "123456789", "spesialisasi": "Penyakit Dalam", "poli": "Poli Umum", "status": "Aktif" }], "total": 12 }` | `{ "success": false, "message": "Unauthorized" }` |

### 3.3 Get Staff List
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/users?role=tenaga_medis` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": [{ "id": 1, "nama": "Sri Wahyuni", "email": "sri.wahyuni@puskesmas.com", "no_telepon": "0813-5555-6666", "jabatan": "Perawat", "status": "Aktif" }], "total": 6 }` | `{ "success": false, "message": "Unauthorized" }` |

### 3.4 Create User
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/users` | POST | Bearer Token (Admin) | **Pasien:** `{ "role": "pasien", "nik": "3201012345678902", "nama_lengkap": "Siti Aminah", "tanggal_lahir": "1985-03-20", "jenis_kelamin": "Perempuan", "alamat": "Jl. Sudirman No. 45", "no_telepon": "0812-1111-2222", "email": "siti@email.com" }`<br>**Dokter:** `{ "role": "dokter", "nama": "dr. Budi Santoso", "email": "budi@puskesmas.com", "no_telepon": "0821-3333-4444", "sip": "987654321", "spesialisasi": "Gigi", "poli": "Poli Gigi" }` | `{ "success": true, "data": { "id": 1190, "no_rm": "RM-2025-001190", "message": "User berhasil dibuat" } }` | `{ "success": false, "message": "Validasi gagal", "errors": { "nik": ["NIK sudah terdaftar"] } }` |

### 3.5 Update User
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/users/{id}` | PUT | Bearer Token (Admin) | `{ "nama_lengkap": "Ahmad Ridwan Updated", "email": "ahmad.new@email.com", "no_telepon": "0812-9999-8888", "status": "Aktif" }` | `{ "success": true, "message": "Data user berhasil diperbarui" }` | `{ "success": false, "message": "User tidak ditemukan" }` |

### 3.6 Delete User
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/users/{id}` | DELETE | Bearer Token (Admin) | N/A | `{ "success": true, "message": "User berhasil dihapus" }` | `{ "success": false, "message": "User tidak ditemukan" }` |

### 3.7 Change User Status
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/users/{id}/status` | PATCH | Bearer Token (Admin) | `{ "status": "Nonaktif" }` | `{ "success": true, "message": "Status user berhasil diubah" }` | `{ "success": false, "message": "Status tidak valid" }` |

---

## 4. ADMIN - KELOLA JADWAL DOKTER

### 4.1 Get Schedules
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/schedules` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": [{ "id": 1, "doctor_id": 1, "doctor_name": "dr. Ahmad Fauzi", "poli": "Poli Umum", "hari": "Senin", "jam_mulai": "08:00", "jam_selesai": "16:00", "kuota": 30, "status": "Aktif" }] }` | `{ "success": false, "message": "Unauthorized" }` |

### 4.2 Get Schedules by Poli
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/schedules?poli=Poli Umum` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": [{ "id": 1, "doctor_name": "dr. Ahmad Fauzi", "poli": "Poli Umum", "hari": "Senin", "jam_mulai": "08:00", "jam_selesai": "16:00" }] }` | `{ "success": false, "message": "Poli tidak ditemukan" }` |

### 4.3 Create Schedule
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/schedules` | POST | Bearer Token (Admin) | `{ "doctor_id": 1, "poli": "Poli Umum", "hari": "Senin", "jam_mulai": "08:00", "jam_selesai": "16:00", "kuota": 30 }` | `{ "success": true, "data": { "id": 1, "message": "Jadwal berhasil dibuat" } }` | `{ "success": false, "message": "Validasi gagal", "errors": { "jam_mulai": ["Jam bentrok dengan jadwal lain"] } }` |

### 4.4 Update Schedule
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/schedules/{id}` | PUT | Bearer Token (Admin) | `{ "hari": "Selasa", "jam_mulai": "09:00", "jam_selesai": "17:00", "kuota": 25 }` | `{ "success": true, "message": "Jadwal berhasil diperbarui" }` | `{ "success": false, "message": "Jadwal tidak ditemukan" }` |

### 4.5 Delete Schedule
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/schedules/{id}` | DELETE | Bearer Token (Admin) | N/A | `{ "success": true, "message": "Jadwal berhasil dihapus" }` | `{ "success": false, "message": "Jadwal tidak ditemukan" }` |

---

## 5. ADMIN - KELOLA PENGUMUMAN

### 5.1 Get Announcements
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/announcements` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": [{ "id": 1, "judul": "Libur Akhir Tahun 2025", "konten": "Pemberitahuan libur layanan...", "kategori": "libur", "prioritas": "Penting", "target_pengguna": "Semua Pengguna", "status": "published", "tanggal_publikasi": "2025-11-20T10:00:00Z", "berlaku_hingga": "2025-12-31", "dibuat_oleh": "Admin Sistem", "views": 1247 }], "total": 15 }` | `{ "success": false, "message": "Unauthorized" }` |

### 5.2 Get Announcements by Status
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/announcements?status=published` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": [...], "total": 15 }` | `{ "success": false, "message": "Status tidak valid" }` |

### 5.3 Create Announcement
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/announcements` | POST | Bearer Token (Admin) | `{ "judul": "Program Vaksinasi Gratis", "konten": "Pengumuman program vaksinasi...", "kategori": "promo", "prioritas": "Info", "target_pengguna": "Semua Pasien", "status": "published", "berlaku_hingga": "2025-12-31" }` | `{ "success": true, "data": { "id": 16, "message": "Pengumuman berhasil dibuat" } }` | `{ "success": false, "message": "Validasi gagal", "errors": { "judul": ["Judul wajib diisi"] } }` |

### 5.4 Update Announcement
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/announcements/{id}` | PUT | Bearer Token (Admin) | `{ "judul": "Updated Title", "konten": "Updated content", "status": "published" }` | `{ "success": true, "message": "Pengumuman berhasil diperbarui" }` | `{ "success": false, "message": "Pengumuman tidak ditemukan" }` |

### 5.5 Delete Announcement
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/announcements/{id}` | DELETE | Bearer Token (Admin) | N/A | `{ "success": true, "message": "Pengumuman berhasil dihapus" }` | `{ "success": false, "message": "Pengumuman tidak ditemukan" }` |

---

## 6. ADMIN - LAPORAN

### 6.1 Get Visit Report
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/reports/visits?start_date=2025-11-01&end_date=2025-11-30` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": { "total_kunjungan": 450, "by_poli": { "Poli Umum": 200, "Poli Gigi": 100, "Poli Anak": 80, "Poli Kandungan": 40, "Poli Mata": 30 }, "by_date": [...] } }` | `{ "success": false, "message": "Parameter tanggal tidak valid" }` |

### 6.2 Get Letter Report
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/reports/letters?start_date=2025-11-01&end_date=2025-11-30` | GET | Bearer Token (Admin) | N/A | `{ "success": true, "data": { "total_surat": 120, "surat_sehat": 45, "surat_sakit": 60, "surat_rujukan": 15, "status": { "approved": 100, "pending": 12, "rejected": 8 } } }` | `{ "success": false, "message": "Parameter tidak valid" }` |

---

## 7. DOKTER - DASHBOARD

### 7.1 Get Doctor Dashboard
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/dokter/dashboard` | GET | Bearer Token (Dokter) | N/A | `{ "success": true, "data": { "pasien_hari_ini": 15, "pasien_selesai": 8, "pasien_menunggu": 7, "jadwal_hari_ini": { "poli": "Poli Umum", "jam_mulai": "08:00", "jam_selesai": "16:00" }, "upcoming_appointments": [...] } }` | `{ "success": false, "message": "Unauthorized" }` |

---

## 8. DOKTER - DAFTAR PASIEN

### 8.1 Get Patient List
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/dokter/patients` | GET | Bearer Token (Dokter) | N/A | `{ "success": true, "data": [{ "id": 1, "no_rm": "RM-2024-001234", "nama_lengkap": "Ahmad Ridwan", "nik": "3201012345678901", "tanggal_lahir": "1990-01-15", "umur": 35, "jenis_kelamin": "Laki-laki", "no_telepon": "0812-3456-7890", "last_visit": "2025-11-27" }], "total": 150 }` | `{ "success": false, "message": "Unauthorized" }` |

### 8.2 Search Patient
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/dokter/patients/search?q=Ahmad` | GET | Bearer Token (Dokter) | N/A | `{ "success": true, "data": [{ "no_rm": "RM-2024-001234", "nama_lengkap": "Ahmad Ridwan", "nik": "3201012345678901" }] }` | `{ "success": false, "message": "Pasien tidak ditemukan" }` |

---

## 9. DOKTER - REKAM MEDIS

### 9.1 Get Medical Records by Patient
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/dokter/medical-records/{no_rm}` | GET | Bearer Token (Dokter) | N/A | `{ "success": true, "data": { "patient": { "no_rm": "RM-2024-001234", "nama_lengkap": "Siti Rahmawati", "nik": "3174012504900001", "tanggal_lahir": "1990-04-25", "umur": 35, "jenis_kelamin": "Perempuan", "golongan_darah": "O+", "no_telepon": "0812-3456-7890", "alamat": "Jl. Merdeka No. 45, Jakarta Pusat", "alergi_obat": "Penisilin, Sulfa", "riwayat_penyakit": "Diabetes Mellitus Tipe 2 (sejak 2020)", "jaminan": "BPJS Kesehatan", "no_jaminan": "0001234567890" }, "visits": [...] } }` | `{ "success": false, "message": "Pasien tidak ditemukan" }` |

### 9.2 Get Visit History
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/dokter/medical-records/{no_rm}/visits` | GET | Bearer Token (Dokter) | N/A | `{ "success": true, "data": [{ "visit_id": 15, "tanggal": "2025-11-27T10:30:00Z", "dokter": "dr. Ahmad Wijaya, Sp.PD", "status": "Sedang Berlangsung", "vital_signs": { "tekanan_darah_sistolik": 120, "tekanan_darah_diastolik": 80, "nadi": 72, "suhu": 36.5, "berat_badan": 65 }, "keluhan_utama": "Kontrol rutin diabetes mellitus. Pasien mengeluh sering merasa lelah dan haus." }], "total": 15 }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

### 9.3 Create Medical Record
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/dokter/medical-records` | POST | Bearer Token (Dokter) | `{ "no_rm": "RM-2024-001234", "tanggal_pemeriksaan": "2025-11-27T10:30:00Z", "vital_signs": { "tekanan_darah_sistolik": 120, "tekanan_darah_diastolik": 80, "nadi": 72, "suhu": 36.5, "berat_badan": 65, "tinggi_badan": 160 }, "keluhan_utama": "Batuk dan pilek 3 hari", "riwayat_penyakit_sekarang": "Pasien mengeluh batuk...", "keadaan_umum": "Baik", "kesadaran": "Compos Mentis", "pemeriksaan_fisik": "Kepala: Normocefali...", "diagnosis_utama": "ISPA", "kode_icd10": "J06.9", "diagnosis_tambahan": "", "terapi": "Paracetamol 500mg 3x1...", "anjuran_edukasi": "Istirahat cukup...", "rencana_tindak_lanjut": "Kontrol ulang 1 minggu", "catatan_tambahan": "" }` | `{ "success": true, "data": { "visit_id": 16, "message": "Rekam medis berhasil disimpan" } }` | `{ "success": false, "message": "Validasi gagal", "errors": { "diagnosis_utama": ["Diagnosis wajib diisi"] } }` |

### 9.4 Get Prescription History
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/dokter/medical-records/{no_rm}/prescriptions` | GET | Bearer Token (Dokter) | N/A | `{ "success": true, "data": [{ "id": 1, "tanggal": "2025-11-20", "dokter": "dr. Ahmad Wijaya, Sp.PD", "status": "Sudah Diambil", "items": [{ "nama_obat": "Metformin 500mg", "dosis": "2x1 tablet", "aturan_pakai": "pagi & malam setelah makan", "jumlah": 30, "satuan": "tablet", "durasi": "30 hari" }] }] }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

### 9.5 Get Lab Results
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/dokter/medical-records/{no_rm}/lab-results` | GET | Bearer Token (Dokter) | N/A | `{ "success": true, "data": [{ "id": 1, "tanggal": "2025-11-20", "lab": "Lab Klinik Smart Health", "status": "Hasil Tersedia", "results": [{ "parameter": "Gula Darah Puasa", "hasil": 140, "satuan": "mg/dL", "nilai_normal": "70-100", "status": "Tinggi" }], "catatan_dokter": "Kadar gula darah masih tinggi..." }] }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

---

## 10. STAF - KELOLA ANTREAN

### 10.1 Get Queue List by Poli
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staf/queues?poli=Poli Umum` | GET | Bearer Token (Staf) | N/A | `{ "success": true, "data": [{ "queue_number": "A-009", "patient_name": "Budi Santoso", "nik": "3201012345678902", "no_rm": "RM-2024-001234", "umur": 45, "jenis_pembayaran": "BPJS", "keluhan": "Batuk dan pilek 3 hari, demam ringan", "status": "in_progress", "dokter": "dr. Ahmad Fauzi", "ruang": "Ruang 1", "waktu_masuk": "2025-11-27T09:58:00Z" }], "total": 12 }` | `{ "success": false, "message": "Poli tidak ditemukan" }` |

### 10.2 Call Next Patient
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staf/queues/call-next` | POST | Bearer Token (Staf) | `{ "poli": "Poli Umum", "queue_number": "A-010" }` | `{ "success": true, "message": "Pasien A-010 berhasil dipanggil" }` | `{ "success": false, "message": "Antrean tidak ditemukan" }` |

### 10.3 Update Queue Status
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staf/queues/{queue_number}/status` | PATCH | Bearer Token (Staf) | `{ "status": "completed" }` | `{ "success": true, "message": "Status antrean berhasil diperbarui" }` | `{ "success": false, "message": "Status tidak valid" }` |

### 10.4 Postpone Patient
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staf/queues/{queue_number}/postpone` | PATCH | Bearer Token (Staf) | `{ "alasan": "Pasien ke toilet" }` | `{ "success": true, "message": "Pasien berhasil ditunda" }` | `{ "success": false, "message": "Antrean tidak ditemukan" }` |

---

## 11. STAF - VALIDASI SURAT

### 11.1 Get Letters for Validation
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staf/letters?status=pending` | GET | Bearer Token (Staf) | N/A | `{ "success": true, "data": [{ "id": "SKS-2025-001234", "jenis_surat": "sakit", "patient_name": "Ahmad Ridwan", "nik": "3201012345678901", "tanggal_pengajuan": "2025-11-27T09:30:00Z", "durasi_sakit": 3, "tanggal_mulai": "2025-11-27", "tanggal_selesai": "2025-11-29", "keperluan": "Izin Kerja/Sekolah", "diagnosis": "Infeksi Saluran Pernapasan Atas (ISPA)", "dokumen_pendukung": ["hasil-lab-001.pdf", "foto-resep.jpg"], "status": "pending" }], "total": 12 }` | `{ "success": false, "message": "Unauthorized" }` |

### 11.2 Approve Letter
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staf/letters/{letter_id}/approve` | PATCH | Bearer Token (Staf) | `{ "catatan_validasi": "Dokumen lengkap dan valid" }` | `{ "success": true, "message": "Surat berhasil disetujui", "pdf_url": "https://api.puskesmas.com/files/SKS-2025-001234.pdf" }` | `{ "success": false, "message": "Surat tidak ditemukan" }` |

### 11.3 Reject Letter
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staf/letters/{letter_id}/reject` | PATCH | Bearer Token (Staf) | `{ "catatan_validasi": "Dokumen pendukung tidak lengkap", "alasan": "Perlu melengkapi hasil lab" }` | `{ "success": true, "message": "Surat ditolak" }` | `{ "success": false, "message": "Surat tidak ditemukan" }` |

---

## 12. PASIEN - DASHBOARD

### 12.1 Get Patient Dashboard
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/dashboard` | GET | Bearer Token (Pasien) | N/A | `{ "success": true, "data": { "active_queue": { "queue_number": "A-012", "status": "Menunggu", "position": 3, "estimated_time": "30 menit", "poli": "Poli Umum", "dokter": "dr. Ahmad Fauzi" }, "stats": { "total_kunjungan": 15, "surat_pending": 2, "surat_diterbitkan": 5, "jadwal_kontrol": 1 }, "upcoming_appointments": [...], "notifications": [...] } }` | `{ "success": false, "message": "Unauthorized" }` |

---

## 13. PASIEN - ANTREAN

### 13.1 Get Available Schedules
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/schedules?poli=Poli Umum&tanggal=2025-11-28` | GET | Bearer Token (Pasien) | N/A | `{ "success": true, "data": [{ "schedule_id": 1, "dokter": "dr. Ahmad Fauzi", "poli": "Poli Umum", "hari": "Kamis", "jam_mulai": "08:00", "jam_selesai": "16:00", "kuota_tersedia": 15, "kuota_total": 30 }] }` | `{ "success": false, "message": "Jadwal tidak ditemukan" }` |

### 13.2 Create Queue
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/queues` | POST | Bearer Token (Pasien) | `{ "schedule_id": 1, "poli": "Poli Umum", "tanggal_kunjungan": "2025-11-28", "keluhan": "Batuk dan pilek 3 hari", "jenis_pembayaran": "BPJS" }` | `{ "success": true, "data": { "queue_number": "A-015", "estimated_time": "45 menit", "message": "Pendaftaran antrean berhasil" } }` | `{ "success": false, "message": "Kuota sudah penuh" }` |

### 13.3 Get Queue Status
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/queues/{queue_number}` | GET | Bearer Token (Pasien) | N/A | `{ "success": true, "data": { "queue_number": "A-012", "status": "Menunggu", "position": 3, "estimated_time": "30 menit", "poli": "Poli Umum", "dokter": "dr. Ahmad Fauzi", "tanggal_kunjungan": "2025-11-27" } }` | `{ "success": false, "message": "Antrean tidak ditemukan" }` |

### 13.4 Cancel Queue
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/queues/{queue_number}/cancel` | DELETE | Bearer Token (Pasien) | `{ "alasan": "Tidak bisa datang" }` | `{ "success": true, "message": "Antrean berhasil dibatalkan" }` | `{ "success": false, "message": "Antrean tidak dapat dibatalkan" }` |

---

## 14. PASIEN - PERMOHONAN SURAT

### 14.1 Get Letter Types
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/letters/types` | GET | Bearer Token (Pasien) | N/A | `{ "success": true, "data": [{ "type": "sehat", "nama": "Surat Keterangan Sehat", "deskripsi": "Untuk keperluan administrasi, lamaran kerja, dll.", "waktu_proses": "1-2 hari kerja" }, { "type": "sakit", "nama": "Surat Keterangan Sakit", "deskripsi": "Untuk izin tidak masuk kerja/sekolah", "waktu_proses": "Langsung (setelah pemeriksaan)" }, { "type": "rujukan", "nama": "Surat Rujukan", "deskripsi": "Untuk rujukan ke rumah sakit atau spesialis", "waktu_proses": "1-3 hari kerja" }] }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

### 14.2 Submit Letter Request - Surat Sehat
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/letters` | POST | Bearer Token (Pasien) | `{ "jenis_surat": "sehat", "keperluan": "lamaran_kerja", "keperluan_lain": "", "ditujukan": "PT. ABC", "catatan": "" }` | `{ "success": true, "data": { "letter_id": "SKS-2025-001235", "message": "Permohonan surat berhasil diajukan" } }` | `{ "success": false, "message": "Validasi gagal", "errors": { "keperluan": ["Keperluan wajib diisi"] } }` |

### 14.3 Submit Letter Request - Surat Sakit
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/letters` | POST | Bearer Token (Pasien) | `{ "jenis_surat": "sakit", "tanggal_mulai": "2025-11-27", "tanggal_selesai": "2025-11-29", "lama_istirahat": 3, "keperluan": "izin_kerja", "ditujukan": "PT. ABC", "keluhan": "Batuk, pilek, demam ringan", "catatan": "" }` | `{ "success": true, "data": { "letter_id": "SKS-2025-001236", "message": "Permohonan surat berhasil diajukan" } }` | `{ "success": false, "message": "Validasi gagal" }` |

### 14.4 Submit Letter Request - Surat Rujukan
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/letters` | POST | Bearer Token (Pasien) | `{ "jenis_surat": "rujukan", "tujuan_rujukan": "rs_umum", "nama_rs": "RSUD Dr. Soetomo", "spesialis": "jantung", "alasan_rujukan": "Perlu pemeriksaan jantung lanjutan", "diagnosis_awal": "", "jenis_pasien": "bpjs" }` | `{ "success": true, "data": { "letter_id": "SRJ-2025-001001", "message": "Permohonan surat rujukan berhasil diajukan" } }` | `{ "success": false, "message": "Validasi gagal" }` |

### 14.5 Get Letter Status
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/letters?status=pending` | GET | Bearer Token (Pasien) | N/A | `{ "success": true, "data": [{ "letter_id": "SKS-2025-001234", "jenis_surat": "sakit", "tanggal_pengajuan": "2025-11-27T09:30:00Z", "status": "pending", "estimasi_selesai": "2025-11-28" }] }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

### 14.6 Download Letter PDF
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/letters/{letter_id}/download` | GET | Bearer Token (Pasien) | N/A | `Binary PDF file` | `{ "success": false, "message": "Surat belum siap untuk diunduh" }` |

---

## 15. PASIEN - RIWAYAT SURAT

### 15.1 Get Letter History
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/pasien/letters/history` | GET | Bearer Token (Pasien) | N/A | `{ "success": true, "data": [{ "letter_id": "SKS-2025-001200", "jenis_surat": "sehat", "tanggal_pengajuan": "2025-10-20", "tanggal_disetujui": "2025-10-21", "status": "approved", "keperluan": "Melamar Pekerjaan", "validator": "Sri Wahyuni", "pdf_url": "https://api.puskesmas.com/files/SKS-2025-001200.pdf" }], "total": 5 }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

---

## 16. PUBLIC ENDPOINTS

### 16.1 Get Announcements (Public)
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/public/announcements` | GET | None | N/A | `{ "success": true, "data": [{ "id": 1, "judul": "Libur Akhir Tahun 2025", "konten": "Pemberitahuan libur...", "kategori": "libur", "tanggal_publikasi": "2025-11-20" }] }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

### 16.2 Get Doctor Schedules (Public)
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/public/schedules` | GET | None | N/A | `{ "success": true, "data": [{ "poli": "Poli Umum", "dokter": "dr. Ahmad Fauzi", "hari": "Senin", "jam_mulai": "08:00", "jam_selesai": "16:00" }] }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

### 16.3 Get Poli List (Public)
| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/public/poli` | GET | None | N/A | `{ "success": true, "data": [{ "nama": "Poli Umum", "deskripsi": "Pelayanan kesehatan umum" }, { "nama": "Poli Gigi", "deskripsi": "Pelayanan kesehatan gigi dan mulut" }, { "nama": "Poli Anak", "deskripsi": "Pelayanan kesehatan anak" }, { "nama": "Poli Kandungan", "deskripsi": "Pelayanan kesehatan ibu dan kandungan" }, { "nama": "Poli Mata", "deskripsi": "Pelayanan kesehatan mata" }] }` | `{ "success": false, "message": "Data tidak ditemukan" }` |

---

## CATATAN ENUM VALUES

### Status User
- `Aktif`
- `Nonaktif`
- `Suspended`

### Poli Types
- `Poli Umum`
- `Poli Gigi`
- `Poli Anak`
- `Poli Kandungan`
- `Poli Mata`

### Queue Status
- `waiting` (Menunggu)
- `called` (Dipanggil)
- `in_progress` (Sedang Dilayani)
- `completed` (Selesai)
- `cancelled` (Dibatalkan)
- `postponed` (Ditunda)

### Letter Status
- `pending` (Menunggu Validasi)
- `approved` (Disetujui)
- `rejected` (Ditolak)
- `draft` (Draft)

### Letter Types
- `sehat` (Surat Keterangan Sehat)
- `sakit` (Surat Keterangan Sakit)
- `rujukan` (Surat Rujukan)

### Jenis Pembayaran
- `BPJS`
- `Umum`
- `Asuransi Swasta`

### Kesadaran Pasien
- `Compos Mentis`
- `Apatis`
- `Somnolen`
- `Sopor`
- `Koma`

### Keadaan Umum
- `Baik`
- `Sedang`
- `Lemah`

### Hari (Days)
- `Senin`, `Selasa`, `Rabu`, `Kamis`, `Jumat`, `Sabtu`, `Minggu`

### Announcement Categories
- `umum` (Umum)
- `layanan` (Layanan)
- `libur` (Libur & Cuti)
- `promo` (Promosi)
- `darurat` (Darurat)

### Announcement Priority
- `Penting`
- `Info`
- `Darurat`

### Announcement Status
- `published` (Dipublikasi)
- `draft` (Draft)
- `scheduled` (Terjadwal)

---

## FORMAT DATA KHUSUS

### NIK Format
- 16 digit angka
- Contoh: `3201012345678901`

### No. Rekam Medis (No. RM) Format
- Format: `RM-YYYY-NNNNNN`
- Contoh: `RM-2024-001234`, `RM-2025-001190`

### Queue Number Format
- Format: `[A-Z]-NNN`
- Contoh: `A-009`, `A-012`, `B-001`

### SIP (Surat Izin Praktik) Format
- 9-12 digit angka
- Contoh: `123456789`

### Letter ID Format
- Surat Sehat: `SKS-YYYY-NNNNNN`
- Surat Sakit: `SKS-YYYY-NNNNNN`
- Surat Rujukan: `SRJ-YYYY-NNNNNN`

### Time Format
- Format 24 jam: `HH:MM`
- Contoh: `08:00`, `16:00`

### Date Format
- ISO 8601: `YYYY-MM-DD`
- Contoh: `2025-11-27`

### DateTime Format
- ISO 8601 with timezone: `YYYY-MM-DDTHH:MM:SSZ`
- Contoh: `2025-11-27T10:30:00Z`

---

**Total Endpoints: 100+**

**Dibuat berdasarkan analisis halaman web aktual di folder PPLFINAL**
**Terakhir diperbarui: 27 November 2025**
