// server.js
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import gauth from 'passport-google-oauth2';

const app = express();

const apiRouter = express.Router();
const authRouter = express.Router();
const GoogleStrategy = gauth.Strategy;

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/api', apiRouter);
app.use('/auth', authRouter);

authRouter.use(session({
  secret: process.env.SECRET!,
  resave: false,
  saveUninitialized: true,
}));

authRouter.use(passport.initialize());
authRouter.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:5000/auth/google/callback', // Adjust as needed
}, (accessToken, refreshToken, profile, done) => {
  // Save user profile information (or create a new user if necessary)
  return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

// Middleware to parse JSON request bodies
const cors = require("cors");
apiRouter.use(cors(), express.json());
authRouter.use(cors());

export { apiRouter, authRouter };