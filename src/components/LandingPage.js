import * as React from 'react';
import logo from '../assets/images/ANewWorldTitleTextWhiteOnClear.png';
//import logo from '../assets/images/ANewWorldTitleTextClearBackground.png';
import '../App.css';
import '../assets/css/Landing.css';
import SlideShow from './SlideShow';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function LandingPage() {

    return (
    
        <div>

            <div id="heroText">
                <img src={logo}></img>
                <div id='heroTextSmall'>
                    <h3>Introducing Aardvark’s newest board game, A New World, with a global collegiate competition!</h3>
                    <h3>Can your University’s team bring home the prize?</h3>
                </div>
                <button class='heroButton' onClick={() => window.location.replace("/signup")}><h4>Register Now</h4></button>
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
                    All players who complete at least one round of tournament play will receive a <i><b>complimentary 
                    copy of A New World.</b></i> Each university’s final round teams will go home with some awesome Aardvark 
                    Games swag. The First Place team for each university will receive a <i><b>cash prize of $1,000</b></i> and each 
                    individual team member will get a <i><b>$100 gift certificate</b></i> for the Aardvark Games online store.
                    </p>
                    <p>
                    Join us for some great gaming fun! Join us for some awesome tournament prizes!
                    </p>
                    <div class='centerButton'>
                        <Popup trigger=
                            {<button class='standardButton'>Frequently Asked Questions</button>} 
                            modal nested>
                            {
                                close => (
                                    <div className='modal popup'>
                                        <div className='content'>

                                            <h1 class='center'>Frequently Asked Questions</h1>

                                            <h3 class='popupHeader'>Can I buy the game now?</h3>
                                            {/* TODO - add link */}
                                            <p>You can sign up for our pre-order list on the Game page. <i>[link]</i></p>

                                            <h3 class='popupHeader'>I don’t see my university listed. Can I still play?</h3>
                                            <p>Yes! When we see a new school listed, we contact them to initiate tournament activity. Please do sign up and get your friends involved ASAP!</p>

                                            <h3 class='popupHeader'>Do I get my money back if my college doesn’t have playoff rounds?</h3>
                                            <p>Yes, those fees are refundable. However, if there are competitions played at nearby schools, you will first be invited to join a team there.</p>

                                            <h3 class='popupHeader'>What if our team can’t afford to travel to the final playoff location?</h3>
                                            <p>Aardvark games will be paying all travel costs.</p>

                                            <h3 class='popupHeader'>I’m taking a break from college, can I play?</h3>
                                            <p>No, only current students may enter.</p>

                                        </div>
                                        <div class='centerButton'>
                                            <button class='standardButton' onClick=
                                                {() => close()}>
                                                    Close
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </Popup>
                    </div>
                </div>

                <div id='landingPageSection3' class='box'>

                    <h2 id='gameplayHeader'>Gameplay</h2>

                    <div id='gameplayParagraphs'>

                        <p>
                        A New World requires a team of 4-7 players who will work together to score as many points as possible after 
                        being dropped into a new, unpopulated world. The habitats will vary and the team will not know in advance 
                        where they will land.
                        </p>

                        <p>
                        Environments could be a desert planet, an underwater location, a water world with scattered islands, an 
                        ice covered mountain range, or a jungle full of predatory animals and dangerous plant life. <i><b>(Advance News! 
                        Expansion Pack 1 is in the design phase with additional worlds and resources!)</b></i>
                        </p>

                        <p>
                        The game is best played in a head-to-head competition with a second team seeking to survive in its own New 
                        World, but competing for the same resources. However, with the modifications described for solo team play, 
                        it is possible to enjoy striving to beat your own prior scores.
                        </p>

                        <div class='centerButton'>
                            <Popup contentStyle={{ width: '90%' }} trigger=
                                {<button class='standardButton'>View Player Roles</button>} 
                                modal nested>
                                {
                                    close => (
                                        <div className='popup'>
                                            <div className='content'>

                                                <h1 class='center'>Player Roles</h1>

                                                <p>Every team must designate the roles for each player prior to beginning play. If a team has fewer than seven players, team members may assume more than one role.</p>

                                                <div class='twoColumnGrid'>

                                                    <p><b>Expedition Leader: </b>This team member will make decisions on when and how action cards are played. They facilitate the team’s joint strategic planning and manage the expedition budget.</p>

                                                    <p><b>Resource Specialist: </b>This team member is responsible for obtaining the resources required for survival on arrival and the establishment of a base on the new world.</p>

                                                    <p><b>Scientist: </b>This team member collects knowledge cards that allow the team an advantage in knowing how to overcome obstacles and which actions are most likely to succeed.</p>

                                                    <p><b>Technician: </b>This team member uses tool and technology cards to create the team base and repair machines and weapons as needed.</p>

                                                    <p><b>Chronicler: </b>This team member is responsible for all communications with Home Base, for researching historic data cards that may aid the quest and for creating a chronicle of the current expedition.</p>

                                                    <p><b>Weapons Specialist: </b>This team member leads the team defense strategies and works to gain points to raise each team member’s skill level on the weapon classes best suited to the current habitat.</p>
                                                
                                                </div>

                                                <p><b>Physician: </b>This team member is responsible for the physical and mental health of expedition members, treating injuries and illness when determined by cards for encounters with native wildlife, hostile forces, space adaptation syndrome, etc.</p>

                                            </div>
                                            <div class='centerButton'>
                                                <button class='standardButton' onClick=
                                                    {() => close()}>
                                                        Close
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                        </div>

                    </div>

                    <div id='gameplaySlideshow'>
                        <SlideShow />
                    </div>


                </div>
                
            </div>

        </div>

    );
}

export default LandingPage;