# Dependency Management Strategy for SYNARCH Landing Page

## Overview

This document outlines the dependency management strategy for the SYNARCH landing page project. It covers current dependencies, common issues, troubleshooting procedures, and best practices for maintaining a healthy dependency ecosystem.

The project uses Next.js 15.4.7 with TypeScript and Tailwind CSS, implementing a minimalist brutalist design for SYNARCH, a private deep-tech holding company. A critical dependency for the project is `next-intl`, which resolves hydration errors and provides internationalization support.

## Technology Stack & Dependencies

### Core Framework
- **Next.js**: 15.4.7
- **React**: 18.3.1
- **TypeScript**: 5.9.2

### UI & Styling
- **Tailwind CSS**: 3.4.0
- **Framer Motion**: 12.23.12
- **GSAP**: 3.13.0
- **Headless UI**: 2.2.7

### Internationalization
- **next-intl**: 3.26.5

### Development Tools
- **ESLint**: 9.34.0
- **Prettier**: 3.6.2
- **Jest**: 30.0.5
- **Playwright**: 1.55.0

## Current Dependency Issues

### Identified Problems
1. Missing `node_modules` directory
2. Corrupted `package-lock.json` file
3. Module not found errors during development
4. Permission issues preventing npm operations
5. Specific `next-intl` module resolution issues causing hydration errors

### Root Causes
1. Incomplete or failed npm installations
2. Environment permission restrictions
3. Cache corruption
4. Conflicting dependency versions
5. Text mismatches between server-side (Spanish) and client-side (English) rendering
6. Missing internationalization configuration

## Dependency Management Procedures

### Routine Maintenance
1. Regular dependency updates
2. Security audit checks
3. Bundle size monitoring
4. Compatibility verification

### Troubleshooting Process

#### Step 1: Initial Assessment
- Check for `node_modules` directory
- Verify `package.json` integrity
- Confirm `package-lock.json` validity

#### Step 2: Clean Installation Process
1. Delete `node_modules` directory
2. Remove `package-lock.json` file
3. Clear npm cache with `npm cache clean --force`
4. Run fresh installation with `npm install`

#### Step 3: Verification
- Run development server with `npm run dev`
- Test all application features
- Verify no module resolution errors

## Automated Dependency Repair Script

### Script Functionality
A Node.js script that automates the dependency repair process:

```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- INICIANDO SCRIPT DE REPARACIÓN FORZADA ---');

const projectRoot = process.cwd();
const nodeModulesPath = path.join(projectRoot, 'node_modules');
const lockFilePath = path.join(projectRoot, 'package-lock.json');

try {
  console.log('Paso 1: Eliminando node_modules y package-lock.json...');
  if (fs.existsSync(nodeModulesPath)) {
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    console.log('-> node_modules eliminado.');
  }
  if (fs.existsSync(lockFilePath)) {
    fs.unlinkSync(lockFilePath);
    console.log('-> package-lock.json eliminado.');
  }
  console.log('✅ Limpieza de archivos completada.');

  console.log('Paso 2: Limpiando la caché de NPM...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ Caché de NPM limpiada.');

  console.log('Paso 3: Ejecutando una nueva instalación limpia...');
  execSync('npm install', { stdio: 'inherit', cwd: projectRoot });
  console.log('✅ ¡Dependencias reinstaladas desde cero!');

  console.log('--- MISIÓN DE REPARACIÓN COMPLETADA CON ÉXITO ---');

} catch (error) {
  console.error('--- ❌ ERROR DURANTE LA EJECUCIÓN DEL SCRIPT ---');
  console.error(error);
  process.exit(1);
}
```

### Script Execution
1. Save the script as `fix-dependencies.js` in the project root
2. Execute with `node fix-dependencies.js`
3. Verify repair by running `npm run dev`

### Special Considerations for next-intl
The `next-intl` dependency is critical for resolving hydration errors in the application. If module resolution issues persist after running the script, specifically verify that:

1. The `next-intl` package is listed in `package.json` dependencies
2. The `i18n.ts` configuration file exists in the project root
3. Message files exist in the `messages/` directory for all supported locales
4. The middleware is properly configured to handle internationalized routes

## Environment Configuration

### Permission Requirements
- Administrative privileges for npm operations
- Write access to project directory
- Network access for package downloads

### PowerShell Configuration
For Windows environments with execution policy restrictions:
1. Open PowerShell as administrator
2. Check current policy with `Get-ExecutionPolicy`
3. If "Restricted", change with `Set-ExecutionPolicy RemoteSigned`

### Node.js Version
The project requires Node.js version 14 or higher. For optimal compatibility with all dependencies, including `@chromatic-com/storybook`, Node.js 16.0.0 or higher is recommended. Using Node.js 18.x or 20.x is recommended for the best development experience.

## Best Practices

### Dependency Management
1. Use exact versions for critical dependencies
2. Regularly audit for security vulnerabilities
3. Minimize unnecessary dependencies
4. Keep dependencies updated but stable
5. Pay special attention to internationalization dependencies like `next-intl` which are critical for application stability

### Installation Process
1. Always use `npm ci` for clean installations in CI/CD
2. Use `npm install --force` only when necessary
3. Verify installations with `npm run dev` before committing
4. Test all application features, especially accessibility components that rely on internationalization

### Error Prevention
1. Commit `package-lock.json` to version control
2. Avoid manual edits to `package-lock.json`
3. Use `.nvmrc` to specify Node.js version
4. Document dependency-related issues and solutions
5. Maintain proper internationalization configuration files to prevent hydration errors

## Monitoring & Maintenance

### Automated Checks
1. Weekly dependency audits
2. Monthly security scans
3. Continuous integration dependency validation

### Performance Metrics
1. Installation time tracking
2. Bundle size monitoring
3. Build time analysis

## Internationalization Dependency Management

### next-intl Dependency
The `next-intl` library (version 3.26.5) is a critical dependency for the SYNARCH landing page. It resolves hydration errors that previously caused instability in the application by ensuring consistent text rendering between server-side and client-side components.

### Critical Configuration Files
1. `i18n.ts` - Internationalization configuration defining supported locales (`en`, `es`) and default locale (`en`)
2. `messages/en.json` - English language message definitions
3. `messages/es.json` - Spanish language message definitions
4. `middleware.ts` - Integration of next-intl with security middleware
5. `app/layout.tsx` - Root layout with NextIntlClientProvider integration

### Common i18n Issues and Solutions
1. **Hydration Errors**: Caused by text mismatches between server (Spanish) and client (English) rendering. Resolved by proper next-intl implementation.
2. **Missing Translation Keys**: Ensure all components using `useTranslations` hook have corresponding entries in message files.
3. **Locale Detection Issues**: Verify middleware configuration properly handles locale detection and routing.

## Rollback Procedures

### In Case of Failed Updates
1. Revert to previous `package-lock.json`
2. Restore from version control
3. Reinstall with `npm ci`

### Emergency Recovery
1. Complete dependency reset
2. Fresh installation from scratch
3. Verification of all application features

## Conclusion

This dependency management strategy ensures the SYNARCH landing page maintains a stable, secure, and performant development environment. By following these procedures, the team can minimize dependency-related issues and maintain smooth development workflows.