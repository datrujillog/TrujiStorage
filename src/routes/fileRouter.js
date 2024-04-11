import { Router } from 'express';

import FilesService from '../service/fileService.js';

import uploadFile from '../middleware/upload.js';
import { BadRequest } from '../middleware/errors.js';

import { errorResponse } from '../helper/response.js';

function fileRouter(app) {
    const router = Router();

    const filesServ = new FilesService()


    app.use("/api/v1/files", router)

    router.post("/upload", uploadFile.array('files'), async(req, res) => {

        try {

            const results = await filesServ.uploadMany(req.files)
            if (!results) {
                return errorResponse(res, { message: "An error occurred while uploading the file" })
            }

            res.status(200).json({
                results
            })


        } catch (error) {
            console.error('Error uploading file:', error);
            errorResponse(res, error)
        }



    });

    router.get("/download/:fileName", async(req, res) => {

        try {

            const { fileName } = req.params
            const result = await filesServ.download(fileName, res)
            // if(!result.success) throw new BadRequest(result.message)

            res.status(200).json({               
                data: result
            })

        } catch (error) {
            return errorResponse(res, error)
        }
    });

    router.delete("/delete/:fileName", async (req, res) => {
        try {
            const fileName  = req.params.fileName

            const result = await filesServ.delete(fileName)
            const { deleteFele} = result
            if (!deleteFele.success) throw new BadRequest(deleteFele.error)

            res.status(200).json({
                success: true,
                result
            })

        } catch (error) {
            errorResponse(res, error)
        }
    });


 
}

export default fileRouter;