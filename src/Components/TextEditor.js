import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextEditor({ classes, datas, height, handleTextData, editorKey = 0 }) {
  const handleEditorChange = (event) => {
    handleTextData(event.target.getContent());
  };
  return (
    <div className={classes}>
      <Editor
        apiKey="iitei9q0p4kky42p2qx2govhdpdyvc8nezf5ejww3hutmqmp"
        key={editorKey}
        initialValue={
          datas !== "" && datas !== null && datas !== false ? datas + "" : ""
        }
        init={{
          height: height,
          menubar: false,
          plugins:
            "powerpaste casechange tinydrive searchreplace autolink advcode visualblocks visualchars fullscreen link media mediaembed codesample advlist lists checklist wordcount tinymcespellchecker a11ychecker mentions emoticons",
          toolbar:
            "undo redo |FontSize| bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify |  numlist bullist checklist | forecolor backcolor casechange | pagebreak | charmap emoticons | media link | a11ycheck ltr rtl | fullscreen",
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
}

TextEditor.defaultProps = {
  height: 300,
};

export default TextEditor;
