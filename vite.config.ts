import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      // Optimize JSX runtime
      jsxRuntime: 'automatic',
    }),
    ViteImageOptimizer({
      includePublic: true,
      png: { quality: 70, progressive: true },
      jpeg: { quality: 65, progressive: true },
      jpg: { quality: 65, progressive: true },
      webp: { quality: 65 },
      avif: { quality: 45 },
      svg: { multipass: true, plugins: [{ name: 'removeViewBox', active: false }] },
    }),
    viteCompression({ 
      algorithm: 'gzip', 
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
    viteCompression({ 
      algorithm: 'brotliCompress', 
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "assets/attached_assets"),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
    // Performance optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      external: [],
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'router': ['wouter'],
          'ui-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-select',
            '@radix-ui/react-accordion'
          ],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'animations': ['framer-motion'],
          'supabase': ['@supabase/supabase-js'],
          'query': ['@tanstack/react-query'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector']
        }
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 800,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize asset inlining
    assetsInlineLimit: 2048,
  },
  server: {
    host: true,
    port: 5173,
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'react/jsx-runtime',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@supabase/supabase-js',
      'wouter',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['@vite/client', '@vite/env'],
    force: true,
  },
  // Enable experimental features for better performance
  esbuild: {
    target: 'es2020',
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
});

