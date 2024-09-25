import { apiRouter, authRouter } from './express'
import { db } from './database'
import passport from 'passport';
import jwt from 'jsonwebtoken';

authRouter.get('/user', async (req, res) => {
    res.send(req.user ? req.user : {});
})

// Route to start Google OAuth login
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// OAuth callback route
authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('http://localhost:3000/login'); // Redirect to frontend
    }
);

apiRouter.get('/users/usernames', async (req, res) => {
    try {
        const users = await db.selectFrom('users').select('user_name').execute()
        res.json(users)
        console.log("User requested!")
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).send("Error fetching users!")
    }
})

apiRouter.post('/users', async (req, res) => {
    const { username, email } = req.body
    try {
        await db.insertInto('users').values({ user_name: username, user_email: email }).execute()
        res.send("User created!")
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).send("Error creating user!")
    }
})


