import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { apiRouter } from './routers/apiRouter';
import { authRouter } from './routers/authRouter';

const app = express();


app.use(express.json());

const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests from your frontend's origin
    credentials: true,  // Allow credentials (cookies, session data)
};

app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Set to true in production
        sameSite: 'strict',  // Or 'strict', depending on your use case
    },
}));

app.use('/api', apiRouter);
app.use('/auth', authRouter);




const init = async () => {
    return app;
}



export { init };
