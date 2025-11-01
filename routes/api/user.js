const express = require('express');
const route = express.Router();
const {check, validationResult} = require('express-validator');
const Users = require('../../models/Users.js');
const auth = require('../../middleware/auth.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtToken = config.get('jwtToken')

route.get('/',  async(req, res) => {
    try{
        const users = await Users.find();
        return res.status(200).json(users);
    } catch(err) {
        console.log(err);
    }
    
});

route.post('/register',
    [
        check('name').isEmpty().withMessage("name is required"),
        check('email').isEmail().withMessage('give valid email'),
        check('password').isLength({min: 4, max:18}).withMessage("password must have atleast 6 chars")
    ], 
    async (req, res)=>{
        const errors = validationResult(req.body);
        const {name, email, password} = req.body;
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        try {
            let user = await Users.findOne({email: email})
            if(!user){
                const hashedPassword = await bcrypt.hash(password, 10);
                user = new Users({
                    name,
                    email,
                    password: hashedPassword
                })
                const payload = { user: { id: user.id } };
                jwt.sign(
                    payload,
                    jwtToken,
                    { expiresIn: '1h' },
                    (err, token) => {
                        if (err) throw err;
                        return res.json({ token });
                    }
                )
            } else {
                return res.status(400).json({msg: "user already exists"})
            }
           await user.save();
        } catch(err) {
            return res.send("")
        }
    }
);

module.exports = route;