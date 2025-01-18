import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const tempUserSchema = new mongoose.Schema({
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
    }
}, {timestamps: true})

export const TempUser = mongoose.model("TempUser", tempUserSchema)