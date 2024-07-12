import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/database.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api', noteRoutes);
app.use('/api', foodRoutes);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist', 'index.html'))
  })
}
app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
