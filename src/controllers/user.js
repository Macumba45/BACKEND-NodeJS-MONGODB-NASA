import User from "../models/user.js";

const getUserList = async () => {

    const userList = await User.find();
    return userList

}

const getUserId = async (id) => {

    const userId = await User.findById(id)
    return userId
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email })
    return user
}


const createUser = async ({ name, email }) => {

    const user = new User({ name, email });
    return user.save();

}

const updateUser = async (id, data) => {

    const userUpdate = await getUserId(id);
    await userUpdate.updateOne(data)
    return data
}

const deleteUser = async ({ id }) => {
    await User.findOneAndRemove(id)
    return true
}

export { getUserList, getUserId, getUserByEmail, createUser, updateUser, deleteUser }