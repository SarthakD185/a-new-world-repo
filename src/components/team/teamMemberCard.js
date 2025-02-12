import * as React from 'react';
import '../App.css';
import '../assets/css/TeamPage.css';
import users from '../assets/data/users.json';

function teamMemberCard(users) {

    //get all users with a collegeID of 1
    const filteredUsers = users.filter(user => user.collegeID === 1);
    // create a card for each user
    const userCards = filteredUsers.map(user => (
        <div class='box fixedWidthBox'>
            <img src={user.profileImage} class='smallLogo'></img>
            <h3>{user.name}</h3>
            <p>{user.userBio}</p>
        </div>
    ));

    return (
        <div class='verticalFlex' style={{justifyContent: 'space-around'}}>
            {userCards}
        </div>
    );
}

export default teamMemberCard;


// old version that was not dynamic
{/* <div class='box fixedWidthBox'>
                <img src={"https://placehold.co/100"} class='smallLogo'></img>
                <h3>John Doe</h3>
                <p>Expedition Leader</p>
            </div> */}