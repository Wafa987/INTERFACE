import React, { useEffect } from "react";
import logo from "../ReplyPal.svg";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';

import {
  FaEnvelope,
  FaMailBulk,
  FaArrowCircleRight,
  FaTrash,
  FaComments,
  FaAddressBook,
  FaPlus,
  FaSave,
  FaUser,
  FaUserAlt,
  FaLock, 
  FaHome
} from "react-icons/fa";

import { IconContext } from "react-icons";

function ProfileLayout() {

  const getProfile = (id) => {
    const instance = axios.create({
        withCredentials: true
    });

    instance.get(`${process.env.REACT_APP_API_LINK}users/get-user`)
        .then(function (res) {
            console.log(res.data)
            localStorage["user_id"] = res.data._id
            localStorage["email"] = res.data.email
        }).catch((error)=> {
          console.log(error)
        })
}

  const logout = async () => {
    const _response = await axios({
      method: 'post',
      url: `http://localhost:5000/auth/logout`,
      withCredentials: true
    }).then((res) => {
      // Sauvegarder les données de connexion
      console.log(res);
      window.location.href = "/register"
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
   getProfile()
  }, [])

  return (
    <div class="app" >

      <div clas="w-full bg-transparent" >
        <div>
          <div class=" flex bg-white">
            <div class="col w-1/6">
              <img class="w-full" src={logo} className="p-3 logo" />
            </div>
            <div class=" col w-4/6 pt-1">
              <input
                class="my-2 w-full shadow appearance-none border border-slate-400 rounded py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline bg-slate-50"
                id="password"
                type="Text"
                placeholder="Rechercher un contact"
              >
              </input>
            </div>
            <div class=" bg-white flex flex-col float-right ml-auto">
              <div class="flex items-center justify-center float-right">
                <div class=" relative inline-block text-left dropdown  float-right">
                  <span class="rounded-md shadow-sm"
                  >
                    <a href="#" class="text-slate-700 text-4xl p-1 mt-2 float-right" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                      <FaUserAlt className="float-left mx-2 font-bold rounded-full bg-slate-200 p-2" />
                    </a>
                  </span>
                  <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95 mr-20">
                    <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                      <div class="px-4 py-3">
                        <p class="text-sm leading-5">Signed in as</p>
                        <p class="text-sm font-medium leading-5 text-gray-900 truncate">{localStorage["email"]}</p>
                      </div>
                      <div class="py-1">
                      <a href="/profile/" tabindex="0" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Profile</a>
                        <a href={`/profile/update-profile/${localStorage["user_id"]}`} tabindex="0" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Update informations</a>
                        <a href="/profile/add-account" tabindex="1" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Add account</a>
                        </div>
                      <div class="py-1">
                        <a onClick={() => logout()} tabindex="3" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Sign out</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <IconContext.Provider value={{ className: "icon-size text-gray-800" }}>
          <div class="flex h-screen bg-gray-200 home-nav-remove">
            <div class="bg-white w-80 flex flex-row justify-between col-span-8">
              <div class="p-2 bg-slate-100 rounded-lg">
              <ul class="mt-0 text-start rounded-sm ">
                  <li class="relative px-2 py-4">
                    <a href="/">
                      <span class="text-gray-800 text-small">
                        <FaEnvelope className="float-left mx-2 font-bold" />
                      </span>
                    </a>
                  </li>
                  <li class="relative px-2 py-4">
                  <a href="/messenger">
                    <span class="text-gray-800">
                      <FaComments className="float-left mx-2" />
                    </span>
                  </a>
                  </li>
                  <li class="relative px-2 py-4">
                    <a href="/profile">
                      <span class="text-gray-800">
                        <FaUser className="float-left mx-2" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div class="px-0">
                  <ul class="mt-8 text-start w-full">
                    <li class="relative px-6 py-2">
                      <a href="/profile">
                        <span class="text-gray-800 text-small">
                          <FaHome className="float-left mx-2 font-bold" /> Home
                        </span>
                      </a>
                    </li>
                    <li class="relative px-6 py-2">
                      <a href="/profile/update-profile">
                        <span class="text-gray-800">
                          <FaUserAlt className="float-left mx-2" /> Personal informations
                        </span>
                      </a>
                    </li>
                    <li class="relative px-6 py-2">
                      <a href="/profile/update-profile-picture">
                        <span class="text-gray-800">
                          <FaLock className="float-left mx-2" /> Security
                        </span>
                      </a>
                    </li>
                  </ul>
                  <hr className="mt-4" />
                </div>
              </div>
            </div>
            <div class="flex-1 flex flex-col overflow-hidden col-span-8">
              <main class="flex-1 bg-white border">
                <div class="container mx-auto p-2">
                  <Outlet />
                </div>
              </main>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default ProfileLayout;
