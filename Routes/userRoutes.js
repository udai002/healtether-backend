const express = require('express');
const user = require('../models/user');
const router = express.Router()
const bcrypt = require('bcrypt');

class UserRoutes {

    //get all users
    static async getUsers(req, res) {
        try {
            const users = await user.find({} ,  { password: 0 })
            res.send(users)
        } catch (e) {
            res.status(500).send({ message: "something went wrong", e })
        }

    }

    //get user by id
    static async getUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = await user.findOne({ userId })
            res.send(userData)
        } catch (e) {
            res.status(500).send({ message: "something went wrong", e })
        }

    }

    // to create a new user
    static async createUser(req, res) {
        const newUser = req.body;
        let isExsist = false
        const { username, email, password } = newUser
        const userCheck = await user.findOne({ email })
        const hashPassword = await bcrypt.hashSync(password,10)
        if (!userCheck) {
            user.create({
                username,
                email,
                password:hashPassword
            }).then(() => {
                res.json({ message: 'Created user', user: newUser });
            }).catch(e => {
                console.log(e)
                res.status(500).send({ message: "something went wrong", e })
            })
        } else {
            res.status(400).send({ message: "user already exists" })
        }
    }

    //update user data
    static async updateUser(req, res) {
        const userId = req.params.id;
        const updatedUser = req.body;
        try {
            const userUpdated = await user.findOneAndUpdate({userId},updatedUser)
            if (!userUpdated) {
                res.status(404).send({ message: "User not found" })
            }
            res.send({ message: "user data updated" })
        } catch (e) {
            res.status(500).send({ message: "something went wrong", e })
        }

    }

    //delete user 
    static async deleteUser(req, res) {
        const userId = req.params.id;
        try{
            const userDelete = await user.findOneAndDelete({userId})
           
            if(!userDelete){
                res.status(404).send({message:"user not found"})
            }

            res.send({message:"user deleted"})
        }catch(e){
            res.status(500).send({message:"Something went wrong" , e})
        }
        
    }
}

router.get('/', UserRoutes.getUsers);
router.get('/:id', UserRoutes.getUser);
router.post('/', UserRoutes.createUser)
router.put('/:id', UserRoutes.updateUser)
router.delete('/:id', UserRoutes.deleteUser)


module.exports = router;