import 'reflect-metadata';
import express from 'express';
import updatedConfig from './config/upload';

import routes from './routes';

import './database';

const app = express();

app.use(express.json());
routes.use('/files', express.static(updatedConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log('Bora codar !');
});
