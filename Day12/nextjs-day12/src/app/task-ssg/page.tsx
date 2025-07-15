import React from 'react';
import { Product } from '../types';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function TaskSsg() {
  const products: Product[] = await fetch('https://server.aptech.io/online-shop/products').then(res => res.json());

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-500 pl-10 p-5">Task SSG</h1>
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
