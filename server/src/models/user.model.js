import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true
    },
    garageType: {
        type: Number,
        enum: [2, 4],
        required: true
    },
    contactPerson: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    oneTimePassword: {
        type: Number,
        validate: {
            validator: function(v) {
                return /^[0-9]{6}$/.test(v);
            },
            message: props => `OTP must be a 6-digit number!`
        }
    },
    oneTimePasswordExpiry: {
        type: Date,
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            contactPerson: this.contactPerson
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            contactPerson: this.contactPerson
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)