import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { apiRouter } from "./routers/api-router";
import { authRouter } from "./routers/auth-router";
import { db } from "./database";
import MemoryStore from "memorystore";
import cors from "cors";
import { UserStorage } from "./types/customtypes";
import { getUserById } from "./dbapi/user";

const init = async () => {
  const app = express();

  app.use(express.json());
  const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`, // Allow requests from your frontend's origin
    credentials: true, // Allow credentials (cookies, session data)
  };

  app.use(cors(corsOptions));

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1); // trust first proxy
  }

  app.use(
    session({
      secret: process.env.BACKEND_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: "lax", // Or 'strict', depending on your use case
      },
      store: new (MemoryStore(session))({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    }),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`, // Adjust as needed
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log('Google profile:', profile)
        if (!profile.emails || !profile.emails[0].value) {
          console.error("No email found in Google profile");
          return done(null, false);
        }

        const user_email = profile.emails[0].value;
        await db
          .selectFrom("users")
          .select(["user_email", "user_id"])
          .where("user_email", "=", user_email)
          .execute()
          .then(async (result) => {
            // TODO: Add check for organization
            // If the user is not in the database, add them
            const getUserId = async (): Promise<number> => {
              if (result.length === 0) {
                const { user_id: userId } = await db
                  .insertInto("users")
                  .values({
                    user_email: user_email,
                    user_name: profile.displayName,
                  })
                  .returning("user_id")
                  .executeTakeFirstOrThrow();
                return userId;
              } else {
                return result[0].user_id;
              }
            };

            console.log("User:", user_email);

            return done(null, {
              user_email: user_email,
              user_name: profile.displayName,
              picture: profile.photos ? profile.photos[0].value : "",
              user_id: await getUserId(),
            } as UserStorage);
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
            return done(error, false);
          });
      },
    ),
  );

  passport.serializeUser((user: any, done) => {
    done(null, { user_id: user.user_id, picture: user.picture });
  });

  passport.deserializeUser(({ user_id: user_id, picture: picture }, done) => {
    getUserById(user_id).then((user) => {
      done(null, {
        user_id,
        user_email: user.user_email,
        user_name: user.user_name,
        picture,
      });
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", apiRouter);
  app.use("/auth", authRouter);
  return app;
};

export { init };
