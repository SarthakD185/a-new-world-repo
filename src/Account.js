import React, { createContext, useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from './UserPool';
import { useNavigate } from 'react-router-dom'; 

const AccountContext = createContext();

const Account = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    setIsAuthenticated(false);
                    setRole(null);
                } else {
                    const idToken = session.getIdToken();
                    const payload = JSON.parse(atob(idToken.getJwtToken().split('.')[1])); 
                    const groups = payload["cognito:groups"];
                    if (groups) {
                        const userGroups = groups;
                        let userRole = 'User';
                        if (userGroups.includes('Admin')) {
                            userRole = 'Admin';
                        } else if (userGroups.includes('Moderator')) {
                            userRole = 'Moderator';
                        }
                        setRole(userRole);
                    } else {
                        setRole('User');
                    }
                    setIsAuthenticated(true);
                }
            });
        } else {
            setIsAuthenticated(false);
            setRole(null);
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
                            if (groups) {
                                const userGroups = groups;
                                let userRole = 'User';
                                if (userGroups.includes('Admin')) {
                                    userRole = 'Admin';
                                } else if (userGroups.includes('Moderator')) {
                                    userRole = 'Moderator';
                                }
                                setRole(userRole);
                                setIsAuthenticated(true);
                                //redirect to respective pages
                                if (userRole === 'Admin') {
                                    navigate('/adminLanding');
                                } else if (userRole === 'Moderator') {
                                    navigate('/moderatorLanding');
                                } else {
                                    navigate('/user-landing');
                                }
                                resolve({ data, role: userRole });
                            } else {
                                setRole('User');
                                setIsAuthenticated(true);
                                navigate('/user-landing');
                                resolve({ data, role: 'User' });
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
            localStorage.removeItem("CognitoIdentityServiceProvider.*");
            sessionStorage.clear();
        }
    };

    return (
        <AccountContext.Provider value={{ isAuthenticated, role, authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
