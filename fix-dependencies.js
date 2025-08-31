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