const express = require('express');
const { createNewUser, authenticateUser } = require('./controller');
const router = express.Router();

const auth = require('./../../middleware/auth')

router.get('/get', (req,res) => {
    res.send('Hello backend testing')
})

router.get("/private_data", auth, (req, res)=> {
    res.status(200).send(`you r in private territory of ${req.currentUser.email}`)
})

router.post("/", async (req, res) => {
    try {
        let { email, password} = req.body;
        email = email.trim()
        password = password.trim()

        if (!(email && password)) {
            throw Error("empty credentials is supplied")
        }
      
        const authenticatedUser = await authenticateUser({
            email, password
        });

        res.status(200).json(authenticatedUser)

    } catch (error) {
        res.status(400).send(error)
    }
})


router.post("/signup", async (req, res) => {
    try {
        let {name, email, password} = req.
        body;
        name = name.trim()
        email = email.trim()
        password = password.trim()

        if(!(name && email && password)){
            throw Error("empty input fields")
        }else{
            const newUser = await createNewUser({
                name,
                email,
                password,
            });
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;