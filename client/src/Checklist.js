import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./user/UserContext";

function Checklist(){
    const { setUser } = useContext(UserContext);
    const [checklist, setChecklist] = useState([]);
    const [toDo, setToDo] = useState([])
    const [content, setContent] = useState(false)
    const [errors, setErrors] = useState([]);

    console.log(errors)

    useEffect(() => {
        fetch("/checklists").then((r) => {
          if (r.ok) {
            r.json().then((checklist) => {
                setChecklist(checklist)
                setContent(false)         
            })} else {
                r.json().then((err) => {
                    setErrors(err.error)
                    setContent(false)
                });
            }
          })},
          [setUser]);

      function handleSubmit(e) {
        e.preventDefault();
        const formData = { to_do: toDo }
        fetch("/checklists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((r) => {
            if(r.ok) {
                r.json().then((newItem) => {
                    addToDo(newItem)
                })
            } else {
                r.json().then((err) => console.log(err.error));
            }
          });

        setToDo("")
    }

function handleDeleteClick(id) {


    fetch(`/checklists/${id}`, {
        method: "DELETE",
    })
    .then((r) => {
        if(r.ok) {
            r.json().then(deleteToDo(id))
        } else {
            r.json().then((error) => setErrors(error.errors));
        }
    })
}


function addToDo(newItem){

    if(checklist.length <= 0){
        setChecklist([newItem])
        setContent(false)
    } else if (checklist.length >= 1){

    setChecklist([...checklist, newItem])


        setContent(false)
    }

}

function deleteToDo(id){
    let list = [...checklist].filter((check) => check.id !== id)
    setChecklist(list)


    if(list.length > 0){
        setContent(false)
        
    } else {
        setContent(true)
        setChecklist([])
    }
}



    return(
        <div>
        <h1 class="text-3xl text-sky-500 text-center p-4">Checklist</h1>
        <p>{content? " " :
        (checklist.map((check) => ( 
            <li key = {check.id}>{check.to_do} <b onClick={() => handleDeleteClick(check.id)}> x </b></li>))) }</p>
        {/* <h3> add To-To </h3> */}
        <p><b>

        </b></p>
        <div class="block w-full max-w-lg p-10">
        <form class="block w-full max-w-lg p-10" onSubmit={handleSubmit}>
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> To Do </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="to_do"
            value={toDo}
            onChange={e => setToDo(e.target.value)}
            />
            <button class="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" type="submit"> Submit </button>
            </form>
        </div>

        </div>
    )
}

export default Checklist;