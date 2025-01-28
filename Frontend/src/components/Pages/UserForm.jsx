import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../PageComponents/Alert";

function UserForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState("");
  const [resMsg, setResMsg] = useState("");

  const navigate = useNavigate();
  // const [name, setImages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const handleImages = Array.from(images);
    for (let item of handleImages) {
      if (item.size > 5 * 1024 * 1024) {
        window.alert(`${item.name} is too big, maximum size allowed 5MB`);
        return; // This will stop further processing
      }
    }

    if (!name.trim() || !url.trim())
      return window.alert("all fields are required");

    if (!handleImages.length) return window.alert("Upload at least one image");

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("social_profile", url);
    // formData.append("images", images);
    handleImages.map((item) => formData.append("images", item));

    // console.log(formData);
    fetch(
      "https://social-media-handler-two.vercel.app/api/v1/users/create-user",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setResMsg(res.message);
        if (res.status === "failed") {
          setAlert(true);
          setStatus(res.status);
          return;
        }
        setAlert(false);
        setStatus(res.status);
        if (res.status === "success") {
          navigate("/profile-saved");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    //   console.log(images);
    // navigate("/profile-saved");
    // console.log("successfully user is created")
  };

  return (
    <div>
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
        <p className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Profile
        </p>

        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Social Profile Input */}
          <div>
            <label
              htmlFor="socialProfile"
              className="block text-lg font-medium text-gray-700"
            >
              Social Profile
            </label>
            <input
              id="socialProfile"
              type="url"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Your social profile link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              multiple
              onChange={(e) => setImages(e.target.files)}
              required
            />
          </div>

          {loading ? (
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              Uploading image...
            </div>
          ) : (
            ""
          )}

          {status === "failed" && alert ? (
            <Alert alertMessage={resMsg} setAlert={setAlert} />
          ) : (
            ""
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            onClick={handleSubmit}
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
