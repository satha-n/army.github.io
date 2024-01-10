import React, { useState } from 'react';

import './styles/admin.css';
import notification from './images/notification-alert.svg';

function Notification() {

    if (true) {
        return (
            <img src={notification} alt="notification" className="notification-alert"></img>
        )
    }

    
}

function StaffCheckDetails() {
    return (
        <div className="staff-check-details">
            <div className="staff-check-left">

            </div>

            <div className="staff-check-right">

            </div>
        </div>
    );
}


function StaffChecksList({ setPage }) {
    const staffChecksList = [
        {title: "Making bread", startDate: "01/01/2024", endDate: "14/01/2024", expireDays: 4, location:"Valcartier", answer:"Available", totalAvailable: 4, initUnit: "12 RBC (M)"},
        {title: "Baking bread", startDate: "01/01/2024", endDate: "14/01/2024", expireDays: 4, location:"Valcartier", answer:"Available", totalAvailable: 4, initUnit: "2 Div CA"}
    ];

    return (
        <div className="staff-check-list">
                {staffChecksList.map((item, index) => {
                return (
                    <div 
                        className="staff-check-element"
                        key={index}
                        onClick={() => setPage("StaffCheckDetails")}
                    >
                        <h3>{item.title}</h3>
                        
                        <div>
                            <p>Creator : {item.initUnit}</p>
                            <p>Location : {item.location}</p>
                        </div>

                        <div>
                            <p>{item.startDate} to {item.endDate}</p>
                            <p>Expires in {item.expireDays} days</p>
                        </div>

                        <Notification  />
                    </div>
                );
                })}

            </div>

    )
}

function AdminInterface() {
    const [page, setPage] = useState('StaffChecksList');


    return (
        <div className="AdminInterface">

            <h2>Staff Dashboard</h2>

            {/* <div className="new-staff-check-form">
                <label htmlFor="title-input">Title</label>
                <input type="text" id="title-input" placeholder="Making bread" className="single-line-text-input"/>
            </div> */}

            {page === 'StaffChecksList' ? <StaffChecksList setPage={setPage} /> : <StaffCheckDetails />}


        </div>
    ); 
}

export default AdminInterface;