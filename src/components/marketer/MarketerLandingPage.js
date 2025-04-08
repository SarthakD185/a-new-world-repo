import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import logo from '../../assets/images/ANewWorldTitleTextClearBackground.png';
import '../../App.css';
import '../../assets/css/Landing.css';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import FileUploader from '../gallery/FileUploader.jsx';


function MarketerLandingPage() {
    const navigate = useNavigate(); // Hook to navigate between pages

    const [tasksInputText, setTasksInputText] = useState("");
    const [usersInputText, setUsersInputText] = useState("");

    const [teamMemberFilter, setTeamMemberFilter] = useState(true);
    const [teamCaptainFilter, setTeamCaptainFilter] = useState(true);
    const [marketerFilter, setMarketerFilter] = useState(true);
    const [moderatorFilter, setModeratorFilter] = useState(true);
    const [adminFilter, setAdminFilter] = useState(true);

    let tasksInputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setTasksInputText(lowerCase);
    };

    let usersInputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setUsersInputText(lowerCase);
    };

    // Redirect to SignUp page
    const redirectToSignup = () => {
        navigate('/signup'); // Directly navigate to the SignUp page
    };

    return (
        <div>
            <img src={logo} className='centerImagePadding' alt="logo"/>
            <h1 className='center'>Welcome back, Marketer!</h1>

            <div>
                <FileUploader />
            </div>
        </div>
    );
}

export default MarketerLandingPage;
