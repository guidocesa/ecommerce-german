"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("products").insert([
      {
        name,
        price: parseFloat(price),
        description,
        image_url: imageUrl,
      },
    ]);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Producto creado exitosamente");
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Crear Producto
        </button>
      </form>
    </div>
  );
}
