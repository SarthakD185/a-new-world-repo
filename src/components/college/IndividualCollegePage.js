import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualCollege.css';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import TeamList from './TeamList';
import AnnouncementsList from './AnnouncementsList';
import GalleryList from './GalleryList';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import Popup from 'reactjs-popup';

function IndividualCollegePage() {

    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {

        //convert input text to lower case

        var lowerCase = e.target.value.toLowerCase();

        setInputText(lowerCase);

    };

    function handleClickGallery(collegeInfo) {
        navigate('/gallery');
    }

    return (
    
        <div>

            <div class='horizontalFlex centerButton paddingTop'>
                <img src={require(`../../assets/images/${data.image}`)} class='smallLogo'></img>
                <h1 class='collegeTitle'>{data.name}</h1>
            </div>

            <div class='extraWideColumnContainer'>
                    
                <div class='box' id='individualCollegeGallery'>

                    <div class='horizontalFlex spaceBetween stickyHeader smallBottomMargin'>
                        <h2 class='noPadding noMargin'>Gallery</h2>

                        <div class='centerButton'>
                            <button class='standardButton' onClick={()=>handleClickGallery(data.id)}>View More</button>
                        </div>
                        
                    </div>

                    <GalleryList collegeID={data.id} />

                </div>

                <div class='box' id='individualCollegeRegisteredTeams'>
                    <div class='horizontalFlex spaceBetween stickyHeader'>
                        <div class='horizontalFlex'>
                            <h2 class='noPadding noMargin'>Registered Teams</h2>

                            <div class='centerButton' style={{marginLeft: '24px'}}>
                                <Popup trigger=
                                    {<button class='standardButton'>
                                        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                                            Create Team <FaPlusCircle size='14px' style={{paddingLeft: '6px'}}/>
                                        </div>
                                    </button>} 
                                    modal nested>
                                    {
                                        close => (
                                            <div className='modal popup'>
                                                <div className='content'>

                                                    <h1 class='center'>Create Team</h1>

                                                    <form class='center'>
                                                        <label for="teamName">Team Name: </label>
                                                        <input type="text" id="teamName" name="teamName" style={{marginBottom: '24px'}}></input>

                                                        <div class='centerButton horizontalFlex spaceBetween' style={{gap: '24px'}}>
                                                            {/* TODO - add button action to create and save new team */}
                                                            <button class='standardButton fullWidth' onClick=
                                                                {() => close()}>
                                                                    Save
                                                            </button>

                                                            <button class='redButton fullWidth' onClick=
                                                                {() => close()}>
                                                                    Close
                                                            </button>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        )
                                    }
                                </Popup>
                            </div>
                        </div>

                        {/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
                        <div className="search">
                            <TextField
                                id="outlined-basic"
                                onChange={inputHandler}
                                variant="outlined"
                                fullWidth
                                label="Search"
                            />
                        </div>
                    </div>
                    
                    <TeamList input={inputText} collegeID={data.id} />

                </div>

                <div class='box' id='individualCollegeAnnouncements'>
                    <h2>Announcements</h2>

                    <AnnouncementsList collegeID={data.id} />

                </div>

            </div>

        </div>

    );
}

export default IndividualCollegePage;