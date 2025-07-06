import type { Product } from "../types/Product";
import { useCart } from "./CartContext";
import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
}

const formatPrice = (n: number) => n.toLocaleString("vi-VN") + " ₫";

const ProductCard = ({ product } : Props) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const item = cart.find((i) => i.id === product.id);
  const quantity = item?.quantity || 0;

  return (
    <div className={styles.card}>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.price}>{formatPrice(product.price)}</div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => updateQuantity(product.id, Math.max(quantity - 1, 0))}
          disabled={quantity === 0}
        >
          –
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          type="button"
          className={styles.btn}
          onClick={() => addToCart(product, 1)}
        >
          +
        </button>
      </div>
      <button
        className={styles.add}
        type="button"
        onClick={() => addToCart(product, 1)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;