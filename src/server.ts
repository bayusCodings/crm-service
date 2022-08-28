import cors from 'cors';
import dotenv from 'dotenv';
import winston from 'winston';
import expressWinston from 'express-winston';
import routes from './routes';
import swaggerDocument from './docs/swagger.json';
import swaggerUi from 'swagger-ui-express';
import express, { Express } from 'express';
import { ErrorHandler, NotFoundErrorHandler } from './errorhandlers';

dotenv.config();
const app: Express = express();
const port = parseInt(<string> (process.env.PORT || '3201'), 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    meta: false,
    expressFormat: true,
    colorize: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use('/api/v1', routes);

app.use(NotFoundErrorHandler);
app.use(ErrorHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(`[server]: crm-service is running at http://localhost:${port}`);
});

export default app