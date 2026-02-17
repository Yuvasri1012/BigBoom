// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB5GA2mpOw-6mbqjsdhYxz9hpeR7iT2b5M",
  authDomain: "bigboom-2f1e0.firebaseapp.com",
  projectId: "bigboom-2f1e0",
  storageBucket: "bigboom-2f1e0.firebasestorage.app",
  messagingSenderId: "282022549353",
  appId: "1:282022549353:web:f506afdd5eebb781b2cff8",
  measurementId: "G-9K88B2Q0XT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const wholelogin = document.querySelector(".wholelogin");
const wholesign = document.querySelector(".wholesign");

document.getElementById("showSignup").addEventListener("click", () => {
  wholelogin.style.display = "none";
  wholesign.style.display = "flex";
});

document.getElementById("showLogin").addEventListener("click", () => {
  wholesign.style.display = "none";
  wholelogin.style.display = "flex";
});

document.querySelector(".subsbtn").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup Successfully!");
      document.querySelector(".popupSign").style.display = "none";
    })
    .catch((error) => {
      const errorcode = error.code;
      const errorMessage = error.errormessage;
      alert(error.message);
    });
});

document.querySelector(".subsbtn1").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user;
      alert("Login Successfully!");
      console.log("Success block executed");
      document.querySelector(".popupSign").style.display = "none";
    })
    .catch((error) => {
      const errorcode = error.code;
      const errorMessage = error.errormessage;
      alert(error.message);
    });
});
