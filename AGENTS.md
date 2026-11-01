# AGENTS.md

## Arsitektur
- Situs statis satu halaman: `public/index.html` berisi seluruh CSS dan JS (tanpa framework, tanpa build). `netlify.toml` mem-publish folder `public/`.
- `apps-script/google-apps-script.gs` adalah endpoint Google Apps Script opsional (tidak di-deploy ke Netlify) untuk sync ke tab `Orders` di spreadsheet.

## Data
- `localStorage['pw_orders']` — array order `{id,date,app,plan,user,duration,customer,fh,income,expense,discount,account,status}`.
- `localStorage['pw_settings']` — objek `S` (font, theme, bg, floaty, symbol, volume, muted, repeat, shuffle, compact, mpTab, sheetUrl, scriptUrl).
- `localStorage['pw_playlist']` — array `{id,name,artist,source:'spotify'|'youtube'|'url',kind,ref,list,url,fav}`. My Little Playlist: Spotify lewat Spotify iFrame API resmi, YouTube lewat YouTube IFrame Player API, URL lewat `Audio()`. Script API dimuat hanya saat pertama diputar. `stopAll()` menjamin hanya satu sumber aktif; `parseLink()` memvalidasi link per tab. Pemutar embed tampil di dock `#mpDock` pojok bawah. Tidak ada autoplay, tidak ada OAuth/token.
- Sengaja tetap di browser (sesuai desain pemilik) karena data customer bersifat pribadi dan belum ada login. Jika ingin sinkron antar perangkat, tambahkan autentikasi dulu (Netlify Identity) lalu Netlify Database.

## Logika penting
- `endDate = date + duration hari`; `remain` = selisih hari ke endDate (hari terakhir masih aktif).
- `state(o)`: `done` jika status manual `selesai` atau remain < 0; `due` jika 0; `soon` jika 1–3; selain itu `active`.
- `profit = income − expense`; `net = profit − discount`.
- Halaman dirender dengan template string ke `#content`; selalu escape input user dengan `esc()`.
- Title brand memakai font Parisienne dengan ornamen `.ornament` (꒷꒦︶꒷꒦︶ ๋ ࣭ ⭑꒷꒦) tepat di bawahnya.
- Background: `buildFloaters()` menyebar simbol ꕤ ☁️ ✧ ♡ ⋆ secara merata (posisi acak per baris/kolom). `.floater` muncul pelan lalu bergeser kiri-kanan; `span` di dalamnya naik-turun dengan sedikit rotasi. Kepadatan diatur `S.floaty`. Menghormati `prefers-reduced-motion` (tampil diam).

## Konvensi
- Bahasa UI: Indonesia, nada lembut dengan simbol (✿ ꕤ ♡ ✧).
- Warna lewat CSS variables di `:root`; mode gelap lewat class `body.dark`.
