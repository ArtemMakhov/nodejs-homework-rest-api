const { User } = require("../models/schemas/userSchema");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const storeImage = path.join(__dirname, "public/avatars");

const changeSubscriptionController = async (req, res, next) => {
    const { subscription } = req.body;
    const { _id } = req.user;

    const newSubscription = await User.findByIdAndUpdate(
        { _id },
        { subscription },
        {
            returnOriginal: false,
        }
    );
    res.status(200).json({ subscription: newSubscription });

}
// const changeUserSubscription = async (subscription, _id) => {
//     const changeUser = await User.findByIdAndUpdate(
//         { _id },
//         { subscription },
//         { returnOriginal: false }
//     );
//     return changeUser.subscription;
// }

const changeAvatarController = async (req, res, next) => {
    try {
        const { path: temporaryFilePath, originalname } = req.file;
        const { _id } = req.user;
        const newFileName = nanoid() + path.extname(originalname);
        const newFilePath = path.join(storeImage, newFileName);

        const file = await Jimp.read(temporaryFilePath);
        file.resize(250, 250).write(temporaryFilePath);

        await fs.rename(temporaryFilePath, newFilePath);
        const avatarURL = path.join("avatars", newFileName);
        
        const newAvatar = await User.findByIdAndUpdate(
            { _id },
            { avatarURL: avatarURL },
            {returnOriginal: false}
        )
        res.status(200).json({ newAvatar });
    
} catch (error) {
    
}
}

// const changeUserAvatar = async (avatar, _id) => {
//     const changeUser = await User.findByIdAndUpdate(
//         { _id },
//         { avatarURL: avatar },
//         {
//             returnOriginal: false,
//         }
//     );
//     return changeUser.avatarURL;
// }

module.exports = {
    changeAvatarController,
    changeSubscriptionController,
}