import React,{useEffect,useState,useRef} from "react";
import "./Middle.css";
import axios from "axios";
import profilepic from "../../images/profile-1.jpg";
import PostService from "../../Services/PostService";
import { uploadImage } from "../../util/APIUtils";
import { toast } from "react-toastify";
import profile1 from "../../images/profile-11.jpg";
import profile2 from "../../images/profile-12.jpg";
import profile3 from "../../images/profile-13.jpg";
import { ACCESS_TOKEN, USER_EMAIL, USER_NAME } from "../../constants";


export default function Middle() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [file, setFile] = useState(null);

  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState('');

  const [display,setDisplay] = useState("none");

  const [mediaItems, setMediaItems] = useState([]);

  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onDescriptionChange = event => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    setToken(localStorage.getItem(ACCESS_TOKEN))
    setUsername(localStorage.getItem(USER_NAME))
    setEmail(localStorage.getItem(USER_EMAIL))
    fetchAllImage();
  }, []);

  const onFileUpload = () => {
    const formData = new FormData();
    
    formData.append("file", file);
    formData.append("description", description);

    console.log(file);

    axios.post("http://localhost:8088/api/media/upload/image", formData)
        .then(response => {
            console.log("File uploaded successfully", response);
            setImageUrl(response.data.data.url); 
            toast("You're successfully image uploaded!", {
              type: "success",
            });
            // refreshComponent();
        })
        .catch(error =>  {
          console.log("Error uploading file:", error)
          toast(
            (error && error.message) ||
              "Oops! Error uploading file:. Please try again!",
            { type: "error" }
          );
        });

  };

  const fileInputRef = useRef(null);
  // useEffect(()=>{

  // },[posts])


  const handleClick = () =>{
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };

      reader.readAsDataURL(file);
      setDisplay("");
      setFile(event.target.files[0]);
    }
  };
  const handleClosePreview = () => {
    setImageUrl("");
    setDisplay("none");
    setFile(null);
    fileInputRef.current.value = ""; // Reset the file input value
  };

  const fetchAllImage = async () => {
    axios.get('http://localhost:8088/api/media/all')
    .then(response => {
        setMediaItems(response.data);
    })
    .catch(error => console.error('Error fetching media:', error));
  }

  const handleDelete = (planId) => {
    axios.delete("http://localhost:8088/api/media/delete/media/"+planId)
    .then(response => {
        console.log("File delete successfully", response);
        setImageUrl(response.data.data.url); 
        toast("You're successfully image deleted!", {
          type: "success",
        });
        refreshComponent();
    })
    .catch(error =>  {
      console.log("Error deleting file:", error)
      toast(
        (error && error.message) ||
          "Oops! Error deleting file:. Please try again!",
        { type: "error" }
      );
    });
  }

  const refreshComponent = () => {
    fetchAllImage();
  };

  return (
    <div className="middle">
      <div className="stories">
        <div className="story">
          <div className="profile-photo">
            <img src={profilepic} alt="" />
          </div>
          <p className="name">Darshan</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src="./images/profile-15.jpg" alt="" />
          </div>
          <p className="name">Ashu</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src="./images/profile-14.jpg" alt="" />
          </div>
          <p className="name">Shraddha</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src="./images/profile-13.jpg" alt="" />
          </div>
          <p className="name">Ananya</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src="./images/profile-12.jpg" alt="" />
          </div>
          <p className="name">Harsh</p>
        </div>
      </div>
      {/*-story ends here*/}
      <form onSubmit={onFileUpload} className="create-post">
        <div className="profile-photo">
          <img src={profilepic} alt="profile-photo" />
        </div>
        <input
          type="text"
          value={description} onChange={onDescriptionChange}
          // value={content}
          placeholder="what's on your mind Nishi?"
          id="create-post"
          // onChange={(event) => setContent(event.target.value)}
        />
        <div className="attach">
          <span><i onClick={handleClick} className="uil uil-paperclip"></i>
          <input type="file" id="file-input" onChange={handleFileChange} ref={fileInputRef} style={{"display": "none"}}></input>
          </span>
        </div>
        
          
        <input type="submit" defaultValue="post" className="btn btn-primary" />
       
      </form>
      <div id="preview" style={{ display }}>
        <span onClick={handleClosePreview}>
        <i className="uil uil-multiply"></i>
        </span>
        <img src={imageUrl} >
        </img>
        {/* <div className="button"> <button type="submit" defaultValue="post" className="btn btn-primary" >Post</button></div> */}
      </div>

      {/*----------------Feeds-------------------*/}
     
      <div className="feeds">
      {mediaItems.map((post)=>{
          return(
            <div className="feed" key={post.id}>
            <div className="head">
              <div className="user">
                <div className="profile-photo">
                  <img src={profilepic} alt="profile-photo" />
                </div>
                <div className="info">
                  <h3>{username}</h3>
                  <small>{email}, 15 Minutes Ago</small>
                </div>
              </div>
              <span
                  className="edit"
                  onClick={() => handleDelete(post.id)}
                  title="Delete Meal Plan"
                >
                  <i className="uil uil-trash-alt"></i>
              </span>
              <span className="edit">
                <i className="uil uil-ellipsis-h" />
              </span>
            </div>
              <div className="content">
                <p>{post.description}</p>
              </div>
            <div className="photo">
              <img src={post.data} alt="" />
            </div>
            <div className="action-button">
              <div className="interation-buttons">
                <span>
                  <i className="uil uil-heart" />
                </span>
                <span>
                  <i className="uil uil-comment-dots" />
                </span>
                <span>
                  <i className="uil uil-share-alt" />
                </span>
              </div>
              <div className="bookmark">
                <span>
                  <i className="uil uil-bookmark" />
                </span>
              </div>
            </div>
            <div className="liked-by">
              <span>
                <img src={profile1} />
              </span>
              <span>
                <img src={profile2} />
              </span>
              <span>
                <img src={profile3} />
              </span>
              <p>
                Liked by <b>Earnest Achiever</b> and 323 others.
              </p>
            </div>
            <div className="caption">
              <p>
                Lana Rose <b>Lorem ipsumm soluta officia non accusantium</b>{" "}
                <span className="hashtag">#Lifestyle</span>
              </p>
            </div>
            <div className="comments text-muted"> view all 277 Coments</div>
          </div>
          )

      })}
       
      </div>
    </div>
  );
}
