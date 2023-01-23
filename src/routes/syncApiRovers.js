import { Router } from "express";
import { apiCallRovers } from "../services/api.js";
const routerApiRovers = Router();

routerApiRovers.get('/', async (req, res) => {
    try {

        const apods = await apiCallRovers()
        res.status(200).json(apods)
    } catch (error) {
        response.status(500)
    }
})



export default routerApiRovers