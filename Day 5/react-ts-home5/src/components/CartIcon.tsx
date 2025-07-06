
import { useCart } from "./CartContext";
import styles from "./CartIcon.module.css";

interface Props {
  onClick: () => void;
}

const CartIcon = ({ onClick }:Props) => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.iconWrapper} onClick={onClick} tabIndex={0}>
      <span className={styles.icon}>🛒</span>
      {total > 0 && <span className={styles.badge}>{total}</span>}
    </div>
  );
};

export default CartIcon;