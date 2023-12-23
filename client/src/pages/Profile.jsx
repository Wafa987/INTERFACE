import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

function Profile() {
    const { userId } = useParams();
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    // Mettre à jour les champs de la page
    const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    const Update = () => {
        axios.put(`http://localhost:5000/users/${userId} `, {
            username: formData.username,
            phone_number: formData.phoneNumber,
            email: formData.email,
            password: formData.password
        })
            .then((res) => {
                setFormData({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    username: res.data.username,
                    gender: res.data.gender,
                    phone_number: res.data.phone_number,
                    birth_date: res.data.birth_date.substring(0, 10),
                    email: res.data.email
                    //profile_picture: res.data.profile_picture
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    // Récupérer le profile utilisateur grace à l'identifiant Mongodb
    const getProfile = () => {

        const instance = axios.create({
            withCredentials: true
        });

        instance.get(`${process.env.REACT_APP_API_LINK}users/get-user`)
            .then(function (res) {

                setFormData({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    username: res.data.username,
                    gender: res.data.gender,
                    phoneNumber: res.data.phone_number,
                    //birthDate: res.data.birth_date.substring(0, 10),
                    email: res.data.email,
                    profile_picture: res.data.profile_picture
                })
            })
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


    const onSubmit = (e) => {
        e.preventDefault();
        const errors = {}
        // Validation du nom utilisateur
        if (!formData.username.trim())
            errors.username = "veuillez renseigner le nom utilisateur"
        else if (formData.username.trim().length < 3)
            errors.username = "Le nom utilisateur est trop court"

        // Validation de l'émail
        if (!formData.email.trim())
            errors.email = "Veuillez renseigner votre email"
        else if (!validateEmail(formData.email.trim()))
            errors.email = "Email incorrect"

        // Validation de la date de naissance
        if (!formData.birthDate.trim())
            errors.birthDate = "Veuillez renseigner votre date de naissance"

        // Validate du mot de passe
        if (!formData.password.trim())
            errors.password = "Veuillez renseigner le mot de passe"
        else if (formData.password.trim().length < 8)
            errors.password = "Le mot de passe est trop court"

        // Enregistrer les erreurs
        setFormErrors(errors);

        if (Object.keys(formErrors).length === 0)
            Update()

    }

    useEffect(() => {
        getProfile()
    }, [])

    if (!formData) return <p>Chargement en cours</p>

    return (
        <>
            <div class="flex justify-left h-screen text-left bg-white">
                <div class="w-1/2 basis ">
                    <form class="bg-white rounded px-8 pb-8 mb-4 mx-auto pt-10" onSubmit={onSubmit}>
                        <h1 class="my-2 text-2xl font-bold text-blue-500">Personal informations</h1>
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Firstname
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="Firstname"
                                value={formData.first_name}
                                onChange={onFormChange}

                            ></input>
                            {formErrors.first_name && <span class="text-red-600"> {formErrors.first_name} </span>}
                        </div>
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Lastname
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Lastname"
                                value={formData.last_name}
                                onChange={onFormChange}
                            ></input>
                            {formErrors.last_name && <span class="text-red-600"> {formErrors.last_name} </span>}
                        </div>
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Username
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Nom"
                                value={formData.username}
                                onChange={onFormChange}

                            ></input>
                            {formErrors.username && <span class="text-red-600"> {formErrors.username} </span>}
                        </div>
                        <div class="mb-3">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="birth_date"
                            >
                                Date de naissance
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="birth_date"
                                name="birthDate"
                                type="date"
                                value={formData.birthDate}
                                placeholder="Ex: 2024:01:01"
                                onChange={onFormChange}
                            ></input>
                            {formErrors.birthDate && <span class="text-red-600"> {formErrors.birthDate} </span>}
                        </div>
                        <div class="mb-3">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="email"
                            >
                                Email address
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                placeholder="nom@nomsociete.tld"
                                onChange={onFormChange}
                                readOnly
                            ></input>
                            {formErrors.email && <span class="text-red-600"> {formErrors.email} </span>}
                        </div>
                        <div class="mb-3">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="phone_number"
                            >
                                Phone number
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={formData.phoneNumber}
                                placeholder="Nom utilisateur"
                                onChange={onFormChange}
                            ></input>
                            {formErrors.phoneNumber && <span class="text-red-600"> {formErrors.phoneNumber} </span>}
                        </div>
                        <div class="mb-3">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="phone_number"
                            >
                                Password
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                placeholder="Password"
                                onChange={onFormChange}
                            ></input>
                            {formErrors.password && <span class="text-red-600"> {formErrors.password} </span>}
                        </div>
                        <div class="flex items-center justify-between">
                            <button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Update infos
                            </button>
                            <a
                                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                href="#"
                            >
                                Update infos
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;
