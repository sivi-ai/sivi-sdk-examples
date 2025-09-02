import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(/%SIVI_ACCOUNT_EMAIL%/g, env.SIVI_ACCOUNT_EMAIL || 'your@example.com')
        }
      }
    ],
    define: {
      'process.env.SIVI_ACCOUNT_EMAIL': JSON.stringify(env.SIVI_ACCOUNT_EMAIL)
    }
  };
});
