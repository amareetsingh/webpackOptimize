import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../../../Components/Footer';
import Header from '../../../Components/Header'
import styles from "../../Analyticsresult/analyticsresult.module.css";

const NoDataFound = () => {
  return (
    <div>
    <Header/>
     <Container className={styles.MainContainer}><h1>there is no data found</h1>  </Container>

     <Footer/>
    </div>
  )
}

export default NoDataFound