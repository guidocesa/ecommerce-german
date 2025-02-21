"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}

const handleDelete = async (productId: string) => {
  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) {
    console.error("Error al eliminar el producto:", error);
  } else {
    // Actualiza la UI (por ejemplo, refetch los productos)
  }
}
export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error al obtener productos:", error);
      } else {
        setProducts(data as Product[]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {product.image_url && (
              <img src={product.image_url} alt={product.name} className="w-full h-auto" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
