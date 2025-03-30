import { React } from 'react';
import '../../App.css';
import '../../assets/css/ProfilePage.css';

// This can go on the profile page or the sign up page that new users are directed to after signing up.

function PendingAccountApprovalComponent() {
    return (
        <div className='box pendingApprovalContainer'>
            <h1>Pending Account Approval</h1>
            <h3>Thanks for Registering!</h3>
            <p>Your account is pending approval. Please check back soon.</p>
            <p>If you have any questions, please contact the tournament director at <a href="#">tournamentMod@rit.edu</a>.</p>
            {/* add actual email ^ */}
        </div>
    )
}

export default PendingAccountApprovalComponent;