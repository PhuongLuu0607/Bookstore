import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initiaState = {
   staff_name: "",
   gender: "",
   birthday: "",
   address: "",
   phone: "",
   cmnd: "",
   staff_picture: "",
   email:""
}

export default function Createnv() {

    const [state , setState] = useState(initiaState);

    const { staff_name, gender, birthday, address, phone, cmnd, staff_picture,email } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!staff_name || !gender || !address || !birthday  || !phone || !cmnd || !staff_picture){
            toast.error("Please fill in all required fields");
        } else {
            axios.post("http://localhost:5001/api/createstaff", {
                staff_name, gender, address, birthday, phone, cmnd, staff_picture ,email
            }).then(() => {
                setState({ 
                    staff_name:"", gender:"", birthday:"", address:"", 
                    phone:"", cmnd:"", staff_picture:"" ,email:""
                });
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Employee added successfully!");
            setTimeout(() => navigate("/Indexstaff"), 500);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setState({ ...state, staff_picture: `/images/${file.name}` });
    };

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

  return (
    <div>
        <h3 className="mb-0">Add Employee</h3>
        <hr />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
    
            <div className="row mb-3">
                <div className="col">
                    <input type="text" name="staff_name" onChange={handleInputChange} value={staff_name} className="form-control" placeholder="Employee Name"/>
                </div>
                <div className="col">
                    <input type="text" name="gender" onChange={handleInputChange} value={gender} className="form-control" placeholder="Gender"/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input type="date" name="birthday" onChange={handleInputChange} value={birthday} className="form-control" placeholder="Birthday"/>
                </div>
                <div className="col">
                    <input type="text" name="address" onChange={handleInputChange} value={address} className="form-control" placeholder="Address"/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" name="phone" onChange={handleInputChange} value={phone} className="form-control" placeholder="Phone"/>
                </div>
                <div className="col">
                    <input type="text" className="form-control" name="cmnd" onChange={handleInputChange} value={cmnd} placeholder="National ID"/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input type="file" name="staff_picture" onChange={handleFileChange} className="form-control" placeholder="Employee Picture"/>
                </div>
                  <div className="col">
                    <input type="text" className="form-control" name="email" onChange={handleInputChange} value={email} placeholder="Email"/>
                </div>
            </div>

            <div className="row">
                <div className="d-grid">
                    <button style={{marginLeft: '10px'}} type="submit" className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>
  )
}
