import 'reflect-metadata';
import { startServer } from './startServer';

startServer().catch((err) => console.log('Catched Error: ', err));
