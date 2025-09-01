# Synarch Landing Page

Una landing page moderna y elegante construida con Next.js 15, TypeScript y soporte completo para internacionalización.

## 🚀 Características

- **Next.js 15** con App Router
- **TypeScript** para type safety
- **Internacionalización** completa (inglés/español)
- **Animaciones** con Framer Motion y GSAP
- **Diseño responsivo** con Tailwind CSS
- **Optimización SEO** automática
- **Rendimiento optimizado** con renderizado dinámico

## 🌍 Internacionalización

El proyecto soporta múltiples idiomas con next-intl:

- **Inglés** (`/en`) - Idioma por defecto
- **Español** (`/es`) - Idioma secundario

### Estructura de Rutas
```
/                    # Redirige automáticamente según preferencias del navegador
/en                  # Versión en inglés
/es                  # Versión en español
/en/contact          # Contacto en inglés
/es/contact          # Contacto en español
```

### Páginas Disponibles
- **Home** (`/`) - Página principal
- **Contact** (`/contact`) - Formulario de contacto
- **Entities** (`/entities`) - Información de entidades
- **Thesis** (`/thesis`) - Tesis del proyecto
- **Manifesto** (`/manifesto`) - Manifiesto de la organización
- **Terms** (`/terms`) - Términos de servicio
- **Privacy** (`/privacy`) - Política de privacidad

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Robbin360/synarch-landing.git
cd synarch-landing

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del Proyecto

```
synarch-landing/
├── app/
│   ├── [locale]/           # Rutas con localización
│   │   ├── layout.tsx      # Layout específico para idiomas
│   │   ├── page.tsx        # Página principal
│   │   ├── contact/        # Página de contacto
│   │   ├── entities/       # Página de entidades
│   │   ├── thesis/         # Página de tesis
│   │   ├── manifesto/      # Página de manifiesto
│   │   ├── terms/          # Página de términos
│   │   └── privacy/        # Página de privacidad
│   ├── not-found.tsx       # Página 404 personalizada
│   ├── layout.tsx          # Layout raíz
│   └── globals.css         # Estilos globales
├── components/             # Componentes reutilizables
├── messages/               # Archivos de traducción
│   ├── en.json            # Traducciones en inglés
│   └── es.json            # Traducciones en español
├── i18n.ts                # Configuración de idiomas
├── i18n.config.ts         # Configuración de next-intl
├── middleware.ts          # Middleware de internacionalización
└── next.config.js         # Configuración de Next.js
```

## 🔧 Configuración

### Variables de Entorno
```env
# Opcional: URL para webhooks de seguridad
SECURITY_WEBHOOK_URL=https://your-webhook-url.com
```

### Configuración de Vercel
El proyecto está optimizado para despliegue en Vercel con:
- Renderizado dinámico para páginas con internacionalización
- Configuración automática de headers de seguridad
- Optimización de imágenes y assets

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. El proyecto se desplegará automáticamente
3. Las rutas con localización funcionarán correctamente

### Otros Proveedores
```bash
# Construir el proyecto
npm run build

# Los archivos estarán en .next/
```

## 🐛 Solución de Problemas

### Errores de Compilación
Si encuentras errores de compilación:
1. Asegúrate de tener Node.js 18+ instalado
2. Ejecuta `npm install` para instalar dependencias
3. Verifica que todas las traducciones estén completas

### Problemas de Internacionalización
- Verifica que los archivos `messages/en.json` y `messages/es.json` existan
- Asegúrate de que `i18n.config.ts` esté configurado correctamente
- Revisa que el middleware esté funcionando

## 📝 Changelog

Ver [CHANGELOG.md](./CHANGELOG.md) para un historial detallado de cambios.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Proyecto**: [Synarch Landing](https://github.com/Robbin360/synarch-landing)
- **Issues**: [GitHub Issues](https://github.com/Robbin360/synarch-landing/issues)
