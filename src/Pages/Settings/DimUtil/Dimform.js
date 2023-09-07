import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from '../settingstyle.module.css';
import TextEditor from '../../../Components/TextEditor';
function DimForm({editorData="", errors,formData, setFormData, setOpen, handleAdd, isCreate = true }) {

  const handleTextData = (data) => {
    let dataArray = {...formData};
    dataArray.szDimDesc = data.toString();
    if(dataArray && dataArray.szDimName !== ''){
            setFormData(dataArray)
    }
} 
//console.log("dimform", formData)
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Dimension Name (about 12 characters)</Form.Label>
          <Form.Control as="textarea" onChange={(e) => setFormData({ ...formData, szDimName: e.target.value })} value={formData.szDimName} />
          {(errors && errors.hasOwnProperty('szDimName')) && <p className="error errcont">Please fill required field!</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Tagline (about 3-5 words)</Form.Label>
          <Form.Control as="textarea" onChange={(e) => setFormData({ ...formData, szDimTagLine: e.target.value })} value={formData.szDimTagLine} />
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description:</Form.Label>
          {/* <Form.Control as="textarea" rows={5} onChange={(e)=>setFormData({...formData,szDimDesc:e.target.value})} value={formData.szDimDesc}/> */}
          <TextEditor
            datas={editorData !== undefined && editorData + ""  }
            classes="dimDescription"
            formData={formData}
            //setFormData={setFormData}
            handleTextData={handleTextData}
            dataKey='szDimDesc'
          />
        </Form.Group>
        <Button className={styles.btn_skyblue} onClick={handleAdd}>  {isCreate === true ? 'Add' : 'Update'} </Button>

        <Button className={styles.btn_dimclose} onClick={(e) => setOpen(false)}>  Cancel </Button>
      </Form>

    </>
  );
}

export default DimForm;
