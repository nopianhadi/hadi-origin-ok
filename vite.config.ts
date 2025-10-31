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
        manualChunks: (id) => {
          // Derive the actual package name for node_modules imports
          const pkgName = (() => {
            if (!id.includes('node_modules')) return null;
            const after = id.split('node_modules/')[1];
            if (!after) return null;
            const parts = after.split('/');
            if (parts[0].startsWith('@')) return parts.slice(0, 2).join('/');
            return parts[0];
          })();

          // Keep React packages in stable, separate chunks only when matched exactly
          if (pkgName === 'react') return 'react-core';
          if (pkgName === 'react-dom') return 'react-dom';

          // Vendor chunks for node_modules
          if (id.includes('node_modules')) {
            // UI libraries
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // Animation
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Backend and data
            if (id.includes('@supabase') || id.includes('@tanstack')) {
              return 'data-vendor';
            }
            // Icons and utilities
            if (
              id.includes('lucide-react') ||
              id.includes('react-icons') ||
              id.includes('clsx') ||
              id.includes('tailwind-merge') ||
              id.includes('class-variance-authority') ||
              id.includes('wouter')
            ) {
              return 'utils-vendor';
            }
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'form-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }

          // App chunks
          if (id.includes('/pages/')) return 'pages';
          if (id.includes('/components/')) return 'components';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
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

