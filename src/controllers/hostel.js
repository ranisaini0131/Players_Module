import { Hostel } from "../models/HostelSchema.js"

const registerHostel = async (req, res) => {
    try {

        //get user details from frontend
        const { hostelName, hostelType, address, intake, description, status } = req.body


        //validation
        if (!(hostelName || hostelType || address || intake || description || status)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all fields",
            })
        }

        //check if user already exists or not
        const existedHostel = await Hostel.findOne({ hostelName })

        if (existedHostel) {
            return res.status(409).json({
                status: "failed",
                message: "Hostel already exists"
            })
        } else {
            const newHostel = new Hostel({
                hostelName,
                hostelType,
                address,
                intake,
                description,
                status
            })
            await newHostel.save()


            if (!newHostel) {
                return res.status(500).json({
                    status: 'error',
                    message: "something went wrong while registering the Hostel"
                })
            } else {
                //return response
                return res.status(200).json({
                    status: "success",
                    message: "Hostel Registered successfully",
                    newHostel
                })
            }
        }

    } catch (error) {
        console.log(error)
    }
}


const loginHostel = async (req, res) => {
    try {
        const { hostelName } = req.body

        //validation
        if (!hostelName) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide hostel name",
            })
        }

        //check existed user
        const existedHostel = await Hostel.findOne({ hostelName })

        if (!existedHostel) {
            return res.status(401).json({
                status: "failed",
                message: "Hostel does not exist"
            })
        } else {

            //return response 
            return res
                .status(200)
                .json({
                    status: 'success',
                    message: "Hostel Login Successfully"
                })
        }

    } catch (error) {
        console.log("Error: ", error.message)
    }
}

const getHostelById = async (req, res) => {
    try {
        const { id } = req.body

        const hostel = await Hostel.findById(id)
        return res
            .status(200)
            .json({
                status: "success",
                data: hostel
            })

    } catch (error) {
        console.log("Error:", error.message)
    }
}

const getAllHostel = async (req, res) => {
    try {
        const hostel = await Hostel.findOne()

        return res
            .status(200)
            .json({
                status: "success",
                data: hostel
            })


    } catch (error) {
        console.log("Error:", error.message)
    }
}

const updateHostelProfile = async (req, res) => {
    try {
        const { id } = req.params

        const updatedHostel = await Hostel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )


        return res
            .status(200)
            .json({
                status: "success",
                data: updatedHostel
            })

    } catch (error) {
        console.log("Error:", error.message)
    }
}


const deleteHostel = async (req, res) => {
    try {

        const { id } = req.body

        const deletedHostel = await Hostel.findByIdAndDelete(id)

        return res
            .status(200)
            .json({
                status: "success",
                deletedHostel,

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
    registerHostel,
    loginHostel,
    getHostelById,
    getAllHostel,
    updateHostelProfile,
    deleteHostel
}