import React from "react";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

interface Props {
  products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => (
  <div className={styles.grid}>
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
);

export default ProductGrid;