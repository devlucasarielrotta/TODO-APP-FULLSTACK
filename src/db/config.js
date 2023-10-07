import pg  from 'pg';
import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
const {Pool} = pg
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({path: path.resolve(__dirname, '../.env') })


dotenv.config({path: '.env' })

const db = new Pool({
    user:       process.env.POSTGRE_USER,
    password:   process.env.POSTGRE_PASSWORD,
    host:       process.env.POSTGRE_HOST,
    port:       process.env.POSTGRE_PORT,
    database:   process.env.POSTGRE_DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})


/** \l (lista bases actuales)
 *  psql -U postgres
 *  CREATE DATABASE imnsadb;
 *  \c imnsadb va a la base creada
 * 
 *  CREATE TABLE usuarios ( id SERIAL PRIMARY KEY, username VARCHAR (255), email VARCHAR(255) UNIQUE, password VARCHAR(255), confirmado BOOLEAN, fecha_registro DATE, fecha_modificacion DATE, estado BOOLEAN )
 *  CREATE TABLE propiedades ( id SERIAL PRIMARY KEY, nombre VARCHAR (255) UNIQUE, description VARCHAR(255), direccion VARCHAR(255), localidad VARCHAR(255), precio DOUBLE PRECISION, disponible BOOLEAN, fecha_publicacion DATE, usuario_id int, FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ) 
 *  CREATE TABLE imagenes ( id SERIAL PRIMARY KEY, path VARCHAR(255) UNIQUE, formato VARCHAR(255), id_propiedad INT,  FOREIGN KEY (id_propiedad) REFERENCES propiedades(id) )
 * 
 */

const dbConnection = async( ) => {

    try{ 
       
     
        await db.connect();   
        console.log('Base de datos online')
        
    }catch(error){
        console.error('Se ha detectado un error');
        throw new Error(`Error al inicializar la base de datos:, ${error.message}`);
    }
}

export {
    db,
    dbConnection
}