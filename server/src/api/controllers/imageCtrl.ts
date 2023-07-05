'use strict'
import { Request, Response, NextFunction } from "express";
import model from '../../models/index'
 
const fs = require("fs");

const { image } = model;
import uploads from "../middlewares/cloudinary";

export default class ImageController {

    static async create(req: Request, res: Response, next: NextFunction) {
        console.log("req.body", req.body)
        console.log("req.file", req.files)
        console.log("req.files", req.body.files);

        const uploader = async (path) => { 
            return await uploads(path, "Images"); 
          };

          let urls = [];
          const files:any = req.files;
          for (const file of files) {
            const { path } = file;
            let newPath = await uploader(path);
            console.log(newPath)
            urls.push(newPath);
            fs.unlinkSync(path); 
          }

 

//TODO update image url

        return res.status(200).send(urls);


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