import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtHelper.js";
import User from "../models/userModel.js";
import { registerValidation, loginValidation, userInfoValidation } from "../validators/userValidation.js";



export const registerUser = async (req,res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message });

    const {email, password, firstName, lastName } = req.body;

    try{
        const existingUser = User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'user already exists'})

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({email, password: hashedPassword, firstName, lastName});
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }catch (error){
        res.status(500).json({error: 'server error'});
    }
};

export const loginUser = async (req,res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    const {email, password} = req.body;

    try{
        const user = User.findOne({email});
        if(!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = generateToken(user._id);
        res.json({token});

    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
};

export const getAllUsers = async (req,res) => {
    try{
        const users = await User.find().select('-password');
        res.json({users});

    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
};

export const createUser = async (req,res) => {

    const {error} = userInfoValidation(req.body);
    if(error) return res.status().json({message: error.details[0].message});

    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }catch(error){
        res.status().json({message: 'server error'});
    }
};

export const getUserById = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateUserById = async (req, res)=>{
    const { error } = userInfoValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // If password is being updated, hash it
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update user fields
    Object.assign(user, req.body);
    await user.save();

    // Prepare the response without the password
    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUserById = async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        res.json({ message: 'User deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }
};

