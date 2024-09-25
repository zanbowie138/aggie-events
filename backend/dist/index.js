"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./express");
const database_1 = require("./database");
const passport_1 = __importDefault(require("passport"));
express_1.authRouter.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.user ? req.user : {});
}));
// Route to start Google OAuth login
express_1.authRouter.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
}));
// OAuth callback route
express_1.authRouter.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication
    res.redirect('http://localhost:3000/login'); // Redirect to frontend
});
express_1.apiRouter.get('/users/usernames', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database_1.db.selectFrom('users').select('user_name').execute();
        res.json(users);
        console.log("User requested!");
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send("Error fetching users!");
    }
}));
express_1.apiRouter.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    try {
        yield database_1.db.insertInto('users').values({ user_name: username, user_email: email }).execute();
        res.send("User created!");
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Error creating user!");
    }
}));
