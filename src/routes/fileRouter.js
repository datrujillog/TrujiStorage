import upload from '../middleware/upload.js';
import fileUpload from 'express-fileupload'


import { Router } from 'express';
import FilesService from '../service/fileService.js';
import { errorResponse } from '../helper/response.js';
import { downloadFile, getFile, getFiles, getFileURL, uploadFile } from '../libs/storage.js';

function fileRouter(app) {
    const router = Router();

    const filesServ = new FilesService()

    app.use("/api/v1/files", fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'  //  esta es la carpeta donde se guardaran los archivos temporales que se suban

    }), router)

    //! controlar el error cuando no existe un archivo a borrar




    router.post("/files-upload", upload.array("files"), async (req, res) => {

        try {

            const result = await uploadFile(req.files.files)
            console.log(result)
            res.json(result)


        } catch (error) {
            console.error('Error uploading file:', error);
            errorResponse(res, error)
        }


    });

    router.get("/getFiles", async (req, res) => {
        try {
            const result = await getFiles()
            res.json(result.Contents)
        } catch (error) {
            console.error('Error getting files:', error);
            errorResponse(res, error)
        }

    });

    // TODO :  OBTENER UN SOLO ARCHIVO
    router.get("/upload/:fileName", async (req, res) => {
        try {
            const result = await getFile(req.params.fileName)
            console.log(result)
            res.status(200).json({ 
                // url: result.url,
                ContentType: result.ContentType,
                ContentLength:  result.ContentLength,
                Etag: result.ETag,
                metadata: result.$metadata,
            })
        } catch (error) {
            console.error('Error getting file:', error);
            errorResponse(res, error)

        }

    })



    //  todo : comaprtir url de un archivo para descargar
    app.get('/uploadUrl/files/:fileName', async (req, res) => {
        const result = await getFileURL(req.params.fileName)
        res.json({
            url: result
        })
    })


    // todo : download file 

    router.get("/download/:fileName", async (req, res) => {
        try {
            const result = await downloadFile(req.params.fileName)
            // res.setHeader('Content-Disposition', `attachment; filename=${req.params.fileName}`);
            // res.setHeader('Content-Type', result.ContentType);
            // res.send(result)
            res.json({
                message: "File downloaded successfully",
                result
            })
        } catch (error) {
            console.error('Error downloading file:', error);
            errorResponse(res, error)
        }

    })





    


}

export default fileRouter