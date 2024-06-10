import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Userprofile() {
    const navigate = useNavigate();
    const [selectedPhoto, setSelectedPhoto] = useState(() => {
        const storedPhoto = localStorage.getItem('selectedPhoto');
        return storedPhoto ? storedPhoto : null;
    });
    const [lastAccess, setLastAccess] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',   
    });

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString();
    };

    useEffect(() => {
        setLastAccess(getCurrentDateTime());
        fetchUserData();
    }, []);
    
    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:8070/api/users/${userId}`);
            const userData = response.data;
            setFormData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    

    const handleLogout = () => {
        console.log('Logged out');
        navigate('/login'); 
    };

    const handlePhotoToggle = () => {
        if (selectedPhoto) {
            localStorage.removeItem('selectedPhoto');
            setSelectedPhoto(null);
        } else {
            document.getElementById('fileUpload').click();
        }
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        const photoURL = file ? URL.createObjectURL(file) : null;
        localStorage.setItem('selectedPhoto', photoURL);
        setSelectedPhoto(photoURL);
    };

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                // Send DELETE request to the backend API
                const userId = localStorage.getItem('userId');
                console.log('Account deleted');
                navigate('/signup');
            } catch (error) {
                // Handle error if any
                console.error('Error deleting account:', error);
            }
        }
    };

    const handleEditDetails = () => {
        navigate('/updateuser');
    };
    
    return (
        <div className="position-relative d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: 'black', color: 'white' }}>
            <div className="position-absolute top-0 start-0" style={{ padding: '20px' }}>
                <h2>Welcome&nbsp;{formData.firstName}</h2>
            </div>

            <div className="bg-white p-3 rounded w-50" style={{ border: '2px solid black', marginTop: '60px' }}>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" style={{ fontSize: '1.5rem' }}>
                        <strong style={{ color: 'black', borderColor: '#4e0c5e' }}>User Details</strong>
                    </label>
                </div>
                <div className="mb-3 text-center">
                    <button type="button" className="btn btn-primary btn-lg w-50" onClick={handleEditDetails} style={{ backgroundColor: '#4e0c5e', borderColor: '#4e0c5e' }}>
                        Edit Details
                    </button>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" style={{ fontSize: '1.5rem' }}>
                        <strong style={{ color: 'black' }}>Send Us a Message</strong>
                    </label>
                </div>
                <div className="mb-3 text-center">
                    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${formData.email}`} className="btn btn-primary btn-lg w-50" style={{ backgroundColor: '#4e0c5e', borderColor: '#4e0c5e', width: '150px' }} target="_blank" rel="noopener noreferrer">
                        Email
                    </a>
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="createGoals" style={{ fontSize: '1.5rem' }}>
                        <strong style={{ color: 'black' }}>Create New Goals</strong>
                    </label>
                </div>
                <div className="mb-3 text-center">
                    <Link to="/goals" className="btn btn-primary btn-lg w-50" style={{ backgroundColor: '#4e0c5e', borderColor: '#4e0c5e' }}>
                        Create Goals
                    </Link>
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="delete Account" style={{ fontSize: '1.5rem' }}>
                        <strong style={{ color: 'black' }}>Delete Your Account</strong>
                    </label>
                </div>
                <div className="mb-3 text-center">
                    <button type="button" className="btn btn-danger btn-lg w-50" onClick={handleDeleteUser}>
                        Delete Account
                    </button>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastAccess" style={{ fontSize: '1.5rem' }}>
                        <strong style={{ color: 'black' }}>Last Access on site</strong>
                    </label>
                </div>
                <div className="mb-3 text-center" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.3rem' }}>
                    {lastAccess}
                </div>
            </form>
            </div>

            <div className="p-3 rounded position-absolute top-0 end-0" style={{ right: '10px', marginTop: '5px' }}>
                {selectedPhoto ? (
                    <div className="mb-3" style={{ marginLeft: "1rem" }}>
                        <img src={selectedPhoto} alt="Selected Photo" style={{ width: "5rem", height: "5rem", objectFit: "cover" }} />
                        <div className="mb-3">
                            <button type="button" className="btn btn-danger btn-lg" style={{ fontSize: "1rem", backgroundColor: '#4e0c5e', borderColor: '#4e0c5e' }} onClick={handlePhotoToggle}>Delete Photo</button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-3 d-flex justify-content-end">
                        <i className="bi bi-person-circle" style={{ fontSize: "5rem", marginRight: "10px" }}></i>
                    </div>
                )}

                {!selectedPhoto && (
                    <div className="mb-3 d-flex justify-content-end">
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} id="fileUpload" />
                        <label htmlFor="fileUpload" className="btn btn-primary btn-lg" style={{ fontSize: "1rem", backgroundColor: '#4e0c5e', borderColor: '#4e0c5e' }}>
                            Add Photo
                        </label>
                    </div>
                )}

                <div style={{ marginLeft: "15px", marginTop: "10px" }}>
                    <button type="button" className="btn btn-danger btn-lg" style={{ fontSize: "1rem" }} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Userprofile;
