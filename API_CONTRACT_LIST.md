# DAFTAR KONTRAK API - SMART HEALTH CENTER SERVICE

## 📋 Daftar Isi
1. [API Autentikasi & Otorisasi](#1-api-autentikasi--otorisasi)
2. [API Admin](#2-api-admin)
3. [API Dokter](#3-api-dokter)
4. [API Tenaga Medis/Staf](#4-api-tenaga-medisstaf)
5. [API Pasien](#5-api-pasien)
6. [API Umum/Publik](#6-api-umumpublik)

---

## 1. API Autentikasi & Otorisasi

### 1.1 Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
```json
{
  "username": "string",
  "password": "string",
  "role": "admin|dokter|tenaga_medis|pasien"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user_id": "string",
    "username": "string",
    "role": "string",
    "full_name": "string",
    "token": "string"
  }
}
```

### 1.2 Register Pasien
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
```json
{
  "nik": "string",
  "nama_lengkap": "string",
  "tanggal_lahir": "YYYY-MM-DD",
  "jenis_kelamin": "Laki-laki|Perempuan",
  "alamat": "string",
  "no_telepon": "string",
  "email": "string",
  "username": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "user_id": "string",
    "no_rm": "string"
  }
}
```

### 1.3 Logout
- **Endpoint**: `POST /api/auth/logout`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

### 1.4 Validasi Token
- **Endpoint**: `GET /api/auth/validate`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user_id": "string",
    "role": "string"
  }
}
```

---

## 2. API Admin

### 2.1 Dashboard
#### 2.1.1 Statistik Dashboard
- **Endpoint**: `GET /api/admin/dashboard/statistics`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "total_pasien": 0,
    "pasien_hari_ini": 0,
    "total_dokter": 0,
    "dokter_aktif": 0,
    "total_staf": 0,
    "antrean_aktif": 0,
    "surat_pending": 0,
    "pengumuman_aktif": 0
  }
}
```

#### 2.1.2 Aktivitas Terkini
- **Endpoint**: `GET /api/admin/dashboard/recent-activities`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: `?limit=10&offset=0`
- **Response**:
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "string",
        "activity_type": "string",
        "description": "string",
        "user": "string",
        "timestamp": "ISO 8601"
      }
    ],
    "total": 0
  }
}
```

### 2.2 Kelola Pengguna
#### 2.2.1 Daftar Pengguna
- **Endpoint**: `GET /api/admin/users`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?role=admin|dokter|tenaga_medis|pasien`
  - `&status=active|inactive`
  - `&search=string`
  - `&page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "user_id": "string",
        "username": "string",
        "full_name": "string",
        "email": "string",
        "role": "string",
        "status": "active|inactive",
        "created_at": "ISO 8601",
        "last_login": "ISO 8601"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 10,
      "total_items": 100,
      "limit": 10
    }
  }
}
```

#### 2.2.2 Detail Pengguna
- **Endpoint**: `GET /api/admin/users/{user_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "user_id": "string",
    "username": "string",
    "full_name": "string",
    "email": "string",
    "no_telepon": "string",
    "role": "string",
    "status": "string",
    "additional_info": {}
  }
}
```

#### 2.2.3 Tambah Pengguna
- **Endpoint**: `POST /api/admin/users`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "username": "string",
  "password": "string",
  "full_name": "string",
  "email": "string",
  "no_telepon": "string",
  "role": "admin|dokter|tenaga_medis|pasien",
  "additional_info": {}
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "user_id": "string"
  }
}
```

#### 2.2.4 Update Pengguna
- **Endpoint**: `PUT /api/admin/users/{user_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: (fields are optional)
```json
{
  "full_name": "string",
  "email": "string",
  "no_telepon": "string",
  "status": "active|inactive",
  "additional_info": {}
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Pengguna berhasil diupdate"
}
```

#### 2.2.5 Nonaktifkan/Aktifkan Pengguna
- **Endpoint**: `PATCH /api/admin/users/{user_id}/status`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "status": "active|inactive"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Status pengguna berhasil diubah"
}
```

### 2.3 Kelola Jadwal Dokter
#### 2.3.1 Daftar Jadwal
- **Endpoint**: `GET /api/admin/schedules`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?doctor_id=string`
  - `&date_from=YYYY-MM-DD`
  - `&date_to=YYYY-MM-DD`
  - `&day=Senin|Selasa|etc`
