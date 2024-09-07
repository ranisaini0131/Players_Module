import { Router } from "express";
import { deleteHostel, getAllHostel, getHostelById, loginHostel, registerHostel, updateHostelProfile } from "../controllers/hostel.js";


const router = Router()

router.post("/registerHostel", registerHostel)

router.post("/loginHostel", loginHostel)

router.get("/getHostelById", getHostelById)

router.get("/getAllPlayer", getAllHostel)

router.patch("/updatePlayer/:id", updateHostelProfile)

router.delete("/deletePlayer", deleteHostel)


export default router