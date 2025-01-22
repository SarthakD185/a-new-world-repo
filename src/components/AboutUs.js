import * as React from 'react';
import { useState } from "react";
import logo from '../assets/images/AardvarkLogoClearHorizontal.png';
import NavBar from './NavBar';
import '../App.css';

function AboutUs() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        //TODO - change from alert dialog to sending an actual email
        event.preventDefault();
        alert(`The name you entered was: ${name}\n
                The email you entered was: ${email}\n
                The message you entered was: ${message}`);
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
    
        <div>

            <p class='center'>
                <img class='centerImagePadding' src={logo}></img>
            </p>

            <div class="horizontalFlexContainer">

                <div id="aboutUsInfo">

                <h3 id="aboutUsHeader">About Us</h3>

                    <p>
                    Aardvark Games is a tabletop game publisher dedicated to entertaining game players worldwide with 
                    products designed to engage and challenge. Our best known games include Meeple City, Beyond the Galaxy, 
                    Continental Conquest, Forests of Legend, Between the Seas and now, A New World. Whether you are new to 
                    gaming, an experienced game player, a member of a gaming group or someone who prefers to play solo, 
                    we seek to make games that will delight and keep you coming back for more!
                    </p>
                </div>

                <div id='aboutUsContactForm'>

                    <h3 id="aboutUsHeader">Contact</h3>

                    <form onSubmit={handleSubmit} class='verticalFlexContainer'>
                        <label><h4 class='contactLabel'>Name:</h4>
                            <input
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                class='contactInputField'
                            />
                        </label>

                        <label><h4 class='contactLabel'>Email:</h4>
                            <input
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                class='contactInputField'
                            />
                        </label>

                        <label><h4 class='contactLabel'>Message:</h4>
                            <input
                                type="text" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                class='messageInputField'
                            />
                        </label>

                        <input type="submit" value='Send Message'/>
                    </form>

                </div>

            </div>

        </div>

    );
}

export default AboutUs;