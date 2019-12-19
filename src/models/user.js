const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

const userSchema = new mongoose.Schema({    
name: {
    type: String,
    required: true,
    trim: true
},
password: {
    type: String,
    required: true,
    trim: true,
    // could use, minlength: 7
    validate(value) {
        if (value <= 6 || value.toLowerCase().includes('password')) {
            throw new Error('Password must be greater than 6 characters and cannot contain the word "password"')
        } 
    }
},
email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Invalid email')
        }
    }
},
age: {
    type: Number,
    default: 0,
    validate(value) {
        if (value < 0) {
            throw new Error('Age cannot be negative')
        }
    }
},
tokens: [{
    token: {
        type: String,
        required: true
    }
}],
avatar: {
    type: Buffer
}
}, {
    timestamps: true
})


userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    // Removes info from response 
    delete userObject.password
    delete userObject.token
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Deletes all user's tasks when user is deleted
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

User.createIndexes()

module.exports = User
