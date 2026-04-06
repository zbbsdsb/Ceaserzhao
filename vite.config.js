import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        history: resolve(__dirname, 'history.html'),
        v103: resolve(__dirname, 'versions/1.0.3/index.html'),
      },
    },
  },
  publicDir: 'public',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'assets'),
    },
  },
  plugins: [
    {
      name: 'copy-assets-data',
      buildEnd: () => {
        // 复制 assets/data 目录到 dist/assets/data
        const dataDir = resolve(__dirname, 'assets', 'data');
        const destDataDir = resolve(__dirname, 'dist', 'assets', 'data');
        
        // 确保目标目录存在
        if (!existsSync(destDataDir)) {
          mkdirSync(destDataDir, { recursive: true });
          console.log(`Created directory: ${destDataDir}`);
        }
        
        // 复制 gallery-data.json
        const galleryDataFile = resolve(dataDir, 'gallery-data.json');
        const destGalleryDataFile = resolve(destDataDir, 'gallery-data.json');
        
        if (existsSync(galleryDataFile)) {
          copyFileSync(galleryDataFile, destGalleryDataFile);
          console.log(`Copied ${galleryDataFile} to ${destGalleryDataFile}`);
        } else {
          console.log(`File not found: ${galleryDataFile}`);
        }
        
        // 复制 timelineadd.md
        const timelineAddFile = resolve(dataDir, 'timelineadd.md');
        const destTimelineAddFile = resolve(destDataDir, 'timelineadd.md');
        
        if (existsSync(timelineAddFile)) {
          copyFileSync(timelineAddFile, destTimelineAddFile);
          console.log(`Copied ${timelineAddFile} to ${destTimelineAddFile}`);
        } else {
          console.log(`File not found: ${timelineAddFile}`);
        }
      },
    },
  ],
});
