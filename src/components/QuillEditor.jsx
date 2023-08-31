import React, { useState,createContext } from 'react';
import ReactQuill from 'react-quill';
import { useIdea } from '../context/context';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles




const QuillEditor = () => {
  // const [editorHtml, setEditorHtml] = useState('');

  // const handleEditorChange = (html) => {
  //   setEditorHtml(html);
  //   console.log(html)
  // };

  const Idea= useIdea()
  const editHtml=Idea.editorHtml
  const handleEditChange=Idea.handleEditorChange;


  return (
    <>
    <div  className='container'>
      <ReactQuill
        style={{backgroundColor:"white",height:"60vh",width:"40vw"}}
        value={editHtml}
        onChange={handleEditChange}
        modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link', 'image'],
              ['clean']
            ],
          }}
      />
     
  
    </div>
      </>
  
  );
};

export default QuillEditor;
