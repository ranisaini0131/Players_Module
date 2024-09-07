import mongoose from "mongoose";
import { Schema } from "mongoose";

//naming convention

const hostelSchema = new Schema(

    {
        hostelId: {
            type: String,
            unique: true,

        },

        userId: {
            type: String,
            // required: true
        },

        hostelName: {
            type: String,
            unique: true,
            required: true

        },

        hostelType: {
            type: String,
            enum: ['Girls', 'Boys'],
            required: true

        },

        address: {
            type: String,
            required: true
        },

        intake: {
            type: Number,
            required: true

        },

        description: {
            type: String,
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


export const Hostel = mongoose.model("Hostel", hostelSchema)

