import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export default function uploads (file, folder) {
  return new Promise(resolve => {
    
    return cloudinary.uploader.upload(file, (result) => {
      console.log("sending " , result)
      return resolve({
        url: result.url,
        id: result.public_id
      })
    }, {
      resource_type: "auto",
      folder: folder
    })
  })
}
 