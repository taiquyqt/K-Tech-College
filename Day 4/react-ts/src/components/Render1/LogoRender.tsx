import styles from './Render1.module.css'

type LogoRenderProps = {
    src: string;
    text: string;
    time: string;
};

function LogoRender1({ src, text, time}: LogoRenderProps) {
    return (
        <div className={styles.frame}>
            
            <div>
                <img className={styles.img1} src={src} />
                <span className={styles.text1}>{text}</span>
                <p className={styles.time1}>{time}</p>
            </div>
            
        </div>
    );
}

export default LogoRender1;