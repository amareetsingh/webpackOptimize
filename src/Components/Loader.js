import React from 'react';
import styles from '../Pages/Login/login.module.css';
function Loader({ loader = false }) {


      return (
            <>
                  {loader === true &&
                        <>
                              <div className={loader === false ? styles.loader : styles.loaderShow}><div className={styles.loaderShowbar}></div></div>
                              <div className={styles.bgloader}>
                              </div>
                        </>
                  }
            </>
      );
}

export default Loader;
