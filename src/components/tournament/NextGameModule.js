import { React, useState, useEffect } from 'react';
import '../../assets/css/IndividualTournament.css';
import '../../App.css';
import TeamsPlaying from './TeamsPlaying';

{/* https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
function NextGameModule({ collegeID }) {

    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
    };

    // Team to College mapping
    const teamToCollegeMap = {
        1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 20: 6,
        8: 1, 9: 1, 10: 1, 11: 2, 12: 3, 13: 1, 14: 1, 15: 1,
        16: 2, 17: 3, 18: 1, 19: 4
    };

    // Function to fetch ongoing games with polling
    useEffect(() => {
        const fetchOngoingGames = async () => {
            try {
                const response = await fetch('https://dumjg4a5uk.execute-api.us-east-1.amazonaws.com/prod/getGames');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                console.log('Fetched games data:', data);
    
                if (data.matches && Array.isArray(data.matches)) {
                    setGames(data.matches);
                } else {
                    throw new Error('Fetched data is not in expected format');
                }

            } catch (error) {
                console.error('Error fetching ongoing games:', error);
            }
        };

        fetchOngoingGames();
    }, []);

    // Filter games based on collegeID
    useEffect(() => {
        if (games.length > 0 && collegeID) {
            console.log('Filtering games for collegeID:', collegeID);

            const filtered = games.filter((game) => {
                const team1CollegeID = teamToCollegeMap[game.TeamOneID];
                const team2CollegeID = teamToCollegeMap[game.TeamTwoID];

                console.log('Checking game:', game.MatchID);
                console.log('Team1 CollegeID:', team1CollegeID, 'vs Team2 CollegeID:', team2CollegeID, 'vs collegeID:', collegeID);

                const isMatch = team1CollegeID === collegeID || team2CollegeID === collegeID;
                console.log('Does this game match? ', isMatch);
                return isMatch;
            });

            console.log('Filtered games:', filtered);
            setFilteredGames(filtered);
        }
    }, [games, collegeID]);

    const formatOptions = {
        timeStyle: "short"
    };

    if(filteredGames.length === 0){

        return(
            <div class='fullHeight'>
                <p class='center'>No Upcoming Game</p>
            </div>
        )

    } else if(filteredGames.length > 1) {

        let nextGame = filteredGames[0]
        let nextDate = new Date(filteredGames[0].Date)

        for(let i = 1; i < filteredGames.length; i++){
            
            let testDate = new Date(filteredGames[i].Date)

            if(testDate < nextDate){
                nextGame = filteredGames[i]
                nextDate = new Date(filteredGames[i].Date)
            }
        }

        return (

            <div key={nextGame.MatchID}>
                <div class='center'>
                    <TeamsPlaying game={nextGame} />
                    <p style={{marginBottom: "8px"}}>Location: {nextGame.Location}</p>
                    <p>Start Time: {nextGame.Date ? formatDate(nextGame.Date) : 'N/A'}</p>
                </div>
            </div>

        )
        

    } else {

        return (

            <div>
                        
                {filteredGames.map((game) => (
                    <div key={game.MatchID}>
                        <div class='center'>
                            <TeamsPlaying game={game} />
                            <p style={{marginBottom: "8px"}}>Location: {game.Location}</p>
                            <p>Start Time: {game.Date ? formatDate(game.Date) : 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </div>

        )
    }

}



export default NextGameModule;