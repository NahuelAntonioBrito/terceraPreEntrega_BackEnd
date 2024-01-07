import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from 'socket.io';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from "passport";
import initializePassport from './config/passport.config.js';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/cart.router.js';
import sessionRouter from './routers/session.router.js';
import sesssionViewRouter from './routers/session.view.router.js';
import viewsRouter from './routers/view.router.js';
import chatRouter from './routers/chat.router.js';
import loggertest from "./routers/loggerTest.router.js"
import { __dirname, passportCall } from './utils.js';
import messageModel from "./dao/models/message.model.js";
import dotenv from "dotenv";
import errorHandler from './middlewares/error.js'
import mockingRouter from './routers/mockin.router.js'
import logger from "./logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import  SwaggerUiExpress  from "swagger-ui-express";

dotenv.config()

const hbs = handlebars.create({});

// Define un ayudante personalizado para acceder a propiedades del prototipo
hbs.handlebars.registerHelper('getPrototypeProperty', function(user, propertyName) {
    return user[propertyName];
});


const MONGO_URI = process.env.MONGO_URI
export const PORT = process.env.PORT
const MONGO_DB_NAME = process.env.MONGO_DB_NAME

const app = express();

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'Documentación para la aplicacion',
            description: ' una descripcion clara de la documentación'
        }
    },
    apis: ['./docs/**/*.yaml']
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs))

app.engine('handlebars', handlebars.engine({
    allowProtoPropertiesByDefault: true
}));
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname+"/public"));
app.use('/', sesssionViewRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
app.use('/api/sessions', sessionRouter);
app.use('/session', sessionRouter);
app.use(errorHandler)
app.use('/products', passportCall('jwt'), viewsRouter);
app.use('/carts', viewsRouter);
app.use('/chat', chatRouter);
app.use('/api/mockingproducts', mockingRouter)
app.use('/loggerTest', loggertest)

try{
    await mongoose.connect(MONGO_URI,{
        dbName: MONGO_DB_NAME,
        useUnifiedTopology : true
    })
    const httpServer = app.listen(PORT, ()=> logger.info(`Server up on port ${PORT}`)) 

    const io = new Server(httpServer);
    io.on("connection", (socket) => {
        logger.info(`New Client Connected`)
        socket.on('productList', (data) => {
            console.log("data: ", data)
            if (data) {
                io.emit('updateProducts', data);
                console.log('Datos enviados al cliente:', data);
            } else {
                logger.error('Los datos de productos están vacíos o nulos');
            }
        })
        socket.on('message', async (data) => {
            try {
                const message = new messageModel({
                    user: data.user,
                    message: data.message
                });
        
                await message.save();
                const messages = await messageModel.find()
                io.emit('logs', messages);
            } catch (err) {
                logger.error('Error al guardar el mensaje:', err);
            }
        });
        
    })
}catch(err){
    logger.error(err.message)
}