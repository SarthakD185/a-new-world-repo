import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import data from '../../assets/data/colleges.json';

function AdminActionButtons() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = (type, close) => {
        let message;
        switch(type) {
            case 'college':
                message = 'College has been successfully created!';
                break;
            case 'moderator':
                message = 'Moderator account has been successfully created!';
                break;
            case 'user':
                message = 'User account has been successfully created!';
                break;
            case 'marketer':
                message = 'Marketer account has been successfully created!';
                break;
            default:
                message = 'Account has been successfully created!';
        }
        setSuccessMessage(message);
        setShowSuccess(true);
        close();
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
            setShowSuccess(false);
            setSuccessMessage('');
        }, 4000);
    };

    return (
        <div className='adminActionsContainer centerButton' style={{marginTop: '24px', gap: '12px'}}>
            {/* Success Message */}
            {showSuccess && (
                <div className='successMessage' style={{
                    position: 'fixed',
                    top: '80px',
                    right: '20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 1000
                }}>
                    {successMessage}
                </div>
            )}

            {/* College Creation */}
            <Popup trigger={
                <button className='standardButton'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        Create New College <FaPlusCircle size='14px' style={{paddingLeft: '6px'}}/>
                    </div>
                </button>} 
                modal nested>
                {close => (
                    <div className='modal popup'>
                        <div className='popupContent'>
                            <h1 className='center'>Create New College</h1>
                            <form className='center' 
                                onSubmit={(e) => {
                                e.preventDefault();
                                handleSave('college', close);
                            }}>
                                <label htmlFor="collegeName">College Name: </label>
                                <input type="text" id="collegeName" name="collegeName" style={{marginBottom: '24px'}}/>
                                <div className='centerButton horizontalFlex spaceBetween' style={{gap: '24px'}}>
                                    <button type="button" className='redButton fullWidth' onClick={() => close()}>Close</button>
                                    <button type="submit" className='standardButton fullWidth'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>

            {/* Moderator Creation */}
            <Popup trigger={
                <button className='standardButton'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        Create Moderator Account <FaPlusCircle size='14px' style={{paddingLeft: '6px'}}/>
                    </div>
                </button>} 
                modal nested>
                {close => (
                    <div className='modal popup'>
                        <div className='popupContent'>
                            <h1 className='center'>Create Moderator Account</h1>
                            <form className='center' 
                                onSubmit={(e) => {
                                e.preventDefault();
                                handleSave('moderator', close);
                            }}>
                                <label htmlFor="modEmail">Email: </label>
                                <input type="email" id="modEmail" name="modEmail" style={{marginBottom: '12px'}}/><br/>
                                <label htmlFor="modCollege">College: </label>
                                <select name="modCollege" id="modCollege" style={{marginBottom: '24px'}}>
                                    {data.map((college) => (
                                        <option key={college.id} value={college.id}>{college.name}</option>
                                    ))}
                                </select>
                                <div className='centerButton horizontalFlex spaceBetween' style={{gap: '24px'}}>
                                    <button type="button" className='redButton fullWidth' onClick={() => close()}>Close</button>
                                    <button type="submit" className='standardButton fullWidth'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>

            <Popup trigger={
                <button className='standardButton'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        Create User Account <FaPlusCircle size='14px' style={{paddingLeft: '6px'}}/>
                    </div>
                </button>} 
                modal nested>
                {close => (
                    <div className='modal popup'>
                        <div className='popupContent'>
                            <h1 className='center'>Create User Account</h1>
                            <form className='center' 
                                onSubmit={(e) => {
                                e.preventDefault();
                                handleSave('user', close);
                            }}>
                                <label htmlFor="userName">Name: </label>
                                <input type="text" id="userName" name="userName" placeholder='Enter Name' style={{marginBottom: '12px'}}/>
                                <label htmlFor="userEmail">Email: </label>
                                <input type="email" id="userEmail" name="userEmail" placeholder='Enter Email' style={{marginBottom: '24px'}}/>
                                <label htmlFor="userCollege">College: </label>
                                <select name="userCollege" id="userCollege" style={{marginBottom: '24px'}}>
                                    {data.map((college) => (
                                        <option value={college.id}>{college.name}</option>
                                    ))}
                                </select>
                                <div className='centerButton horizontalFlex spaceBetween' style={{gap: '24px'}}>
                                    <button className='redButton fullWidth' onClick={() => close()}>Close</button>
                                    <button className='standardButton fullWidth' onClick={() => close()}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>

            <Popup trigger={
                <button className='standardButton'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        Create Marketer Account <FaPlusCircle size='14px' style={{paddingLeft: '6px'}}/>
                    </div>
                </button>} 
                modal nested>
                {close => (
                    <div className='modal popup'>
                        <div className='popupContent'>
                            <h1 className='center'>Create Marketer Account</h1>
                            <form className='center' 
                                onSubmit={(e) => {
                                e.preventDefault();
                                handleSave('marketer', close);
                            }}>
                                <label htmlFor="marketerName">Marketer's Name: </label>
                                <input type="text" id="marketerName" name="marketerName" placeholder='Enter Name' style={{marginBottom: '12px'}}/><br/>
                                <label htmlFor="marketerEmail">Marketer's Email: </label>
                                <input type="email" id="marketerEmail" name="marketerEmail" placeholder='Enter Email' style={{marginBottom: '12px'}}/><br/>
                                <label htmlFor="marketerCollege">College: </label>
                                <select name="marketerCollege" id="marketerCollege" style={{marginBottom: '24px'}}>
                                    {data.map((college) => (
                                        <option value={college.id}>{college.name}</option>
                                    ))}
                                </select>
                                <div className='centerButton horizontalFlex spaceBetween' style={{gap: '24px'}}>
                                    <button className='redButton fullWidth' onClick={() => close()}>Close</button>
                                    <button className='standardButton fullWidth' onClick={() => close()}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}

export default AdminActionButtons; 