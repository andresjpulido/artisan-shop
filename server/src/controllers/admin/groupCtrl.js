'use strict'
 
//import model from '../models/index' 

//const { user } = model;

class Group{
    
    static create(req, res) {

        const { first_name, last_name, movil, address } = req.body
        const { userId } = req.params

        return res.status(200).send("OK")
    }
 
    static modify(req, res) {
         
    }
      
}

export default Group;