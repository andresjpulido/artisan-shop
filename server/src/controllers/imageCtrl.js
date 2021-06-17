'use strict'

import model from '../models/index'

const { image } = model;
const cloudinary = require('cloudinary')

class Image {

    static create(req, res) {
        console.log("req.body", req.body)
        console.log("req.file", req.file)
        console.log("req.files", req.body.files);

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })

        cloudinary.uploader.upload(req.file.path)
            .then(results => { 
                console.log("results", results)
            })
            .catch((err) => console.log(err))


//TODO update image url

        return res.status(200).send("ok");


        //TODO validate files

        //TODO compress IMAGES

        /*
                imageObj = {
                    "id_product": req.body.id_product,
                    "mimeType": req.file.mimetype,
                    "description": req.body.files[i].name,
                    "fileName": req.file.filename,
                    "fileData": req.body.files[i]
                }
                console.log(req.body.files[i])
                image
                    .create(imageObj, {
                        include: []
                    })
                    .then(response => {console.log("ok")})
        
        
                let imageObj = {}
        
                for (var i = 0; i < req.body.files.length; i++) {
                    console.log("fileName " , req.body.files[i].name)
                    imageObj = {
                        "id_product": req.body.id_product,
                        "mimeType": req.body.files[i].type,
                        "description": req.body.files[i].name,
                        "fileName": req.body.files[i].name,
                        "fileData": req.body.files[i]
                    }
                    console.log(req.body.files[i])
                    image
                        .create(imageObj, {
                            include: []
                        })
                        .then(response => {console.log("ok")})
                    .catch(function (err) {
                        console.log(" se petaquio esta joda", err)
                        return res.status(500).send({
                            success: 'false',
                            code: "CODE",
                            message: 'Error' + err
                        })
                    }
                    )
                }
                return res.status(200).send("ok");*/
    }

}
export default Image;