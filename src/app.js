const express = require('express');
const { createServer: createViteServer } = require('vite');
const path = require('path');

(async () => {
    const app = express();

    // Middleware to parse JSON
    app.use(express.json());

    // Your API routes
    const chatRoute = require('./routes/chat');
    const tarotRoute = require('./routes/tarot');
    const imageRoute = require('./routes/image');
    const ttsRoute = require('./routes/tts')
    app.use('/api/chat', chatRoute);
    app.use('/api/tarot', tarotRoute);
    app.use('/api/image', imageRoute);
    app.use('/api/tts', ttsRoute);

    // Integrate Vite as middleware
    const vite = await createViteServer({
        server: { middlewareMode: true },
    });
    app.use(vite.middlewares);

    // Fallback to index.html for React Router
    app.use('*', async (req, res, next) => {
      try {
          const html = await vite.transformIndexHtml(req.originalUrl, path.resolve(__dirname, '../index.html'));
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
          vite.ssrFixStacktrace(e);
          next(e);
      }
    });

    // Start the server
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
})();
