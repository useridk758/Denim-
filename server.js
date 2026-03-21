import express from 'express';
import path from 'node:path';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, () => {
    console.log('Denim! running on port 3000');
});
