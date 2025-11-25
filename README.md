# 🔐 Login Tracking System

Sistema de autenticación con registro automático en Google Sheets y notificaciones por email.

## 🎯 Características

- ✅ Login seguro con validación de credenciales
- ✅ Registro automático de cada login en Google Sheets
- ✅ Notificaciones por email vía Make (Integromat)
- ✅ UI moderna con Shadcn/ui y TailwindCSS
- ✅ TypeScript para type-safety
- ✅ Responsive design

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** TailwindCSS, Shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **APIs:** Google Sheets API
- **Automation:** Make (Integromat)
- **Validation:** React Hook Form, Zod
- **Deployment:** Vercel

## 🚀 Demo

**Live Demo:** [https://tu-proyecto.vercel.app](https://tu-proyecto.vercel.app)

**Credenciales de prueba:**

- Usuario 1: `user1@test.com` / Password: `password123`
- Usuario 2: `user2@test.com` / Password: `password123`

## 📸 Screenshots

### Login Page

![Login Page](./screenshots/login.png)

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Google Sheets Tracking

![Google Sheets](./screenshots/sheets.png)

### Email Notification

![Email](./screenshots/email.png)

## 🏗️ Arquitectura

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ Login
       ▼
┌─────────────────────┐
│   Next.js App       │
│   (Frontend + API)  │
└──────┬──────┬───────┘
       │      │
       │      └──────────┐
       ▼                 ▼
┌─────────────┐   ┌──────────────┐
│  Supabase   │   │ Google       │
│  (Auth DB)  │   │ Sheets API   │
└─────────────┘   └──────────────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  Make        │
                  │  (Webhook)   │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  Email       │
                  └──────────────┘
```

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Cuenta en Supabase
- Cuenta en Google Cloud Platform
- Cuenta en Make (Integromat)
- Git

## ⚙️ Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/login-tracking-app.git
cd login-tracking-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Better Auth
BETTER_AUTH_SECRET=tu_secret_random
BETTER_AUTH_URL=http://localhost:3000

# Google Sheets
GOOGLE_SHEETS_SPREADSHEET_ID=tu_spreadsheet_id
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account",...}'

# Make Webhook
MAKE_WEBHOOK_URL=tu_webhook_url
```

### 4. Configurar Supabase

Ejecutar en el SQL Editor de Supabase:

```sql
-- Crear tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar usuarios de prueba
INSERT INTO users (email, password_hash, name) VALUES
('user1@test.com', '$2a$10$...', 'Usuario 1'),
('user2@test.com', '$2a$10$...', 'Usuario 2');
```

**Nota:** Generar password hashes con:

```bash
node -e "require('bcryptjs').hash('password123', 10).then(console.log)"
```

### 5. Configurar Google Sheets API

1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear nuevo proyecto
3. Habilitar "Google Sheets API"
4. Crear Service Account y descargar JSON key
5. Crear Google Sheet con headers: `Usuario | Contraseña | Fecha | Hora`
6. Compartir sheet con email del service account

### 6. Configurar Make

1. Crear nuevo Scenario en [Make](https://make.com)
2. Agregar módulo "Webhooks" → "Custom webhook"
3. Agregar módulo "Email" → "Send an email"
4. Configurar template del email:
   ```
   Usuario: {{usuario}}
   Fecha: {{fecha}}
   Hora: {{hora}}
   ```
5. Activar scenario y copiar webhook URL

### 7. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy a Producción

### Deploy en Vercel

1. Push del código a GitHub
2. Conectar repositorio en [Vercel](https://vercel.com)
3. Configurar variables de entorno en Vercel Dashboard
4. Deploy automático

```bash
# O usando Vercel CLI
npm i -g vercel
vercel
```

## 📁 Estructura del Proyecto

```
login-tracking-app/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx          # Página de login
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Dashboard post-login
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...better-auth]/
│   │   │   │       └── route.ts      # API de autenticación
│   │   │   └── track-login/
│   │   │       └── route.ts          # API de tracking
│   │   ├── layout.tsx                # Layout principal
│   │   └── page.tsx                  # Home (redirect)
│   ├── components/
│   │   ├── ui/                       # Componentes Shadcn/ui
│   │   └── auth/
│   │       └── LoginForm.tsx         # Formulario de login
│   ├── lib/
│   │   ├── auth.ts                   # Config Better Auth
│   │   ├── supabase.ts               # Cliente Supabase
│   │   ├── google-sheets.ts          # Cliente Google Sheets
│   │   ├── make.ts                   # Cliente Make
│   │   └── utils.ts                  # Utilidades
│   └── types/
│       └── index.ts                  # TypeScript types
├── .env.local                        # Variables de entorno
├── .env.example                      # Template de env vars
├── next.config.js                    # Config Next.js
├── tailwind.config.ts                # Config Tailwind
├── tsconfig.json                     # Config TypeScript
└── package.json
```

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (cost factor 10)
- ✅ Contraseñas encriptadas antes de guardar en Sheets
- ✅ Variables de entorno para secrets
- ✅ Validación de inputs con Zod
- ✅ HTTPS en producción (Vercel)
- ✅ Service Account con permisos mínimos

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### Test Manual

1. **Login exitoso:**

   - Usar `user1@test.com` / `password123`
   - Verificar redirect a dashboard
   - Verificar entrada en Google Sheets
   - Verificar email recibido

2. **Login fallido:**

   - Usar credenciales incorrectas
   - Verificar mensaje de error
   - Verificar que NO se registre en Sheets

3. **Logout:**
   - Hacer logout desde dashboard
   - Verificar redirect a login

## 🐛 Troubleshooting

### Google Sheets API Error: "The caller does not have permission"

**Solución:** Compartir el Google Sheet con el email del service account (con permisos de editor)

### Make Webhook no recibe datos

**Solución:**

- Verificar que el scenario esté activado en Make
- Verificar URL del webhook en .env.local
- Ver logs en Make dashboard

### Supabase connection failed

**Solución:**

- Verificar URL y anon key
- Verificar que la tabla 'users' exista
- Verificar conexión de red

### Build error en Vercel

**Solución:**

- Verificar que todas las env vars estén configuradas
- Verificar que no haya errores de TypeScript
- Ver logs de build en Vercel dashboard

## 📚 Documentación Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Make Documentation](https://www.make.com/en/help)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto fue creado como prueba técnica y es de uso libre.

## 👤 Autor

**Kevin Barrios**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)
