import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Updateuserpage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:8070/api/users/${userId}`);
            const userData = response.data;
            setUserData(userData);
            // Populate form data with existing user details
            setFormData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: '' // clear password field for security
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError("Error fetching user data");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            await axios.put(`http://localhost:8070/api/users/${userId}`, formData);
            setUserData(formData); // Update userData with new form data
            showSuccessPopup(); // Show success popup
        } catch (error) {
            console.error('Error updating user data:', error);
            setError("Error updating user data");
        }
    };

    const showSuccessPopup = () => {
        // Show success popup
        alert("User data updated successfully.");
        // Navigate to user profile page
        navigate('/userprofile');
    };

    const handleCancel = () => {
        // Navigate to user profile page
        navigate('/userprofile');
    };

    return (
        <div>
            <h2>Update User Information</h2>
            {userData && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div>
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Updateuserpage;
