import React, { useState, createContext, useContext } from "react";

export const IdeaContext = createContext(null);

export const useIdea = () => {
  const idea = useContext(IdeaContext);
  return idea;
};

export const IdeaProvider = (props) => {
  const [editorHtml, setEditorHtml] = useState("");
  const [user,setUser]=useState(null)
  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  function TextRenderer() {
    const strippedText = editorHtml.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return strippedText;
  }

  return (
    <IdeaContext.Provider
      value={{
        editorHtml,
        setEditorHtml,
        handleEditorChange,
        TextRenderer,
        user,
        setUser
      }}
    >
      {props.children}
    </IdeaContext.Provider>
  );
};