- **Response**:
```json
{
  "success": true,
  "data": {
    "schedules": [
      {
        "schedule_id": "string",
        "doctor_id": "string",
        "doctor_name": "string",
        "spesialisasi": "string",
        "hari": "string",
        "jam_mulai": "HH:mm",
        "jam_selesai": "HH:mm",
        "kuota": 0,
        "status": "active|inactive"
      }
    ]
  }
}
```

#### 2.3.2 Tambah Jadwal
- **Endpoint**: `POST /api/admin/schedules`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "doctor_id": "string",
  "hari": "Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu",
  "jam_mulai": "HH:mm",
  "jam_selesai": "HH:mm",
  "kuota": 0
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Jadwal berhasil ditambahkan",
  "data": {
    "schedule_id": "string"
  }
}
```

#### 2.3.3 Update Jadwal
- **Endpoint**: `PUT /api/admin/schedules/{schedule_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: (fields are optional)
```json
{
  "hari": "string",
  "jam_mulai": "HH:mm",
  "jam_selesai": "HH:mm",
  "kuota": 0,
  "status": "active|inactive"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Jadwal berhasil diupdate"
}
```

#### 2.3.4 Hapus Jadwal
- **Endpoint**: `DELETE /api/admin/schedules/{schedule_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Jadwal berhasil dihapus"
}
```

### 2.4 Kelola Pengumuman
#### 2.4.1 Daftar Pengumuman
- **Endpoint**: `GET /api/admin/announcements`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?status=published|draft|scheduled`
  - `&category=string`
  - `&search=string`
  - `&page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "announcements": [
      {
        "announcement_id": "string",
        "title": "string",
        "content": "string",
        "category": "string",
        "priority": "high|medium|low",
        "status": "published|draft|scheduled",
        "publish_date": "ISO 8601",
        "created_by": "string",
        "created_at": "ISO 8601"
      }
    ],
    "pagination": {}
  }
}
```

#### 2.4.2 Detail Pengumuman
- **Endpoint**: `GET /api/admin/announcements/{announcement_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "announcement_id": "string",
    "title": "string",
    "content": "string",
    "category": "string",
    "priority": "string",
    "status": "string",
    "publish_date": "ISO 8601",
    "created_by": "string",
    "created_at": "ISO 8601",
    "updated_at": "ISO 8601"
  }
}
```

#### 2.4.3 Buat Pengumuman
- **Endpoint**: `POST /api/admin/announcements`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "title": "string",
  "content": "string",
  "category": "string",
  "priority": "high|medium|low",
  "status": "published|draft|scheduled",
  "publish_date": "ISO 8601",
  "attachment": "string (base64 or URL)"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Pengumuman berhasil dibuat",
  "data": {
    "announcement_id": "string"
  }
}
```

#### 2.4.4 Update Pengumuman
- **Endpoint**: `PUT /api/admin/announcements/{announcement_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: (fields are optional)
```json
{
  "title": "string",
  "content": "string",
  "category": "string",
  "priority": "string",
  "status": "string",
  "publish_date": "ISO 8601"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Pengumuman berhasil diupdate"
}
```

#### 2.4.5 Hapus Pengumuman
- **Endpoint**: `DELETE /api/admin/announcements/{announcement_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Pengumuman berhasil dihapus"
}
```

#### 2.4.6 Publish Pengumuman
- **Endpoint**: `PATCH /api/admin/announcements/{announcement_id}/publish`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Pengumuman berhasil dipublikasikan"
}
```

#### 2.4.7 Unpublish Pengumuman
- **Endpoint**: `PATCH /api/admin/announcements/{announcement_id}/unpublish`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Pengumuman berhasil ditarik dari publikasi"
}
```

### 2.5 Laporan
#### 2.5.1 Laporan Kunjungan Pasien
- **Endpoint**: `GET /api/admin/reports/patient-visits`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?date_from=YYYY-MM-DD`
  - `&date_to=YYYY-MM-DD`
  - `&export=pdf|excel`
