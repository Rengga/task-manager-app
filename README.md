# 1. Desain Arsitektur

Aplikasi dibagi jadi 3 bagian:

```text id="u5y2ud"
Frontend → Backend → Database
```

* Frontend: tampilan untuk user
* Backend Node.js: proses login, CRUD task, validasi
* MySQL: penyimpanan data

Alurnya:

```text id="j0rjlwm"
User klik tombol
→ frontend kirim request
→ backend proses
→ database simpan/ambil data
→ backend kirim response
→ frontend tampilkan data
```

---

# 2. Schema Database

Ada 3 tabel:

### users

Menyimpan akun user.

```text id="hjlwmf"
id
username
password
```

### tasks

Menyimpan task user.

```text id="n4jlwm"
id
user_id
title
description
status
due_date
```

### activity_logs

Menyimpan riwayat aktivitas.

```text id="pcjlwm"
id
user_id
activity
```

---

# 3. REST API

### Auth

```http id="s0jlwm"
POST /api/auth/register
```

Buat akun.

```http id="fjlwm2"
POST /api/auth/login
```

Login dan ambil token.

---

### Task

```http id="jlwm3k"
GET /api/tasks
```

Ambil semua task.

```http id="jlwm4m"
GET /api/tasks/:id
```

Detail task.

```http id="jlwm5n"
POST /api/tasks
```

Tambah task.

```http id="jlwm6o"
PUT /api/tasks/:id
```

Edit task.

```http id="jlwm7p"
DELETE /api/tasks/:id
```

Hapus task.

---

# 4. Kelebihan Node.js dan Go

### Node.js

* gampang dipelajari
* frontend & backend sama-sama JavaScript
* cepat bikin CRUD/API

### Go

* performa lebih cepat
* lebih hemat RAM
* bagus untuk aplikasi besar & high traffic

---

# 5. Testing Dasar Endpoint

Minimal test:

* login berhasil/gagal
* create task berhasil
* edit task berhasil
* delete task berhasil
* endpoint tanpa token ditolak

