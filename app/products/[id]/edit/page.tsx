"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function UpdateProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error al obtener el producto:", error);
      } else {
        setProduct({
          name: data.name,
          price: data.price.toString(),
          description: data.description,
          image_url: data.image_url,
        });
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("products").update({
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      image_url: product.image_url,
    }).eq("id", id);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Producto actualizado exitosamente");
      router.push("/products");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="border p-2 w-full mb-4"
          required
        />
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="text"
          value={product.image_url}
          onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
}
