import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./user/UserContext";
import { Link } from "react-router-dom";

function Checklist(){
    const { setUser } = useContext(UserContext);
    const [checklist, setChecklist] = useState([]);
    const [toDo, setToDo] = useState([])
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch("/checklists").then((r) => {
          if (r.ok) {
            r.json().then((checklist) => setChecklist(checklist)        
            )} else {
            r.json().then((err) => setErrors(err.error));
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
                    setErrors([])
                })
            } else {
                r.json().then((err) => setErrors(err.errors));
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
    } else if (checklist.length >= 1){

    setChecklist([...checklist, newItem])
    }
}

function deleteToDo(id){
    let list = [...checklist].filter((check) => check.id !== id)
    setChecklist(list)
}



    return(
        <div>
        <h1 className="font-display text-3xl italic text-sky-700 text-center p-4">Checklist</h1>
        <p>{checklist?.map((check) => ( 
            <li className="mx-6" key = {check.id}>{check.to_do} <b onClick={() => handleDeleteClick(check.id)}> x </b></li>)) }</p>
        <div className="block w-full max-w-lg p-10">
        <form className="block w-full max-w-lg p-10" onSubmit={handleSubmit}>
        <div className="mb-5">
            <b className="text-red-500">{errors?.map((err) => (
            <ul key={err}>{err}</ul>
          ))}</b>
        </div>
            <label htmlFor="to_do" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> To Do </label>
            <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="to_do"
            value={toDo}
            onChange={e => setToDo(e.target.value)}
            />
            <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" type="submit"> Submit </button>
            </form>
        </div>

            <div>
                <p className="mx-6">Check out our resources:</p>
                <p><Link className="text-sky-700 mx-6" to="https://www.aspca.org/sites/default/files/blog_disaster-prep_090220_info.png">ASPCA Checklist Recommendations for Emergency Situations</Link></p>
                <p><Link className="text-sky-700 mx-6" to="https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness">ASPCA Extra Considerations for Checklist</Link></p>
                <p><Link className="text-sky-700 mx-6" to="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/pet-disaster-preparedness.html">Red Cross Pet Disaster Preparedness</Link></p>
                <p><Link className="text-sky-700 mx-6" to="https://www.ready.gov/pets">Ready.gov Pet Preparation Plan </Link></p>
                <p><Link className="text-sky-700 mx-6" to="https://www.humanesociety.org/resources/pet-disaster-preparedness">The Humane Society Pet Preparedness </Link></p>
                <p><Link className="text-sky-700 mx-6" to="https://www.cdc.gov/healthypets/keeping-pets-and-people-healthy/emergencies.html">CDC Pet Safety in Emergencies </Link></p>
            </div>
        </div>
    )
}

export default Checklist;