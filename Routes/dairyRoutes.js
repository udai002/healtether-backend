const express = require('express');
const dairy = require('../models/dairy');


const router = express.Router()


class dairyRoutes {

    //get all users
    static async getAllDairies(req, res) {
        try {
           const data = await dairy.find()
           res.send(data)
        } catch (e) {
            res.status(500).send({ message: "something went wrong", e })
        }

    }

    //get user by id
    static async getDairyById(req, res) {
        const dairyId = req.params.id
        try {
            const data = await dairy.findOne({dairyId})
            res.send(data)
        } catch (e) {
            res.status(500).send({ message: "something went wrong", e })
        }

    }

    // to create a new user
    static async createDairy(req, res) {
        const dairyData = req.body
    
            dairy.create(dairyData).then(()=>{
                res.send(dairyData)
            }).catch(e=>{
                res.status(500).send({message:"Something went wrong" , e})
            })
       
        
    }

    //update user data
    static async updateDairy(req , res){
        const dairyData = req.body;
        const dairyId = req.params.id;
        try {
          const updateDairy = await dairy.findOneAndUpdate({dairyId} , dairyData)
          if (!updateDairy) {
            res.status(404).send({ message: "dairy not found" })
        }
        res.send({ message: "dairy data updated" })
        } catch (e) {
            res.status(500).send({ message: "something went wrong", e })
        }

    }

    //delete user 
    static async deleteDairy(req, res) {
       const dairyId = req.params.id 
        try{
           const deleteData = await dairy.findOneAndDelete({dairyId})
           if(!deleteData){
            res.status(404).send({message:"dairy not found"})
           }
           res.send({message:"successfully deleted"})
        }catch(e){
            res.status(500).send({message:"Something went wrong" , e})
        }
        
    }
}

router.get('/', dairyRoutes.getAllDairies);
router.get('/:id', dairyRoutes.getDairyById);
router.post('/', dairyRoutes.createDairy)
router.put('/:id', dairyRoutes.updateDairy)
router.delete('/:id', dairyRoutes.deleteDairy)


module.exports = router;