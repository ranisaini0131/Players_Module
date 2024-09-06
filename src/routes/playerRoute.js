import { Router } from "express";
import { deletePlayer, getAllPlayers, getPlayerById, loginPlayer, registerPLayer, updatePlayerProfile } from "../controllers/player.js";
import { verifyJWT } from "../middlewares/verifyUser.js"


const router = Router()

router.post("/registerPlayer", registerPLayer)

router.post("/loginPlayer", loginPlayer)

router.get("/getPlayerById", verifyJWT, getPlayerById)

router.get("/getAllPlayer", verifyJWT, getAllPlayers)

router.patch("/updatePlayer/:id", verifyJWT, updatePlayerProfile)

router.delete("/deletePlayer", verifyJWT, deletePlayer)


export default router