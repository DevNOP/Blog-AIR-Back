import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { prisma } from '../../../Prisma'
import dotenv from 'dotenv'

dotenv.config()

if (process.env.CLIENT_ID_GOOGLE && process.env.CLIENT_SECRET_GOOGLE) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await prisma.user.findUnique({
            where: {
              email: profile.emails[0].value,
            },
          })

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: profile.emails[0].value,
                name: profile.displayName,
              },
            })
          }

          return done(null, user)
        } catch (error) {
          return done(error)
        }
      },
    ),
  )
}

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    done(null, user)
  } catch (error) {
    done(error)
  }
})
