import upload from '../middleware/upload.js';
import busboy from 'busboy';
import { createReadStream, createWriteStream } from 'fs';

import { Router } from 'express';
import FilesService from '../service/fileService.js';

function fileRouter(app) {
    const router = Router();

    const filesServ = new FilesService()

    app.use("/api/v1/files", router)

    router.get("/:fileName",async (req,res)=>{
        const {fileName} = req.params

        const result = await filesServ.download(fileName)

        if(result.success){
            result.data.pipe(res)
            result.data.on("end",()=>{
                console.log("Finished")
            })
        }else{
            return res.status(400).json(result)
        }

    })

    router.post("/upload", async (req, res) => {
        const bb = busboy({ headers: req.headers });
    
        bb.on('file', async (name, file, info) => {
            try {
                const { filename } = info;
                const result = await filesServ.upload(filename, file);
                res.status(200).json(result);
            } catch (error) {
                console.error('Error uploading file:', error);
                res.status(500).json({ success: false, message: "An error occurred while uploading the file" });
            }
        });
    
        bb.on('finish', () => {
            console.log('All files uploaded successfully');
        });
    
        bb.on('error', (error) => {
            console.error('Error parsing form:', error);
            res.status(500).json({ success: false, message: "An error occurred while parsing the form" });
        });
    
        req.pipe(bb);
    });
    


}

export default fileRouter