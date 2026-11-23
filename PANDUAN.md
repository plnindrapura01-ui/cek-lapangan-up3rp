# Aplikasi Cek Lapangan UP3 Rantau Prapat

Aplikasi web untuk HP petugas ULP: daftar titik yang perlu dicek, peta, navigasi ke lokasi, dan form laporan (hasil, penampang, sirkit, foto, posisi GPS). Laporan masuk ke Google Sheet.

Isi data (24 Nov 2026), 191 titik:
- **Bottleneck (108):** ruas penghantar terjepit yang sudah sesuai peta/MAS8. Konfirmasi penampang sebelum diusulkan ganti/uprating. Urutan prioritas: P1 hemat ≥ 20 kW, P2 ≥ 5 kW, P3 sisanya.
- **Asumsi model (52):** segmen tambahan GIS yang ukurannya disamakan dengan sambungannya, ukuran yang diganti ikut MAS8, A3C TG.03, jalur TG.04/TG.06 keluar GI, saluran GH ke TJB.04/TJB.06, dan 3 ruas sisa.
- **Titik gardu (31):** gardu yang titiknya di GIS diduga salah (penanda merah = titik ukur, abu-abu = titik GIS).

Data tidak memuat IDPEL, nama, atau alamat pelanggan. Isinya data aset jaringan (koordinat ruas, tiang, gardu). Halaman GitHub Pages bisa dibuka siapa pun yang tahu link-nya.

## 1. Pasang di GitHub Pages (±5 menit)
1. Login github.com → **New repository**. Nama misalnya `cek-lapangan-up3rp`, pilih **Public**, centang *Add a README*, lalu **Create**.
2. Di repo: **Add file → Upload files**. Seret 4 file ini: `index.html`, `data.js`, `config.js`, `PANDUAN.md`. Lalu **Commit changes**.
3. **Settings → Pages**. Di *Build and deployment* pilih **Deploy from a branch**, branch **main**, folder **/(root)**, lalu **Save**.
4. Tunggu 1–2 menit. Link aplikasinya: `https://<username>.github.io/cek-lapangan-up3rp/`.

## 2. Penerima laporan (Google Sheet)
1. Buka sheets.google.com dan buat Spreadsheet baru, misalnya "LAPORAN CEK LAPANGAN UP3RP".
2. **Extensions → Apps Script**. Hapus isi yang ada, tempel isi `Code.gs`, lalu simpan.
   - Opsional: isi `KUNCI` dengan kode bebas, misalnya `rp2026`.
3. **Deploy → New deployment**:
   - tipe **Web app**;
   - *Execute as*: **Me**;
   - *Who has access*: **Anyone**;
   - klik **Deploy**, izinkan akses (Advanced → Go to …), lalu salin **Web app URL** (berakhir `/exec`).
4. Di GitHub, buka `config.js` → ikon pensil (Edit). Isi `ENDPOINT` dengan URL tadi dan `KUNCI` sama dengan yang di `Code.gs`, lalu **Commit**.
5. Laporan masuk ke sheet **LAPORAN**. Foto tersimpan di Google Drive folder `FOTO_CEK_LAPANGAN_UP3RP`.

Kalau `ENDPOINT` belum diisi, laporan tetap tersimpan di HP dan dikirim otomatis setelah alamat diisi dan HP online. Isi `WA` di `config.js` kalau mau ada tombol cadangan "Kirim lewat WhatsApp".

## 3. Cara pakai petugas
1. Buka link di Chrome HP. Bisa dipasang ke layar utama lewat menu ⋮ → *Add to Home screen*.
2. Pilih ULP (tersimpan otomatis), lalu tekan **📍 Posisi saya** supaya daftar diurutkan dari yang terdekat.
3. Ketuk kartu → lihat peta kecil, section, tiang awal/akhir, koordinat → **🧭 Navigasi** (Google Maps).
4. Di lokasi: isi hasil, penampang, sirkit, tiang yang dicek, catatan, foto, lalu **Kirim laporan**. Posisi GPS dan jarak ke titik ikut terekam.
5. Tidak ada sinyal? Laporan disimpan di HP dan terkirim otomatis saat online. Tab **Rekap** menampilkan progres per ULP.

## Memperbarui data
`data.js` dibuat dari `bangun_data.py` (hasil Sincal V10e dan cek peta). Ganti file `data.js` di GitHub kalau ada data baru.
