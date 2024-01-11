import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles/admin.css';
import notification from './images/notification-alert.svg';
import add from './images/more.png';
import AddStaffModal from './AddStaffModal';

Modal.setAppElement('#root');

function Notification({ notif }) {
    return (
        <img src={notification} alt="notification" className="notification-alert" style={{ opacity: notif ? 1 : 0 }} />
    );
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
        {title: "Making bread", startDate: "01/01/2024", endDate: "14/01/2024", expireDays: 4, location:"Valcartier", answer:"Available", totalAvailable: 4,notif: true, initUnit: "12 RBC (M)"},
        {title: "Baking bread", startDate: "01/01/2024", endDate: "14/01/2024", expireDays: 4, location:"Valcartier", answer:"Available", totalAvailable: 4,notif: false, initUnit: "2 Div CA"}
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

                        <Notification notif={item.notif} /> 
                    </div>
                );
                })}

            </div>

    )
}

function AdminInterface() {
    const [page, setPage] = useState('StaffChecksList');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
<div className="AdminInterface">
    <h2>Staff Dashboard</h2>

    {page === 'StaffChecksList' ? 
        <div className="staff-checks-container">
            <div className="add-button-container">
                <img 
                    src={add}
                    alt="Add" 
                    className="add-button" 
                    onClick={() => setModalIsOpen(true)}
                />
            </div>
            <StaffChecksList setPage={setPage} />
        </div> 
        : 
        <StaffCheckDetails />
    }
    <AddStaffModal                
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}>
                {/* Contenu du modal ici */}
    </AddStaffModal>
</div>
    ); 
}

export default AdminInterface;