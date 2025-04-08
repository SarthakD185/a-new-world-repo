import React, { createContext, useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from './UserPool';
import { useNavigate } from 'react-router-dom'; 

const AccountContext = createContext();

const Account = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState(null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const user = Pool.getCurrentUser();
        console.log('Account - Current User:', user);
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    console.error('Account - Session Error:', err);
                    setIsAuthenticated(false);
                    setRole(null);
                } else {
                    const idToken = session.getIdToken();
                    const payload = JSON.parse(atob(idToken.getJwtToken().split('.')[1])); 
                    const groups = payload["cognito:groups"];
                    const userEmail = payload.email; //Fetch the email from the jwt token payload
                    
                    console.log('Account - Token Payload:', { groups, userEmail });
                    setEmail(userEmail); //state
                    if (groups) {
                        const userGroups = groups;
                        let userRole = 'User';
                        if (userGroups.includes('Admin')) {
                            userRole = 'Admin';
                        } else if (userGroups.includes('Moderator')) {
                            userRole = 'Moderator';
                        } else if (userGroups.includes('Marketer')) {
                            userRole = 'Marketer';
                        }
                        console.log('Account - Setting Role:', userRole);
                        setRole(userRole);
                    } else {
                        console.log('Account - No Groups Found, Setting Default Role: User');
                        setRole('User');
                    }
                    setIsAuthenticated(true);
                }
            });
        } else {
            console.log('Account - No User Found, Clearing State');
            setIsAuthenticated(false);
            setRole(null);
            setEmail(null); //Reset email if no user is logged in
        }
    }, []); 

    const getSession = async () => {
        try {
            const user = Pool.getCurrentUser();
            if (user) {
                const session = await new Promise((resolve, reject) => {
                    user.getSession((err, session) => {
                        if (err) reject(err);
                        else resolve(session);
                    });
                });
                setIsAuthenticated(true);
                return session;
            } else {
                setIsAuthenticated(false);
                throw new Error('No user session available');
            }
        } catch (err) {
            setIsAuthenticated(false);
            throw err;
        }
    };

    const authenticate = async (Username, Password) => {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });
            const authDetails = new AuthenticationDetails({ Username, Password });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    user.getUserAttributes((err, attributes) => {
                        if (err) {
                            setIsAuthenticated(false);
                            setRole(null);
                            reject(err);
                        } else {
                            const idToken = data.getIdToken();
                            const payload = JSON.parse(atob(idToken.getJwtToken().split('.')[1]));
                            const groups = payload["cognito:groups"];
                            const userEmail = payload.email; 
                            
                            setEmail(userEmail);
                            if (groups) {
                                const userGroups = groups;
                                let userRole = 'User';
                                if (userGroups.includes('Admin')) {
                                    userRole = 'Admin';
                                } else if (userGroups.includes('Moderator')) {
                                    userRole = 'Moderator';
                                } else if (userGroups.includes('Marketer')) {
                                    userRole = 'Marketer';
                                }
                                setRole(userRole);
                                setIsAuthenticated(true);
                                // Redirect to respective pages
                                if (userRole === 'Admin') {
                                    navigate('/adminLanding');
                                } else if (userRole === 'Moderator') {
                                    navigate('/moderatorLanding');
                                } else if (userRole === 'Marketer')  {
                                    navigate('/marketer');
                                } else {
                                    navigate('/user-landing');
                                }
                                resolve({ data, role: userRole, email: userEmail });
                            } else {
                                setRole('User');
                                setIsAuthenticated(true);
                                navigate('/user-landing');
                                resolve({ data, role: 'User', email: userEmail });
                            }
                        }
                    });
                },
                onFailure: (err) => {
                    setIsAuthenticated(false);
                    setRole(null);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    resolve(data);
                },
            });
        });
    };

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            setIsAuthenticated(false);
            setRole(null);
            setEmail(null); // Reset email on logout
            localStorage.removeItem("CognitoIdentityServiceProvider.*");
            sessionStorage.clear();
        }
    };

    return (
        <AccountContext.Provider value={{ isAuthenticated, role, email, authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
