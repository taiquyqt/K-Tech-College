import React from "react";
import { useCart } from "./CartContext";
import styles from "./CartDropdown.module.css";

const formatPrice = (n: number) => n.toLocaleString("vi-VN") + " ₫";

interface Props {
  onClose: () => void;
}

const CartDropdown: React.FC<Props> = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className={styles.dropdown}>
        <div className={styles.empty}>Your cart is empty.</div>
      </div>
    );

  return (
    <div className={styles.dropdown}>
      <button className={styles.close} onClick={onClose} type="button">
        ×
      </button>
      <ul className={styles.list}>
        {cart.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.info}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.price}>
                {formatPrice(item.price)} × {item.quantity}
              </div>
            </div>
            <div className={styles.controls}>
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeFromCart(item.id)}
                title="Remove"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.totalRow}>
        <b>Total:</b> <span className={styles.total}>{formatPrice(total)}</span>
      </div>
      <button className={styles.viewCart} type="button">
        View Cart
      </button>
    </div>
  );
};

export default CartDropdown;