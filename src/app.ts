import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import routes from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: [env.CLIENT_URL],
    credentials: true,
  }),
);

app.use(helmet()); //protect your app by setting important HTTP security headers.
app.use(compression()); //reduces response size before sending it to the client
app.use(cookieParser()); //reads cookies sent by the browser and makes them available on req.cookies
app.use(express.json()); //built-in Express middleware that reads incoming JSON request body and converts it into a JavaScript object inside req.body.
app.use(express.urlencoded({ extended: true })); //used to parse form data sent from HTML forms.
app.use('/api', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
