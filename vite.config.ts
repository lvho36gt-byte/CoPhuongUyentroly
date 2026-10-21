import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

function geminiServerPlugin(): Plugin {
  return {
    name: 'gemini-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/gemini/status' && req.method === 'GET') {
          const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            available: hasKey,
            model: 'gemini-3.8-flash',
            provider: 'Google GenAI SDK',
          }));
          return;
        }

        if (req.url === '/api/gemini/generate' && req.method === 'POST') {
          const apiKey = process.env.GEMINI_API_KEY;
          if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              error: 'NO_API_KEY',
              message: 'Chưa cấu hình GEMINI_API_KEY trên môi trường máy chủ.',
            }));
            return;
          }

          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { prompt, systemInstruction } = data;
              if (!prompt) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'MISSING_PROMPT', message: 'Yêu cầu prompt.' }));
                return;
              }

              const ai = new GoogleGenAI({ apiKey });
              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: prompt,
                config: systemInstruction ? { systemInstruction } : undefined,
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                text: response.text || '',
                status: 'success'
              }));
            } catch (err: any) {
              console.error('Gemini API Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                error: 'GEMINI_ERROR',
                message: err?.message || 'Lỗi khi gọi mô hình Gemini AI.',
              }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

