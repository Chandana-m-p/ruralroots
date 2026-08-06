import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'RuralRoots - Rural E-Commerce',
        short_name: 'RuralRoots',
        description: 'Offline-resilient rural e-commerce platform',
        theme_color: '#2E7D32',
        background_color: '#F5F7F4',
        display: 'standalone',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              }
            }
          },
          {
            urlPattern: /\/api\/v1\/products.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-products-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 Days
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true
      }
    }
  }
});
