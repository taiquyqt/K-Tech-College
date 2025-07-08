
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { FaHome, FaUser, FaMap, FaUserMd, FaHistory, FaCog } from 'react-icons/fa'
import { IoLogoEuro } from "react-icons/io";

export default function Sidebar() {
    return (
        <div>
            <nav>
                <ul className={styles.sidebar}>
                        <IoLogoEuro className={styles.logo}/>
                        <NavLink
                            to="/patients"
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.activeLink : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <FaHome className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`} />
                                    <span>Patients</span>
                                </>
                            )}
                        </NavLink>
                    
                        <NavLink
                            to="/overview"
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.activeLink : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <FaUser className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`} />
                                    <span>Overview</span>
                                </>
                            )}
                        </NavLink>
                   
                        <NavLink to="/map" className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.activeLink : ''}`
                        }>
                            {({ isActive }) => (
                                <>
                                    <FaMap className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`} />
                                    <span>Map</span>
                                </>
                            )}
                        </NavLink>
                    
                        <NavLink to="/doctors" className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.activeLink : ''}`
                        }>
                            {({ isActive }) => (
                                <>
                                    <FaUserMd className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`} />
                                    <span>Doctors</span>
                                </>
                            )}
                        </NavLink>
                    
                        <NavLink to="/history" className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.activeLink : ''}`
                        }>
                            {({ isActive }) => (
                                <>
                                    <FaHistory className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`} />
                                    <span>History</span>
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/settings" className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.activeLink : ''}`
                        }>
                            {({ isActive }) => (
                                <>
                                    <FaCog className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`} />
                                    <span>Settings</span>
                                </>
                            )}
                        </NavLink>
                </ul>

            </nav>
        </div>
    )
}
