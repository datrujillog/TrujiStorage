import upload from '../middleware/upload.js';
import busboy from 'busboy';
import { createReadStream, createWriteStream } from 'fs';

import { Router } from 'express';
import FilesService from '../service/fileService.js';

function fileRouter(app) {
    const router = Router();

    const filesServ = new FilesService()

    app.use("/api/v1/files", router)

    router.post("/", async (req, res) => {

        let promise;

        const bb = busboy({ headers: req.headers })


        bb.on('file', async (name, file, info) => {
            const { filename, encoding, mimeType } = info;

            promise = await filesServ.upload(filename, file)
            // const result = await filesServ.upload(info.filename, file)


        })

        bb.on('close', async () => {
            console.log('Done parsing form!');
            // res.writeHead(303, { Connection: 'close', Location: '/' });
            const result = await promise
            res.json(result)


            // res.end();
        });

        //req: Redable stream
        req.pipe(bb);




        // const result = await filesServ.upload(fileName, file)

        // return res.json(result)


    })


}

export default fileRouter