- **Response**:
```json
{
  "success": true,
  "data": {
    "period": {
      "from": "YYYY-MM-DD",
      "to": "YYYY-MM-DD"
    },
    "summary": {
      "total_visits": 0,
      "new_patients": 0,
      "returning_patients": 0
    },
    "visits": [
      {
        "date": "YYYY-MM-DD",
        "patient_id": "string",
        "patient_name": "string",
        "doctor_name": "string",
        "diagnosis": "string"
      }
    ]
  }
}
```

#### 2.5.2 Laporan Surat Keterangan
- **Endpoint**: `GET /api/admin/reports/letters`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?date_from=YYYY-MM-DD`
  - `&date_to=YYYY-MM-DD`
  - `&letter_type=sakit|sehat|rujukan`
  - `&export=pdf|excel`
- **Response**:
```json
{
  "success": true,
  "data": {
    "period": {},
    "summary": {
      "total_letters": 0,
      "by_type": {
        "sakit": 0,
        "sehat": 0,
        "rujukan": 0
      }
    },
    "letters": []
  }
}
```

#### 2.5.3 Laporan Kinerja Dokter
- **Endpoint**: `GET /api/admin/reports/doctor-performance`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?date_from=YYYY-MM-DD`
  - `&date_to=YYYY-MM-DD`
  - `&doctor_id=string`
  - `&export=pdf|excel`
- **Response**:
```json
{
  "success": true,
  "data": {
    "period": {},
    "doctors": [
      {
        "doctor_id": "string",
        "doctor_name": "string",
        "total_patients": 0,
        "total_hours": 0,
        "avg_consultation_time": 0,
        "patient_satisfaction": 0
      }
    ]
  }
}
```

#### 2.5.4 Laporan Antrean
- **Endpoint**: `GET /api/admin/reports/queue`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?date_from=YYYY-MM-DD`
  - `&date_to=YYYY-MM-DD`
  - `&export=pdf|excel`
- **Response**:
```json
{
  "success": true,
  "data": {
    "period": {},
    "summary": {
      "total_queues": 0,
      "avg_waiting_time": 0,
      "completed": 0,
      "cancelled": 0
    },
    "daily_stats": []
  }
}
```

### 2.6 Pengaturan Sistem
#### 2.6.1 Get Pengaturan
- **Endpoint**: `GET /api/admin/settings`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "email_notifications": true,
    "sms_notifications": false,
    "auto_backup": true,
    "backup_frequency": "daily|weekly|monthly",
    "queue_limit": 50,
    "working_hours": {
      "start": "08:00",
      "end": "16:00"
    }
  }
}
```

#### 2.6.2 Update Pengaturan
- **Endpoint**: `PUT /api/admin/settings`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: (partial update supported)
```json
{
  "email_notifications": true,
  "sms_notifications": false,
  "auto_backup": true,
  "backup_frequency": "daily"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Pengaturan berhasil diupdate"
}
```

#### 2.6.3 Backup Data
- **Endpoint**: `POST /api/admin/backup`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Backup berhasil dibuat",
  "data": {
    "backup_id": "string",
    "filename": "string",
    "size": 0,
    "created_at": "ISO 8601"
  }
}
```

---

## 3. API Dokter

### 3.1 Dashboard Dokter
#### 3.1.1 Statistik Dashboard
- **Endpoint**: `GET /api/doctor/dashboard/statistics`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "patients_today": 0,
    "waiting_queue": 0,
    "completed_today": 0,
    "upcoming_schedule": []
  }
}
```

