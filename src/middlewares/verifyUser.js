import { Player } from "../models/PlayerSchema.js"
import jwt from "jsonwebtoken"

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.header
            ("Authorization")?.replace("Bearer ", "")

        if (!token) {
            res.status(402).json({
                status: "failed",
                message: "Unauthorized request"
            })
        }

        //verify Token

        const decodedTokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const player = await Player.findById(decodedTokenInfo.id)

        if (!player) {
            res.status(404).json({
                status: "failed",
                message: "Invalid Access Token"
            })
        }

        req.user = player
        next()


    } catch (error) {
        res.status(401).json({
            status: "failed",
            error: error?.message,
            message: "Invalid Access Tokening",
        })
    }
}