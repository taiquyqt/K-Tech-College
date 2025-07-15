import React from 'react';
import { Product } from '../../types/index';
import { notFound } from 'next/navigation';

export const revalidate = 60;
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const products: Product[] = await fetch('https://server.aptech.io/online-shop/products').then(res => res.json());
  return products.slice(0, 10).map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function TaskISR({ params }: { params: { id: string } }) {
  const { id } = params; 
  const response = await fetch(`https://server.aptech.io/online-shop/products/${id}`, {
    next: { revalidate: 60 },
  });

  const product: Product = await response.json();

  if (!response.ok || !product || typeof product.price !== 'number') {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-500 pl-10 p-5">Task ISR: {product.name}</h1>
      <div className="max-w-xl mx-auto border rounded p-4 shadow">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-blue-600 font-bold">{product.price.toLocaleString()} ₫</p>
        <p className="text-sm text-gray-600">Danh mục: {product.category?.name}</p>
        <p className="mt-2">{product.description}</p>
      </div>
    </div>
  );
}