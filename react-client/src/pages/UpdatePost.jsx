import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostById,
  updatePostById,
} from "../services/operations/postOperation";
import { setPost } from "../slices/postSlice";
import { categories } from "../assets/data/categories";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const [imageUploadStarted, setImageUploadStarted] = useState(false);
  const [imageError, setImageError] = useState(null);

  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      (async () => {
      
          const res = await getPostById(postId);
          if (!res.success) {
            console.log(res.message);
            setPublishError(res.message);
            return;
          }
          if (res.success) {
            setPublishError(null);
            setFormData({...res.posts[0]});
          }
        
       
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadStarted(true);
      setImageError(null);
      setImageUploadError(null);
     /*this line retrieves a reference to the Cloud Storage service using
     the getStorage function provided by Firebase SDK. 
    It expects the Firebase app instance as an argument.*/
    const storage = getStorage(app);
    /*if the file name is same  there will be ambiguity so, 
  we will add exact timestamp to the name to makeit unique*/
  const fileName = new Date().getTime() + '-' + file.name;
  /*This line creates a reference to the desired location in the Cloud Storage
   where the image will be stored. It uses the ref function 
   provided by Firebase Storage SDK, which takes the storage instance 
   and the path (in this case, the file name) as arguments*/
   const storageRef = ref(storage, fileName);
  /* This line initiates the upload process by creating an upload task. 
  It uses the uploadBytesResumable function provided by Firebase Storage SDK. 
  This function takes the storage reference and the image file as arguments 
  and returns an upload task object. */
  const uploadTask = uploadBytesResumable(storageRef, file);
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
            /**
    This code calculates the progress of the image upload by 
    dividing the number of bytes transferred (snapshot.bytesTransferred) by 
    the total size of the image (snapshot.totalBytes).
    It then multiplies this value by 100 to convert it to a percentage. */
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));//toFixed(0) is used to round it down to the nearest number
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
        setImageUploadError('Image upload failed');
        setImageUploadProgress(null);
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
            setImageUploadProgress(null);
            setImageUploadError(null);
            //set the download url in the image of formdata . we will save it in the db
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file && !imageUploadStarted) {
        setImageError("Please upload the image before submit");
        return;
      }
      const res = await updatePostById(formData, currentUser._id, token);

      if (!res?.success) {
        setPublishError(data.message);
        return;
      }

      if (res?.success) {
        setPublishError(null);
        dispatch(setPost(null));
        navigate(`/post/${res?.updatedPost?.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.title.toLowerCase()}>
                {category.id === 0 ? "Select a Category" : category.title}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageError && <Alert color={"failure"}>{imageError}</Alert>}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
