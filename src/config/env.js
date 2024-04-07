import envalid from "envalid";

import 'dotenv/config'
const { str, port } = envalid


const env = envalid.cleanEnv(process.env, {
   DATABASE_URL: str({ desc: 'pendiente de configurar la url de la base de datos' }),
   DATABASE_NAME: str({ desc: 'pendiente de configurar el nombre de la base de datos' }),
   PORT: port({ desc: 'pendiente configurar el puerto de la aplicacion' }),
   AUTH_URL: str({ desc: 'pendiente de configurar la url de autenticacion' }),
   AWS_BUCKET_NAME: str({ desc: 'pendiente de configurar el nombre del bucket de aws' }),
});

export default env;