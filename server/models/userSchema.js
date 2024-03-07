const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keysecret = process.env.SECRET_KEY;
const UserSchema = require('./userSchema');

// Import the user model
let UserModel;

try {
    // Check if UserModel is already defined
    UserModel = mongoose.model('User');
} catch (error) {
    // If not defined, create UserModel with the schema
    const userSchema = new mongoose.Schema({
        username: String,
        email: {
            type: String,
            unique: true
        },
        password: String,
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                }
            }
        ],
        verifytoken: {
            type: String,
        }
    });

    // Hash password before saving
    userSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    });

    // Generate authentication token
    userSchema.methods.generateAuthToken = async function () {
        try {
            let token23 = jwt.sign({ _id: this._id }, keysecret, {
                expiresIn: '1d'
            });

            this.tokens = this.tokens.concat({ token: token23 });
            await this.save();
            return token23;
        } catch (error) {
            throw error; // Handle errors in calling function or middleware
        }
    };

    // Create UserModel based on the schema
    UserModel = mongoose.model('User', userSchema);
}

module.exports = UserModel;
