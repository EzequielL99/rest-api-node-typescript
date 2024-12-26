import express from 'express';
import colors from 'colors';
import router from './router';
import db from './config/db';

// Conectar a base de datos
async function connectDB(){
    try{
        await db.authenticate();
        db.sync();
        console.log( colors.blue.bold('Conexion exitosa a la BD'));
    } catch (error){
        console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la DB'));
    }
}

connectDB();

// Instancia de EXPRESS
const server = express();

// Leer datos de formularios
server.use(express.json());

server.use('/api/products', router)

export default server;