#### 3.1.2 Antrean Hari Ini
- **Endpoint**: `GET /api/doctor/queue/today`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "queues": [
      {
        "queue_id": "string",
        "queue_number": "A001",
        "patient_id": "string",
        "patient_name": "string",
        "no_rm": "string",
        "check_in_time": "ISO 8601",
        "status": "waiting|in_progress|completed"
      }
    ]
  }
}
```

### 3.2 Jadwal Praktik
#### 3.2.1 Jadwal Dokter
- **Endpoint**: `GET /api/doctor/schedule`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: `?week_offset=0`
- **Response**:
```json
{
  "success": true,
  "data": {
    "schedules": [
      {
        "schedule_id": "string",
        "hari": "string",
        "jam_mulai": "HH:mm",
        "jam_selesai": "HH:mm",
        "kuota": 0,
        "terisi": 0,
        "status": "active"
      }
    ]
  }
}
```

### 3.3 Daftar Pasien
#### 3.3.1 Pasien Hari Ini
- **Endpoint**: `GET /api/doctor/patients/today`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: `?status=waiting|in_progress|completed`
- **Response**:
```json
{
  "success": true,
  "data": {
    "patients": [
      {
        "queue_id": "string",
        "queue_number": "string",
        "patient_id": "string",
        "patient_name": "string",
        "no_rm": "string",
        "age": 0,
        "gender": "string",
        "status": "string",
        "check_in_time": "ISO 8601"
      }
    ]
  }
}
```

#### 3.3.2 Riwayat Pasien
- **Endpoint**: `GET /api/doctor/patients/history`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?search=string`
  - `&date_from=YYYY-MM-DD`
  - `&date_to=YYYY-MM-DD`
  - `&page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "patients": [
      {
        "patient_id": "string",
        "patient_name": "string",
        "no_rm": "string",
        "last_visit": "ISO 8601",
        "total_visits": 0
      }
    ],
    "pagination": {}
  }
}
```

#### 3.3.3 Panggil Pasien
- **Endpoint**: `PATCH /api/doctor/patients/{queue_id}/call`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Pasien berhasil dipanggil"
}
```

#### 3.3.4 Mulai Pemeriksaan
- **Endpoint**: `PATCH /api/doctor/patients/{queue_id}/start-examination`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Pemeriksaan dimulai"
}
```

#### 3.3.5 Selesai Pemeriksaan
- **Endpoint**: `PATCH /api/doctor/patients/{queue_id}/complete`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Pemeriksaan selesai"
}
```

### 3.4 Rekam Medis
#### 3.4.1 Cari Pasien
- **Endpoint**: `GET /api/doctor/medical-records/search`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: `?query=string (nama/no_rm)`
- **Response**:
```json
{
  "success": true,
  "data": {
    "patients": [
      {
        "patient_id": "string",
        "no_rm": "string",
        "nama": "string",
        "tanggal_lahir": "YYYY-MM-DD",
        "jenis_kelamin": "string"
      }
    ]
  }
}
```

#### 3.4.2 Detail Rekam Medis Pasien
- **Endpoint**: `GET /api/doctor/medical-records/patient/{patient_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "patient_info": {
      "patient_id": "string",
      "no_rm": "string",
      "nama": "string",
      "tanggal_lahir": "YYYY-MM-DD",
      "jenis_kelamin": "string",
      "alamat": "string",
      "no_telepon": "string",
      "alergi": ["string"],
      "riwayat_penyakit": ["string"]
    },
    "visits": [
      {
        "visit_id": "string",
        "tanggal": "ISO 8601",
        "keluhan": "string",
        "diagnosis": "string",
        "tindakan": "string",
        "resep": "string",
        "doctor_name": "string"
      }
    ]
  }
}
```

#### 3.4.3 Simpan Rekam Medis
- **Endpoint**: `POST /api/doctor/medical-records`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "patient_id": "string",
  "queue_id": "string",
  "keluhan": "string",
  "anamnesis": "string",
  "pemeriksaan_fisik": {
    "tekanan_darah": "string",
    "nadi": "string",
    "suhu": "string",
    "tinggi_badan": 0,
    "berat_badan": 0
  },
  "diagnosis": "string",
  "tindakan": "string",
  "resep": [
    {
      "nama_obat": "string",
      "dosis": "string",
      "frekuensi": "string",
      "durasi": "string",
      "catatan": "string"
    }
  ],
  "catatan": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Rekam medis berhasil disimpan",
  "data": {
    "medical_record_id": "string"
  }
}
```

#### 3.4.4 Update Rekam Medis
- **Endpoint**: `PUT /api/doctor/medical-records/{medical_record_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: (same as create, fields are optional)
- **Response**:
```json
{
  "success": true,
  "message": "Rekam medis berhasil diupdate"
}
```

#### 3.4.5 Riwayat Kunjungan Pasien
- **Endpoint**: `GET /api/doctor/medical-records/patient/{patient_id}/visits`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: `?page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "visits": [],
    "pagination": {}
  }
}
```

### 3.5 Resep & Surat
#### 3.5.1 Buat Resep
- **Endpoint**: `POST /api/doctor/prescriptions`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "patient_id": "string",
  "medical_record_id": "string",
  "medications": [
    {
      "nama_obat": "string",
      "dosis": "string",
      "frekuensi": "string",
      "durasi": "string",
      "catatan": "string"
    }
  ],
  "catatan_dokter": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Resep berhasil dibuat",
  "data": {
    "prescription_id": "string"
  }
}
```

