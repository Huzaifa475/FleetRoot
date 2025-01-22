import { TempUser } from "../models/tempUser.model.js"
import { User } from "../models/user.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import crypto from "crypto"

const generateRefreshAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = await user.generateAccessToken()
        
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(501, "Server error while generating access and refresh tokens")
    }
}

// const register = asyncHandler(async(req, res) => {

//     const {firmName, garageType, contactPerson, contactNumber} = req.body

//     if(!firmName.trim() || !garageType || !contactPerson.trim() || !contactNumber){
//         throw new apiError(400, 'Please provide all required fields')
//     } 

//     const isUserExists = await User.findOne({contactNumber})

//     if(isUserExists){
//         throw new apiError(403, 'User already exists')
//     }
    
//     const otp = 123456
    
//     const tempUserRecord = await TempUser.create({
//         firmName,
//         garageType,
//         contactPerson,
//         contactNumber,
//         oneTimePassword: otp,
//         oneTimePasswordExpiry: Date.now() + 5 * 60 * 1000
//     });
    
//     const tempUser = await TempUser.findById(tempUserRecord?._id).select("-oneTimePassword -oneTimePasswordExpiry")
    
//     // await sendOtpToPhone(contactNumber, otp)
//     return res
//     .status(200)
//     .json(new apiResponse(200, tempUser, "OTP send successfully"))
// })
const register = asyncHandler(async (req, res) => {
    const { firmName, garageType, contactPerson, contactNumber } = req.body;

    if (!firmName.trim() || !garageType || !contactPerson.trim() || !contactNumber) {
        throw new apiError(400, 'Please provide all required fields');
    }

    const isUserExists = await User.findOne({ contactNumber });
    // if (isUserExists) {
    //     throw new apiError(403, 'User already exists');
    // }

    //const otp = crypto.randomInt(100000, 999999);
    const otp = 123456; 
    const otpExpiry = Date.now() + 5 * 60 * 1000; 

    const existingTempUser = await TempUser.findOne({ contactNumber });
    if (existingTempUser) {
        await TempUser.findOneAndUpdate(
            { contactNumber },
            { 
                oneTimePassword: otp,
                oneTimePasswordExpiry: otpExpiry
            },
            { new: true } 
        );
    } else {
        await TempUser.create({
            firmName,
            garageType,
            contactPerson,
            contactNumber,
            oneTimePassword: otp,
            oneTimePasswordExpiry: otpExpiry
        });
    }

    const tempUser = await TempUser.findOne({ contactNumber }).select("-oneTimePassword -oneTimePasswordExpiry");

    // await sendOtpToPhone(contactNumber, otp)

    return res
        .status(200)
        .json(new apiResponse(200, tempUser, "OTP sent successfully"));
});

const verifyOtpRegister = asyncHandler(async(req, res) => {

    const {contactNumber, otp} = req.body
    if(!otp){
        throw new apiError(400, 'Please enter OTP')
    }

    if (!contactNumber) {
        throw new apiError(500, 'Please send contact number');
    }

    const tempUser = await TempUser.findOne({ contactNumber });

    if (!tempUser) {
        throw new apiError(404, 'Temporary user not found');
    }

    if (tempUser.oneTimePassword.toString() !== otp) {
        throw new apiError(400, 'Invalid OTP');
    }

    if (tempUser.oneTimePasswordExpiry < Date.now()) {
        throw new apiError(400, 'OTP Expired');
    }

    const isUserExists = await User.findOne({ contactNumber });
    if (isUserExists) {
        throw new apiError(403, 'User already exists');
    }

    const newUser = await User.create({
        firmName: tempUser.firmName.trim(),
        garageType: tempUser.garageType,
        contactPerson: tempUser.contactPerson.trim(),
        contactNumber: tempUser.contactNumber,
    });

    await TempUser.deleteOne({ contactNumber })

    const createdUser = await User.findById(newUser._id)

    if (!createdUser) {
        throw new apiError(501, 'Server error while creating the user')
    }

    const {refreshToken, accessToken} = await generateRefreshAccessToken(createdUser?._id)

    const loggedInUser = await User.findById(createdUser?._id).select("-oneTimePassword -oneTimePasswordExpiry -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, {createdUser: loggedInUser, refreshToken, accessToken}, 'User created successfully'))
})

const login = asyncHandler(async(req, res) => {

    const {contactNumber} = req.body

    if(!contactNumber){
        throw new apiError(400, 'Please provide contact number')
    }

    const user = await User.findOne({contactNumber})

    if(!user){
        throw new apiError(400, 'User does not exists, Please Register!!')
    }

    //const otp = crypto.randomInt(100000, 999999);
    const otp = 123456

    user.oneTimePassword = otp
    user.oneTimePasswordExpiry = Date.now() + 5 * 60 * 1000
    await user.save()
    // await sendOtpToPhone(contactNumber, otp)

    return res
    .status(200)
    .json(new apiResponse(200, "OTP send successfully"))
})

const verifyOtpLogin = asyncHandler(async (req, res) => {

    const {contactNumber, otp} = req.body

    if(!otp){
        throw new apiError(400, 'Please enter OTP')
    }

    if(!contactNumber){
        throw new apiError(500, 'Please provide the contact Number')
    }

    const user = await User.findOne({contactNumber})

    if(!user){
        throw new apiError(400, 'User not found')
    }

    if(user.oneTimePassword.toString() !== otp){
        throw new apiError(400, 'Invalid OTP')
    }

    if(user.oneTimePasswordExpiry < Date.now()){
        throw new apiError(400, 'OTP Expired')
    }

    user.oneTimePassword = undefined
    user.oneTimePasswordExpiry = undefined
    await user.save()

    const {refreshToken, accessToken} = await generateRefreshAccessToken(user?._id)

    const loggedInUser = await User.findById(user?._id).select("-oneTimePassword -oneTimePasswordExpiry -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, {user: loggedInUser, refreshToken, accessToken}, "User loggedIn successfully"))
})

const logout = asyncHandler(async(req, res) => {

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: null
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, "User logged out successfully"))
})

export {register, verifyOtpRegister, login, verifyOtpLogin, logout}