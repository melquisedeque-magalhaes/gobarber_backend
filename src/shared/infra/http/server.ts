import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import Cors from 'cors';

import updatedConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());
app.use(Cors());
routes.use('/files', express.static(updatedConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'Error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'Error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('Bora codar ! \u{1F680} ');
});
