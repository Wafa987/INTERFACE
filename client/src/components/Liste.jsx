import React, { useState } from 'react';
import './Liste.css';
import 'remixicon/fonts/remixicon.css';
import ben from '../images/profiles/ben.png';
import daryl from '../images/profiles/daryl.png';
import douglas from '../images/profiles/douglas.png';
import jacob from '../images/profiles/jacob.png';
import john from '../images/profiles/john.jpeg';
import kim from '../images/profiles/kim.jpeg';
import { Link } from 'react-router-dom';


const Liste = ({ conversations, onConversationClick }) => {
    const handleClick = (friend) => {
        // Appel de la fonction de gestion du clic avec les informations sur la conversation
        localStorage["msg_receiver"] = friend.name
        onConversationClick({
            name: friend.name,
            image: friend.image,
            // Ajoutez d'autres informations sur la conversation que vous souhaitez afficher
        });
    };
    const [friends, setFriends] = useState([
        { id: 1, name: 'ben', online: true, image: ben, time: '17:55', message: 'bien on fait comme ca' },
        { id: 2, name: 'daryl', online: false, image: daryl, time: '16:57', message: 'oui bien-sur' },
        { id: 3, name: 'douglas', online: true, image: douglas, time: '13:44', message: 'non je suis vraiment desole' },
        { id: 4, name: 'jacob', online: true, image: jacob, time: '11:11', message: 'toutes mes felicitations' },
        { id: 5, name: 'john', online: true, image: john, time: '11:55', message: 'oui oui' },
        { id: 6, name: 'kim', online: false, image: kim, time: '08:55', message: 'ok' },
    ]);

    return (
        <div className="sidebar">
            <div className='header1'>
                <button><i class="ri-user-fill"></i></button>
                <button> <i class="ri-team-fill"></i></button>
                <Link to='journalAppels'><button> <i class="ri-phone-fill"></i></button></Link>

            </div>

            <div className="Chats">
                <h2>Chats</h2>
            </div>


            <div className="friends-list">
                <div className='freind-liste-fils'>
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>

                <ul>
                    {friends.map((friend) => (
                        <li key={friend.id} className={friend.online ? 'online' : 'offline'} onClick={() => handleClick(friend)}>
                            <div className='liste-discussion'>
                                <img src={friend.image} alt={friend.name} />
                                <div>
                                    <h5>{friend.name}</h5>
                                    <p className='plisteDiscussion'>{friend.message}</p>
                                </div>
                                <p>{friend.time}</p>
                                {friend.online && <button><i className="ri-circle-fill"></i></button>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Liste;