import React, { useEffect, useState } from "react";
import QuillEditor from "./QuillEditor";
import { useIdea } from "../context/context";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
const firestore = getFirestore(app);

const Addidea = () => {
  const Idea = useIdea();
  const [refIdea, setRefidea] = useState("");

  const [dats, setDats] = useState([]);

  const loginUser = useIdea();

  const addIdea = async () => {
    const result = await addDoc(collection(firestore, "idea"), {
      idea: Idea.TextRenderer(),
    });
    window.alert("idea added successfully");
    return result;
  };

  const getDocumentsByQuery = async () => {
    const collectionRef = collection(firestore, "idea");
    const q = query(collectionRef, (where, (refIdea, "==", true)));
    const snapshot = await getDocs(q);

    snapshot.forEach((data) => {
      const documentId = data.id;
      const documentData = data.data().idea;
      dats.push({ id: documentId, idea: documentData });
    });
  };

  useEffect(() => {
    getDocumentsByQuery();
  }, [refIdea, dats]);

  const addSubIdea = async () => {
    let x = "";
    let i = 0;
    for (; i < dats.length; i++) {
      if (dats[i].idea == refIdea) {
        x = dats[i].id.toString();
        console.log(x.toString());
      }
    }

    console.log("itX", x);
    console.log("this", dats);
    console.log(refIdea);

    const result = await addDoc(collection(firestore, `idea/${x}/subIdea`), {
      subidea: "<>" + Idea.TextRenderer(),
    });
    window.alert("subidea added successfully");
    console.log("result", result);
  };

  return (
    <>
      {loginUser.user ? (
        <div className="addIdeacontainer">
          <div className="addideaQuill">
            <QuillEditor />
          </div>
          <div className="addideaPre">
            <h1> Here u can create your idea</h1>
            <div className="addideaInner">
              <button onClick={addIdea}>Add as Idea</button>
              <div className="addideaSub">
                <input
                  id="addsubField"
                  type="text"
                  onChange={(e) => setRefidea(e.target.value)}
                  placeholder="Enter reference idea for your subidea"
                />
                <p style={{ color: "red" }}>
                  *For adding Subidea,Idea is mandatory and case sensitive
                </p>

                <button onClick={addSubIdea}>Add as SubIdea</button>
                <h2 id="heading">
                  {Idea.TextRenderer()
                    ? Idea.TextRenderer()
                    : "Your text will preview here..."}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loginRequired">
          <h3>You need to Sign in to add idea</h3>
        </div>
      )}
    </>
  );
};

export default Addidea;
