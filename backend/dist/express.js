"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.apiRouter = void 0;
// server.js
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_google_oauth2_1 = __importDefault(require("passport-google-oauth2"));
const app = (0, express_1.default)();
const apiRouter = express_1.default.Router();
exports.apiRouter = apiRouter;
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const GoogleStrategy = passport_google_oauth2_1.default.Strategy;
// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use('/api', apiRouter);
app.use('/auth', authRouter);
authRouter.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));
// Middleware to parse JSON request bodies
const cors = require("cors");
apiRouter.use(cors(), express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from your frontend's origin
    credentials: true, // Allow credentials (cookies, session data)
};
authRouter.use(cors(corsOptions));
authRouter.use(passport_1.default.initialize());
authRouter.use(passport_1.default.session());
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback', // Adjust as needed
}, (accessToken, refreshToken, profile, done) => {
    // Save user profile information (or create a new user if necessary)
    return done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
