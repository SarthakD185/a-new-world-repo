import * as React from 'react';
import '../../App.css';
import '../../assets/css/IndividualTournament.css';
import { useLocation } from "react-router-dom";
import AnnouncementsList from '../college/AnnouncementsList';
import CurrentGameList from './CurrentGameList';

function IndividualTournamentPage() {

    const location = useLocation();
    const data = location.state;

    return (
    
        <div>

            <div class='horizontalFlex centerButton paddingTop'>
                <img src={require(`../../assets/images/${data.image}`)} class='smallLogo'></img>
                <h1>{data.name}</h1>
            </div>

            <div class='threeColumnContainer'>

                <div class='box' id='individualTournamentAnnouncements'>
                    <h2>Announcements</h2>

                    <AnnouncementsList collegeID={data.id} />

                </div>

                <div class='box' id='individualTournamentCurrentGames'>

                    <h2 class='noPadding noMargin'>Current Games</h2>
                    
                    <CurrentGameList collegeID={data.id} />

                </div>

            </div>

        </div>

    );
}

export default IndividualTournamentPage;