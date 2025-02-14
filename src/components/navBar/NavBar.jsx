import React from 'react'
import styles from "./navbar.module.css"
function NavBar() {
  return (
    <div className={styles.navBody}>
        <div className={styles.logo}>
            <img src="./Wordmark.png" alt="" className={styles.logo}/>
        </div>
        <button className={styles.signIn}>Sign in</button>
    </div>
  )
}

export default NavBar
