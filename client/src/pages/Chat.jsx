import React, { useState } from 'react';
import '../Chat.css';
import Liste from '../components/Liste';
import Conversation from '../components/Conversation';

const Chat = () => {
    const [currentConversation, setCurrentConversation] = useState(null);

    const handleConversationClick = (conversationInfo) => {
        setCurrentConversation(conversationInfo);
    };

    return (
        <div className="whatsapp-container">
            <Liste onConversationClick={handleConversationClick} />
            <Conversation currentConversation={currentConversation} />
        </div>
    );
};

export default Chat;