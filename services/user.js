import User from "../models/user.js";

export const addUser = async (email, givenName, familyName, password) => {
    try {
        const user = new User({ email, givenName, familyName, password });

        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error adding user: ' + error.message);
    }
}

// export const checkAccount = async (email, password) => {
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return 0;
//         }

//         const isMatch = await user.isCheckPassword(password)
//         if (!isMatch) {
//             return 1;
//         }

//         return 2;
//     } catch (error) {
//         console.error(error);
//         return 3;
//     }
// }