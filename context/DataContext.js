import { createContext, useCallback, useState, useEffect } from "react";
import { auth,reference,database} from "../firebseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { v4 as uuidv4 } from "uuid";
import { set, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { child, get } from "firebase/database";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const userId = "highhh";

  // User State (Would use UseReducer to refactor this code)
  const [userIdentify, setUserIdentify] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [allUsers, setAllUsers] = useState();
  // Login error

  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [LoginLoading, setLoginLoading] = useState();
  const [SignUpLoading, setSignUpLoading] = useState();
  const [signed, setSigned] = useState(false);
  const [LoadError, setLoadError] = useState();

  // Uploadg()
  const [uploaded, setUploaded] = useState(false);

  // Sign Up function
  const submit = useCallback(() => {
    setUserIdentify(userId);
    // set state loading
    setSignUpLoading(true);
    // creating user data
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setSignUpLoading(false);
        setUserIdentify(userId);
      })
      .catch((error) => {
        setSignUpError(error.code);
        setSignUpLoading(false);
        setTimeout(() => {
          setSignUpError("");
        }, 3000);
      });
  }, [email, password, phone, userId, username]);

  //   login Function
  const signIn = useCallback(() => {
    setLoginLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setSigned(true);
        setLoginLoading(false);
      })
      .catch((error) => {
        setLoginError(error.code);
        setLoginLoading(false);
        setTimeout(() => {
          setLoginError("");
        }, 3000);
      });
  }, [email, password]);

  //   Upload Image function
  function upload() {
    if (imageUpload === null) return;
    // Upload images to firebase Storage
    const imgRef = ref(
      storage,
      `images/usersProfileImg/${userIdentify}/${imageUpload.name + userId}`
    );
    uploadBytes(imgRef, imageUpload)
      .then((snaphost) => {
        // getting the download url for the uploaded image
        getDownloadURL(snaphost.ref).then((url) => {
          setProfileImg(url);
        });
      })
      .then(() => {
        setUploaded(true);
      });
  }

  if (uploaded === true) {
    console.log(userIdentify);
    // update user Profile image in firebase realtime database
    update(reference(database, "users/" + userIdentify), {
      profile_picture: profileImg,
    })
      .then(console.log("saved"))
      .catch((error) => {
        console.log(error);
      });
  }

//   useEffect(() => {
//     if (signed === false) {
//       return;
//     } else if (signed === true) {
//       // getting all users
//       const dbRef = reference(database);
//       get(child(dbRef, `users/`))
//         .then((snapshot) => {
//           if (snapshot.exists()) {
//             setAllUsers(Object.values(snapshot.val()));
//             console.log(Object.values(snapshot.val()));
//           } else {
//             console.log("No data available");
//           }
//         })

//         .catch((error) => {
//           console.log(error);
//           setLoadError(error);
//         });
//     }
//   }, [signed]);

  return (
    <DataContext.Provider
      value={{
        // states
        email,
        password,
        user,
        username,
        phone,
        loginError,
        signUpError,
        signed,
        userIdentify,
        imageUpload,
        profileImg,
        LoginLoading,
        SignUpLoading,
        allUsers,
        LoadError,
        setEmail,
        setPhone,
        setUsername,
        setPassword,
        setImageUpload,
        setProfileImg,
        // functions
        submit,
        signIn,
        upload,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;