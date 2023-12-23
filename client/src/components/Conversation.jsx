import React, { useState, useRef, useEffect } from 'react';
import './Conversation.css';
import 'remixicon/fonts/remixicon.css';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from "axios";
import InfosUser from './InfosUser';
import { FaTrash } from 'react-icons/fa';

const Conversation = ({ currentConversation }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const conversationRef = useRef(null);
    const [messageSent, setMessageSent] = useState(false);

    useEffect(() => {
        setInterval(getMessages(), 200)
        // Scroll the conversation to the bottom on every message change
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [messages]);
    const getMessages = () => {
        const instance = axios.create({
            withCredentials: true
        });

        instance.get(`${process.env.REACT_APP_API_LINK}messages/`)
            .then(function (res) {
                setMessages(res.data)
               
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const handleSendMessage = () => {
        // Envoyer le message à la base de donnée
        if (inputMessage.trim() !== '') {
            setMessageSent(!messageSent)
            console.log("Envoyer un nouveau message")
            const instance = axios.create({
                withCredentials: true
            });

            localStorage["msg_receiver"] = "geronemo@gmail.com"

            instance.post(`${process.env.REACT_APP_API_LINK}messages/send-message/`,
                {
                    sender_id: localStorage["email"],
                    receiver_id: localStorage["msg_receiver"],
                    sender: 'user',
                    content: inputMessage,
                    message_type: 0
                }
            )
                .then(function (res) {
                    console.log(res.data);
                    setMessages([...messages, res.data]);
                    setInputMessage('');
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    };

    const handleMessageDeletion = (messageId) => {
        const instance = axios.create({
            withCredentials: true
        });

        alert(messageId)
        const params = {
            id : messageId
        }

        instance.delete(`${process.env.REACT_APP_API_LINK}messages/delete-message/${messageId}`)
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    const enterPressed = (e) => {
        e.preventDefault()
        if (e.keyCode === 13)
            if (inputMessage.trim() !== '') {
                const newMessage = {
                    text: inputMessage,
                    sender: 'user',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages([...messages, newMessage]);
                setInputMessage('');
            }
    };

    const fileInputRefAttach = useRef(null);
    const fileInputRefPhoto = useRef(null);

    const handleAttachFile = () => {
        if (fileInputRefAttach.current) {
            // Déclenche l'ouverture de la boîte de dialogue de sélection de fichier
            fileInputRefAttach.current.click();
        }
    };

    const handleInsertPhoto = () => {
        if (fileInputRefPhoto.current) {
            // Déclenche l'ouverture de la boîte de dialogue de sélection de fichier
            fileInputRefPhoto.current.click();
        }
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Vous pouvez maintenant envoyer formData avec votre requête pour télécharger le fichier sur le serveur

            // Afficher une miniature de l'image dans la zone de texte
            const imageUrl = URL.createObjectURL(selectedFile);

        }
    };


    //pour rendre visible les infos en cliquant sur Username
    const [detailsVisible, setDetailsVisible] = useState(false);
    const handleToggleDetails = () => {
        setDetailsVisible(!detailsVisible);
    };

    //la function pour que quand je clique sur entree le message sera envoyer
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    //la function pour quand je clique sur button emojis une liste d'emojis qui v'ont afficher
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };
    const handleEmojiClick = (emoji) => {
        setInputMessage((prevMessage) => prevMessage + emoji);
    };


    return (
        <div className='mainPere'>
            <div className="main-content">
                <div className="header" >
                    <div onClick={handleToggleDetails} style={{ cursor: 'pointer' }}>
                        <img src={currentConversation?.image} alt="" />
                        <h2>{currentConversation?.name || ''}</h2>
                        <h6 style={{ cursor: 'pointer' }}>       Online  </h6>
                    </div>
                    <div className='navbarmessage'>
                        <Button>
                            <i className="ri-video-add-line"></i>
                        </Button>
                        <Button>
                            <i className="ri-phone-fill"></i>
                        </Button>
                        <Button>
                            <i className="ri-search-line"></i>
                        </Button>
                        <Button>
                            <i className="ri-settings-5-line"></i>
                        </Button>
                    </div>
                </div>
                <div className="chat-container">
                    {/* ... Other elements ... */}
                    <div className="conversation" ref={conversationRef}>
                        {messages && messages.map((msg, index) => (
                            <>
                            <div
                                key={index}
                                className={`message ${msg.sender_id !== localStorage["email"] ? 'sent' : 'received'}`}
                            >
                                <p>
                                    {msg.sender_id == localStorage["email"] && (
                                        <a onClick={() => handleMessageDeletion(msg._id)}><FaTrash></FaTrash></a>
                                    )}
                                    { msg.content }
                                </p>
                                
                            </div>
                            <div className="text-center"><span className='text-dark text-xs'>{msg.sending_date}</span></div>
                            </>
                        ))}
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            value={inputMessage}
                            placeholder="Write a Message..."
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyUp={(e) => enterPressed(e)}
                            onKeyDown={handleKeyDown}
                        />
                        <ButtonGroup>
                            <Button onClick={handleSendMessage}>
                                <i className="ri-send-plane-fill"></i>
                            </Button>
                        </ButtonGroup>


                        <label htmlFor="file-input-attach">
                            <input
                                id="file-input-attach"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                                ref={fileInputRefAttach}
                            />
                            <span role="img" aria-label="Attach File" className='fichier' onClick={handleAttachFile}>
                                <i className="ri-folder-line"></i>
                            </span>
                        </label>

                        <label htmlFor="file-input-photo">
                            <input
                                id="file-input-photo"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                                ref={fileInputRefPhoto}
                            />
                            <span role="img" aria-label="Insert Photo" className='fichier' onClick={handleInsertPhoto}>
                                <i className="ri-image-line"></i>
                            </span>
                        </label>

                        <span className='fichier'><i class="ri-mic-line"></i></span>

                        <span className='fichier' onClick={toggleEmojiPicker}><i className="ri-emotion-line"></i></span>
                        {emojiPickerVisible && (
                            <div className="emoji-picker">
                                <span onClick={() => handleEmojiClick("😊")} role="img" aria-label="Smile">😊</span>
                                <span onClick={() => handleEmojiClick("❤️")} role="img" aria-label="Heart">❤️</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {
                detailsVisible && (
                    <InfosUser />
                )
            }
        </div >
    );
};

export default Conversation;