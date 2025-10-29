const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Users = require('../../models/Users.js');
const auth = require('../../middleware/auth.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtToken = config.get('jwtToken')

router.post('/login',
    [
        check('email').isEmail().withMessage('give valid email'),
        check('password').isLength({min: 4, max:18}).withMessage("password must have atleast 6 chars")
    ], 
    async (req, res)=>{
        const errors = validationResult(req.body);
        const {email, password} = req.body;
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        try {
            let user = await Users.findOne({email: email})
            if(!user)
                return res.status(400).json({msg: "user dosen't exists"})
            
            const didMatch = await bcrypt.compare(password, user.password);
            if(!didMatch) {
                return res.status(400).json({msg: "incorrect password"});
            }
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
        } catch(err) {
            return res.send("")
        }
    }
);

module.exports = router;