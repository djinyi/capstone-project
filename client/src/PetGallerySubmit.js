import React, { useState } from "react";

function PetGallerySubmit({ id, setPhotos }){
    const [selectedImage, setSelectedImage] = useState(null)
    const [errors, setErrors] = useState([]);

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
                    setPhotos(r.image_urls)
                })
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })}


    }

    return(
        <div>
            <h3 class="font-semibold text-gray-600"> Submit a photo of your pet! (only .jpeg and .png files)</h3>
            <form onSubmit={handlePostSubmit}>
                <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setSelectedImage(e.target.files[0])} 
                />
                <button class="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded">Submit</button>

            </form>
            <b class="text-red-500">{errors}</b>

        </div>
    )
}

export default PetGallerySubmit;