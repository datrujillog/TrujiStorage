
'use strict';

import 'dotenv/config'



const config = {
   jwtSecret: process.env.JW_SECRET,
   port: process.env.PORT,
   urlMongodb: process.env.DATABASE_URL,
   dataBase: process.env.DATABASE_NAME,
   awsBucketName:process.env.AWS_BUCKET_NAME
}






export default config