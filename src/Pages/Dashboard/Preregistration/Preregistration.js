// import React from 'react'
// import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState, useRef } from 'react';
import styles from '../../Templates/templates.module.css'
import Footer from '../../../Components/Footer'
import { Breadcrumb } from "react-bootstrap";
import Header from '../../../Components/Header';
import { Link } from 'react-router-dom';
import styless from '../dashboard.module.css';
import pre3dot from './pre3dot.svg';
import Uparrow from './Uparrow.svg'
import DownArrow from './DownArrow.svg'
import { Modal } from "react-bootstrap";
import { functionService } from '../../../Context/functions';
import Collapse from "react-bootstrap/Collapse";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UpdateModeEnum } from 'chart.js';
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from '../../../Components/Confirmmodal/ConfirmModal'
import { useHistory, useParams } from "react-router-dom";
import RespondentGroupList from './RespondentGroupList';


// import index from '../../Templates/./templates.module.css';
// import styles from './dashboard.module.css';
const Preregistration = () => {
  const [loader, setLoader] = useState(false);
  const [templateId, setTemplateId] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [guidId, setGuidId] = useState(0);
  const [errors, setErrors] = useState({});
  const [showtoast1, setShowToast1] = useState(false);

  const [groupList, setGroupList] = useState([]);
  const [createGroup, setCreateGroup] = useState(false)



  useEffect(() => {
    handleGetGroup();


  }, [])


  const handleGetGroup = async (e) => {
    // props.setLoader(true); 
    setLoader(true);

    let res = await functionService.get('AssessmentUsers/getGroups');

    if (res.status === true) {
      setGroupList(JSON.parse(res.data.result))
      let response = JSON.parse(res.data.result)

    }
    setLoader(false);

    // props.setLoader(false);
  }

  const handleShow = (id = 0) => {
    setShow(true);
    setGuidId(id);
  }


  const createGroupItem = async () => {
    setCreateGroup(false)
    if (disabled === true) {
      return false;
    }
    setDisabled(true);
    setShow(false);
    // props.setLoader(true);
    let groupName = document.getElementById("group_name").value;

    let res = await functionService.post(
      "AssessmentUsers/createGroup", { "szGroupName": groupName });
      console.log('response', res)
    if (res.status !== true) {
      setShowToast1(true);
      handleGetGroup();

    } else {
      if (res.hasOwnProperty("data")) {
        // (res.data.data.result);
      }
      setShowToast1(true);
    }
    // props.setLoader(false);
  };

  const handleClose = () => {
    setShow(false);
  }

  const history = useHistory();

  const handleBack = () => {

    history.push("/dashboard");
  };




  return (
    <>
      <Header loader={loader} />

      <ConfirmModal
                show={createGroup}
                handleClose={()=>setCreateGroup(false) }
                handleAction={createGroupItem}
                data={"0"}
            />
      <div className={styless.dashboardPage}>

        <Container>
          <div className={styless.container}>
            <div className={styless.dashboard_content}>
              <div className={styless.assent}>
                <div className={styless.ViewButtonGroup}>
                  <p><Link to="/dashboard" className={`${styless.navLinks} ${styless.paddingLeftRight}`}  >My Assessments</Link>  |</p>
                  <p><strong className={styless.paddingLeftRight}>Respondent Groups</strong> |</p>
                  <p><Link to = '/linkedAssessments' className={styless.navLinks} >Linked Assessments</Link></p>
                </div>
                <button className={styless.create_btn} onClick={() => handleShow(0)}>
                      Create Groups
                    </button>
              </div>
            </div>
          </div>
        </Container>

        <div className={styles.templatesPage}>

          {/* <div className={styles.breadcrumb}>
          <Container >
            <Breadcrumb>
              <Breadcrumb.Item onClick={handleBack} >Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item className={styles.active}>Pre Registration</Breadcrumb.Item>
            </Breadcrumb>
          </Container >
        </div> */}

          <div className={styles.templates_content}>
            <div className={styles.templates_box}>
              <Container >

                <Container style={{ width: '75%' }}>
                  <br></br><p><b>Organize your respondents</b> into groups or accounts, and then <b>analyze group results</b>.<br></br>The "Default" group contains all your respondents that haven't been assigned to specific groups.</p>
                

                  {
                    groupList && groupList.map((obj) => (
                      <div className={styless.groupItems}>
                        <RespondentGroupList groupsList={groupList} handleGetGroup={handleGetGroup} setgroupsList={setGroupList} obj={obj} />
                      </div>
                    ))
                  }

                </Container>
              </Container>
              <Modal show={show} onHide={handleClose} className={styles.modalTemplete}>
                <Modal.Header closeButton className={styles.modalHeader}>
                  <Modal.Title className={styles.modal_header}>Create New Group </Modal.Title>
                </Modal.Header>
                <Form method="post" onSubmit={createGroupItem}>
                  <Modal.Body className={styles.modalBody}>

                    <Form.Group className="mb-3 relative" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control id='group_name' className={styles.formControl} type="text" placeholder="Enter Group name" name="group_name" />
                      <Form.Control className={styles.formControl} type="hidden" value={templateId} name="templateId" />
                      {(errors && errors.hasOwnProperty('assesement_name')) && <p className="error errcont">Please fill required field!</p>}
                    </Form.Group>

                  </Modal.Body>
                  <Modal.Footer className={styles.modal_footer}>
                    <Button variant="primary" onClick={()=>setCreateGroup(true)} >
                      Continue
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>


            </div>
          </div>


        </div>
        <Footer />

      </div>
    </>
  )
}

export default Preregistration