#### 3.5.2 Buat Surat Keterangan
- **Endpoint**: `POST /api/doctor/letters`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "patient_id": "string",
  "medical_record_id": "string",
  "letter_type": "sakit|sehat|rujukan",
  "diagnosis": "string",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "description": "string",
  "recommendation": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Surat berhasil dibuat",
  "data": {
    "letter_id": "string",
    "letter_number": "string"
  }
}
```

#### 3.5.3 Print Resep
- **Endpoint**: `GET /api/doctor/prescriptions/{prescription_id}/print`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: PDF file

#### 3.5.4 Print Surat
- **Endpoint**: `GET /api/doctor/letters/{letter_id}/print`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: PDF file

---

## 4. API Tenaga Medis/Staf

### 4.1 Dashboard Staf
#### 4.1.1 Statistik Dashboard
- **Endpoint**: `GET /api/staff/dashboard/statistics`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "antrean_hari_ini": 0,
    "sedang_dilayani": 0,
    "sudah_selesai": 0,
    "surat_pending": 0
  }
}
```

### 4.2 Kelola Antrean
#### 4.2.1 Daftar Antrean
- **Endpoint**: `GET /api/staff/queue`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?date=YYYY-MM-DD`
  - `&doctor_id=string`
  - `&status=waiting|called|in_progress|completed|cancelled`
- **Response**:
```json
{
  "success": true,
  "data": {
    "queues": [
      {
        "queue_id": "string",
        "queue_number": "string",
        "patient_id": "string",
        "patient_name": "string",
        "no_rm": "string",
        "doctor_id": "string",
        "doctor_name": "string",
        "check_in_time": "ISO 8601",
        "status": "string",
        "priority": "normal|urgent"
      }
    ]
  }
}
```

#### 4.2.2 Tambah Antrean Manual
- **Endpoint**: `POST /api/staff/queue`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "patient_id": "string",
  "doctor_id": "string",
  "date": "YYYY-MM-DD",
  "priority": "normal|urgent",
  "notes": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Antrean berhasil dibuat",
  "data": {
    "queue_id": "string",
    "queue_number": "string"
  }
}
```

#### 4.2.3 Update Status Antrean
- **Endpoint**: `PATCH /api/staff/queue/{queue_id}/status`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "status": "called|in_progress|completed|cancelled",
  "notes": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Status antrean berhasil diupdate"
}
```

#### 4.2.4 Batalkan Antrean
- **Endpoint**: `DELETE /api/staff/queue/{queue_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "reason": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Antrean berhasil dibatalkan"
}
```

### 4.3 Validasi Surat
#### 4.3.1 Daftar Permohonan Surat
- **Endpoint**: `GET /api/staff/letter-requests`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?status=pending|approved|rejected`
  - `&letter_type=sakit|sehat|rujukan`
  - `&date_from=YYYY-MM-DD`
  - `&date_to=YYYY-MM-DD`
  - `&page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "request_id": "string",
        "patient_id": "string",
        "patient_name": "string",
        "letter_type": "string",
        "purpose": "string",
        "request_date": "ISO 8601",
        "status": "string",
        "priority": "normal|urgent"
      }
    ],
    "pagination": {}
  }
}
```

#### 4.3.2 Detail Permohonan Surat
- **Endpoint**: `GET /api/staff/letter-requests/{request_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "request_id": "string",
    "patient_info": {},
    "letter_type": "string",
    "purpose": "string",
    "details": {},
    "request_date": "ISO 8601",
    "status": "string",
    "attachments": []
  }
}
```

