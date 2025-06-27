import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import './Components/InstantConsultation.css';
import FindDoctorSearchIC from './Components/FindDoctorSearchIC/FindDoctorSearchIC.jsx';
import DoctorCardIC from './Components/DoctorCardIC/DoctorCardIC.jsx';
import Notification from './Components/Notification/Notification.jsx';

// Placeholder components - you'll need to create these or import from the correct locations
const Login = () => <div>Login Page</div>;
const SignUp = () => <div>Sign Up Page</div>;

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    
    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            if (searchParams.get('speciality')) {
                const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());
                setFilteredDoctors(filtered);
                setIsSearched(true);
            } else {
                setFilteredDoctors([]);
                setIsSearched(false);
            }
            setDoctors(data);
        })
        .catch(err => console.log(err));
    }
    
    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) => doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };
    
    const navigate = useNavigate();
    
    useEffect(() => {
        getDoctorsDetails();
    }, [searchParams])

    return (
        <div className="searchpage-container">
            <FindDoctorSearchIC onSearch={handleSearch} />
            <div className="search-results-container">
                {isSearched ? (
                    <center>
                        <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                        <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => <DoctorCardIC className="doctorcard" {...doctor} key={doctor.name} />)
                        ) : (
                            <p>No doctors found.</p>
                        )}
                    </center>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Notification>
                    <Routes>
                        <Route path="/" element={<InstantConsultation />} />
                        <Route path="/login" element={<Login />}/>
                        <Route path="/signup" element={<SignUp />}/>
                        <Route path="/instant-consultation" element={<InstantConsultation />} />
                    </Routes>
                </Notification>
            </BrowserRouter>
        </div>
    );
}

export default App;