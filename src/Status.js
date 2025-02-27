import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status, setStatus] = useState(false);
    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = await getSession(); // Assuming getSession is a promise
                console.log("Session: ", session);
                setStatus(true);
            } catch (error) {
                console.error("Error fetching session:", error); // Handle the error properly
                setStatus(false);
            }
        };

        fetchSession();
    }, []); 

    return (
        <div>
            {status ? "Session Active" : "No session found"}
        </div>
    );
};

export default Status;
