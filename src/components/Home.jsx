import {
  getFirestore,
  collection,
  addDoc,

  query,
  where,
  getDocs,
  
} from "firebase/firestore";
import React, { useState, useEffect, useMemo } from "react";
import { app } from "../firebase/firebase";
import { useIdea } from "../context/context";
import "../App.css";

const firestore = getFirestore(app);

const Home = () => {
  const [idea, setIdea] = useState("");
  const [subidea, setSubidea] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subIdeadata, setSubideadata] = useState([]);
  const [newData, setNewdata] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [preIdea, setPreidea] = useState([]);
  const [inputValue, setInputvalue] = useState("");
  const [reference, setReference] = useState([]);
  const [backspaceHandler, setBackspacehandler] = useState(false);
  const [mapReference, setMapreference] = useState([]);
  const [preTag, setPretag] = useState(null);
  const [refTag, setReftag] = useState(null);

  const loginUser=useIdea()

  

  useEffect(() => {
    setLoading(true);
    setIdea("");

  }, []);

 

  const getDocumentsByQuery = async () => {
    setLoading(true);

    const collectionRef = collection(firestore, "idea");
    const snapshot = await getDocs(collectionRef);

    const updatedSubIdeadata = [];
    let uniqueArray = [];

    for (const data of snapshot.docs) {
      const idea = data.data().idea;
      const id = data.id;
      newData.push({ id, idea });

      const isdatid = data.id;
      const subIdeaCollectionRef = collection(
        firestore,
        `idea/${isdatid}/subIdea`
      );
      const subIdeaQuerySnapshot = await getDocs(subIdeaCollectionRef);

      for (let i = 0; i < newData.length; i++) {
        subIdeaQuerySnapshot.docs.forEach((doc) => {
          const path1 = doc.ref.path.toString();
          const path2 = path1.split("/");
          const path = path2[1];
          if (newData[i].id === path || !doc.data().subidea) {
            const sid = doc.id;
            const subidea = doc.data().subidea;
            const idea = newData[i].idea;

            updatedSubIdeadata.push({ id, idea, sid, subidea, path1 });

            uniqueArray = updatedSubIdeadata.filter((value, index, self) => {
              return self.indexOf(value) === index;
            });
           
          } else if (!doc.data().subidea) {
            const sid = doc.id;
            const idea = newData[i].idea;
            uniqueArray = updatedSubIdeadata.push({ id, idea, sid, path1 });
            
          }
        });
      }
    }

    setSubideadata(updatedSubIdeadata);
    setFinalData((prevFinalData) => [...prevFinalData, ...uniqueArray]);
   
    setLoading(false);
  };

  useMemo(() => {
    getDocumentsByQuery();
  }, []);

  const getReference = async (e) => {
    console.log(idea);
    const searchRef = collection(firestore, "reference");
    const searchQuery = query(searchRef, (where, (idea, "==", true)));
    const foundQuery = await getDocs(searchQuery);
    console.log(foundQuery.docs[1].data().ref);
  
    foundQuery.docs.map((doc) => {
      const fi = doc.data().ref.toLowerCase();
     
      if (idea.startsWith("#") && fi.includes(idea.slice(1))) {
        const newsplit = fi.split("");

       
        setMapreference((prevData) => [...prevData, doc.data().ref]);
       

        const highlightedArray = newsplit.map((char) => {
          if (idea.toLowerCase().includes(char.toLowerCase())) {
            return <span style={{ backgroundColor: "blue" }}>{char}</span>;
          }

          return char;
        });
      
        setReference(highlightedArray);

      
      }
     
    });
  
    document.getElementById("inputField").value = "";
    
  };

  const handleInput = (e) => {
    setPretag(true);
    setReftag(false);

    const inputValue = e.target.value;

    if (e.target.value && e.target.value.includes("<>")) {
      setBackspacehandler(true);
      setPretag(true);
      document.getElementsByClassName("dropdown")[0].style.display = "block";
      document.getElementById("preview").style.backgroundColor = "green";
      document.getElementById("reference").style.backgroundColor =
        "cornflowerblue";
    } else if (e.target.value.includes("#")) {
      setBackspacehandler(false);
      setReference(null);
      setReftag(true);
      document.getElementsByClassName("dropdown")[0].style.display = "none";
      document.getElementById("preview").style.backgroundColor =
        "cornflowerblue";
      document.getElementById("reference").style.backgroundColor = "green";
    } else if (!e.target.value) {
      document.getElementsByClassName("dropdown")[0].style.display = "none";
      document.getElementById("preview").style.backgroundColor =
        "cornflowerblue";
      document.getElementById("reference").style.backgroundColor =
        "cornflowerblue";
    }
    setIdea(inputValue);
  };

  const listClick = (e) => {
    const clickedIdea = e.target.innerHTML;
    setIdea(clickedIdea);
    
    document.getElementsByClassName("dropdown")[0].style.display = "none";
    document.getElementById("inputField").value = clickedIdea
      ?.replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  };

  const previewData = () => {
    if (idea) {
      document.getElementsByClassName("dropdown")[0].style.display = "none";
      document.getElementById("preview").style.backgroundColor =
        "cornflowerblue";

      document.getElementById("inputField").value = "";

     
      const selectedIdea = idea.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      setPreidea((prevPreIdea) => [...prevPreIdea, selectedIdea]);
      setIdea("");
    } else window.alert("Please Enter Something");
  };

  const delPreview = (e, index) => {
    const indice = e.target.parentElement.textContent.lastIndexOf("del");
 
    const outer = e.target.parentElement.textContent.slice(0, indice);
   
    const filtered = preIdea.filter((item) => item !== outer);
  
    setPreidea(filtered);
  
  };

  const handleKeydown = (event) => {
    

    if (backspaceHandler && event.key === "Backspace") {
      
      if (inputValue !== "") {
        event.preventDefault(); 
        setInputvalue(""); 
      } else {
        
        const input = event.target;
        input.select();
      }
    }
  };

  const previewTag = () => {
    setReftag(false);
    document.getElementById("preview").style.backgroundColor = "green";
    document.getElementById("reference").style.backgroundColor =
      "cornflowerblue";
    setPretag(true);
  };

  const referenceTag = () => {
    setPretag(false);
    document.getElementById("reference").style.backgroundColor = "green";
    document.getElementById("preview").style.backgroundColor = "cornflowerblue";
    document.getElementsByClassName("dropdown")[0].style.display = "none";
    setIdea("");
    setReftag(true);
  };

  return (
    <div className="Parent">
      <div>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <div className="divSearchcontainer">
            {loginUser.user?<h1 id="signinuser">You are logged in as {loginUser.user.email}</h1>:""}

            <h2>Select your mode below</h2>
            <div className="mode">
              <h5 onClick={previewTag} id="preview">
                Preview Idea
              </h5>
              <h5 onClick={referenceTag} id="reference">
                Reference
              </h5>
            </div>
            <div
              className="dropDownContainer"
             
            >
              <input
             
                onKeyDown={handleKeydown}
                onChange={handleInput}
                id="inputField"
                type="text"
                autoComplete="off"
                defaultValue={idea.replace(/&lt;/g, "<").replace(/&gt;/g, ">")}
              
              />
              {idea || idea.includes("<>" || "#") ? (
                <div className="preButton">
                  {preTag && !refTag ? (
                    <button id="btn1" onClick={previewData}>
                      Add idea to display
                    </button>
                  ) : (
                    <button id="btn2" onClick={getReference}>
                      Search for reference with '#'
                    </button>
                  )}
                </div>
              ) : (
                <button id="btn3" onClick={previewData}>
                  Search
                </button>
              )}

              <div
                className="dropdown"
               
              >
                {finalData.map((data) => (
                  <ul key={data.key}>
                    <li onClick={listClick}>
                      {data.idea}
                      {data.subidea ? data.subidea : ""}
                    </li>
                    <hr />
                  </ul>
                ))}
              </div>
            </div>
            <div className="subParent">
         
              {preIdea.map((item, index, replace) => (
                <div className="preDelete" >
                  <h1 key={index}>{item}</h1>
                  <button onClick={(e) => delPreview(e, index)}>X</button>
                </div>
              ))}

             
              <h1 id="reference">{reference}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
