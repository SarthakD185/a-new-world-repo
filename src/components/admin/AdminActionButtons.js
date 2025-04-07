import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import FileUploader from '../../components/gallery/FileUploader';

function AdminActionButtons() {
    const navigate = useNavigate(); 
    const [collegeName, setCollegeName] = useState('');
    const [collegeCountry, setCollegeCountry] = useState('');

    //for the 3 moderator user marketer buttons
    const redirectToSignup = () => {
        navigate('/signup'); 
    };

    //college creation and isnert
    const handleCreateCollege = async (e) => {
        e.preventDefault();
    
        const collegeData = {
            collegeName,
            collegeCountry,
            homeUrl: '' 
        };
    
        try {
            const response = await fetch('https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/createCollege', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(collegeData),
            });
    
            const data = await response.json(); //parse
    
            if (response.ok) {
                alert(`College Created: ${data.message || 'Unknown message'}`); 
                setCollegeName('');
                setCollegeCountry('');
            } else {
                alert('Failed to create college: ' + data.message || 'Unknown error'); 
            }
        } catch (error) {
            console.error('Error creating college:', error);
            alert('An error occurred while creating the college.');
        }
    };

    return (
        <div className='adminActionsContainer centerButton' style={{ marginTop: '24px', gap: '12px' }}>

            {/* Create New College - Form with College Name and Country */}
            <Popup trigger={
                <button className='standardButton' style={{ marginBottom: '36px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px'}}>
                        Create New College <FaPlusCircle size='14px' style={{ paddingLeft: '6px' }} />
                    </div>
                </button>} 
                modal nested>
                {close => (
                    <div className='modal popup'>
                        <div className='popupContent'>
                            <h1 className='center'>Create New College</h1>
                            <form className='center' onSubmit={handleCreateCollege}>
                                <label htmlFor="collegeName">College Name: </label>
                                <input 
                                    type="text" 
                                    id="collegeName" 
                                    name="collegeName" 
                                    value={collegeName} 
                                    onChange={(e) => setCollegeName(e.target.value)} 
                                    style={{ marginBottom: '12px' }} 
                                    required 
                                />
                                <br />

                                <label htmlFor="collegeCountry">College Country: </label>
                                <input 
                                    type="text" 
                                    id="collegeCountry" 
                                    name="collegeCountry" 
                                    value={collegeCountry} 
                                    onChange={(e) => setCollegeCountry(e.target.value)} 
                                    style={{ marginBottom: '24px' }} 
                                    required 
                                />

                                <br />
                                <label htmlFor="collegeImage">College Image: </label>
                                <FileUploader />

                                
                                <div className='centerButton horizontalFlex spaceBetween' style={{ gap: '24px' }}>
                                    <button type="button" className='redButton fullWidth' onClick={() => close()}>
                                        Close
                                    </button>
                                    <button type="submit" className='standardButton fullWidth'>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>

            {/* Create Moderator Account */}
            <button className='standardButton' onClick={redirectToSignup}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                    Create Moderator Account <FaPlusCircle size='14px' style={{ paddingLeft: '6px' }} />
                </div>
            </button>

            {/* Create User Account */}
            <button className='standardButton' onClick={redirectToSignup}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                    Create User Account <FaPlusCircle size='14px' style={{ paddingLeft: '6px' }} />
                </div>
            </button>

            {/* Create Marketer Account */}
            <button className='standardButton' onClick={redirectToSignup}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                    Create Marketer Account <FaPlusCircle size='14px' style={{ paddingLeft: '6px' }} />
                </div>
            </button>

        </div>
    );
}

export default AdminActionButtons;
