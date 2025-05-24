"use server";

import { connectBD } from "@/src/db/connectDB";
import cloudinary from "./cloudinary";
import Product from "@/src/models/product.model";

export async function addAction(formData: FormData) {
  try {
    console.log("=== Starting addAction ===");
    
    const image = formData.get("image");
    const name = formData.get("name");
    const price = formData.get("price");
    const link = formData.get("link");
    const description = formData.get("description");
    
    console.log("Form data received:", {
      image: image instanceof File ? `File: ${image.name} (${image.size} bytes)` : image,
      name,
      price,
      link,
      description: description ? `${description.toString().substring(0, 50)}...` : description
    });

    // Validation des champs
    if (!image || !name || !price || !link || !description) {
      return { error: "All fields are required." };
    }

    if (!(image instanceof File)) {
      return { error: "Image must be a valid file." };
    }

    // Validation du prix
    const priceValue = parseFloat(price as string);
    if (isNaN(priceValue) || priceValue <= 0) {
      return { error: "Price must be a valid positive number." };
    }

    // Validation de l'URL
    try {
      new URL(link as string);
    } catch {
      return { error: "Link must be a valid URL." };
    }

    // Vérification de la taille du fichier (max 10MB)
    if (image.size > 10 * 1024 * 1024) {
      return { error: "Image size must be less than 10MB." };
    }

    // Vérification du type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      return { error: "Only JPEG, PNG and WebP images are allowed." };
    }

    // Vérification de la configuration Cloudinary
    console.log("Checking Cloudinary configuration...");
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Missing Cloudinary environment variables:", {
        CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET
      });
      return { error: "Cloudinary configuration is missing." };
    }

    // Connexion à la base de données avec gestion d'erreur
    console.log("Connecting to database...");
    try {
      await connectBD();
      console.log("Database connected successfully");
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return { error: "Database connection failed." };
    }

    // Conversion de l'image en Buffer
    let buffer: Buffer;
    try {
      const arrayBuffer = await image.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } catch (bufferError) {
      console.error("Buffer conversion error:", bufferError);
      return { error: "Failed to process image file." };
    }

    // Upload vers Cloudinary avec timeout
    console.log("Starting Cloudinary upload...");
    let imageResponse: any;
    try {
      imageResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "YOUNOUSS",
            transformation: [
              { width: 1000, height: 1000, crop: "limit" },
              { quality: "auto" }
            ]
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(new Error(`Cloudinary upload failed: ${error.message}`));
            }
            if (!result) {
              return reject(new Error("No result from Cloudinary"));
            }
            console.log("Cloudinary upload successful");
            resolve(result);
          }
        );
        
        uploadStream.end(buffer);
        
        // Timeout après 30 secondes
        setTimeout(() => {
          reject(new Error("Upload timeout"));
        }, 30000);
      });
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      return { error: "Failed to upload image. Please try again." };
    }

    // Sauvegarde en base de données
    try {
      const newProduct = await Product.create({
        image: imageResponse.secure_url,
        name: (name as string).trim(),
        price: priceValue,
        link: (link as string).trim(),
        description: (description as string).trim(),
      });

      console.log("Product created successfully:", newProduct._id);
      
      return {
        success: "Product added successfully."
      };
    } catch (dbSaveError: any) {
      console.error("Database save error:", dbSaveError);
      
      // Supprimer l'image de Cloudinary si la sauvegarde échoue
      try {
        const publicId = imageResponse.public_id;
        await cloudinary.uploader.destroy(publicId);
      } catch (cleanupError) {
        console.error("Failed to cleanup image:", cleanupError);
      }
      
      // Messages d'erreur spécifiques selon le type d'erreur
      if (dbSaveError.code === 11000) {
        return { error: "A product with this name already exists." };
      }
      
      return { error: "Failed to save product to database." };
    }

  } catch (error: any) {
    console.error("Unexpected error in addAction:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}