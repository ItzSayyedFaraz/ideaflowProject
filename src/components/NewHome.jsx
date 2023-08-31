import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect,useMemo } from "react";
import { app } from "../firebase/firebase";
import { useIdea } from "../context/context";

const firestore = getFirestore(app);

const Home = () => {
  const [idea, setIdea] = useState("");
  const [subidea, setSubidea] = useState([]);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [subIdeadata, setSubideadata] = useState([]);
  const [newData, setNewdata] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [preIdea, setPreidea] = useState([]);
  const [inputValue,setInputvalue]=useState('')
  const [reference,setReference]=useState([])
  const [backspaceHandler,setBackspacehandler]=useState(false)
  const [mapReference,setMapreference]=useState([])
 

  const addIdea = async () => {
    const result = await addDoc(collection(firestore, "idea"), {
      idea,
    });
    console.log(result);
  };

  const addSubIdea = async () => {
    const result = await addDoc(
      collection(firestore, "idea/1Y06Gxnl7dZgiZhIUIfc/subIdea"),
      {
        subidea,
      }
    );
    console.log(result);
  };



  useEffect(() => {
    setLoading(true);
    setIdea('')
    // getDocumentsByQuery();
    
  }, []);

  // useEffect(()=>{
  //   delPreview()

  // },[preIdea])

  const getDocumentsByQuery = async () => {
    setLoading(true);

    const collectionRef = collection(firestore, "idea");
    const snapshot = await getDocs(collectionRef);

    const updatedSubIdeadata = [];

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
            // console.log("up",updatedSubIdeadata)
          // }
          } else if (!doc.data().subidea) {
            const sid = doc.id;
            const idea = newData[i].idea;
            updatedSubIdeadata.push({ id, idea, sid, path1 });
            console.log("updated",updatedSubIdeadata)
          }
        });
      }
    }

    setSubideadata(updatedSubIdeadata);
    setFinalData((prevFinalData) => [...prevFinalData, ...updatedSubIdeadata]);
    // console.log("f",finalData)
    setLoading(false);
  };

  useMemo(()=>{
    getDocumentsByQuery();
  },[finalData])

  const getReference=async(e)=>{
   
    console.log(idea)
    const searchRef=collection(firestore,'reference')
    const searchQuery=query(searchRef,(where,(idea,'==',true)))
    const foundQuery=await getDocs(searchQuery)
    console.log(foundQuery.docs[1].data().ref)
    // const nTxt="#"+idea
    // setIdea(idea.toLowerCase())
    // console.log("ide",idea)
    foundQuery.docs.map((doc)=>{
      const fi=doc.data().ref.toLowerCase()
    // const newValue=idea.slice(1)
    // console.log(fi)
    // console.log("newValue",newValue)
    // console.log(fi.slice(0).match(/newValue/gi))
    // console.log(idea.startsWith("#"))
    // setIdea(fi)
    if(idea.startsWith("#")&& fi.includes(idea.slice(1))){
      const newsplit=fi.split("")
      
      // setReference([fi])
      // let i=0
      // for(let i of newsplit){
      //   if(i==newValue){
         
      //     i=`<span style={{backgroundColor:yellow}}>${i}</span>`
      //      document.getElementById('reference').style.backgroundColor="blue"
      //   }
      // }
       setMapreference((prevData)=>[...prevData,doc.data().ref])
       console.log("map",mapReference)

      const highlightedArray=newsplit.map((char)=>{
        if(idea.toLowerCase().includes(char.toLowerCase())){
          
          return <span style={{backgroundColor:"blue"}}>{char}</span>

        }
        
        return char
       
      })
      console.log('high',highlightedArray.join())
      // return mapReference
      setReference(highlightedArray)
      setIdea("")
    // setReference(foundQuery.docs[0].data())
    console.log("ref",reference)
    }else{
      window.alert('No reference documents was found')
    }
    console.log("last",idea)
    // return setIdea("")
  })
  // setMapreference((prevData)=>[...prevData,reference])
  
  console.log("last",mapReference)
  }

  const handleInput = (e) => {
    const inputValue = e.target.value;
    if (e.target.value.includes("<>")) {
      setBackspacehandler(true) 
      document.getElementsByClassName("dropdown")[0].style.display =
        "block";
        
    } else {
      setBackspacehandler(false)
      setReference(null)
      document.getElementsByClassName("dropdown")[0].style.display =
        "none";
      
    }
    setIdea(inputValue);
  };

  const listClick = (e) => {
    const clickedIdea = e.target.innerHTML;
    setIdea(clickedIdea);
    // console.log(idea);
    document.getElementsByClassName("dropdown")[0].style.display =
    "none";
    document.getElementById("inputField").value = clickedIdea
      ?.replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  };

  const previewData = () => {
    document.getElementsByClassName("dropdown")[0].style.display =
        "none";
    
    
    document.getElementById('inputField').value=""
   
    // setPreidea([idea])
    
    console.log("pre",preIdea)
    const selectedIdea = idea.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    setPreidea((prevPreIdea) => [...prevPreIdea, selectedIdea]);
    setIdea("")
    
  };

  const delPreview=(e,index)=>{
    const indice=(e.target.parentElement.textContent.lastIndexOf('del'))
    // console.log(indice)
    // console.log(e.target.parentElement.textContent.slice(0,indice))
    const outer=e.target.parentElement.textContent.slice(0,indice)
    // console.log(preIdea.includes(outer))
    // console.log(preIdea)
    const filtered=preIdea.filter((item)=>item!==outer)
    // console.log("filtered",filtered)
    setPreidea(filtered)
    // console.log("p",preIdea)
    
  }

  const handleKeydown=(event)=>{
      //  console.log('eb',event)

      if (backspaceHandler&&event.key === "Backspace") {
        // Check if the input value is not empty
        if (inputValue !== "") {
          event.preventDefault(); // Prevent the default behavior (e.g., going back in browser)
          setInputvalue(""); // Clear the input value
        } else {
          // If the input value is already empty, select the text
          const input = event.target;
          input.select();
        }
      }
    };
    

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h2>This is a Home</h2>
          <div
            className="dropDownContainer"
            style={{ margin: "80px", display: "flex", flexDirection: "column" }}
          >
            <input
              // onFocus={getDocumentsByQuery}
              onKeyDown={handleKeydown}
              onChange={handleInput}
              id="inputField"
              type="text"
              autoComplete="off"
              defaultValue={idea.replace(/&lt;/g, "<").replace(/&gt;/g, ">")}
              style={{ width: "500px" }}
            />
            {!idea ? (
              <div>
              <button>search</button>
              <button onClick={getReference}>GetDoc</button>
              </div>
            ) : (
              <div>
              <button onClick={previewData}>preview idea</button>
              <button onClick={getReference}>GetDoc</button>
              </div>
            )}

            <div
              className="dropdown"
              style={{
                width: "510px",
                backgroundColor: "lightgrey",
                display:"none"
                // visibility: "hidden",
              }}
            >
              {finalData.map((data) => (
                <ul key={data.key}>
                  <li onClick={listClick}>
                    {data.idea}
                    {data.subidea ? data.subidea : ""}
                  </li>
                </ul>
              ))}
            </div>
            {preIdea.map((item,index,replace)=>(
            <div div>
            <h1 key={index} >{item}</h1>
            <button onClick={(e)=>delPreview(e,index)}>del</button>
            </div>
            ))}
          </div>
          {/* <button onClick={getReference}>GetDoc</button> */}
          <h1  id="reference">{reference}</h1>
        </div>
      )}
    </>
  );
};

export default Home;
