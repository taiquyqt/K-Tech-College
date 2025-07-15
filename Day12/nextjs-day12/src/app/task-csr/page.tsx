'use client';

import React, { useEffect, useState } from 'react'
import { Product } from '../types/index';

export default function TaskCsr() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetch('https://server.aptech.io/online-shop/products').then((res) => res.json()).then((data) => setProducts(data));
    }, []);
  return (
    <div>
        <h1 className="text-2xl font-bold text-yellow-500 pl-10 p-5">Task CSR</h1>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {products.length === 0 ? (
                <div>Loading...</div>
            ) : (
                products.map((product: Product) => (
                    <div key={product.id} className="border border-gray-300 rounded-md p-4">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </div>
                ))
            )}
        </div>
    </div>
  )
}
