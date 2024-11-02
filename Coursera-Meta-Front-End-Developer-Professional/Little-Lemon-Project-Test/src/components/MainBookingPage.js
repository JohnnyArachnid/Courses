import React, { useState } from 'react';
import Recent from "../icons/Recent.svg";
import TableCheckbox from "./TableCheckbox";

function MainBookingPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: ''
  });
  const [selectedTables, setSelectedTables] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (tableNumber) => {
    setSelectedTables((prevSelectedTables) =>
      prevSelectedTables.includes(tableNumber)
        ? prevSelectedTables.filter((num) => num !== tableNumber)
        : [...prevSelectedTables, tableNumber]
    );
  };

  const handleButtonClick = () => {
    const { date, time, guests, occasion } = formData;
    alert(`Date: ${date}, Time: ${time}, Guests: ${guests}, Occasion: ${occasion}, Selected tables: ${selectedTables}`);
    setSelectedTables([]);
    setFormData({
      date: '',
      time: '',
      guests: '',
      occasion: ''
    });
    document.querySelectorAll('.table-checkbox input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
  };

  const isFormValid = () => {
    const { date, time, guests, occasion } = formData;
    return date && time && guests && occasion && selectedTables.length > 0;
  };

  return (
    <main className="booking">
      <div className="background">
        <div className="back-button">
          <a href="./"><img src={Recent} alt="Back" /></a>
        </div>
      </div>
      <div className="description">
        <h1>Little Lemon Restaurants Tables Reservation</h1>
        <p>Local restaurant known for its traditional and original recipes. We use only local products and pastas imported from our beloved Italy. Try yourself, reserve a table below!</p>
      </div>
      <div className="arrival-time">
        <h1>Time of the Arrival</h1>
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} placeholder="Input Date" />
        <input type="time" name="time" value={formData.time} onChange={handleInputChange} placeholder="Input Time" />
      </div>
      <div className="number-of-guests">
        <h1>Number of Guests</h1>
        <input type="number" name="guests" value={formData.guests} onChange={handleInputChange} placeholder="Number of Guests" />
      </div>
      <div className="occasion">
        <h1>Occasion</h1>
        <select name="occasion" value={formData.occasion} onChange={handleInputChange}>
          <option value="">Select an Occasion</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
        </select>
      </div>
      <div className="table-checkboxes">
        <TableCheckbox tableNumber={1} description="Table suited at the enter of the Restaurant" onChange={handleCheckboxChange} />
        <TableCheckbox tableNumber={2} description="Table suited at the middle of the Restaurant" onChange={handleCheckboxChange} />
        <TableCheckbox tableNumber={3} description="Table suited at the end of the Restaurant" onChange={handleCheckboxChange} />
      </div>
      <div className="reservation-button">
        <button onClick={handleButtonClick} disabled={!isFormValid()}>Send Reservation</button>
      </div>
    </main>
  );
}

export default MainBookingPage;
