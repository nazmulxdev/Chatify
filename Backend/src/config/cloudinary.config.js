import { v2 as cloudinary } from "cloudinary";
import { envFiles } from "./env.js";
cloudinary.config({
  cloud_name: envFiles.CLOUDINARY_CLOUD_NAME,
  api_key: envFiles.CLOUDINARY_API_KEY,
  api_secret: envFiles.CLOUDINARY_API_SECRET,
});

export default cloudinary;
