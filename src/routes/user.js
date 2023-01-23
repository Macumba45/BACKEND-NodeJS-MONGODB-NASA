import { Router } from 'express';
import { getUserList, getUserId, createUser, updateUser, deleteUser, updateUserFavList } from '../controllers/user.js';
const routerUser = Router()


routerUser.get('/', async (req, res) => {
    try {
        const users = await getUserList()
        res.status(200).json(users)
    } catch (error) {
        res.response.status(500)
    }
})


routerUser.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getUserId(id)
        res.status(200).json(task)
    } catch (error) {
        res.response.status(500)
    }
});


routerUser.post('/', async (req, res) => {

    try {
        const bodyData = req.body
        const user = await createUser(bodyData)
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
})

routerUser.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const task = await updateUser(id, data)
        res.status(200).json(task)
    } catch (error) {
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

routerUser.post('/favBookList/:idNasa', async (req, res) => {
    try {
        const { idNasa } = req.params
        const user = await updateUserFavList({ id: req.user.id, idNasa })
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default routerUser

