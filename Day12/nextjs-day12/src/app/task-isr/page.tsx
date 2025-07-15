import Link from "next/link";
import { Product } from "../types/index";

export const revalidate = 60;

export default async function TaskIsr() {
  const products: Product[] = await fetch("https://server.aptech.io/online-shop/products").then((res) => res.json());

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-500 pl-10 p-5">Task ISR</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {products.slice(0, 10).map((product) => (
          <Link
            href={`/task-isr/${product.id}`}
            key={product.id}
            className="border border-gray-300 rounded-md p-4 hover:shadow transition block"
          >
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
