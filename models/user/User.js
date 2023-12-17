import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
 


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
})

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        next()
    } catch(error) {
        next(error)
    }
})





export default model('user', UserSchema)

