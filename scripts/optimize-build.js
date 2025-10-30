#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting production build optimization...');

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  execSync('rm -rf dist', { stdio: 'inherit' });
  execSync('rm -rf node_modules/.vite', { stdio: 'inherit' });
} catch (error) {
  console.log('Clean completed (some files may not exist)');
}

// Build the project
console.log('📦 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Optimize built files
console.log('⚡ Optimizing built files...');

const distPath = path.join(__dirname, '..', 'dist');

// Function to get file size in KB
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Function to recursively get all files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Analyze bundle sizes
console.log('📊 Analyzing bundle sizes...');
const allFiles = getAllFiles(distPath);
const jsFiles = allFiles.filter(file => file.endsWith('.js'));
const cssFiles = allFiles.filter(file => file.endsWith('.css'));
const imageFiles = allFiles.filter(file => /\.(jpg|jpeg|png|webp|avif|svg)$/.test(file));

console.log('\n📈 Bundle Analysis:');
console.log(`JavaScript files: ${jsFiles.length}`);
jsFiles.forEach(file => {
  const relativePath = path.relative(distPath, file);
  const size = getFileSize(file);
  console.log(`  ${relativePath}: ${size} KB`);
});

console.log(`\nCSS files: ${cssFiles.length}`);
cssFiles.forEach(file => {
  const relativePath = path.relative(distPath, file);
  const size = getFileSize(file);
  console.log(`  ${relativePath}: ${size} KB`);
});

console.log(`\nImage files: ${imageFiles.length}`);
imageFiles.forEach(file => {
  const relativePath = path.relative(distPath, file);
  const size = getFileSize(file);
  console.log(`  ${relativePath}: ${size} KB`);
});

// Calculate total size
const totalSize = allFiles.reduce((total, file) => {
  return total + fs.statSync(file).size;
}, 0);

console.log(`\n📦 Total bundle size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

// Check for large files
const largeFiles = allFiles.filter(file => {
  const size = fs.statSync(file).size / 1024; // KB
  return size > 500; // Files larger than 500KB
});

if (largeFiles.length > 0) {
  console.log('\n⚠️  Large files detected (>500KB):');
  largeFiles.forEach(file => {
    const relativePath = path.relative(distPath, file);
    const size = getFileSize(file);
    console.log(`  ${relativePath}: ${size} KB`);
  });
}

// Generate performance report
const performanceReport = {
  buildTime: new Date().toISOString(),
  totalFiles: allFiles.length,
  totalSize: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
  jsFiles: jsFiles.length,
  cssFiles: cssFiles.length,
  imageFiles: imageFiles.length,
  largeFiles: largeFiles.map(file => ({
    path: path.relative(distPath, file),
    size: `${getFileSize(file)} KB`
  }))
};

fs.writeFileSync(
  path.join(distPath, 'performance-report.json'),
  JSON.stringify(performanceReport, null, 2)
);

console.log('\n✅ Build optimization completed!');
console.log('📄 Performance report saved to dist/performance-report.json');

// Performance recommendations
console.log('\n💡 Performance Recommendations:');
if (largeFiles.length > 0) {
  console.log('  - Consider code splitting for large files');
}
if (jsFiles.length > 10) {
  console.log('  - Consider bundling smaller JS files together');
}
if (imageFiles.some(file => getFileSize(file) > 200)) {
  console.log('  - Consider optimizing large images');
}

console.log('  - Enable gzip/brotli compression on your server');
console.log('  - Use CDN for static assets');
console.log('  - Implement proper caching headers');

console.log('\n🎉 Ready for deployment!');