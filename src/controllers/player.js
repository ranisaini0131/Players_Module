import jwt from "jsonwebtoken"
import { Player } from "../models/PlayerSchema.js"


const registerPLayer = async (req, res) => {
    try {

        //get user details from frontend
        const { playerName, sports, status } = req.body


        //validation
        if (!(playerName || sports || status)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all fields",
            })
        }

        //check if user already exists or not
        const existedPlayer = await Player.findOne({ playerName })

        if (existedPlayer) {
            return res.status(409).json({
                status: "failed",
                message: "Player already exists"
            })
        } else {
            const newPlayer = new Player({
                playerName,
                sports,
                status
            })
            await newPlayer.save()


            if (!newPlayer) {
                return res.status(500).json({
                    status: 'error',
                    message: "something went wrong while registering the Player"
                })
            } else {
                //return response
                return res.status(200).json({
                    status: "success",
                    message: "Player Registered successfully",
                    newPlayer
                })
            }
        }

    } catch (error) {
        console.log(error)
    }
}


const loginPlayer = async (req, res) => {
    try {
        const { playerName } = req.body

        //validation
        if (!playerName) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide player name",
            })
        }

        //check existed user
        const existedPlayer = await Player.findOne({ playerName })

        if (!existedPlayer) {
            return res.status(401).json({
                status: "failed",
                message: "Player does not exist"
            })
        } else {
            //generate token
            const token = jwt.sign(
                {
                    id: existedPlayer._id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                }
            )


            //return response 
            return res
                .status(200)
                .json({
                    status: 'success',
                    message: "Player Login Successfully",
                    token
                })
        }

    } catch (error) {
        console.log("Error: ", error.message)
    }
}

const getPlayerById = async (req, res) => {
    try {
        const { id } = req.body

        const player = await Player.findById(id)
        return res
            .status(200)
            .json({
                status: "success",
                data: player
            })

    } catch (error) {
        console.log("Error:", error.message)
    }
}

const getAllPlayers = async (req, res) => {
    try {
        const player = await Player.find()

        return res
            .status(200)
            .json({
                status: "success",
                data: player
            })


    } catch (error) {
        console.log("Error:", error.message)
    }
}

const updatePlayerProfile = async (req, res) => {
    try {
        const { id } = req.params

        const updatedPlayer = await Player.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )


        return res
            .status(200)
            .json({
                status: "success",
                data: updatedPlayer
            })

    } catch (error) {
        console.log("Error:", error.message)
    }
}


const deletePlayer = async (req, res) => {
    try {

        const { id } = req.body

        const deletedPlayer = await Player.findByIdAndDelete(id)

        return res
            .status(200)
            .json({
                status: "success",
                deletedPlayer,

            })

    } catch (error) {
        return res
            .status(400)
            .json({
                status: "failed",
                message: error.message,

            })
    }
}


export {
    registerPLayer,
    loginPlayer,
    getPlayerById,
    getAllPlayers,
    updatePlayerProfile,
    deletePlayer
}