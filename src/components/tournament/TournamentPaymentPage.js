import React from 'react';
import '../../App.css';
import '../../assets/css/IndividualTournament.css';
import StripeButton from './StripeButton';
import logo from '../../assets/images/ANewWorldTitleTextClearBackground.png';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function TournamentPaymentPage() {
    return (
        <Authenticator.Provider>
            <div>
                <img src={logo} className='centerImagePadding' alt="logo"/>
                <div className='centerButton' style={{flexDirection: 'column', gap: '20px'}}>
                    <h1>Tournament Registration Payment</h1>
                    <p>Complete your tournament registration by paying through Stripe</p>
                    <div style={{margin: '40px'}}>
                        <StripeButton />
                    </div>
                </div>
            </div>
        </Authenticator.Provider>
    );
}

export default TournamentPaymentPage; 