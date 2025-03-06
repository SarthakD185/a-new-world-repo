import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualTournament.css';
import { useLocation } from "react-router-dom";
import AnnouncementsList from '../college/AnnouncementsList';
import CurrentGameList from './CurrentGameList';
import NextGameModule from './NextGameModule';
import { useNavigate } from 'react-router-dom';

function IndividualTournamentPage() {

    const location = useLocation();
    const data = location.state;

    const navigate = useNavigate();

    function handleClick() {
        navigate('/signup');
    }

    return (
    
        <div>

            {/* will be a vertical flexbox @ max-width<480px, else a horizontal flexbox like normal */}
            <div class='verticalFlexMobile480 horizontalFlex paddingTop'>
                <img src={require(`../../assets/images/${data.image}`)} class='smallLogo'></img>
                <h1>{data.name}</h1>
                <h2>Tournament Information</h2>

            </div>

            <div class='threeColumnContainerMobile480 threeColumnContainer'>

                <div class='box' id='individualTournamentAnnouncements'>
                    <h2>Announcements</h2>
                    <AnnouncementsList collegeID={data.id} />

                </div>

                <div class='box' id='individualTournamentCurrentGames'>
                    <h2 class='noPadding noMargin'>Current Games</h2>
                    <CurrentGameList collegeID={data.id} />
                </div>

                <div class='box' id='individualTournamentNextGame'>
                    <h2 class='noPadding noMargin'>Next Game</h2>
                    <NextGameModule collegeID={data.id} />
                </div>

                <div id='individualTournamentButtons'>
                    {/* TODO - add button action */}
                    <div class='centerButton'>
                        <button class='standardButton largeButton'>View Bracket</button>
                    </div>
    
                    <div class='centerButton'>
                        <button class='standardButton largeButton' onClick={handleClick}>Sign Up Now!</button>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default IndividualTournamentPage;