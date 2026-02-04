# Auth System (NestJS + ReactJS + MongoDB)

Sistema de autenticación fullstack con validación de seguridad, gestión de sesiones y geolocalización.

## Stack Técnico
- **Backend:** NestJS, MongoDB (Mongoose), Passport JWT, Cookies.
- **Frontend:** React (Vite), Context API, Zod, React router.

## Funcionalidades Clave
- **Seguridad:** JWT almacenado en **Cookies HttpOnly** (Protección contra XSS).
- **Rate Limit:** Bloqueo de cuenta/IP por 5 minutos tras 3 intentos fallidos.
- **Geolocalización:** Captura de coordenadas GPS en el momento del inicio de sesión.
- **Gestión de Sesión:** Persistencia de sesión en MongoDB y limpieza total al hacer Logout.
- **Validación:** Esquemas de datos con Zod en el cliente y Class-validator en el servidor.

## Instalación Rápida

### Requisitos
- Node.js v18+
- MongoDB instalado o una URI de MongoDB Atlas

Descargar e ingresar al repositorio

```bash
git clone https://github.com/erickcapilla/nest-auth.git

cd nest-auth
```


### 1. Backend
```bash
cd server
npm install
# Configurar .env (MONGO_URI, JWT_SECRET)
cp .env.template .env

npm run start:dev
```

### 2. Frontend
```bash
cd client
npm install
# Configurar .env (VITE_API_URL)
cp .env.template .env

npm run dev
```

## API Endpoints

- `POST /api/auth/signup` - Registro de usuario.
- `POST /api/auth/login` - Login + Captura de ubicación + Set-Cookie.
- `GET /api/auth/profile` - Validación de sesión y obtención de perfil.
- `POST /api/auth/logout` - Invalida sesión en BD y elimina Cookie.

## Documentación

Documentación más detallada [aqui](/docs/documentacion.pdf)
