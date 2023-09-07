import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Pages/Login/login.module.css';
import { Container, Row } from 'react-bootstrap';
import Evalinator from '../assets/images/footerlogo.png';
function Footer(props) {
  // const [login, setLogin] = useState(false)

  // useEffect(() => {
  //   let user = localStorage.getItem('currentUser')
  //   if (user) {
  //     setLogin(true)
  //   }
  // }, []);

  return (
  <>

{props.type === 2 ?
            <>
            <p className={styles.footerPowered}>powered by Evalinator</p>
            </>
            : 
        <footer className={styles.footer_section_secure}>
          <Container>
            <Row>
           
            <div className={styles.footer_copyright}>
              <Link to="/"><img src={Evalinator} alt="logo" /> </Link>
              <p>Evalinator ©2023</p>
                {/* {type===2 &&
                  <>
                  Test
                  </>
                } */}
              <div>
                <a target="_blank" rel="noopener noreferrer" href='https://www.evalinator.com/privacy-policy/'>Privacy Policy</a>
                <a target="_blank" rel="noopener noreferrer" href='https://www.evalinator.com/terms-of-use/'>Terms of Use</a>
              </div>
            </div>
        
          </Row>
        </Container>
      </footer>
  }
      {/* <footer className={styles.footer_section}>
        <Container>
          <Row>

            <div className={styles.get_in_touch}>
              <h3>Stay in touch with us</h3>
              <p>Business today is based on expertise and partnership. Evalinator is a platform for expertise
                based businesses to create a shared vision with clients, activate high engagement, and energize
                internal team collaboration.</p>

             <Form >
              <Form.Control type="text" placeholder="First name" />
              <Form.Control type="email" placeholder="Email" />
              <Button type="button" className={styles.icon_btn}>
                <Image src={Senticon} alt="senticon" />
              </Button>
            </Form> 
            </div>
            <div className="ml-form-embed"
              data-account="2650208:p7c8k4b2r1"
              data-form="3179050:i9u1p7">
            </div>
            <div className={styles.footer_menu}>
              <Row>
                <Col lg={3} sm={3}>
                  <p>Company</p>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pricing">Pricing</Link></li>
                    <li><Link to="/">About Us</Link></li>
                    <li><Link to="/">Contact Us</Link></li>
                  </ul>
                </Col>
                <Col lg={3} sm={3}>
                  <p>Quick Links</p>
                  <ul>
                    <li><Link to="/">Coaches</Link></li>
                    <li><Link to="/">Sales</Link></li>
                    <li><Link to="/">Marketing</Link></li>
                    <li><Link to="/">Sales Managers</Link></li>
                  </ul>
                </Col>
                <Col lg={3} sm={3}>
                  <p>Resources</p>
                  <ul>
                    <li><Link to="/">Blog</Link></li>
                    <li><Link to="/">Docs</Link></li>
                    <li><Link to="/">Integrations</Link></li>
                    <li><Link to="/">Affiliates</Link></li>
                  </ul>
                </Col>
                <Col lg={3} sm={3}>
                  <p>Get in Touch</p>
                  <ul>
                    <li><Link to="/">Twitter</Link></li>
                    <li><Link to="/">Linked In</Link></li>
                    <li><Link to="/">Instagram</Link></li>
                  </ul>
                </Col>
              </Row>
            </div>
            <div className={styles.footer_copyright}>
              <p>Evalinator ©2022</p>
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Use</Link>
            </div>
          </Row>
        </Container>
      </footer> */}

</>
  );
}

export default Footer;
