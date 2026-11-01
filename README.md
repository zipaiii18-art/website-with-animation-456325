# Primpaii's Way ✿

Jurnal bisnis kecil untuk mencatat order langganan aplikasi (Netflix, Canva, Spotify, dll.), melihat rekapan pemasukan, memantau jadwal renewal customer, dan menyimpan riwayat order — dengan background simbol ꕤ yang melayang pelan.

## Fitur
- **Dashboard** — ringkasan order, form tambah/edit order dengan preview tanggal habis & profit, daftar yang perlu diperhatikan.
- **Rekapan** — tabel lengkap dengan pencarian, filter bulan, total pemasukan/pengeluaran/bersih, export & import CSV.
- **Reminder** — jadwal renewal berurutan, status otomatis, tombol “Salin pesan” untuk mengirim pengingat ke customer.
- **Riwayat Order** — aplikasi terpopuler, total customer unik, customer setia.
- **Setting** — tema warna, mode gelap, 5 font, animasi background ꕤ (mati / lembut / ramai), simbol toolbar, ambient music, Google Sheets sync, backup & restore JSON.

## Teknologi
HTML, CSS, dan JavaScript murni tanpa build step. Data tersimpan di `localStorage` browser. Sinkronisasi opsional ke Google Sheets lewat Google Apps Script (`apps-script/google-apps-script.gs`). Dihosting di Netlify (folder `public/`).

## Jalankan lokal
Buka `public/index.html` langsung di browser, atau jalankan `netlify dev`.

## Hubungkan Google Sheets
1. Buka https://script.google.com/, buat project baru, dan salin isi `apps-script/google-apps-script.gs`.
2. **Deploy → New deployment → Web app**, Execute as: *Me*, Who has access: *Anyone*.
3. Salin URL `/exec`, lalu tempel di **Setting → Google Sheets → Simpan koneksi**.
4. **Kirim ke Sheets** mengganti isi tab `Orders`; **Ambil dari Sheets** mengganti data lokal.

## Catatan
- Data terikat pada browser/perangkat. Download backup JSON secara berkala dan hindari mode incognito.
- Animasi background otomatis dimatikan bila perangkat mengaktifkan “reduce motion”.
