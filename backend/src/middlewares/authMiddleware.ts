import { Express, Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('Checking authentication status');
    console.log('User:', req.user);

    // Check if the user is authenticated
    if (!req.user) {
        console.log('User is not authenticated');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    console.log('User is authenticated');
    // If the user is authenticated, continue to the next middleware
    next();
};
