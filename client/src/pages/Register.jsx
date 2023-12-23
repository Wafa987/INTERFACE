import { useState, React } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const options = [
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Male",
    value: "male",
  },
];

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')

  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('feminin')
  const [birthDate, setBirthDate] = useState('')

  const [formErrors, setFormErrors] = useState({})
  const navigate = useNavigate()


  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const changeLastname = (e) => {
    setLastName(e.target.value)
  }

  const changeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const changeUsername = (e) => {
    setUsername(e.target.value)
  }

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const changeGender = (e) => {
    setGender(e.target.value)
  }

  const changeBirthDate = (e) => {
    setBirthDate(e.target.value)
  }

  const Register = () => {
    if (password === ConfirmPassword) {
      axios.post("http://localhost:5000/auth/register", {
        first_name: firstName,
        last_name: lastName,
        username: username,
        phone_number: phoneNumber,
        gender: gender,
        email: email,
        password: password,
        birth_date: birthDate
      }).then(() => {
        window.location.href = "/login"
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const validateEmail = (email) => {
    // Expression régulière simple pour une adresse email
    const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return String(email)
      .toLowerCase()
      .match(

        regExp
      );
  }

  const validatePassword = (pwd) => {
    // Expression régulière simple pour une adresse email
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return String(pwd)
      .match(
        regExp
      );
  }

  const onSubmit = (e) => {
    // La validation fu formulaire

    // Annuler l'envoi du formulaire avec e.preventDefault()
    e.preventDefault();
    const errors = {}
    // Validation du nom utilisateur
    if (!firstName.trim())
      errors.firstName = "Veuillez renseigner le nom utilisateur"
    else if (firstName.trim().length < 3)
      errors.firstName = "Le nom utilisateur est trop court"

    if (!lastName.trim())
      errors.lastName = "Veuillez renseigner le nom "
    else if (lastName.trim().length < 3)
      errors.lastName = "Le nom est trop court"

    if (!username.trim())
      errors.username = "Veuillez renseigner le nom utilisateur"
    else if (username.trim().length < 3)
      errors.username = "Le nom utilisateur est trop court"

    if (!phoneNumber.trim())
      errors.phoneNumber = "Veuillez renseigner le numéro de téléphone"
    else if (phoneNumber.trim().length < 9)
      errors.phoneNumber = "Le numéro de téléphone est trop court"

    // Validate du mot de passe
    if (!password.trim())
      errors.password = "Veuillez renseigner le mot de passe"
    else if (validatePassword(password.trim()))
      errors.password = "Le mot de passe est trop court"

    // Validation de l'émail
    if (!email.trim())
      errors.email = "Veuillez renseigner votre email"
    else if (!validateEmail(email.trim()))
      errors.email = "Email incorrect"

    if (!ConfirmPassword.trim())
      errors.ConfirmPassword = "Veuillez renseigner le mot de passe"
    else if (ConfirmPassword.trim() !== password)
      errors.password = "password dont match"

    // Enregistrer les erreurs
    setFormErrors(errors);


    if (Object.keys(formErrors).length === 0)
      Register()
    else
      return
  }

  return (
    <div style={{
      backgroundImage: `url("/register-bg.jpg")`,
      backgroundSize: 'cover'
    }}>
      <div class="flex items-center justify-end h-screen text-left px-40">
        <div class="w-2/3 text-left ">
          <p class="text-2xl font-bold text-white">Welcome !</p>
          <h1 class="text-5xl font-bold text-white">Create<br />new account</h1>
        </div>
        <div class="w-1/3">
          <form class="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 mx-auto glass-morphism " onSubmit={onSubmit}>
            <div class="mb-4">
              <input
                class="login-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                onChange={changeLastname}
                value={lastName}
              ></input>
              {formErrors.lastName && <span class="text-red-600"> {formErrors.lastName} </span>}
            </div>
            <div class="mb-3">
              <input
                class="login-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first_name"
                type="text"
                placeholder="First Name"
                onChange={changeFirstName}
                value={firstName}
              ></input>
              {formErrors.firstName && <span class="text-red-600"> {formErrors.firstName} </span>}
            </div>
            <div class="mb-3">
              <input
                class="register-select login-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first_name"
                type="date"
                placeholder="Birth date"
                onChange={changeBirthDate}
                value={birthDate}
              ></input>
            </div>
            <div class="mb-3">
              <input
                class="login-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone_number"
                type="text"
                placeholder="Phone number"
                onChange={changePhoneNumber}
                value={phoneNumber}
              ></input>
              {formErrors.phoneNumber && <span class="text-red-600"> {formErrors.phoneNumber} </span>}
            </div>
            <div class="mb-3">
              <input
                class="login-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                onChange={changeUsername}
                value={username}
              ></input>
              {formErrors.username && <span class="text-red-600"> {formErrors.username} </span>}
            </div>
            <div class="mb-3">
              <select class="register-select w-full py-2 px-3 rounded" id="gender" value={gender} onChange={changeGender}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

            </div>
            <div class="mb-3">

              <input
                class="login-input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                onChange={changeEmail}
                value={email}
              ></input>
              {formErrors.email && <span class="text-red-600"> {formErrors.email} </span>}
            </div>
            <div class="mb-3">

              <input
                class="login-input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                onChange={changePassword}
                value={password}
              ></input>

              {formErrors.password && <span class="text-red-600"> {formErrors.password} </span>}
            </div>
            <div class="mb-3">

              <input
                class="login-input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                onChange={changeConfirmPassword}
                value={ConfirmPassword}
              ></input>

              {formErrors.password && <span class="text-red-600"> {formErrors.password} </span>}
            </div>
            <div class="flex items-center justify-between text-center">
              <button
                class="hover:bg-blue-700 btn-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign up
              </button>
            </div>
            <div class="text-white">
              Already have an account ?
              <a
                class="my-2 inline-block align-baseline font-bold text-sm mx-3 text-blue-500 hover:text-blue-800"
                onClick={() => navigate('/Login')}
              >
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
