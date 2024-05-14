
# TrujiStorage

TrujiStorage es una aplicación back-end desarrollada en JavaScript con Node.js y Express.js, diseñada para ofrecer soluciones de almacenamiento en la nube. Con un enfoque en la eficiencia y la escalabilidad, TrujiStorage utiliza una base de datos MySQL junto con el ORM de Prisma para garantizar un rendimiento óptimo y una gestión eficaz de los datos.

La aplicación ofrece a los usuarios una experiencia intuitiva y segura al proporcionar una suscripción gratuita de un mes al registrarse en la plataforma. Para aquellos que deseen ampliar sus capacidades de almacenamiento, TrujiStorage ofrece opciones de suscripción mediante pagos seguros a través de PayPal y Stripe, lo que garantiza una experiencia fluida y confiable para los usuarios.

Además, TrujiStorage aprovecha los servicios de Amazon Web Services (S3) para garantizar la disponibilidad y la redundancia de los datos, proporcionando así una infraestructura robusta y confiable para respaldar las necesidades de almacenamiento de nuestros usuarios.

El despliegue de TrujiStorage se realiza de forma eficiente y escalable gracias al uso de contenedores Docker y la orquestación de estos contenedores mediante Kubernetes. La aplicación se aloja en un servidor de Amazon Web Services (EC2), lo que garantiza un acceso rápido y seguro para nuestros usuarios en todo momento.

Con TrujiStorage, estamos comprometidos a ofrecer una solución de almacenamiento en la nube que combine la última tecnología con una experiencia de usuario excepcional, impulsando así la productividad y la seguridad para individuos y empresas por igual.


## Tecnologías Utilizadas

- **Backend**: NodeJS, ExpressJS
- **Base de Datos**: MySQL, Prisma (ORM)
- **Contenedores**: Docker
- **Orquestación**: Kubernetes (Minikube)
- **Infraestructura**: AWS (S3 para almacenamiento de imágenes, EKS para orquestación de contenedores)

## Requisitos

- Node.js
- MySQL
- Docker
- Kubernetes (Minikube)
- Cuenta de  Amazon Web Services (S3, EKS)

## Instalación


- Debe tener instalado Node.js en su máquina local. Puede descargarlo desde el siguiente enlace: [Node.JS](https://nodejs.org/en/download/) Para instalar Node.js en tu sistema operativo.

- Debe tener instalado MySQL en su máquina local. Puede descargarlo desde el siguiente enlace: [MySQL](https://dev.mysql.com/downloads/) Para instalar MySQL en tu sistema operativo.

- Debe tener instalado Docker en su máquina local. Puede descargarlo desde el siguiente enlace: [la documentación oficial de Docker](https://www.docker.com/products/docker-desktop)  para instalar Docker en tu sistema operativo.

- Debe tener instalado Kubernetes en su máquina local. Puede descargarlo desde el siguiente enlace: [Minikube](https://minikube.sigs.k8s.io/docs/start/)  para instalar Minikube en tu sistema operativo.

- Debe tener una cuenta de Amazon Web Services (AWS) para acceder a los servicios de S3 y EKS. Puede registrarse en el siguiente enlace: [AWS](https://aws.amazon.com/)  para crear una cuenta de AWS.

- Clone el repositorio de TrujiStorage en su máquina local utilizando el siguiente comando:

```bash
  git clone https://github.com/datrujillog/TrujiStorage.git
  cd TrujiStorage
```

- **Configurar variables de entorno**: Cree un archivo `.env`

- **Ejecutar el archivo `docker-compose.yml` para crear los contenedores de MySQL y Prisma:

```bash
  docker-compose up -d
```

- **Ejecutar el archivo `namespace.yml` para crear el namespace de Kubernetes:

```bash
  kubectl apply -f namespace.yml
```

- **Ejecutar el archivo `limitex-namespace.yml` Para especificar los límites de recursos para el namespace de Kubernetes:

```bash
  kubectl apply -f limitex-namespace.yml
```

- **Ejecutar el archivo `trujistorage.Deployment.yml` para crear el deployment de Kubernetes:

```bash
  kubectl apply -f trujistorage-Deployment.yml
```

- **Ejecutar el archivo `trujistorage.Service.yml` para crear el servicio de Kubernetes:

```bash
  kubectl apply -f trujistorage-Service.yml
```



## 🛠 Skills
Javascript, Node.Js, Express.JS, docker, Kubernetes, Amazon S3 - Ec2...

## Authors

- [Diego Trujillo](https://www.github.com/datrujillog). Si tienes alguna pregunta, no dudes en contactarme atraves de mi: [Correo Electronico](mailto:trujistudios@gmail.com) o mi [Linkedin](https://www.linkedin.com/in/trujillo-diego/) 