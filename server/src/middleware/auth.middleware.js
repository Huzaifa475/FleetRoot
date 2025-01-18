import { User } from "../models/user.model.js"
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");

        if(!token){
            throw new apiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new apiError(401, "Invalid access Token")
        }

        req.user = user
        next()

    } catch (error) {
        throw new apiError(405, "Invalid accessToken" || error?.msg)
    }
})