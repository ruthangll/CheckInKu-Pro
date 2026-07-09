# 📍 CheckInKu Pro
## Native Power App — React Native Expo
CheckInKu Pro merupakan aplikasi mobile berbasis **React Native Expo** yang memanfaatkan fitur native smartphone seperti kamera, galeri, GPS, dan permission flow.
Aplikasi ini memungkinkan pengguna melakukan proses check-in dengan mengambil foto, mendapatkan lokasi pengguna secara real-time, menampilkan koordinat GPS, informasi nama lokasi, serta informasi cuaca berdasarkan lokasi pengguna.
Aplikasi ini dibuat untuk memenuhi tugas:
**Misi 13 — Native Power App**  
**Praktikum Pemrograman Mobile (React Native)**
---
# 📱 Fitur Native yang Digunakan
## 📸 Camera (Kamera)
Aplikasi menggunakan kamera perangkat untuk mengambil foto pengguna.
Implementasi:
- Meminta izin kamera melalui permission flow.
- Membuka kamera setelah izin diberikan.
- Mengambil hasil foto menggunakan URI.
- Menampilkan foto pada aplikasi.
## 🖼 Image Gallery (Galeri)
Aplikasi menyediakan fitur pemilihan foto dari galeri perangkat.
Implementasi:
- Meminta izin akses galeri.
- Memilih foto dari penyimpanan perangkat.
- Menampilkan foto pilihan pengguna.
## 📍 GPS Location
Aplikasi menggunakan GPS perangkat untuk mendapatkan lokasi pengguna.
Informasi yang ditampilkan:
- Latitude
- Longitude
- Nama lokasi
## 🔐 Permission Flow
Aplikasi menerapkan alur permission yang benar:
1. Request izin akses perangkat.
2. Mengecek status izin (`granted`).
3. Mengakses fitur apabila izin diberikan.
4. Memberikan pesan ramah apabila izin ditolak.
5. Aplikasi tetap berjalan tanpa mengalami crash.
---
# 🚀 Daftar Fitur Aplikasi
## 🟢 Level 1 — Core Feature
✅ Mengakses fitur kamera perangkat.  
✅ Mengakses fitur galeri perangkat.  
✅ Mengambil lokasi pengguna menggunakan GPS.  
✅ Menampilkan hasil foto pada aplikasi.  
✅ Menampilkan koordinat lokasi pengguna.  
✅ Menangani penolakan permission tanpa menyebabkan aplikasi crash.
---
# 🟡 Level 2 — Pengembangan Fitur
## ✅ Camera + Gallery
Pengguna dapat memilih sumber foto melalui pilihan:
- 📸 Kamera
- 🖼 Galeri
Pemilihan sumber foto dilakukan melalui dialog pilihan.
## ✅ Camera + Location
Foto yang diambil dapat dikombinasikan dengan informasi lokasi pengguna.
Data yang ditampilkan:
- Foto pengguna
- Latitude
- Longitude
- Informasi lokasi
## ✅ Persistensi Data (AsyncStorage)
Aplikasi menggunakan AsyncStorage untuk menyimpan data secara lokal.
Data yang disimpan:
- Foto profil
- Nama pengguna
- Informasi lokasi
Data tetap tersedia ketika aplikasi dibuka kembali.
## ✅ Open Location in Maps
Pengguna dapat membuka lokasi berdasarkan koordinat GPS melalui Google Maps.
---
# 🌟 Bonus Feature
## ✅ Priming Screen
Menampilkan informasi awal mengenai penggunaan fitur kamera dan lokasi sebelum permission sistem muncul.
## ✅ Reverse Geocoding
Mengubah koordinat GPS menjadi informasi nama lokasi yang lebih mudah dipahami.
## ✅ Weather Information
Menampilkan informasi cuaca berdasarkan lokasi pengguna menggunakan Open-Meteo API.
---
# 📸 Screenshot Aplikasi
## 1. Hasil Foto, Lokasi, dan Cuaca
![Foto Lokasi Cuaca](screenshots/02_profile_foto_lokasi_cuaca.jpeg)
## 2. Dialog Pilihan Kamera dan Galeri
![Kamera Galeri](screenshots/03_kamera_galeri.jpeg)
## 3. Penanganan Penolakan Permission
![Permission Ditolak](screenshots/04_permission_ditolak.jpeg)
## 4. Priming Screen
![Priming Screen](screenshots/01_priming_screen.jpeg)
## 5. Membuka Lokasi melalui Google Maps
![Google Maps](screenshots/05_google_maps.jpeg)
---
# 🛠 Tech Stack
Teknologi yang digunakan:
- React Native
- Expo
- JavaScript
- Expo Image Picker
- Expo Location
- AsyncStorage
- Linking API
- Open-Meteo Weather API
---
# ▶️ Cara Menjalankan Project
## 1. Clone Repository
```bash
git clone https://github.com/ruthangll/CheckInKu-Pro.git

1. Masuk ke Folder Project

cd CheckInKu-Pro

1. Install Dependency

npm install

1. Jalankan Aplikasi

npx expo start

Kemudian scan QR Code menggunakan aplikasi Expo Go pada smartphone.

⸻

🔗 Expo Snack

Versi interaktif aplikasi dapat dicoba melalui Expo Snack:

https://snack.expo.dev/@ruthangelsitorus/checkinku-proo

⸻

📂 Struktur Project

CheckInKu-Pro
│
├── App.js
├── app.json
├── package.json
├── README.md
│
├── assets
│
└── screenshots
    ├── 01_priming_screen.jpeg
    ├── 02_profile_foto_lokasi_cuaca.jpeg
    ├── 03_kamera_galeri.jpeg
    ├── 04_permission_ditolak.jpeg
    └── 05_google_maps.jpeg

⸻

👩‍💻 Developer

Ruth Angel Sitorus
Universitas Prima Indonesia

Mata Kuliah:
Praktek Pemrograman Mobile (React Native)

Project: CheckInKu Pro
Mission: Misi 13 — Native Power App