import { React, useState, useEffect } from 'react';
import { HR } from "flowbite-react";

function ModeratorManageUsersList(props) {
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://6y2z21yv11.execute-api.us-east-1.amazonaws.com/prod/users/${props.moderatorCollegeID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                console.log("API response data:", data); //log
                setUsers(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchUsers();
    }, [props.moderatorCollegeID]);

    if (loading) {
        return <div className="center">Loading...</div>;
    }

    if (error) {
        return <div className="center">Error: {error}</div>;
    }


    // Filtering users
    const filteredData = users.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return (
                el.username.toLowerCase().includes(props.input.toLowerCase()) || 
                el.firstname.toLowerCase().includes(props.input.toLowerCase()) || 
                el.lastname.toLowerCase().includes(props.input.toLowerCase()) 
            );
        }
    });

    if (filteredData.length === 0) {
        return (
            <div className="fullHeight">
                <p className="center">No Users to Display</p>
            </div>
        );
    } else {
        return (
            <div className='overflowList'>
                <HR />
                {filteredData.map((user) => (
                    <div key={user.UserID}>
                        <div className="horizontalFlex spaceBetween">
                            <div>
                                <h3>{user.username}</h3>
                                <p>{user.teamRole || 'No Role Assigned'}</p>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default ModeratorManageUsersList;
