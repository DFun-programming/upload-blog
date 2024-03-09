import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../../firebase";
import { setToken, setUser } from "../../../slices/userSlice";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
import {
  deleteUserByUserId,
  updateUserByUserId,
} from "../../../services/operations/userOperation";

// DashProfile component definition
export default function DashProfile() {
  // Extracting user-related data from Redux store
  const { currentUser, error, token, loading } = useSelector(
    (state) => state.user
  );

  // State variables for managing image upload
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  // State variables for managing form submission and feedback
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Ref for file input element
  const filePickerRef = useRef();

  // Redux dispatch function
  const dispatch = useDispatch();

  //react-router-dom
  const navigate = useNavigate();

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      //to show it on the image
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  // Function to handle image upload
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // Function to upload image to storage
  const uploadImage = async () => {
    if (!imageFile) {
      setImageFileUploadError("Chhose an image first");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    /*this line retrieves a reference to the Cloud Storage service using
     the getStorage function provided by Firebase SDK. 
    It expects the Firebase app instance as an argument.*/
    const storage = getStorage(app);
    /*if the file name is same  there will be ambiguity so, 
    we will add exact timestamp to the name to makeit unique*/
    const fileName = new Date().getTime() + imageFile.name;
    /*This line creates a reference to the desired location in the Cloud Storage
     where the image will be stored. It uses the ref function 
     provided by Firebase Storage SDK, which takes the storage instance 
     and the path (in this case, the file name) as arguments*/
    const storageRef = ref(storage, fileName);
    /* This line initiates the upload process by creating an upload task. 
    It uses the uploadBytesResumable function provided by Firebase Storage SDK. 
    This function takes the storage reference and the image file as arguments 
    and returns an upload task object. */
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    /**
      'state_changed': This is the event name. It indicates that the 
      listener should respond to changes in the state of the upload task.

       HERE ARE 4 PARAMETERS:
        "EVENT"
        "EVENT HANDLER CALL BACK"
        "ERROR HANDLER"
        "SUCCESS HANDLER"
 */
    uploadTask.on(
      "state_changed",
      /** (snapshot) => {...}: This is the callback function that handles the state 
       * change event. It receives a snapshot object containing information 
       * about the current state of the upload. In this callback, 
       * the function calculates the upload progress as a percentage 
       * and updates the imageFileUploadProgress state accordingly.
       */
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      /** if Error ooccurs
      (error) => {...}: This is the error handler function. 
      It is called if an error occurs during the upload process.
      In this callback, the function sets an error message indicating 
      that the image could not be uploaded, resets the upload progress,
       clears the image-related states (setImageFile, setImageFileUrl), 
       and sets imageFileUploading to false to indicate that 
       the upload process has finished.
       */
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      /*
      after completion
      () => {...}: This is the completion handler function. 
      It is called when the upload task is completed successfully. 
      In this callback, the function retrieves the download URL 
      of the uploaded image using getDownloadURL method, 
      updates the imageFileUrl state with the download URL, 
      updates the formData with the image URL, 
      and sets imageFileUploading to false to indicate that 
      the upload process has finished. */
      () => {
         /** getDownloadURL() is a method provided by Firebase Storage that retrieves 
            the download URL of the uploaded file. 
            It takes a reference to the uploaded file 
            (uploadTask.snapshot.ref) as its parameter. 
            
            .then((downloadURL) => { ... }) is a promise handler that executes when 
            the download URL is successfully retrieved. 
            It receives the download URL as an argument.
            */
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
           //set the download url in the image of formdata . we will save it in the db
          setFormData({ ...formData, image: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    //The Object.keys() method in JavaScript returns an array of a given object's own enumerable property names
    //if there is no change for any property of formdata obj then theer is no change
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      //update the user
      const res = await updateUserByUserId(currentUser._id, formData, token);
      const data = res?.user;
      if (!res.success) {
        dispatch(updateFailure(res.message));
        setUpdateUserError(res.message);
      } else {
        //save the user in redux(localstorage)
        dispatch(setUser(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      setUpdateUserError(error.message);
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    try {
      const res = await deleteUserByUserId(currentUser._id, token);
      if (res?.success) {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle user signout
  const handleSignout = async () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };

  // Rendering the component UI
  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.image}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          {imageFileUploadError && (
            <Alert color="failure">{imageFileUploadError}</Alert>
          )}
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            id="firstName"
            placeholder="firstName"
            defaultValue={currentUser.firstName}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            id="lastName"
            placeholder="lastName"
            defaultValue={currentUser.lastName}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            disabled={loading || imageFileUploading}
          >
            {loading ? "Loading..." : "Update"}
          </Button>

          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create a post
            </Button>
          </Link>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
          <span
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "Your Account will be deleted forever",
                btn1Text: "Delete account",
                btn2Text: "Cancel",
                btn1Handler: () => handleDeleteUser(),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="cursor-pointer"
          >
            Delete Account
          </span>

          <span
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => handleSignout(),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="cursor-pointer"
          >
            Sign Out
          </span>
        </div>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert color="failure" className="mt-5">
            {error}
          </Alert>
        )}
      </div>
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>
      )}
    </>
  );
}
