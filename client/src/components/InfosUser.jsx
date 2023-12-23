import React from 'react';
import './InfosUser.css';
import 'remixicon/fonts/remixicon.css';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import imge from '../images/profiles/imge.png';



const InfosUser = () => {
    return (
        <div className="contactInfo">
            <div className='contactInfoHaut'>
                <h3>Contact Infos</h3>
                <IconButton>
                    <i className="ri-settings-5-line"></i>
                </IconButton>
            </div>
            <div className='info'>

                <img src={imge} alt="" />
                <div className='User'>
                    <h4>UserName</h4>
                </div>
                <div className='Num'>
                    <h4>+2130541864597</h4>
                </div>
            </div>
            <div className='PhoneVideo'>
                <IconButton>
                    <i className="ri-video-add-line"></i>
                </IconButton>
                <IconButton>
                    <i className="ri-phone-fill"></i>
                </IconButton>
            </div>


            <div>
                <div className='Medias and docs'>
                    <h4>Medias and docs</h4>
                </div>
            </div>
            <div className='contactInfobas'>
                <Button><i className="ri-file-reduce-line"></i>Block</Button>
                <Button><i className="ri-delete-bin-line"></i>Delete</Button>
            </div>
        </div>
    );
};

export default InfosUser;