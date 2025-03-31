import React from 'react';
import PendingAccountApprovalComponent from './PendingAccountApprovalComponent';
import { useNavigate } from 'react-router-dom';

function PendingAccountApprovalPage() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '12vh'}}>
            <PendingAccountApprovalComponent />
            <div className='center' style={{fontSize: '1.2rem', margin: '56px'}}>Click here to go to the <a href="/signin">Login Page</a></div>
        </div>
    );
}

export default PendingAccountApprovalPage;