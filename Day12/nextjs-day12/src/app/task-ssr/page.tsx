import React from 'react';
import { Product } from '../types';

export const dynamic = 'force-dynamic'; 

export default async function TaskSsr() {
  const res = await fetch('https://server.aptech.io/online-shop/products', {
    cache: 'no-store'
  });
  const products: Product[] = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-500 pl-10 p-5">Task SSR</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-300 rounded-md p-4">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
