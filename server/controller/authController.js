const bcrypt = require('bcrypt');
const User = require('../models/user');
const  comparePassword  = require('../helpers/auth').comparePassword;
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password,confirmpassword} = req.body;

        if (!username || !email || !password || !confirmpassword) {
            return res.json({
                error: 'All fields are required',
            });
        }

        if ( password.length < 6) {
            return res.json({
                error: 'Password  should be at least 6 characters long',
            });
        }

        if (password !== confirmpassword) {
            return res.json({
                error: "Passwords don't match",
            });
        }

        const exist = await User.findOne({ email });

        if (exist) {
            return res.json({
                error: 'Email is already taken',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'An error occurred during registration',
        });
    }
};

const userById = async (req, res) => {
    try {
        const userId = req.params.id;
 
       
        const user = await User.findOne({userId});
 
        if (!user ) {
            return res.status(404).json({ error: 'user not found' });
        }
 
     
        res.send(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'An error occurred while getting the user by ID' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found:', email);
            return res.json({
                error: 'No user found',
            });
        }
       
        const isPasswordMatch = await comparePassword(password, user.password);
     

        if (isPasswordMatch) {
            const token = await user.generateAuthToken();
            console.log(token);
      
            res.cookie("jwtoken", token, {
              expires: new Date(Date.now() + 2589200000),
              httpOnly: true
            });
      
            console.log('Login successful for:', email);
            return res.json({
              message: 'Login successful',
              token,
            });
            
        } else {
            console.log('Incorrect password for:', email);
            return res.json({
                error: 'Incorrect password',
            });
        }
    } catch (error) {
        console.log('Error during login:', error);
        return res.json({
            error: 'An error occurred during login',
        });
    }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'No user found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ status: 'Token generated', token });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ status: 'Internal Server Error' });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.json({ success: 'Password updated successfully!' });
  } catch (error) {
    console.error('Error while resetting the password:', error);
    return res.status(500).json({ error: 'An error occurred while resetting the password' });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  userById
};
