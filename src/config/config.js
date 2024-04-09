
'use strict';

import 'dotenv/config'



const config = {
   jwtSecret: process.env.JW_SECRET,
   port: process.env.PORT,
   urlMongodb: process.env.DATABASE_URL,
   dataBase: process.env.DATABASE_NAME,
   awsBucketName: process.env.AWS_BUCKET_NAME,
   awsBucketRegion: process.env.AWS_BUCKET_REGION,
   awsBucketAccessKey: process.env.AWS_ACCESS_KEY_ID,
   awsBucketSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

export default config