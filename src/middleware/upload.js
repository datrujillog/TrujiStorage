import multer from "multer"
const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limits:{
        fieldSize:10000000
    }
})

export default upload