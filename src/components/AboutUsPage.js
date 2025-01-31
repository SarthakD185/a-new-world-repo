import * as React from 'react';
import { useState } from "react";
import logo from '../assets/images/AardvarkLogoClearHorizontal.png';
import '../App.css';
import '../assets/css/AboutUs.css'

function AboutUs() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        //TODO - change from alert dialog to sending an actual email
        event.preventDefault();
        alert(`The name you entered was: ${name}\nThe email you entered was: ${email}\nThe message you entered was: ${message}`);
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
    
        <div>

            <p class='center'>
                <img class='centerImagePadding' src={logo}></img>
            </p>

            <div class="wideColumnContainer">

                <div class='box'>

                    <h2>About Us</h2>

                    <p>
                    Aardvark Games is a tabletop game publisher dedicated to entertaining game players worldwide with 
                    products designed to engage and challenge. Our best known games include Meeple City, Beyond the Galaxy, 
                    Continental Conquest, Forests of Legend, Between the Seas and now, A New World. Whether you are new to 
                    gaming, an experienced game player, a member of a gaming group or someone who prefers to play solo, 
                    we seek to make games that will delight and keep you coming back for more!
                    </p>
                </div>

                <div class='box fill'>

                    <h2>Contact</h2>

                    <form onSubmit={handleSubmit}>
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
                                type="email" 
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

                        <div class='centerButton'>
                            <input type="submit" value='Send Message' class='standardButton'/>
                        </div>
                    </form>

                </div>

            </div>

        </div>

    );
}

export default AboutUs;