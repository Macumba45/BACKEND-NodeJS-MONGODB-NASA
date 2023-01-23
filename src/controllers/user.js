import User from "../models/user.js";

const getUserList = async () => {

    const user = await User.find();
    return user

}

const getUserId = async (id) => {

    const user = await User.findById(id)
    return user
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email })
    return user
}

const createUser = async ({ name, email, password }) => {

    const user = new User({ name, email, password });
    return user.save();

}

const updateUser = async (id, data) => {

    const user = await getUserId(id);
    await user.updateOne(data)
    return data
}

const deleteUser = async ({ id }) => {
    await User.findOneAndRemove(id)
    return true
}

const updateUserFavList = async ({ id, idNasa }) => {
    const user = await getUserId(id);
    const currentFavList = user.favList
    let newFavsList = currentFavList

    const existed = currentFavList.includes(idNasa)

    if (existed) {
        newFavsList = currentFavList.filter(item => item !== idNasa)
    } else {
        newFavsList.push(idNasa)
    }

    await User.findByIdAndUpdate(id, { favList: newFavsList })

    let userUpdate = await getUserId(id)
    console.log(userUpdate)
    userUpdate = JSON.parse(JSON.stringify(userUpdate))

    const { password, salt, ...userUpdate_ } = userUpdate;

    return userUpdate_
}


export { getUserList, getUserId, getUserByEmail, createUser, updateUser, deleteUser, updateUserFavList }