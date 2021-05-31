const User = require('./schemas/user');

const findById = async (id) => {
    return await User.findOne({ _id: id })
};

const findByEmail = async (email) => {
    return await User.findOne({ email })
};

const create = async (userOptions) => {
    const user = new User(userOptions)
    return await user.save()
};
const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });
};

// const updateAvatar = async (id, avatar) => {
//     return await User.updateOne({ _id: id }, { avatar });
// };

//Для использования cloudinari добавляем третим параметром "idCloudAvatar"
const updateAvatar = async (id, avatarURL, idCloudAvatar = null) => {
    return await User.updateOne({ _id: id }, { avatarURL, idCloudAvatar });
};

module.exports = {
    findById,
    findByEmail,
    create,
    updateToken,
    updateAvatar
}