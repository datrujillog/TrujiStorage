import uploadFile from '../middleware/upload.js';
import fileUpload from 'express-fileupload'


import { Router } from 'express';
import FilesService from '../service/fileService.js';
import { errorResponse } from '../helper/response.js';
// import { downloadFile, getFile, getFiles, getFileURL, uploadFile } from '../libs/Ejemplostorage.js';

function fileRouter(app) {
    const router = Router();

    const filesServ = new FilesService()


    app.use("/api/v1/files", router)

    router.post("/upload", uploadFile.array('files'),(req, res) => {

        try {
            const results = filesServ.uploadMany(req.files)
            // console.log(req.file)
            res.json(results)


        } catch (error) {
            console.error('Error uploading file:', error);
            errorResponse(res, error)
        }



    });



}

export default fileRouter;