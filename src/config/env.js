import { cleanEnv, str, port } from "envalid";

import 'dotenv/config'

const env = cleanEnv(process.env, {
   DATABASE_URL: str({ desc: 'pendiente de configurar la url de la base de datos' }),
   DATABASE_NAME: str({ desc: 'pendiente de configurar el nombre de la base de datos' }),
   PORT: port({ desc: 'pendiente configurar el puerto de la aplicacion' }),
   AUTH_URL: str({ desc: 'pendiente de configurar la url de autenticacion' }),
   JWT_SECRET: str({ desc: 'pendiente de configurar el secreto del token' }),
   AWS_BUCKET_NAME: str({ desc: 'pendiente de configurar el nombre del bucket de aws' }),
   AWS_BUCKET_REGION: str({ desc: 'pendiente de configurar la region del bucket de aws' }),
   AWS_ACCESS_KEY_ID: str({ desc: 'pendiente de configurar el id de acceso de aws' }),
   AWS_SECRET_ACCESS_KEY: str({ desc: 'pendiente de configurar la clave de acceso de aws' }),
   STRIPE_PUBLIC_KEY: str({ desc: 'pendiente de configurar la clave publica de stripe' }),
   STRIPE_SECRET_KEY: str({ desc: 'pendiente de configurar la clave secreta de stripe' }),
   PAYPAL_CLIENT_KEY: str({ desc: 'pendiente de configurar la clave de cliente de paypal' }),
   PAYPAL_SECRET_KEY: str({ desc: 'pendiente de configurar la clave secreta de paypal' }),
   PAYPAL_API_URL: str({ desc: 'pendiente de configurar la url de la api de paypal' }),
});

export default env;