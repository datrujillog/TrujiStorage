import multer from 'multer';

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/'); // Reemplaza '/ruta/a/directorio' con la ruta de tu directorio de almacenamiento
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usa el nombre original del archivo
  }
});

// Configuración de multer con almacenamiento en disco
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Tamaño máximo del archivo en bytes (10 MB en este ejemplo)
  }
});

export default upload;
