// server.js
import express from 'express';
import passport from 'passport';
import session from 'express-session';

const app = express();

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

const apiRouter = express.Router();
const authRouter = express.Router();

app.use('/api', apiRouter);
app.use('/auth', authRouter);

