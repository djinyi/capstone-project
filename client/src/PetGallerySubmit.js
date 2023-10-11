import React, { useEffect, useState } from "react";

function PetGallerySubmit({ id }){
    const [selectedImage, setSelectedImage] = useState(null)
    const [errors, setErrors] = useState([]);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch(`/pets/${id}`).then((r) => {
          if (r.ok) {
            r.json().then((r) => setPhotos(r.image_urls));
          }
        });
      }, []);

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
                    setErrors([])
                })
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })}
    }



    return(
        <div>
            <h3 className="font-semibold text-gray-600"> Submit a photo of your pet! (only .jpeg and .png files)</h3>
            <form onSubmit={handlePostSubmit}>
                <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setSelectedImage(e.target.files[0])} 
                />
                <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded">Submit</button>

            </form>
            <b className="text-red-500">{errors}</b>

            {photos?.map ((photo, index) => (
            <div key={index}>
            <button onClick={() =>
              setPhotos((photos) => {
              return photos.filter((photo, i) => i !== index);
            })}>x</button>
            <img className="h-64" src={photo} alt=" "/> </div>))}
            {/* // :
            // <img className="h-64" src="https://i.imgur.com/GekBpGO.jpg" alt=" "/>
            // } */}

        </div>
    )
}

export default PetGallerySubmit;