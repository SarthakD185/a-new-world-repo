import { React } from 'react';
import { HR } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

function CollegeList({ colleges }) {
    const navigate = useNavigate();

    function handleClick(collegeInfo) {
        navigate('/individualCollege', { state: { id: collegeInfo.CollegeID, name: collegeInfo.COLLEGE_NAME, image: collegeInfo.image } });
    }

    if (colleges.length === 0) {
        return (
            <div className="fullHeight">
                <p className="center">No Colleges to Display</p>
            </div>
        );
    } else {
        return (
            <div>
                <HR />
                {colleges.map((college) => (
                    <div key={college.CollegeID}>
                        <div className="horizontalFlex spaceBetween">
                            <div className="horizontalFlex">
                                {/* Update this to match your image setup */}
                                <img src={`../../assets/images/${college.image}`} className="smallLogo" alt={`${college.COLLEGE_NAME} logo`} />
                                <h3 className="listTitle">{college.COLLEGE_NAME}</h3>
                            </div>
                            <div className="centerButton">
                                <button className="standardButton" onClick={() => handleClick(college)}>View College</button>
                            </div>
                        </div>
                        <HR />
                    </div>
                ))}
            </div>
        );
    }
}

export default CollegeList;
