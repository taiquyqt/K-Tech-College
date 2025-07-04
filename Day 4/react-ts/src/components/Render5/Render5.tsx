import styles from './Render5.module.css';

type LogoRender5 = {
  image: string;
  discount: string;
  shopName: string;
  currentPrice: string;
  oldPrice: string;
  percentOff: string;
  title: string;
  stars: number;
    sold: number;
};

const ProductCard = ({
  image,
  discount,
  shopName,
  currentPrice,
  oldPrice,
  percentOff,
  title,
  stars,
  sold,
}: LogoRender5) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} className={styles.img} />
        <div className={styles.discountBadge}>-{discount}</div>
      </div>
          <div className={styles.shopName}>{shopName}</div>

      <div className={styles.priceRow}>
        <span className={styles.currentPrice}>${currentPrice}</span>
        <span className={styles.oldPrice}>${oldPrice}</span>
        <span className={styles.percentOff}>{percentOff} off</span>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.stars}>
        {'★'.repeat(stars)}
        {'☆'.repeat(5 - stars)}
      </div>
    
      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${Math.min((sold / 100) * 100, 100)}%` }} />
          </div>
          <div className={styles.sold}>Sold: {sold}</div>
    </div>
  );
};

export default ProductCard;
