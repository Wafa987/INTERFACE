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
            current_password: formData.current_password,
            new_password: formData.new_password
        })
            .then((res) => {
               console.log(res.data)
            }).catch((error) => {
                console.log(error)
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

          // Validate du mot de passe
          if (!formData.current_password.trim())
          errors.password = "Veuillez renseigner le mot de passe"
      else if (formData.current_password.trim().length < 8)
          errors.current_password = "Le mot de passe est trop court"

        // Enregistrer les erreurs
        setFormErrors(errors);

        if (Object.keys(formErrors).length === 0)
            Update()

    }

    useEffect(() => {
        getProfile(userId)
    }, [])

    if (!formData) return <p>Chargement en cours</p>

    return (
        <>
            <div class="flex justify-left h-screen text-left bg-white">
                <div class="w-1/2 basis ">
                    <form class="bg-white rounded px-8 pb-8 mb-4 mx-auto pt-10" onSubmit={onSubmit}>
                        <h1 class="my-2 text-2xl font-bold text-blue-500">Personal informations</h1>
                        <div class="mb-3">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="phone_number"
                            >
                                Actual password
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                value={formData.current_password}
                                placeholder="Password"
                                onChange={onFormChange}
                            ></input>
                            {formErrors.password && <span class="text-red-600"> {formErrors.password} </span>}
                        </div>
                        <div class="mb-3">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="phone_number"
                            >
                                New passsword
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                value={formData.new_password}
                                placeholder="Password"
                                onChange={onFormChange}
                            ></input>
                            {formErrors.new_password && <span class="text-red-600"> {formErrors.new_password} </span>}
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
