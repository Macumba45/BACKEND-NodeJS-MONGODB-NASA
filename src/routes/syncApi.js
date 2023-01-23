import { Router } from "express";
import { apiCallApod } from "../services/api.js";
const routerApodsApi = Router();

routerApodsApi.get('/', async (req, res) => {
    try {

        const apods = await apiCallApod()
        res.status(200).json(apods)
    } catch (error) {
        res.status(500).json('No new documents found')
    }
})


export default routerApodsApi