import newUserModel from '../../server.js'
import mongoose from 'mongoose'
const register = async (req, res) =>{

    const existingUser = await newUserModel.findone()
}