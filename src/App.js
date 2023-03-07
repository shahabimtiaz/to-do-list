import TodoList from "./components/TodoList";
import AddButton from "./components/AddButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback, useEffect } from "react";
import { db } from "./firebase-config";
import {
  docs,
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { async } from "@firebase/util";

// Initialize Firebase
function App() {
  const [task,setTask] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [firebaseData, setFirebaseData] = useState([]);
  const [generate,setGenerate] = useState({isGenerate: false});
  const fakeData = [
    {
      title: "Cleaning",
      description: "Cleaning Home",
    },
    {
      title: "Watering Plants",
      description: "Watering plants at home",
    },
    {
      title: "Manage Record",
      description: "Manage student records",
    },
    {
      title: "Receive mail",
      description: "get mails from mailbox",
    },
    {
      title: "Shahab",
      description: "get mails from mailbox",
    },
  ];
  // submitHandler function
  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.target;
      const title = form.title.value;
      const description = form.description.value;
      const object = {title: title, description: description};
      setTask((task)=> [object, ...task]);
      // await setDoc(doc(db, "to-do-list", uuidv4()), {
      //   title: title,
      //   description: description,
      // })
      //   .then(() => {
      //     console.log("data inserted successfully");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // setFirebaseData((firebaseData) => [...firebaseData]);
      form.title.value = "";
      form.description.value = "";
    },
    [task]
  );

  //useEffect function
  useEffect(() => {
    getFirebaseData();
  }, []);
  // getFirebaseData Function
  const getFirebaseData = async () => {
    const collectionRef = collection(db, "to-do-list");
    const docSnap = await getDocs(collectionRef);
    setFirebaseData(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // deleteHandler function
  const deleteHandler = async (index) => {
    // await deleteDoc(doc(db, "to-do-list", index));
    // setFirebaseData((firebaseData) => [...firebaseData]);
    task.splice(index,1);
    setTask((task)=> [...task]);
  };
  // Filter Data
  const filteredItems = task.filter(
    (task) =>
      task.title && task.title.toLowerCase().includes(filterText.toLowerCase())
  );
  // handlerClear
  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };
  //Automatically add record function
  const autoAddRecord = () => {
    let count = 1;
    let timeId = setInterval(() => {
      if (count <= fakeData.length) {
        // setDoc(doc(db, "to-do-list", uuidv4()), {
        //   title: fakeData[count - 1].title,
        //   description: fakeData[count - 1].description,
        // });
        let object = { title: fakeData[count-1].title, description: fakeData[count-1].description};
        setTask((task)=> [object, ...task]);
        setGenerate({isGenerate: true});
        count++;
      } else {
        clearInterval(timeId);
        setGenerate({isGenerate: false});
      }
    }, 1000);
  };

  return (
    <div className="container col-md-6 mt-5 ">
      <div className="card">
        <div className="card-header text-center h1 bg-warning text-light fw-bolder">
          <FontAwesomeIcon icon={faCheck} /> TODO-LIST
        </div>
        <div
          className="card-body bg-warning overflow-auto"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          <div className="d-flex justify-content-end mb-3 bg-">
            <AddButton
              taskNo={task.length === 0 ? 1 : task.length + 1}
              submitHandler={submitHandler}
            />
            {/* Automatically add records button */}
            <button
              className="btn btn-primary btn-success mx-2 text-uppercase fw-bold text-light"
              onClick={autoAddRecord}
            >
             {generate.isGenerate ? "Generating..." : "Generate Fake Data"}
            </button>
            {/* input */}
            <div className="input-group mx-2">
              <input
                type="text"
                className="form-control "
                onChange={(e) => setFilterText(e.target.value)}
                value={filterText}
                aria-describedby="basic-addon2"
              />
              <span
                class="input-group-text btn btn-danger fs-4"
                id="basic-addon2"
                onClick={handleClear}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
          </div>
          {/* Map function */}
          {filteredItems.map((res, index) => {
            return (
              <TodoList
                data={res}
                key={res.id}
                id={res.id}
                count={index + 1}
                deleteHandler={deleteHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
