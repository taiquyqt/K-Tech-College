import styles from './Render4.module.css'

type LogoRenderProps = {
    src: string;
    text: string;
    time: string;
    discount?: string;
    oldPrice?: string;
};

function LogoRender4({ src, text, time, discount, oldPrice }: LogoRenderProps) {
    return (
        <div>

            <div>
                <div className={styles.imageWrapper}>
                    {discount && (
                        <div className={styles.discountBadge}>
                            {discount}
                        </div>
                    )}
                    <img className={styles.img4} src={src} />
                </div>
                <span className={styles.text4}>{text}</span>
                    <div className={styles.price}>
                        <span className={styles.currentPrice}>{time}</span>
                        {oldPrice && (
                            <span className={styles.oldPrice}>{oldPrice}</span>
                        )}
                    </div>
            </div>
        </div>
    );
}

export default LogoRender4;