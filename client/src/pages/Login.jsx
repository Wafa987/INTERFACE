import { useState, React } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie";

function Login() {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   // Définir un tableau pour les erreurs
   const [formErrors, setFormErrors] = useState({})
   const navigate = useNavigate()

   const changeEmail = (e) => {
    setEmail(e.target.value)
   }

   const changePassword = (e) => {
    setPassword(e.target.value)
   }

   const onSubmit = (e) => {
    e.preventDefault();
    const errors = {}

    // Validation de l'émail
    if (!email.trim())
        errors.email = "Veuillez renseigner votre email"
    else if (!validateEmail(email.trim()))
        errors.email = "Email incorrect"

    // Validate du mot de passe
    if (!password.trim())
        errors.password = "Veuillez renseigner le mot de passe"
    else if (password.trim().length < 1)
        errors.password = "Le mot de passe est trop court"

    // Enregistrer les erreurs
    setFormErrors(errors);

    if (Object.keys(formErrors).length === 0)
         Login()
  }

  const validateEmail = (email) => {
    // Expression régulière simple pour une adresse email
    const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return String(email)
        .toLowerCase()
        .match(
            regExp
        );
  };

  const Login = () => {
    axios.defaults.withCredentials = true
    axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
    },  { withCredentials: true }).then((res) => {
      // Sauvegarder les données de connexion
      localStorage["email"] = email
      window.location.href = "/"

      
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div style={{
      backgroundImage: `url("/register-bg.jpg")`,
      backgroundSize: 'cover'
    }}>
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/4 basis text-left">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto py-30 glass-morphism" onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              className="login-input shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e)=>changeEmail(e)}
            ></input>
             {formErrors.email && <span className="text-white font-light"> {formErrors.email} </span>}
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="login-input first-line:shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e)=>changePassword(e)}
            ></input>
            {formErrors.password && <span className="text-white font-light"> {formErrors.password} </span>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Connexion
            </button>
          </div>
          <div className="flex items-center justify-between pt-5">
          <a
              className="inline-block align-baseline text-sm text-white hover:text-gray-300"
              href="#"
            >
              Mot de passe oublié ?
            </a>
            <a
              className="inline-block align-baseline  text-sm text-white hover:text-gray-300"
              href="/register"
            >
              Créer un compte
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy; Nom de l'application .js
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;










































// import React from "react";
// // import axios from "axios";

// function Login() {
//     const onSubmit = (e) => {
//         e.preventDefault();

//         // axios.post('URL');
//     };

//     return (
//         <div>
//             <header>
//                 <img src="logo.png" alt="Logo" id="logo" />
//                 <nav>
//                     <ul>
//                         <li><a href="#" id="home">Home</a></li>
//                         <li><a href="#" id="join">Join</a></li>
//                         <li><a href="#" id="aboutUs">About Us</a></li>
//                     </ul>
//                 </nav>
//             </header>
//             <main>
//                 <div className="container1">
//                     <div className="welcome">Hello,<br /> welcome back!</div>
//                     <div className="container2">
//                         <p className="sign-in">Sign in</p>
//                         <input type="text" name="email" placeholder="E-mail" />
//                         <input type="password" name="password" placeholder="Password" />
//                         <p><a href="#" id="forgotPassword">Forgot password?</a></p>
//                         <button className="button" id="login" type="submit">Log in</button>
//                         <p>Not a member yet? <a href="/Register" id="createAccount">Create an account</a></p>
                        
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default Login;
