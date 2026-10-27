
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        avatar: {
            type: String, // URL of the avatar image
            required: true,
        },

        coverImage: {
            type: String, // URL of the cover image
        },

        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video',
            }
        ],

        password: {
            type: String,
            required: [true, "Password is required"] 
        },

        refreshToken: {
            type: String,
        }
    },
    {
         timestamps: true 
        }
    )

// password ho encrypt form mai database mai save krna

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})    

// userSchema.pre("save", ) ka matlab hai ki humare mongoose mai data save hone se 
// turant phele password ko hash (encrypt) kr de 
// password ko hash hum bcrypt library se kr sakte hai or whai use ho rehi hai

// sath mai this.password wali line in easy way  
// oldPassword = this.password;
// hashedPassword = hash(oldPassword);
// this.password = hashedPassword;



// password ko check krna correct hai ya fir nai

userSchema.methods.isPasswordCorrect = async function
 (password) {

   return await bcrypt.compare(password, this.password)
}

// .methods means hum iski help se apna koe b method bna sakte hai
// jaise humne isPasswordCorrect wala bnaya hai or us method mai ek function
// lga diya jo user ke password ko purane walee password se compare krega

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// isme access token genrate krke deta hai

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// isme refresh token generate krke deta hai 

export const User = mongoose.model("User", userSchema)