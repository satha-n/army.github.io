import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styles/admin.css';
import notification from './images/notification-alert.svg';
import bin from './images/bin.png';
import add from './images/more.png';
import AddStaffModal from './AddStaffModal';

Modal.setAppElement('#root');

function Notification({ notif }) {
    return (
        <img src={notification} alt="notification" className="notification-alert" style={{ opacity: notif ? 1 : 0 }} />
    );
}

function StaffCheckDetails({ selectedStaff}) {
    return (
        <div className="staff-check-details">
            <div className="staff-check-left">
                <h2>{selectedStaff.title}</h2>
                <p>Start Date: {selectedStaff.startDate}</p>
                <p>End Date: {selectedStaff.endDate}</p>
                <p>Expires in: {selectedStaff.expireDays} days</p>
                <p>Location: {selectedStaff.location}</p>
                <p>Answer: {selectedStaff.answer}</p>
                <p>Total Available: {selectedStaff.totalAvailable}</p>
                <p>Initial Unit: {selectedStaff.initUnit}</p>
            </div>
            <div className="staff-check-right">
                {/* {responses.map((response, index) => (
                    <div key={index}>
                        <h3>{response.name}</h3>
                        <p>Response: {response.positive ? 'Positive' : 'Negative'}</p>
                        <p>Comment: {response.comment}</p>
                    </div>
                ))} */}
            </div>
        </div>
    );
}


function StaffChecksList({ setPage, setSelectedItem }) {
    const [staffChecksList, setStaffChecksList] = useState([
        {title: "Making bread", startDate: "01/01/2024", endDate: "14/01/2024", expireDays: 4, location:"Valcartier", answer:"Available", totalAvailable: 4,notif: true, initUnit: "12 RBC (M)"},
        {title: "Baking bread", startDate: "01/01/2024", endDate: "14/01/2024", expireDays: 4, location:"Valcartier", answer:"Available", totalAvailable: 4,notif: false, initUnit: "2 Div CA"}
    ]);


    const deleteItem = (index) => {
        setStaffChecksList(staffChecksList.filter((_, i) => i !== index));
    };
    

    return (
        <div className="staff-check-list">
                {staffChecksList.map((item, index) => {
                return (
                    <div 
                        className="staff-check-element"
                        key={index}
                        onClick={() => {
                            setPage("StaffCheckDetails")
                            setSelectedItem(staffChecksList[index]);
                        }}
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
                        <img className="bin" src={bin} onClick={(e) => {e.stopPropagation(); deleteItem(index);}} />
                    </div>
                );
                })}
            </div>
    )
}

function AdminInterface() {
    const [page, setPage] = useState('StaffChecksList');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

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
            <StaffChecksList setPage={setPage} setSelectedItem={setSelectedItem}/>
        </div> 
        : 
        <StaffCheckDetails  selectedStaff={selectedItem} />
    }
    <AddStaffModal                
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}>
    </AddStaffModal>
</div>
    ); 
}

export default AdminInterface;