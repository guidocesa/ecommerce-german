"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Product from "../components/Product";

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
          <Product key={product.id} id={product.id} name={product.name} price={product.price} description={product.description} image_url={product.image_url} />

          /* Lo de arriba habria que reemplazarlo por algo asi
            {products.map((product : Product) => (
              <Product id={product.id} name={product.name} price={product.price} description={product.description} image_url={product.image_url}     />
            ))}
          */
        ))}
      </ul>
    </div>
  );
}
