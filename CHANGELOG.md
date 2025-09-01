# Changelog

## [0.2.1] - 2024-12-19

### Fixed
- **Errores de compilación en Vercel**: Resueltos problemas de build que impedían el despliegue
- **Página not-found**: Agregada página personalizada para rutas no encontradas
- **Configuración de next-intl**: Corregida configuración de internacionalización
- **Renderizado estático**: Configurado renderizado dinámico para páginas con internacionalización

### Added
- **Estructura de internacionalización**: Implementada carpeta `[locale]` para soporte multiidioma
- **Páginas faltantes**: Creadas páginas de Manifesto, Terms y Privacy
- **Componente Manifesto**: Nuevo componente para la página de manifiesto
- **Traducciones completas**: Agregadas traducciones en inglés y español para todas las páginas
- **Configuración i18n**: Archivo `i18n.config.ts` para configuración de next-intl

### Changed
- **Script de build**: Simplificado script de build en `package.json`
- **Configuración Next.js**: Actualizada configuración para compatibilidad con Next.js 15
- **Middleware**: Mejorado middleware de internacionalización
- **Layout**: Agregado layout específico para rutas con localización

### Technical Details
- **Next.js**: Actualizado a versión 15.4.7
- **next-intl**: Configurado correctamente para App Router
- **TypeScript**: Corregidos errores de tipos
- **Build process**: Optimizado proceso de compilación

## [0.2.0] - 2024-12-18

### Initial Release
- Landing page básica con componentes de lujo
- Soporte para internacionalización (inglés/español)
- Componentes de animación y efectos visuales
- Sistema de navegación y routing 