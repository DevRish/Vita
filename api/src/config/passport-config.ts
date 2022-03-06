import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import LinkedinStrategy from 'passport-linkedin-oauth2';
import { GOOGLE_KEY, LINKEDIN_KEY } from './keys';
import { UserModel } from '../Models/User';

passport.serializeUser((user : any, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy.Strategy({ ...GOOGLE_KEY, passReqToCallback: true}, 
    (request, accessToken, refreshToken, profile, done) => {
        console.log('In strategy callback');
        console.log(profile);
        // console.log(typeof request.query.state);
        const newUser = new UserModel({
            user_id: profile.id,
            first_name: profile._json?.given_name,
            last_name: profile._json?.family_name,
            email: profile._json?.email,
            image_link: profile._json?.picture,
            oauth_provider: profile.provider,
            is_mentor: request.query.state === 'true' ? true : false,
            signup_completed: true
        })
        UserModel.findOne({ user_id: profile.id }).then((currUser) => {
            if(currUser)
            {
                console.log('User already exists: ' + currUser);
                done(null, currUser);
            }
            else
            {
                newUser.save().then((newUser) =>{
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                }).catch(err => console.log('Error while user creation : ' + err))
            }
        }).catch(err => console.log('Error while finding user : ' + err))
    }
))

passport.use(new LinkedinStrategy.Strategy( 
    { 
        ...LINKEDIN_KEY, 
        scope: ['r_emailaddress', 'r_liteprofile'],
        passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        console.log('In LinkedIn strategy callback');
        console.log(profile);
        // console.log('Is mentor: ' + request.query.state);
        process.nextTick(function () {
            const newUser = new UserModel({
                user_id: profile.id,
                first_name: profile.name?.givenName,
                last_name: profile.name?.familyName,
                email: profile.emails[0].value,
                image_link: profile._json?.profilePicture?.displayImage,
                oauth_provider: profile.provider,
                is_mentor: request.query.state === 'true' ? true : false,
                signup_completed: true
            })
            UserModel.findOne({ user_id: profile.id }).then((currUser) => {
                if(currUser)
                {
                    console.log('User already exists: ' + currUser);
                    done(null, currUser);
                }
                else
                {
                    newUser.save().then((newUser) =>{
                        console.log('New user created: ' + newUser);
                        done(null, newUser);
                    }).catch(err => console.log('Error while user creation : ' + err))
                }
            }).catch(err => console.log('Error while finding user : ' + err))
        });
    }
 ))