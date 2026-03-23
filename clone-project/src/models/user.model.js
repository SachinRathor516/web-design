const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true ,'Username is required'],
        unique: [true ,'username is already exist ']
    },
    email:{
        type: String,
        unique: [true , 'Email already exist'],
        required: [true , 'Email is required']
    },
    password:{
        type: String,
        required: [true , 'password is required'],   
    },
    bio: String,
    profile_pic:{
        type: String,
        default:'https://ik.imagekit.io/wtb3p0fvu/default_image.avif?updatedAt=1774166409247'
    }
})

const userModel = mongoose.model('users' , userSchema)

module.exports = userModel