#### 4.3.3 Validasi Permohonan Surat
- **Endpoint**: `PATCH /api/staff/letter-requests/{request_id}/validate`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "action": "approve|reject",
  "notes": "string",
  "assigned_doctor_id": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Permohonan surat berhasil divalidasi"
}
```

#### 4.3.4 Download Surat yang Sudah Disetujui
- **Endpoint**: `GET /api/staff/letters/{letter_id}/download`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: PDF file

### 4.4 Hasil Pemeriksaan
#### 4.4.1 Daftar Hasil Pemeriksaan
- **Endpoint**: `GET /api/staff/examination-results`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?date=YYYY-MM-DD`
  - `&patient_id=string`
  - `&status=pending|completed`
- **Response**:
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "result_id": "string",
        "patient_id": "string",
        "patient_name": "string",
        "doctor_name": "string",
        "examination_date": "ISO 8601",
        "diagnosis": "string",
        "status": "string"
      }
    ]
  }
}
```

#### 4.4.2 Input Hasil Lab
- **Endpoint**: `POST /api/staff/lab-results`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "patient_id": "string",
  "medical_record_id": "string",
  "test_type": "string",
  "results": [
    {
      "parameter": "string",
      "value": "string",
      "unit": "string",
      "normal_range": "string",
      "status": "normal|abnormal"
    }
  ],
  "notes": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Hasil lab berhasil diinput",
  "data": {
    "lab_result_id": "string"
  }
}
```

---

## 5. API Pasien

### 5.1 Dashboard Pasien
#### 5.1.1 Statistik Dashboard
- **Endpoint**: `GET /api/patient/dashboard`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "upcoming_appointments": [],
    "active_queue": null,
    "pending_letters": 0,
    "recent_visits": []
  }
}
```

### 5.2 Profil Pasien
#### 5.2.1 Get Profil
- **Endpoint**: `GET /api/patient/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "patient_id": "string",
    "no_rm": "string",
    "nik": "string",
    "nama_lengkap": "string",
    "tanggal_lahir": "YYYY-MM-DD",
    "jenis_kelamin": "string",
    "alamat": "string",
    "no_telepon": "string",
    "email": "string",
    "alergi": ["string"],
    "riwayat_penyakit": ["string"],
    "kontak_darurat": {
      "nama": "string",
      "hubungan": "string",
      "no_telepon": "string"
    }
  }
}
```

#### 5.2.2 Update Profil
- **Endpoint**: `PUT /api/patient/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: (fields are optional)
```json
{
  "alamat": "string",
  "no_telepon": "string",
  "email": "string",
  "alergi": ["string"],
  "riwayat_penyakit": ["string"],
  "kontak_darurat": {}
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Profil berhasil diupdate"
}
```

#### 5.2.3 Ubah Password
- **Endpoint**: `PUT /api/patient/change-password`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "old_password": "string",
  "new_password": "string",
  "confirm_password": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Password berhasil diubah"
}
```

### 5.3 Jadwal Dokter
#### 5.3.1 Daftar Jadwal Dokter
- **Endpoint**: `GET /api/patient/doctor-schedules`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?spesialisasi=string`
  - `&hari=Senin|Selasa|etc`
  - `&date=YYYY-MM-DD`
- **Response**:
```json
{
  "success": true,
  "data": {
    "schedules": [
      {
        "schedule_id": "string",
        "doctor_id": "string",
        "doctor_name": "string",
        "spesialisasi": "string",
        "hari": "string",
        "jam_mulai": "HH:mm",
        "jam_selesai": "HH:mm",
        "kuota": 0,
        "sisa_kuota": 0,
        "available": true
      }
    ]
  }
}
```

#### 5.3.2 Detail Dokter
- **Endpoint**: `GET /api/patient/doctors/{doctor_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "doctor_id": "string",
    "nama": "string",
    "spesialisasi": "string",
    "foto": "string",
    "pendidikan": "string",
    "pengalaman": "string",
    "schedules": []
  }
}
```

### 5.4 Antrean
#### 5.4.1 Daftar Antrean
- **Endpoint**: `POST /api/patient/queue`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "schedule_id": "string",
  "date": "YYYY-MM-DD",
  "keluhan": "string",
  "notes": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Antrean berhasil dibuat",
  "data": {
    "queue_id": "string",
    "queue_number": "string",
    "estimated_time": "ISO 8601"
  }
}
```

#### 5.4.2 Status Antrean Aktif
- **Endpoint**: `GET /api/patient/queue/active`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "has_active_queue": true,
    "queue": {
      "queue_id": "string",
      "queue_number": "string",
      "doctor_name": "string",
      "date": "YYYY-MM-DD",
      "status": "string",
      "current_queue": "string",
      "estimated_time": "ISO 8601",
      "position": 5
    }
  }
}
```

