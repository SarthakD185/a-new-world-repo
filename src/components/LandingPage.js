import * as React from 'react';
import logo from '../assets/images/ANewWorldTitleTextWhiteOnClear.png';
import '../App.css';

function LandingPage() {

    return (
    
        <div>

            <div id="heroText">
                <img src={logo}></img>
                <div id='heroTextSmall'>
                    <h3>Introducing Aardvark’s newest board game, A New World, with a global collegiate competition!</h3>
                    <h3>Can your University’s team bring home the prize?</h3>
                </div>
                {/* TODO - add button action */}
                <button class='heroButton'><h4>Register Now</h4></button>
            </div>

            <div class='container'>
                <div id='landingPageSection1' class='box'>
                    <h2>How Does it Work?</h2>
                    <p>
                    Gather a team and sign up to play, first for the honor of being your University’s championship 
                    team and then for the chance to represent your school in continued rounds of global competition.
                    </p>
                    <p>
                    A New World requires a team of 4-7 players who will work together to score as many points as 
                    possible after being dropped into a new, unpopulated world. For the tournament, teams will play 
                    in a head-to-head competition with an opponent seeking to survive in its own New World, but 
                    competing with your team for the same resources.
                    </p>
                </div>

                <div id='landingPageSection2' class='box'>
                    <h2>Why Play?</h2>
                    <p>
                    All players who complete at least one round of tournament play will receive a complimentary 
                    copy of A New World. Each university’s final round teams will go home with some awesome Aardvark 
                    Games swag. The First Place team for each university will receive a cash prize of $1,000 and each 
                    individual team member will get a $100 gift certificate for the Aardvark Games online store.
                    </p>
                    <p>
                    Join us for some great gaming fun! Join us for some awesome tournament prizes!
                    </p>
                    <div class='centerButton'>
                        {/* TODO - add button action */}
                        <button class='standardButton'>Frequently Asked Questions</button>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default LandingPage;