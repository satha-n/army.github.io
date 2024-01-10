import React, { useState } from 'react';

import './styles/userStaffChecks.css';
import rightArrow from './images/right-arrow.svg';

function StaffCheckDetails() {
    return (
        <div className="StaffCheckDetails">
            <h3 className="StaffCheckDetails-title">asdafsdafsd</h3>
        </div>
    );
}

function StaffCheckCards({ setPage }) {
    const list = [
        {title: "Making bread", startDate: "01/01/2024", endDate: "14/01/2024", expireDays: 4, location:"Valcartier", answer:"Available", totalAvailable: 4}, 
        {title: "Baking bread", startDate: "02/01/2024", endDate: "02/01/2024", expireDays: 7, location:"Valcartier", answer:"Unavailable", totalAvailable: 1},
    ];
  
    return (
      <div className="StaffCheckCardList">
        {list.map((item, index) => {

            let backgroundColor;
            switch (item.answer) {
            case "Available":
                backgroundColor = "#607343";
                break;
            case "Unavailable":
                backgroundColor = '#793632';
                break;
            default:
                backgroundColor = 'white';
            }


            let dateText;
            switch (true) {
                case item.startDate === undefined && item.endDate === undefined:
                dateText = 'No date provided';
                break;
                case item.startDate === item.endDate:
                dateText = `On ${item.startDate}`;
                break;
                case !!item.startDate && !!item.endDate:
                dateText = `${item.startDate} to ${item.endDate}`;
                break;
                case !!item.startDate:
                dateText = `Starts on ${item.startDate}`;
                break;
                case !!item.endDate:
                dateText = `Ends on ${item.endDate}`;
                break;
                default:
                dateText = 'No date provided';
            }

            let locationText;
            switch (true) {
                case item.location === undefined:
                locationText = 'No location provided';
                break;
                case item.location !== undefined:
                locationText = "Location : " + item.location;
                break;
                default:
                locationText = 'No location provided';
            }

            return (
                <div 
                  key={index} 
                  id={`card-${item}`} 
                  className="StaffCheckCard"
                  style={{ backgroundColor: backgroundColor }}
                  onClick={() => setPage('StaffCheckDetails')}
                >
                    <div className="StaffCheckCard-top">
                        <h4 className="StaffCheckCard-title">
                            {item.title}
                        </h4>

                        <h5 className="StaffCheckCard-dates">
                        {dateText}
                        </h5>

                    </div>

                    <div className="StaffCheckCard-middle">
                        <h5 className="StaffCheckCard-expiration">
                            Expires in : {item.expireDays} days
                        </h5>

                        <div className="StaffCheckCard-middle-right">
                            <h5 className="StaffCheckCard-answer">
                                {item.answer}
                            </h5>
                            <img className="right-arrow" src={rightArrow} alt="See more"/>
                        </div>

                        

                    </div>

                    <div className="StaffCheckCard-bottom">
                        <h5 className="StaffCheckCard-location">
                            {locationText}
                        </h5>

                        <h5 className="staffCheckCard-available">
                            {item.totalAvailable} member{item.totalAvailable === 1 ? "" : "s"} available
                        </h5>
                    </div>
                </div>
            );
            })}
      </div>
    );
  }

function UserStaffChecks() {
    const [page, setPage] = useState('StaffCheckCards');

    return (
      <div className="UserStaffChecks">
          <h3 className="UserStaffChecks-title">{page === 'StaffCheckCards' ? "My Staff Checks" : "SC Title"}</h3>

          {page === 'StaffCheckCards' ? <StaffCheckCards setPage={setPage} /> : <StaffCheckDetails />}
          
      </div>
    );
}



export default UserStaffChecks;