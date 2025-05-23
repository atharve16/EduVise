import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';
 
const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList, loading: branchLoading } = useSelector((state) => state.sclass);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        rollNum: '',
        password: '',
        branchName: '',
        sclassName: ''
    });

    // UI state
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const adminID = currentUser?._id;
    const role = "Student";
    const attendance = [];

    // Initialize branch selection based on situation
    useEffect(() => {
        if (situation === "Branch" && params.id) {
            setFormData(prev => ({ ...prev, sclassName: params.id }));
        }
    }, [params.id, situation]);

    // Fetch branches list
    useEffect(() => {
        if (adminID) {
            dispatch(getAllSclasses(adminID, "Sclass"));
        }
    }, [adminID, dispatch]);

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Handle branch selection
    const handleBranchChange = (event) => {
        const selectedValue = event.target.value;
        
        if (selectedValue === 'Select Branch') {
            setFormData(prev => ({
                ...prev,
                branchName: 'Select Branch',
                sclassName: ''
            }));
        } else {
            const selectedBranch = sclassesList.find(
                (branchItem) => branchItem.sclassName === selectedValue
            );
            
            if (selectedBranch) {
                setFormData(prev => ({
                    ...prev,
                    branchName: selectedBranch.sclassName,
                    sclassName: selectedBranch._id
                }));
            }
        }
    };

    // Form validation
    const validateForm = () => {
        if (!formData.name.trim()) {
            setMessage("Please enter student's name");
            setShowPopup(true);
            return false;
        }
        
        if (!formData.rollNum.trim()) {
            setMessage("Please enter roll number");
            setShowPopup(true);
            return false;
        }
        
        if (!formData.password.trim()) {
            setMessage("Please enter password");
            setShowPopup(true);
            return false;
        }
        
        if (!formData.sclassName) {
            setMessage("Please select a branch");
            setShowPopup(true);
            return false;
        }
        
        return true;
    };

    // Handle form submission
    const submitHandler = (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const fields = {
            name: formData.name.trim(),
            rollNum: formData.rollNum.trim(),
            password: formData.password,
            sclassName: formData.sclassName,
            adminID,
            role,
            attendance
        };

        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    // Handle Redux state changes
    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            setMessage("Student added successfully!");
            setShowPopup(true);
            setTimeout(() => {
                navigate(-1);
            }, 1500);
        }
        else if (status === 'failed') {
            setMessage(response || "Failed to add student");
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error. Please try again.");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    // Reset form
    const resetForm = () => {
        setFormData({
            name: '',
            rollNum: '',
            password: '',
            branchName: situation === "Branch" ? formData.branchName : '',
            sclassName: situation === "Branch" ? formData.sclassName : ''
        });
    };

    return (
        <>
            <div className="register">
                <form className="registerForm" onSubmit={submitHandler}>
                    <span className="registerTitle">Add Student</span>
                    
                    <label>Name *</label>
                    <input 
                        className="registerInput" 
                        type="text" 
                        placeholder="Enter student's name..."
                        value={formData.name}
                        onChange={(event) => handleInputChange('name', event.target.value)}
                        autoComplete="name" 
                        required 
                        disabled={loader}
                    />

                    {situation === "Student" && (
                        <>
                            <label>Branch *</label>
                            <select
                                className="registerInput"
                                value={formData.branchName}
                                onChange={handleBranchChange} 
                                required
                                disabled={loader || branchLoading}
                            >
                                <option value='Select Branch'>
                                    {branchLoading ? 'Loading branches...' : 'Select Branch'}
                                </option>
                                {sclassesList?.map((branchItem, index) => (
                                    <option key={index} value={branchItem.sclassName}>
                                        {branchItem.sclassName}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    <label>Roll Number *</label>
                    <input 
                        className="registerInput" 
                        type="number" 
                        placeholder="Enter student's Roll Number..."
                        value={formData.rollNum}
                        onChange={(event) => handleInputChange('rollNum', event.target.value)}
                        required 
                        disabled={loader}
                        min="1"
                    />

                    <label>Password *</label>
                    <input 
                        className="registerInput" 
                        type="password" 
                        placeholder="Enter student's password..."
                        value={formData.password}
                        onChange={(event) => handleInputChange('password', event.target.value)}
                        autoComplete="new-password" 
                        required 
                        disabled={loader}
                        minLength="6"
                    />

                    <div className="button-group">
                        <button 
                            className="registerButton" 
                            type="submit" 
                            disabled={loader || branchLoading}
                        >
                            {loader ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Add Student'
                            )}
                        </button>
                        
                        <button 
                            type="button" 
                            className="resetButton" 
                            onClick={resetForm}
                            disabled={loader}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
            />
        </>
    );
};

export default AddStudent;