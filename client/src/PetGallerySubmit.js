import React, { useState, useContext } from "react";
import { UserContext } from "./user/UserContext";

function PetGallerySubmit({ id }){
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedImagePreview, setSelectedImagePreview] = useState("")
    const [errors, setErrors] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const { pets, setPets } = useState(user.pets);
    const [images, setImages] = useState([]);


    function handlePostSubmit(e) {
        console.log("pic in")
        e.preventDefault();
        const formData = new FormData();
        formData.append('images', selectedImage)
        formData.append('id', id)
        const postErrors = []
        if (!selectedImage) {
        postErrors.push("Image is required")
        if (postErrors?.length > 0) {
            setErrors(postErrors)
          }
        } else {
        fetch(`/pets/pic/${id}`, {
            method: "PATCH",
            body: formData
        })
        .then((r) => {
            if (r.ok){
                r.json().then((r) => {
                    console.log(r)
                })
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })}

    }

    // let imageList = pets.map((pet) => {
    //     let list = pet.images((image) => (
    //     <img src={image} />
    //     ))
    // })
    return(
        <div>
            {/* {imageList} */}
            <h3> Submit a photo of your pet:</h3>
            <form onSubmit={handlePostSubmit}>
                <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setSelectedImage(e.target.files[0])} 
                />
                <button>Submit</button>

            </form>
            {errors}

        </div>
    )
}

export default PetGallerySubmit;