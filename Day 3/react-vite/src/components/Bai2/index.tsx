import styles from './bai2.module.css'

type TButtonProps = {
    label?: React.ReactNode
    leftIcon?: React.ReactNode
    rightIcon?:React.ReactNode
}

const Bai2 = ({label, leftIcon, rightIcon} : TButtonProps) => {
  return (
    <button className={styles.button}>
          <span>{leftIcon} {label}</span>
          <div className={styles.back}>{rightIcon}</div>
    </button>
  )
}

export default Bai2