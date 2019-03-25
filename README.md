## ImageRest
RestAPI ini dibuat menggunakan NodeJS dan ExpressJs yang berfungsi untuk melakukan storing image ke directory server, 
dan menampilkan seluruh gambar yang tersimpan di server.

### Requirements:
- NodeJS
- ExpressJS
- Formidable

### Install formidable
```
npm i formidable
```

### Install ExpressJS
```
npm i express
```

### RestRoute
| Method  | URL | Description   |
| ------------- | ------------- | ------------- |
| GET  | localhost:3000/images  | Show All Images |
| POST  | localhost:3000/images  | Store Images to Server |