#### 5.4.3 Riwayat Antrean
- **Endpoint**: `GET /api/patient/queue/history`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: `?page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "queues": [
      {
        "queue_id": "string",
        "queue_number": "string",
        "doctor_name": "string",
        "date": "YYYY-MM-DD",
        "status": "string",
        "completed_at": "ISO 8601"
      }
    ],
    "pagination": {}
  }
}
```

#### 5.4.4 Batalkan Antrean
- **Endpoint**: `DELETE /api/patient/queue/{queue_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "reason": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Antrean berhasil dibatalkan"
}
```

### 5.5 Permohonan Surat
#### 5.5.1 Ajukan Permohonan Surat
- **Endpoint**: `POST /api/patient/letter-requests`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "letter_type": "sakit|sehat|rujukan",
  "purpose": "string",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "description": "string",
  "attachments": ["string (base64)"]
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Permohonan surat berhasil diajukan",
  "data": {
    "request_id": "string",
    "request_number": "string"
  }
}
```

#### 5.5.2 Status Permohonan Surat
- **Endpoint**: `GET /api/patient/letter-requests`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?status=pending|approved|rejected|completed`
  - `&page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "request_id": "string",
        "request_number": "string",
        "letter_type": "string",
        "purpose": "string",
        "request_date": "ISO 8601",
        "status": "string",
        "notes": "string"
      }
    ],
    "pagination": {}
  }
}
```

#### 5.5.3 Detail Permohonan
- **Endpoint**: `GET /api/patient/letter-requests/{request_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "request_id": "string",
    "request_number": "string",
    "letter_type": "string",
    "purpose": "string",
    "details": {},
    "request_date": "ISO 8601",
    "status": "string",
    "validation_date": "ISO 8601",
    "validator_notes": "string",
    "letter_id": "string"
  }
}
```

#### 5.5.4 Batalkan Permohonan
- **Endpoint**: `DELETE /api/patient/letter-requests/{request_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "reason": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Permohonan berhasil dibatalkan"
}
```

### 5.6 Riwayat Surat
#### 5.6.1 Daftar Surat
- **Endpoint**: `GET /api/patient/letters`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: 
  - `?letter_type=sakit|sehat|rujukan`
  - `&date_from=YYYY-MM-DD`
  - `&date_to=YYYY-MM-DD`
  - `&page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "letters": [
      {
        "letter_id": "string",
        "letter_number": "string",
        "letter_type": "string",
        "issued_date": "ISO 8601",
        "doctor_name": "string",
        "diagnosis": "string",
        "valid_until": "YYYY-MM-DD"
      }
    ],
    "pagination": {}
  }
}
```

#### 5.6.2 Detail Surat
- **Endpoint**: `GET /api/patient/letters/{letter_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "letter_id": "string",
    "letter_number": "string",
    "letter_type": "string",
    "issued_date": "ISO 8601",
    "patient_info": {},
    "doctor_info": {},
    "content": {},
    "digital_signature": "string"
  }
}
```

#### 5.6.3 Download Surat PDF
- **Endpoint**: `GET /api/patient/letters/{letter_id}/download`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: PDF file

### 5.7 Riwayat Medis
#### 5.7.1 Riwayat Kunjungan
- **Endpoint**: `GET /api/patient/medical-history`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**: `?page=1&limit=10`
- **Response**:
```json
{
  "success": true,
  "data": {
    "visits": [
      {
        "visit_id": "string",
        "date": "ISO 8601",
        "doctor_name": "string",
        "diagnosis": "string",
        "prescription": "string"
      }
    ],
    "pagination": {}
  }
}
```

