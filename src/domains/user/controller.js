const createToken = require("./../../utili/createToken")
const { hashData, verifyHashedData } = require('../../utili/hashData');
const User = require('./model')

const authenticateUser = async (data) => {
    try {
        const { email, password} = data;
        const fetchedUser = await User.findOne({
            email });

            if (!fetchedUser) {
                throw Error('User not found')
            }
      
            const hashedPassword = fetchedUser.password;
            const passwordMatch = await verifyHashedData(password, hashedPassword)
              
            if (!passwordMatch) {
                throw Error('Invalid password')
            }

            const tokenData = { userId: fetchedUser._id,
                email };
            const token = await createToken(tokenData);
            fetchedUser.token = token;
            return fetchedUser;
    } catch (error) {
        throw error
    }
}

const createNewUser = async(data) => {

    try {
        const { name, email, password } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw Error('Email already exists');
        }
        const hashedPassword = await hashData(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const createUser = await newUser.save();
        return createUser;
    } catch (error) {
        throw error
    }
}

module.exports = { createNewUser, authenticateUser }