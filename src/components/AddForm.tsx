"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addAction } from "@/src/utlis/addAction";

const AddForm = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    link: "",
    description: "",
    imageFile: null as File | null,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;
      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image greater than 1MB is not allowed.");
      } else {
        setFormData((prev) => ({ ...prev, imageFile: file }));
        setImageURL(URL.createObjectURL(file));
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("link", formData.link);
    data.append("description", formData.description);

    const { error, success } = await addAction(data);

    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      router.push("/");
      setFormData({
        name: "",
        price: "",
        link: "",
        description: "",
        imageFile: null,
      });
      setImageURL("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5"
    >
      {imageURL && (
        <Image
          src={imageURL}
          alt="Product preview"
          width={1000}
          height={1000}
          className="max-w-full max-h-72 object-cover object-center rounded-lg"
        />
      )}

      <div className="flex flex-col w-full">
        <label>Product Image:</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>

      <div className="flex flex-col w-full">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter the product name"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>

      <div className="flex flex-col w-full">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter the product price"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>

      <div className="flex flex-col w-full">
        <label>Seller's Link:</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Link to where buyers can find you"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>

      <div className="flex flex-col w-full">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter the product description"
          rows={4}
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer"
      >
        Add product
      </button>
    </form>
  );
};

export default AddForm;
