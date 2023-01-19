import { Router } from "express";
import { apiCallRovers } from "../services/api.js";
const routerApodApiRovers = Router();

routerApodApiRovers.get('/', async (req, res) => {
    try {

        const apods = await apiCallRovers()
        res.status(200).json(apods)
    } catch (error) {
        console.log(error)
        response.status(500)
    }
})



export default routerApodApiRovers