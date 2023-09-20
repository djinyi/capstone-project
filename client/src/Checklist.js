import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./user/UserContext";

function Checklist(){
    const { setUser } = useContext(UserContext);
    const [checklist, setChecklist] = useState([]);
    const [toDo, setToDo] = useState([])
    const [content, setContent] = useState(true)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch("/checklists").then((r) => {
          if (r.ok) {
            r.json().then((checklist) => {
                setChecklist(checklist)
                setContent(true)         
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
        console.log(formData)
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
                r.json().then((err) => setErrors(err.error));
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

    setChecklist([...checklist, newItem])


        setContent(false)




}

function deleteToDo(id){
    let list = [...checklist].filter((check) => check.id !== id)
    setChecklist(list)


    if(list.length > 0){
        console.log("hi")
        setContent(false)
        
    } else {
        setContent(true)
        setChecklist([])
        console.log("jesus")
    }
}

console.log(checklist)

//  let finalList = checklist.map((check) => (
//         <li key = {check.id}>{check.to_do} <b onClick={() => handleDeleteClick(check.id)}> x </b></li>
//     ))


    return(
        <div>
        <h3>Checklist</h3>
        <p>{content? " " :
        (checklist.map((check) => ( 
            <li key = {check.id}>{check.to_do} <b onClick={() => handleDeleteClick(check.id)}> x </b></li>))) }</p>
        <h3> add To-To </h3>
        <p><b>
            {errors}
        </b></p>
        <form onSubmit={handleSubmit}>
            <label> To Do </label>
            <input
            type="text"
            id="to_do"
            value={toDo}
            onChange={e => setToDo(e.target.value)}
            />
            <button type="submit"> Submit </button>
            </form>

        </div>
    )
}

export default Checklist;