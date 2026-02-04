# Auth System (NestJS + ReactJS + MongoDB)

Sistema de autenticación fullstack con validación de seguridad, gestión de sesiones y geolocalización.

## Stack Técnico
- **Backend:** NestJS, MongoDB (Mongoose), Passport JWT, Cookies.
- **Frontend:** React (Vite), Context API, Zod, Native Fetch.

## Funcionalidades Clave
- **Seguridad:** JWT almacenado en **Cookies HttpOnly** (Protección contra XSS).
- **Rate Limit:** Bloqueo de cuenta/IP por 5 minutos tras 3 intentos fallidos.
- **Geolocalización:** Captura de coordenadas GPS en el momento del inicio de sesión.
- **Gestión de Sesión:** Persistencia de sesión en MongoDB y limpieza total al hacer Logout.
- **Validación:** Esquemas de datos con Zod en el cliente y Class-validator en el servidor.

## Instalación Rápida


### 1. Backend
```bash
cd server
npm install
# Configurar .env (MONGO_URI, JWT_SECRET)
npm run start:dev
```

### 2. Backend
```bash
cd client
npm install
# Configurar .env (VITE_API_URL)
npm 
```

## API Endpoints

- `POST /auth/signup` - Registro de usuario.
- `POST /auth/login` - Login + Captura de ubicación + Set-Cookie.
- `GET /auth/profile` - Validación de sesión y obtención de perfil.
- `POST /auth/logout` - Invalida sesión en BD y elimina Cookie.
