import React, { useContext, useState } from "react";
import Contact from "./Contact"
import { PetContext } from "./pet/PetContext";

function Contacts({ listContacts, deleteContact, createContact }){
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [relationship, setRelationship] = useState("");
    const [phone_number, setPhone_number] = useState([]);
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState([]);
    const [pet_id, setPet_id] = useState(0)
    const { pets } = useContext(PetContext);
    console.log(listContacts)

    function handleSubmit(e) {
        e.preventDefault();

        if(pet_id < 1){
        setErrors(["Contact must be associated to selected pet. Create Pet if none."])
        } else {
        const formData = {name, organization, relationship, phone_number, email, address, notes}
        console.log(formData)
        fetch(`/${pet_id}}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((r) => {
            if(r.ok) {
                r.json().then((newContact) => createContact(newContact, pet_id))
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
          });

        setName("");
        setOrganization("");
        setRelationship("");
        setPhone_number("");
        setEmail("");
        setAddress("");
        setNotes("")
        setErrors([])
        }
    }


    let contactList = listContacts?.map((contact) => (
        <Contact
        key = {contact.id}
        id = {contact.id}
        name = {contact.name}
        organization = {contact.organization}
        relationship = {contact.relationship}
        email = {contact.email}
        address = {contact.address}
        phoneNumber = {contact.phone_number}
        deleteContact={deleteContact}
        />
    ))

    let petsDropdown = pets?.map((pet) => (
        <option value={pet.id}>{pet.name}</option>
    ))


    return(
        <div>
            <h1 class="font-display text-3xl italic text-sky-700 text-center p-4">Contacts</h1>
            {contactList}
            <div class="mx-5">
             <b class="text-red-500">{errors?.map((err) => (
                 <ul key={err}>{err}</ul>
                 ))}</b>
            </div>
            <h3 class="font-semibold text-gray-600 mx-5"> Enter new contact info! </h3>
         <form class="block w-full max-w-lg p-5" onSubmit={handleSubmit}>
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Name </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Organization </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="organization"
            value={organization}
            onChange={e => setOrganization(e.target.value)}
            />
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Relationship </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="relationship"
            value={relationship}
            onChange={e => setRelationship(e.target.value)}
            /> 
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Address </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            /> 
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Email </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            /> 
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Phone Number </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="phone_number"
            value={phone_number}
            onChange={e => setPhone_number(e.target.value)}
            /> 
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Notes </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            /> 
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Pet </label>
            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={e => setPet_id(e.target.value)} name="exhibit" id="exhibit">
                <option value={0}> Choose Pet </option>
                {petsDropdown}
            </select>
            <div class="relative"></div>
            <button class="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" type="submit"> Submit </button>
            </form>
            </div>
    )
}

export default Contacts;