
## Setup

1. Clone Repository
```bash
git clone https://github.com/shawnjchandra/line-message-manager/
   ```
Atau jika sudah ada lakukan fetch dan pull untuk master terbaru

```bash
git fetch 
git pull origin master
```

2. Instalasi Library
Dari root folder, kita perlu instalasi library pada folder frontend dan backend

Buka 2 terminal, dengan terminal pertama:
```bash
cd frontend
npm install

cp env .env %% Copy file env generic dan ubah isinya Secret Key (Opsional) %%
npm start
```

dan, pada terminal kedua:
```bash
cd backend
npm install

cp env .env %% Jangan diganti  %%
npm start
```

## Lint Test (FRONTEND)

Untuk menjalankan lint test pada Frontend dapat dilakukan
```bash
npm run lint
```

Setelah kedua proses berjalan, maka aplikasi dapat langsung digunakan

Catatan: Email menerima domain email `.com` dan `unpar.ac.id`