#### 5.7.2 Detail Kunjungan
- **Endpoint**: `GET /api/patient/medical-history/{visit_id}`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "visit_id": "string",
    "date": "ISO 8601",
    "doctor_name": "string",
    "keluhan": "string",
    "diagnosis": "string",
    "tindakan": "string",
    "prescription": [],
    "lab_results": [],
    "vital_signs": {}
  }
}
```

---

## 6. API Umum/Publik

### 6.1 Pengumuman
#### 6.1.1 Daftar Pengumuman Publik
- **Endpoint**: `GET /api/public/announcements`
- **Query Parameters**: 
  - `?category=string`
  - `&limit=5`
- **Response**:
```json
{
  "success": true,
  "data": {
    "announcements": [
      {
        "announcement_id": "string",
        "title": "string",
        "content": "string",
        "category": "string",
        "priority": "string",
        "publish_date": "ISO 8601"
      }
    ]
  }
}
```

#### 6.1.2 Detail Pengumuman
- **Endpoint**: `GET /api/public/announcements/{announcement_id}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "announcement_id": "string",
    "title": "string",
    "content": "string",
    "category": "string",
    "publish_date": "ISO 8601",
    "attachment": "string"
  }
}
```

### 6.2 Informasi Umum
#### 6.2.1 Jam Operasional
- **Endpoint**: `GET /api/public/operating-hours`
- **Response**:
```json
{
  "success": true,
  "data": {
    "weekdays": {
      "start": "08:00",
      "end": "16:00"
    },
    "saturday": {
      "start": "08:00",
      "end": "12:00"
    },
    "sunday": "closed",
    "holidays": []
  }
}
```

#### 6.2.2 Kontak & Lokasi
- **Endpoint**: `GET /api/public/contact-info`
- **Response**:
```json
{
  "success": true,
  "data": {
    "name": "Smart Health Center Service",
    "address": "string",
    "phone": "string",
    "email": "string",
    "whatsapp": "string",
    "maps_url": "string",
    "social_media": {}
  }
}
```

### 6.3 Chatbot
#### 6.3.1 Send Message to Chatbot
- **Endpoint**: `POST /api/public/chatbot`
- **Request Body**:
```json
{
  "message": "string",
  "session_id": "string (optional)"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "response": "string",
    "session_id": "string",
    "suggestions": ["string"]
  }
}
```

### 6.4 Verifikasi Surat
#### 6.4.1 Verifikasi Keaslian Surat
- **Endpoint**: `GET /api/public/verify-letter/{letter_number}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "letter_number": "string",
    "letter_type": "string",
    "issued_date": "ISO 8601",
    "patient_name": "string",
    "doctor_name": "string",
    "status": "active|expired"
  }
}
```

---

## 📌 Catatan Implementasi

### Headers Umum untuk Authenticated Requests
```
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

### Standard Error Response Format
```json
{
  "success": false,
  "message": "Error message description",
  "errors": {
    "field_name": ["Validation error message"]
  },
  "error_code": "ERROR_CODE"
}
```

### HTTP Status Codes
- `200` - OK (Success)
- `201` - Created (Resource created successfully)
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Authentication required)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource not found)
- `422` - Unprocessable Entity (Validation error)
- `500` - Internal Server Error

### Pagination Format
```json
{
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_items": 100,
    "limit": 10,
    "has_next": true,
    "has_prev": false
  }
}
```

### Date Format
- ISO 8601: `2024-12-08T10:30:00Z`
- Date only: `YYYY-MM-DD`
- Time only: `HH:mm` (24-hour format)

### File Upload/Download
- Upload: Use base64 encoding or multipart/form-data
- Download: Binary response with appropriate Content-Type header

---

## 🔐 Role-Based Access Control (RBAC)

| Endpoint Pattern | Admin | Dokter | Tenaga Medis | Pasien |
|-----------------|-------|--------|--------------|--------|
| `/api/auth/*` | ✅ | ✅ | ✅ | ✅ |
| `/api/admin/*` | ✅ | ❌ | ❌ | ❌ |
| `/api/doctor/*` | ❌ | ✅ | ❌ | ❌ |
| `/api/staff/*` | ❌ | ❌ | ✅ | ❌ |
| `/api/patient/*` | ❌ | ❌ | ❌ | ✅ |
| `/api/public/*` | ✅ | ✅ | ✅ | ✅ |

---

**Dokumen ini mencakup semua kontrak API yang diperlukan untuk Smart Health Center Service berdasarkan analisis halaman-halaman yang ada di folder PPLFINAL.**

**Tanggal Pembuatan:** 8 Desember 2025
**Versi:** 1.0
