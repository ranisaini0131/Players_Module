import mongoose from "mongoose";
import { Schema } from "mongoose";

//naming convention

const playerSchema = new Schema(

    {
        playerId: {
            type: String,
            unique: true,

        },

        userId: {
            type: String,
            required: true
        },

        playerName: {
            type: String,
            required: true

        },

        sports: {
            type: String,
            unique: true,
            required: true
        },
        status: {
            type: Boolean,
            require: true
        }
    },
    {
        timestamps: true
    }
)


export const Player = mongoose.model("Player", playerSchema)

