import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import path from 'node:path';

const app = express();
const server = createServer(app);
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uv/', express.static(uvPath));

server.listen(process.env.PORT || 3000, () => {
    console.log('Denim! is active on port 3000');
});
