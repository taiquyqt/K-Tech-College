import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.css'
import { IoMdCart } from "react-icons/io";

export default function HomePage() {
  return (
    <div>
          <nav className={styles.navContainer}>
            <div className={styles.logo}>ShopCam</div>
              <ul className={styles.navLinks}>
                  <NavLink to="/home" className={styles.navLink} style={({isActive}) => ({color: isActive ? 'black' : 'white'})}>Home</NavLink>
                  <NavLink to="/blog" className={styles.navLink} style={({isActive}) => ({color: isActive ? 'black' : 'white'})}>Blog</NavLink>
                  <NavLink to="/category" className={styles.navLink} style={({isActive}) => ({color: isActive ? 'black' : 'white'})}>Category</NavLink>
                  <NavLink to="/product" className={styles.navLink} style={({isActive}) => ({color: isActive ? 'black' : 'white'})}>Product</NavLink>
                  <NavLink to="/login" className={styles.navLink} style={({isActive}) => ({color: isActive ? 'black' : 'white'})}>Login</NavLink>
                  <NavLink to="/customer" className={styles.navLink} style={({isActive}) => ({color: isActive ? 'black' : 'white'})}>Customer</NavLink>
                  <div className={styles.iconContainer}>
                  <IoMdCart className={styles.icon} />
                  </div>
              </ul>
        </nav>
    </div>
  )
}
