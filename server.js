import express from 'express';
import path from 'node:path';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Denim! running on port ${PORT}`));
