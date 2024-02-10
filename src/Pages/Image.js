import React, { useState } from "react";

function Image() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [bgRemove, setBgRemove] = useState(null);

  const handleRemoveBackground = () => {
    const apikey = "Your Api key";
    const apiurl = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("image_file", selectedImage, selectedImage.name);
    formData.append("Size", "auto");
    fetch(apiurl, {
      method: "Post",
      headers: {
        "X-api-key": apikey,
      },
      body: formData,
    })
      .then((res) => res.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob); // Create object URL
        setBgRemove(imageUrl);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>
        <div>
          <h2 className="bg-blue-200 text-3xl p-2"> Upload a Image </h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="mt-4 border border-gray-300 py-2 px-4 rounded-lg cursor-pointer"
          />
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="max-w-sm m-auto mt-4 rounded-lg shadow-lg"
            />
          )}
        </div>
        <button
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleRemoveBackground}
        >
          Remove Background
        </button>
        <div>
          {bgRemove && (
            <img
              src={bgRemove}
              alt="BackgroundRemoved"
              className="max-w-sm mx-auto my-4"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Image;
