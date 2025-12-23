# DAFTAR KONTRAK API - SMART HEALTH CENTER SERVICE
## Format Tabel Lengkap

---

## 1. AUTENTIKASI & OTORISASI

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/auth/login` | POST | ❌ | `{ "username": "string", "password": "string", "role": "admin\|dokter\|tenaga_medis\|pasien" }` | `200 OK`<br>`{ "success": true, "message": "Login berhasil", "data": { "user_id": "string", "username": "string", "role": "string", "full_name": "string", "token": "string" } }` | `401 Unauthorized`<br>`{ "success": false, "message": "Username atau password salah", "error_code": "AUTH_INVALID_CREDENTIALS" }` |
| `/api/auth/register` | POST | ❌ | `{ "nik": "string", "nama_lengkap": "string", "tanggal_lahir": "YYYY-MM-DD", "jenis_kelamin": "string", "alamat": "string", "no_telepon": "string", "email": "string", "username": "string", "password": "string" }` | `201 Created`<br>`{ "success": true, "message": "Registrasi berhasil", "data": { "user_id": "string", "no_rm": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Username sudah terdaftar", "errors": { "username": ["Username sudah digunakan"] }, "error_code": "REG_USERNAME_EXISTS" }` |
| `/api/auth/logout` | POST | ✅ Bearer Token | `{}` | `200 OK`<br>`{ "success": true, "message": "Logout berhasil" }` | `401 Unauthorized`<br>`{ "success": false, "message": "Token tidak valid", "error_code": "AUTH_INVALID_TOKEN" }` |
| `/api/auth/validate` | GET | ✅ Bearer Token | - | `200 OK`<br>`{ "success": true, "data": { "valid": true, "user_id": "string", "role": "string" } }` | `401 Unauthorized`<br>`{ "success": false, "message": "Token expired", "error_code": "AUTH_TOKEN_EXPIRED" }` |

---

## 2. ADMIN - Dashboard

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/dashboard/statistics` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "total_pasien": 0, "pasien_hari_ini": 0, "total_dokter": 0, "dokter_aktif": 0, "total_staf": 0, "antrean_aktif": 0, "surat_pending": 0, "pengumuman_aktif": 0 } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/admin/dashboard/recent-activities` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "activities": [{ "id": "string", "activity_type": "string", "description": "string", "user": "string", "timestamp": "ISO 8601" }], "total": 0 } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |

---

## 3. ADMIN - Kelola Pengguna

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/users` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "users": [{ "user_id": "string", "username": "string", "full_name": "string", "email": "string", "role": "string", "status": "active\|inactive", "created_at": "ISO 8601", "last_login": "ISO 8601" }], "pagination": { "current_page": 1, "total_pages": 10, "total_items": 100, "limit": 10 } } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/admin/users/{user_id}` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "user_id": "string", "username": "string", "full_name": "string", "email": "string", "no_telepon": "string", "role": "string", "status": "string", "additional_info": {} } }` | `404 Not Found`<br>`{ "success": false, "message": "User tidak ditemukan", "error_code": "USER_NOT_FOUND" }` |
| `/api/admin/users` | POST | ✅ Bearer Token (Admin) | `{ "username": "string", "password": "string", "full_name": "string", "email": "string", "no_telepon": "string", "role": "admin\|dokter\|tenaga_medis\|pasien", "additional_info": {} }` | `201 Created`<br>`{ "success": true, "message": "Pengguna berhasil ditambahkan", "data": { "user_id": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "username": ["Username sudah digunakan"], "email": ["Format email tidak valid"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/admin/users/{user_id}` | PUT | ✅ Bearer Token (Admin) | `{ "full_name": "string", "email": "string", "no_telepon": "string", "status": "active\|inactive", "additional_info": {} }` | `200 OK`<br>`{ "success": true, "message": "Pengguna berhasil diupdate" }` | `404 Not Found`<br>`{ "success": false, "message": "User tidak ditemukan", "error_code": "USER_NOT_FOUND" }` |
| `/api/admin/users/{user_id}/status` | PATCH | ✅ Bearer Token (Admin) | `{ "status": "active\|inactive" }` | `200 OK`<br>`{ "success": true, "message": "Status pengguna berhasil diubah" }` | `404 Not Found`<br>`{ "success": false, "message": "User tidak ditemukan", "error_code": "USER_NOT_FOUND" }` |

---

## 4. ADMIN - Kelola Jadwal Dokter

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/schedules` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "schedules": [{ "schedule_id": "string", "doctor_id": "string", "doctor_name": "string", "spesialisasi": "string", "hari": "string", "jam_mulai": "HH:mm", "jam_selesai": "HH:mm", "kuota": 0, "status": "active\|inactive" }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/admin/schedules` | POST | ✅ Bearer Token (Admin) | `{ "doctor_id": "string", "hari": "Senin\|Selasa\|Rabu\|Kamis\|Jumat\|Sabtu\|Minggu", "jam_mulai": "HH:mm", "jam_selesai": "HH:mm", "kuota": 0 }` | `201 Created`<br>`{ "success": true, "message": "Jadwal berhasil ditambahkan", "data": { "schedule_id": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "doctor_id": ["Dokter tidak ditemukan"], "jam_mulai": ["Jam mulai tidak valid"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/admin/schedules/{schedule_id}` | PUT | ✅ Bearer Token (Admin) | `{ "hari": "string", "jam_mulai": "HH:mm", "jam_selesai": "HH:mm", "kuota": 0, "status": "active\|inactive" }` | `200 OK`<br>`{ "success": true, "message": "Jadwal berhasil diupdate" }` | `404 Not Found`<br>`{ "success": false, "message": "Jadwal tidak ditemukan", "error_code": "SCHEDULE_NOT_FOUND" }` |
| `/api/admin/schedules/{schedule_id}` | DELETE | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "message": "Jadwal berhasil dihapus" }` | `400 Bad Request`<br>`{ "success": false, "message": "Jadwal tidak dapat dihapus, masih ada antrean aktif", "error_code": "SCHEDULE_HAS_ACTIVE_QUEUE" }` |

---

## 5. ADMIN - Kelola Pengumuman

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/announcements` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "announcements": [{ "announcement_id": "string", "title": "string", "content": "string", "category": "string", "priority": "high\|medium\|low", "status": "published\|draft\|scheduled", "publish_date": "ISO 8601", "created_by": "string", "created_at": "ISO 8601" }], "pagination": {} } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/admin/announcements/{announcement_id}` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "announcement_id": "string", "title": "string", "content": "string", "category": "string", "priority": "string", "status": "string", "publish_date": "ISO 8601", "created_by": "string", "created_at": "ISO 8601", "updated_at": "ISO 8601" } }` | `404 Not Found`<br>`{ "success": false, "message": "Pengumuman tidak ditemukan", "error_code": "ANNOUNCEMENT_NOT_FOUND" }` |
| `/api/admin/announcements` | POST | ✅ Bearer Token (Admin) | `{ "title": "string", "content": "string", "category": "string", "priority": "high\|medium\|low", "status": "published\|draft\|scheduled", "publish_date": "ISO 8601", "attachment": "string" }` | `201 Created`<br>`{ "success": true, "message": "Pengumuman berhasil dibuat", "data": { "announcement_id": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "title": ["Title wajib diisi"], "content": ["Content wajib diisi"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/admin/announcements/{announcement_id}` | PUT | ✅ Bearer Token (Admin) | `{ "title": "string", "content": "string", "category": "string", "priority": "string", "status": "string", "publish_date": "ISO 8601" }` | `200 OK`<br>`{ "success": true, "message": "Pengumuman berhasil diupdate" }` | `404 Not Found`<br>`{ "success": false, "message": "Pengumuman tidak ditemukan", "error_code": "ANNOUNCEMENT_NOT_FOUND" }` |
| `/api/admin/announcements/{announcement_id}` | DELETE | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "message": "Pengumuman berhasil dihapus" }` | `404 Not Found`<br>`{ "success": false, "message": "Pengumuman tidak ditemukan", "error_code": "ANNOUNCEMENT_NOT_FOUND" }` |
| `/api/admin/announcements/{announcement_id}/publish` | PATCH | ✅ Bearer Token (Admin) | `{}` | `200 OK`<br>`{ "success": true, "message": "Pengumuman berhasil dipublikasikan" }` | `404 Not Found`<br>`{ "success": false, "message": "Pengumuman tidak ditemukan", "error_code": "ANNOUNCEMENT_NOT_FOUND" }` |
| `/api/admin/announcements/{announcement_id}/unpublish` | PATCH | ✅ Bearer Token (Admin) | `{}` | `200 OK`<br>`{ "success": true, "message": "Pengumuman berhasil ditarik dari publikasi" }` | `404 Not Found`<br>`{ "success": false, "message": "Pengumuman tidak ditemukan", "error_code": "ANNOUNCEMENT_NOT_FOUND" }` |

---

## 6. ADMIN - Laporan

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/reports/patient-visits` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "period": { "from": "YYYY-MM-DD", "to": "YYYY-MM-DD" }, "summary": { "total_visits": 0, "new_patients": 0, "returning_patients": 0 }, "visits": [{ "date": "YYYY-MM-DD", "patient_id": "string", "patient_name": "string", "doctor_name": "string", "diagnosis": "string" }] } }` | `400 Bad Request`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/admin/reports/letters` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "period": {}, "summary": { "total_letters": 0, "by_type": { "sakit": 0, "sehat": 0, "rujukan": 0 } }, "letters": [] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/admin/reports/doctor-performance` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "period": {}, "doctors": [{ "doctor_id": "string", "doctor_name": "string", "total_patients": 0, "total_hours": 0, "avg_consultation_time": 0, "patient_satisfaction": 0 }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/admin/reports/queue` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "period": {}, "summary": { "total_queues": 0, "avg_waiting_time": 0, "completed": 0, "cancelled": 0 }, "daily_stats": [] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |

---

## 7. ADMIN - Pengaturan Sistem

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/admin/settings` | GET | ✅ Bearer Token (Admin) | - | `200 OK`<br>`{ "success": true, "data": { "email_notifications": true, "sms_notifications": false, "auto_backup": true, "backup_frequency": "daily\|weekly\|monthly", "queue_limit": 50, "working_hours": { "start": "08:00", "end": "16:00" } } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/admin/settings` | PUT | ✅ Bearer Token (Admin) | `{ "email_notifications": true, "sms_notifications": false, "auto_backup": true, "backup_frequency": "daily" }` | `200 OK`<br>`{ "success": true, "message": "Pengaturan berhasil diupdate" }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "backup_frequency": ["Nilai tidak valid"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/admin/backup` | POST | ✅ Bearer Token (Admin) | `{}` | `201 Created`<br>`{ "success": true, "message": "Backup berhasil dibuat", "data": { "backup_id": "string", "filename": "string", "size": 0, "created_at": "ISO 8601" } }` | `500 Internal Server Error`<br>`{ "success": false, "message": "Backup gagal", "error_code": "BACKUP_FAILED" }` |

---

## 8. DOKTER - Dashboard

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/doctor/dashboard/statistics` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>`{ "success": true, "data": { "patients_today": 0, "waiting_queue": 0, "completed_today": 0, "upcoming_schedule": [] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/doctor/queue/today` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>`{ "success": true, "data": { "queues": [{ "queue_id": "string", "queue_number": "A001", "patient_id": "string", "patient_name": "string", "no_rm": "string", "check_in_time": "ISO 8601", "status": "waiting\|in_progress\|completed" }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |

---

## 9. DOKTER - Jadwal Praktik

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/doctor/schedule` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>`{ "success": true, "data": { "schedules": [{ "schedule_id": "string", "hari": "string", "jam_mulai": "HH:mm", "jam_selesai": "HH:mm", "kuota": 0, "terisi": 0, "status": "active" }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |

---

## 10. DOKTER - Daftar Pasien

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/doctor/patients/today` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>`{ "success": true, "data": { "patients": [{ "queue_id": "string", "queue_number": "string", "patient_id": "string", "patient_name": "string", "no_rm": "string", "age": 0, "gender": "string", "status": "string", "check_in_time": "ISO 8601" }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/doctor/patients/history` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>`{ "success": true, "data": { "patients": [{ "patient_id": "string", "patient_name": "string", "no_rm": "string", "last_visit": "ISO 8601", "total_visits": 0 }], "pagination": {} } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/doctor/patients/{queue_id}/call` | PATCH | ✅ Bearer Token (Dokter) | `{}` | `200 OK`<br>`{ "success": true, "message": "Pasien berhasil dipanggil" }` | `404 Not Found`<br>`{ "success": false, "message": "Antrean tidak ditemukan", "error_code": "QUEUE_NOT_FOUND" }` |
| `/api/doctor/patients/{queue_id}/start-examination` | PATCH | ✅ Bearer Token (Dokter) | `{}` | `200 OK`<br>`{ "success": true, "message": "Pemeriksaan dimulai" }` | `404 Not Found`<br>`{ "success": false, "message": "Antrean tidak ditemukan", "error_code": "QUEUE_NOT_FOUND" }` |
| `/api/doctor/patients/{queue_id}/complete` | PATCH | ✅ Bearer Token (Dokter) | `{}` | `200 OK`<br>`{ "success": true, "message": "Pemeriksaan selesai" }` | `404 Not Found`<br>`{ "success": false, "message": "Antrean tidak ditemukan", "error_code": "QUEUE_NOT_FOUND" }` |

---

## 11. DOKTER - Rekam Medis

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/doctor/medical-records/search` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>`{ "success": true, "data": { "patients": [{ "patient_id": "string", "no_rm": "string", "nama": "string", "tanggal_lahir": "YYYY-MM-DD", "jenis_kelamin": "string" }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/doctor/medical-records/patient/{patient_id}` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>`{ "success": true, "data": { "patient_info": { "patient_id": "string", "no_rm": "string", "nama": "string", "tanggal_lahir": "YYYY-MM-DD", "jenis_kelamin": "string", "alamat": "string", "no_telepon": "string", "alergi": [], "riwayat_penyakit": [] }, "visits": [{ "visit_id": "string", "tanggal": "ISO 8601", "keluhan": "string", "diagnosis": "string", "tindakan": "string", "resep": "string", "doctor_name": "string" }] } }` | `404 Not Found`<br>`{ "success": false, "message": "Pasien tidak ditemukan", "error_code": "PATIENT_NOT_FOUND" }` |
| `/api/doctor/medical-records` | POST | ✅ Bearer Token (Dokter) | `{ "patient_id": "string", "queue_id": "string", "keluhan": "string", "anamnesis": "string", "pemeriksaan_fisik": { "tekanan_darah": "string", "nadi": "string", "suhu": "string", "tinggi_badan": 0, "berat_badan": 0 }, "diagnosis": "string", "tindakan": "string", "resep": [{ "nama_obat": "string", "dosis": "string", "frekuensi": "string", "durasi": "string", "catatan": "string" }], "catatan": "string" }` | `201 Created`<br>`{ "success": true, "message": "Rekam medis berhasil disimpan", "data": { "medical_record_id": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "patient_id": ["Pasien tidak ditemukan"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/doctor/medical-records/{medical_record_id}` | PUT | ✅ Bearer Token (Dokter) | `{ "keluhan": "string", "diagnosis": "string", "tindakan": "string", "catatan": "string" }` | `200 OK`<br>`{ "success": true, "message": "Rekam medis berhasil diupdate" }` | `404 Not Found`<br>`{ "success": false, "message": "Rekam medis tidak ditemukan", "error_code": "RECORD_NOT_FOUND" }` |
| `/api/doctor/medical-records/patient/{patient_id}/visits` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>`{ "success": true, "data": { "visits": [], "pagination": {} } }` | `404 Not Found`<br>`{ "success": false, "message": "Pasien tidak ditemukan", "error_code": "PATIENT_NOT_FOUND" }` |

---

## 12. DOKTER - Resep & Surat

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/doctor/prescriptions` | POST | ✅ Bearer Token (Dokter) | `{ "patient_id": "string", "medical_record_id": "string", "medications": [{ "nama_obat": "string", "dosis": "string", "frekuensi": "string", "durasi": "string", "catatan": "string" }], "catatan_dokter": "string" }` | `201 Created`<br>`{ "success": true, "message": "Resep berhasil dibuat", "data": { "prescription_id": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "medications": ["Minimal 1 obat harus diisi"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/doctor/letters` | POST | ✅ Bearer Token (Dokter) | `{ "patient_id": "string", "medical_record_id": "string", "letter_type": "sakit\|sehat\|rujukan", "diagnosis": "string", "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD", "description": "string", "recommendation": "string" }` | `201 Created`<br>`{ "success": true, "message": "Surat berhasil dibuat", "data": { "letter_id": "string", "letter_number": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "letter_type": ["Tipe surat tidak valid"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/doctor/prescriptions/{prescription_id}/print` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>PDF File (Binary) | `404 Not Found`<br>`{ "success": false, "message": "Resep tidak ditemukan", "error_code": "PRESCRIPTION_NOT_FOUND" }` |
| `/api/doctor/letters/{letter_id}/print` | GET | ✅ Bearer Token (Dokter) | - | `200 OK`<br>PDF File (Binary) | `404 Not Found`<br>`{ "success": false, "message": "Surat tidak ditemukan", "error_code": "LETTER_NOT_FOUND" }` |

---

## 13. TENAGA MEDIS - Dashboard

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staff/dashboard/statistics` | GET | ✅ Bearer Token (Staf) | - | `200 OK`<br>`{ "success": true, "data": { "antrean_hari_ini": 0, "sedang_dilayani": 0, "sudah_selesai": 0, "surat_pending": 0 } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |

---

## 14. TENAGA MEDIS - Kelola Antrean

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staff/queue` | GET | ✅ Bearer Token (Staf) | - | `200 OK`<br>`{ "success": true, "data": { "queues": [{ "queue_id": "string", "queue_number": "string", "patient_id": "string", "patient_name": "string", "no_rm": "string", "doctor_id": "string", "doctor_name": "string", "check_in_time": "ISO 8601", "status": "string", "priority": "normal\|urgent" }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/staff/queue` | POST | ✅ Bearer Token (Staf) | `{ "patient_id": "string", "doctor_id": "string", "date": "YYYY-MM-DD", "priority": "normal\|urgent", "notes": "string" }` | `201 Created`<br>`{ "success": true, "message": "Antrean berhasil dibuat", "data": { "queue_id": "string", "queue_number": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "patient_id": ["Pasien tidak ditemukan"], "doctor_id": ["Dokter tidak ditemukan"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/staff/queue/{queue_id}/status` | PATCH | ✅ Bearer Token (Staf) | `{ "status": "called\|in_progress\|completed\|cancelled", "notes": "string" }` | `200 OK`<br>`{ "success": true, "message": "Status antrean berhasil diupdate" }` | `404 Not Found`<br>`{ "success": false, "message": "Antrean tidak ditemukan", "error_code": "QUEUE_NOT_FOUND" }` |
| `/api/staff/queue/{queue_id}` | DELETE | ✅ Bearer Token (Staf) | `{ "reason": "string" }` | `200 OK`<br>`{ "success": true, "message": "Antrean berhasil dibatalkan" }` | `400 Bad Request`<br>`{ "success": false, "message": "Antrean tidak dapat dibatalkan", "error_code": "QUEUE_CANNOT_BE_CANCELLED" }` |

---

## 15. TENAGA MEDIS - Validasi Surat

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staff/letter-requests` | GET | ✅ Bearer Token (Staf) | - | `200 OK`<br>`{ "success": true, "data": { "requests": [{ "request_id": "string", "patient_id": "string", "patient_name": "string", "letter_type": "string", "purpose": "string", "request_date": "ISO 8601", "status": "string", "priority": "normal\|urgent" }], "pagination": {} } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/staff/letter-requests/{request_id}` | GET | ✅ Bearer Token (Staf) | - | `200 OK`<br>`{ "success": true, "data": { "request_id": "string", "patient_info": {}, "letter_type": "string", "purpose": "string", "details": {}, "request_date": "ISO 8601", "status": "string", "attachments": [] } }` | `404 Not Found`<br>`{ "success": false, "message": "Permohonan tidak ditemukan", "error_code": "REQUEST_NOT_FOUND" }` |
| `/api/staff/letter-requests/{request_id}/validate` | PATCH | ✅ Bearer Token (Staf) | `{ "action": "approve\|reject", "notes": "string", "assigned_doctor_id": "string" }` | `200 OK`<br>`{ "success": true, "message": "Permohonan surat berhasil divalidasi" }` | `404 Not Found`<br>`{ "success": false, "message": "Permohonan tidak ditemukan", "error_code": "REQUEST_NOT_FOUND" }` |
| `/api/staff/letters/{letter_id}/download` | GET | ✅ Bearer Token (Staf) | - | `200 OK`<br>PDF File (Binary) | `404 Not Found`<br>`{ "success": false, "message": "Surat tidak ditemukan", "error_code": "LETTER_NOT_FOUND" }` |

---

## 16. TENAGA MEDIS - Hasil Pemeriksaan

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/staff/examination-results` | GET | ✅ Bearer Token (Staf) | - | `200 OK`<br>`{ "success": true, "data": { "results": [{ "result_id": "string", "patient_id": "string", "patient_name": "string", "doctor_name": "string", "examination_date": "ISO 8601", "diagnosis": "string", "status": "string" }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/staff/lab-results` | POST | ✅ Bearer Token (Staf) | `{ "patient_id": "string", "medical_record_id": "string", "test_type": "string", "results": [{ "parameter": "string", "value": "string", "unit": "string", "normal_range": "string", "status": "normal\|abnormal" }], "notes": "string" }` | `201 Created`<br>`{ "success": true, "message": "Hasil lab berhasil diinput", "data": { "lab_result_id": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "patient_id": ["Pasien tidak ditemukan"] }, "error_code": "VALIDATION_ERROR" }` |

---

## 17. PASIEN - Dashboard

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/patient/dashboard` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "upcoming_appointments": [], "active_queue": null, "pending_letters": 0, "recent_visits": [] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |

---

## 18. PASIEN - Profil

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/patient/profile` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "patient_id": "string", "no_rm": "string", "nik": "string", "nama_lengkap": "string", "tanggal_lahir": "YYYY-MM-DD", "jenis_kelamin": "string", "alamat": "string", "no_telepon": "string", "email": "string", "alergi": [], "riwayat_penyakit": [], "kontak_darurat": { "nama": "string", "hubungan": "string", "no_telepon": "string" } } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/patient/profile` | PUT | ✅ Bearer Token (Pasien) | `{ "alamat": "string", "no_telepon": "string", "email": "string", "alergi": [], "riwayat_penyakit": [], "kontak_darurat": {} }` | `200 OK`<br>`{ "success": true, "message": "Profil berhasil diupdate" }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "email": ["Format email tidak valid"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/patient/change-password` | PUT | ✅ Bearer Token (Pasien) | `{ "old_password": "string", "new_password": "string", "confirm_password": "string" }` | `200 OK`<br>`{ "success": true, "message": "Password berhasil diubah" }` | `400 Bad Request`<br>`{ "success": false, "message": "Password lama tidak sesuai", "error_code": "PASSWORD_MISMATCH" }` |

---

## 19. PASIEN - Jadwal Dokter

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/patient/doctor-schedules` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "schedules": [{ "schedule_id": "string", "doctor_id": "string", "doctor_name": "string", "spesialisasi": "string", "hari": "string", "jam_mulai": "HH:mm", "jam_selesai": "HH:mm", "kuota": 0, "sisa_kuota": 0, "available": true }] } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/patient/doctors/{doctor_id}` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "doctor_id": "string", "nama": "string", "spesialisasi": "string", "foto": "string", "pendidikan": "string", "pengalaman": "string", "schedules": [] } }` | `404 Not Found`<br>`{ "success": false, "message": "Dokter tidak ditemukan", "error_code": "DOCTOR_NOT_FOUND" }` |

---

## 20. PASIEN - Antrean

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/patient/queue` | POST | ✅ Bearer Token (Pasien) | `{ "schedule_id": "string", "date": "YYYY-MM-DD", "keluhan": "string", "notes": "string" }` | `201 Created`<br>`{ "success": true, "message": "Antrean berhasil dibuat", "data": { "queue_id": "string", "queue_number": "string", "estimated_time": "ISO 8601" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Kuota antrean penuh", "error_code": "QUEUE_FULL" }` |
| `/api/patient/queue/active` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "has_active_queue": true, "queue": { "queue_id": "string", "queue_number": "string", "doctor_name": "string", "date": "YYYY-MM-DD", "status": "string", "current_queue": "string", "estimated_time": "ISO 8601", "position": 5 } } }` | `404 Not Found`<br>`{ "success": false, "message": "Tidak ada antrean aktif", "error_code": "NO_ACTIVE_QUEUE" }` |
| `/api/patient/queue/history` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "queues": [{ "queue_id": "string", "queue_number": "string", "doctor_name": "string", "date": "YYYY-MM-DD", "status": "string", "completed_at": "ISO 8601" }], "pagination": {} } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/patient/queue/{queue_id}/cancel` | PATCH | ✅ Bearer Token (Pasien) | `{ "reason": "string" }` | `200 OK`<br>`{ "success": true, "message": "Antrean berhasil dibatalkan" }` | `400 Bad Request`<br>`{ "success": false, "message": "Antrean tidak dapat dibatalkan", "error_code": "QUEUE_CANNOT_BE_CANCELLED" }` |

---

## 21. PASIEN - Permohonan Surat

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/patient/letter-requests` | POST | ✅ Bearer Token (Pasien) | `{ "letter_type": "sakit\|sehat\|rujukan", "purpose": "string", "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD", "description": "string", "attachments": [] }` | `201 Created`<br>`{ "success": true, "message": "Permohonan surat berhasil diajukan", "data": { "request_id": "string", "request_number": "string" } }` | `422 Unprocessable Entity`<br>`{ "success": false, "message": "Validation error", "errors": { "letter_type": ["Tipe surat tidak valid"] }, "error_code": "VALIDATION_ERROR" }` |
| `/api/patient/letter-requests` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "requests": [{ "request_id": "string", "request_number": "string", "letter_type": "string", "purpose": "string", "request_date": "ISO 8601", "status": "string", "notes": "string" }], "pagination": {} } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/patient/letter-requests/{request_id}` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "request_id": "string", "request_number": "string", "letter_type": "string", "purpose": "string", "details": {}, "request_date": "ISO 8601", "status": "string", "validation_date": "ISO 8601", "validator_notes": "string", "letter_id": "string" } }` | `404 Not Found`<br>`{ "success": false, "message": "Permohonan tidak ditemukan", "error_code": "REQUEST_NOT_FOUND" }` |
| `/api/patient/letter-requests/{request_id}` | DELETE | ✅ Bearer Token (Pasien) | `{ "reason": "string" }` | `200 OK`<br>`{ "success": true, "message": "Permohonan berhasil dibatalkan" }` | `400 Bad Request`<br>`{ "success": false, "message": "Permohonan tidak dapat dibatalkan", "error_code": "REQUEST_CANNOT_BE_CANCELLED" }` |

---

## 22. PASIEN - Riwayat Surat

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/patient/letters` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "letters": [{ "letter_id": "string", "letter_number": "string", "letter_type": "string", "issued_date": "ISO 8601", "doctor_name": "string", "diagnosis": "string", "valid_until": "YYYY-MM-DD" }], "pagination": {} } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/patient/letters/{letter_id}` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "letter_id": "string", "letter_number": "string", "letter_type": "string", "issued_date": "ISO 8601", "patient_info": {}, "doctor_info": {}, "content": {}, "digital_signature": "string" } }` | `404 Not Found`<br>`{ "success": false, "message": "Surat tidak ditemukan", "error_code": "LETTER_NOT_FOUND" }` |
| `/api/patient/letters/{letter_id}/download` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>PDF File (Binary) | `404 Not Found`<br>`{ "success": false, "message": "Surat tidak ditemukan", "error_code": "LETTER_NOT_FOUND" }` |

---

## 23. PASIEN - Riwayat Medis

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/patient/medical-history` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "visits": [{ "visit_id": "string", "date": "ISO 8601", "doctor_name": "string", "diagnosis": "string", "prescription": "string" }], "pagination": {} } }` | `403 Forbidden`<br>`{ "success": false, "message": "Unauthorized", "error_code": "AUTH_FORBIDDEN" }` |
| `/api/patient/medical-history/{visit_id}` | GET | ✅ Bearer Token (Pasien) | - | `200 OK`<br>`{ "success": true, "data": { "visit_id": "string", "date": "ISO 8601", "doctor_name": "string", "keluhan": "string", "diagnosis": "string", "tindakan": "string", "prescription": [], "lab_results": [], "vital_signs": {} } }` | `404 Not Found`<br>`{ "success": false, "message": "Riwayat tidak ditemukan", "error_code": "HISTORY_NOT_FOUND" }` |

---

## 24. PUBLIK - Pengumuman

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/public/announcements` | GET | ❌ | - | `200 OK`<br>`{ "success": true, "data": { "announcements": [{ "announcement_id": "string", "title": "string", "content": "string", "category": "string", "priority": "string", "publish_date": "ISO 8601" }] } }` | `500 Internal Server Error`<br>`{ "success": false, "message": "Server error", "error_code": "SERVER_ERROR" }` |
| `/api/public/announcements/{announcement_id}` | GET | ❌ | - | `200 OK`<br>`{ "success": true, "data": { "announcement_id": "string", "title": "string", "content": "string", "category": "string", "publish_date": "ISO 8601", "attachment": "string" } }` | `404 Not Found`<br>`{ "success": false, "message": "Pengumuman tidak ditemukan", "error_code": "ANNOUNCEMENT_NOT_FOUND" }` |

---

## 25. PUBLIK - Informasi Umum

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/public/operating-hours` | GET | ❌ | - | `200 OK`<br>`{ "success": true, "data": { "weekdays": { "start": "08:00", "end": "16:00" }, "saturday": { "start": "08:00", "end": "12:00" }, "sunday": "closed", "holidays": [] } }` | `500 Internal Server Error`<br>`{ "success": false, "message": "Server error", "error_code": "SERVER_ERROR" }` |
| `/api/public/contact-info` | GET | ❌ | - | `200 OK`<br>`{ "success": true, "data": { "name": "Smart Health Center Service", "address": "string", "phone": "string", "email": "string", "whatsapp": "string", "maps_url": "string", "social_media": {} } }` | `500 Internal Server Error`<br>`{ "success": false, "message": "Server error", "error_code": "SERVER_ERROR" }` |

---

## 26. PUBLIK - Chatbot & Verifikasi

| Endpoint | Metode | Authentication | Request Body | Skema Sukses | Skema Gagal |
|----------|--------|----------------|--------------|--------------|-------------|
| `/api/public/chatbot` | POST | ❌ | `{ "message": "string", "session_id": "string" }` | `200 OK`<br>`{ "success": true, "data": { "response": "string", "session_id": "string", "suggestions": [] } }` | `500 Internal Server Error`<br>`{ "success": false, "message": "Chatbot error", "error_code": "CHATBOT_ERROR" }` |
| `/api/public/verify-letter/{letter_number}` | GET | ❌ | - | `200 OK`<br>`{ "success": true, "data": { "valid": true, "letter_number": "string", "letter_type": "string", "issued_date": "ISO 8601", "patient_name": "string", "doctor_name": "string", "status": "active\|expired" } }` | `404 Not Found`<br>`{ "success": false, "message": "Surat tidak valid atau tidak ditemukan", "error_code": "LETTER_INVALID" }` |

---

## 📌 Keterangan

### Authentication
- ✅ = Memerlukan autentikasi (Bearer Token)
- ❌ = Tidak memerlukan autentikasi (Public endpoint)

### Role-Based Access
- **(Admin)** = Hanya dapat diakses oleh Admin
- **(Dokter)** = Hanya dapat diakses oleh Dokter
- **(Staf)** = Hanya dapat diakses oleh Tenaga Medis/Staf
- **(Pasien)** = Hanya dapat diakses oleh Pasien

### HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error

---

**Total Endpoints: 100+**
**Tanggal Pembuatan:** 8 Desember 2025
**Versi:** 1.0
