import { Router } from 'express';
import { getUserList, getUserId, createUser, updateUser, deleteUser } from '../controllers/user.js';
const routerUser = Router()

routerUser.get('/', async (req, res) => {
    try {
        const users = await getUserList()
        res.status(200).json(users)
    } catch (error) {
        response.status(500)
    }
})


routerUser.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getUserId(id)
        res.status(200).json(task)
    } catch (error) {
        response.status(500)
    }
});


routerUser.post('/', async (req, res) => {

    try {
        const bodyData = req.body
        console.log(bodyData)
        const apod = await createUser(bodyData)
        res.status(200).json(apod)

    } catch (error) {
        console.log(error)
        res.status(500).json('User already exists')
    }
})

routerUser.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const task = await updateUser(id, data)
        res.status(200).json(task)
    } catch (error) {
        console.log(error)
        res.status(500).json('User update failed')
    }
});

routerUser.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params
        await deleteUser(id)
        res.status(200).json('User deleted successfully')

    } catch (error) {
        response.status(500)
    }


});



export default routerUser

