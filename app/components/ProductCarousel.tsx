// components/ProductCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "./Product";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image_url: string;
}



export default function ProductCarousel() {

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
    <div className="max-w-4xl mx-auto max-h-30">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="my-6"
      >
        {products.map((product : Product) => (
          <SwiperSlide key={product.id} className="max-h-1/3">
            <Product id={product.id} name={product.name} price={product.price} description={product.description} image_url={product.image_url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
