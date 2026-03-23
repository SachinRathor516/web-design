const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function registerController(req, res) {
    const { username, email, password, bio, profile_pic } = req.body

    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserExist) {
        return res.status(409).json({
            message: 'User already exist ' + (isUserExist.email ==
                email ? 'email already exist' : 'username already exist')
        })
    }

    const hash = await bcrypt.hash(password , 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profile_pic,
    })

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)

    res.status(201).json({
        message: 'user register successfully',
        user:{username: user.username,
        email: user.email,
        bio: user.bio,
        profile_pic: user.profile_pic}
    })

}
async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: 'user not found'
        })
    }

    
    const isPassword = await bcrypt.compare(password , user.password)

    if (!isPassword) {
        return res.status(401).json({
            message: 'invalid password'
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)


    res.status(200).json({
        message: 'user login successfully',
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_pic: user.profile_pic
        }

    })
}


module.exports = {
    registerController,
    loginController
}

