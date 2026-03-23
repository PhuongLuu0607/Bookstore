import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

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

export default function Editnv() {

    const [state, setState] = useState(initiaState);
    const [file, setFile] = useState(null);

    const { staff_name, gender, birthday, address, phone, cmnd, staff_picture ,email } = state;

    const { id_staff } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5001/api/getstaff/${id_staff}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id_staff]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setState({ ...state, staff_picture: `/images/${file.name}` });
    };

    function formatDate(inputDate) {
        // Tạo một đối tượng Date từ chuỗi đầu vào
        const date = new Date(inputDate);

        // Kiểm tra nếu ngày hợp lệ
        if (isNaN(date)) {
            throw new Error('Invalid date format');
        }

        // Chuyển đổi thành định dạng YYYY-MM-DD
        return date.toISOString().split('T')[0];
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!staff_name || !gender || !address || !birthday || !phone || !cmnd || !staff_picture) {
            toast.error("Please fill in all required fields");
        } else {
            if (window.confirm("Do you want to update this employee's information?")) {
                axios.put(`http://localhost:5001/api/updatestaff/${id_staff}`, {
                    staff_name, gender, address, birthday:formatDate(birthday), phone, cmnd, staff_picture
                }).then(() => {
                    setState({
                        staff_name: "", gender: "", birthday: "", address: "",
                        phone: "", cmnd: "", staff_picture: ""
                    });
                })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Employee updated successfully!");
                setTimeout(() => navigate("/Indexstaff"), 500);
            }
        }
    }


    return (
        <div>
            <h1 className="mb-0">Update Employee</h1>
            <hr />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Employee Name</label>
                        <input type="text" name="staff_name" onChange={handleInputChange} value={staff_name || ""} className="form-control" placeholder="Employee Name" />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Gender</label>
                        <input type="text" name="gender" onChange={handleInputChange} value={gender || ""} className="form-control" placeholder="Gender" />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Birthday</label>
                        <input type="date" name="birthday" onChange={handleInputChange} value={moment(birthday).format("YYYY-MM-DD") || ""} className="form-control" placeholder="Birthday" />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" name="address" onChange={handleInputChange} value={address || ""} className="form-control" placeholder="Address" />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" name="phone" onChange={handleInputChange} value={phone || ""} className="form-control" placeholder="Phone" />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">National ID</label>
                        <input type="text" name="cmnd" onChange={handleInputChange} value={cmnd || ""} className="form-control" placeholder="National ID" />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Employee Picture</label>
                        <input type="file" name="staff_picture" onChange={handleFileChange} className="form-control" placeholder="Employee Picture" />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" name="email" onChange={handleInputChange} value={email || ""} className="form-control" placeholder="Email" />
                    </div>
                </div>
                <div className="row">
                    <div className="d-grid">
                        <button style={{ marginLeft: '10px' }} className="btn btn-warning">Update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
