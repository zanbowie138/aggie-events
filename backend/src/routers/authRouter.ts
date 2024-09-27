import express from 'express'
import passport from 'passport';
import GAuth from 'passport-google-oauth2';

export const authRouter = express.Router();

const GoogleStrategy = GAuth.Strategy;

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
    console.log('Serializing user');
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    console.log('Deserializing user');
    done(null, obj);
});

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.get('/user', async (req, res) => {
    res.send(req.user ? req.user : {});
})

// Route to start Google OAuth login
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// OAuth callback route
authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('http://localhost:3000/login'); // Redirect to frontend
    }
);

authRouter.post('/logout', (req, res) => {
    // Destroy the session
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        // Clear the session cookie
        req.session.destroy(() => {
            res.clearCookie('connect.sid');  // Clear the session cookie
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    });
});