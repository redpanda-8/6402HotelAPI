import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertMessage } from "../../components/AlertMessage/AlertMessage";
import { useAppContext } from "../../context/AppContext";

export const RegisterPage = ()=>{
    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password: ''
    })

    const [successMessage, setSuccessMessage] = useState('');
    const {register, error, isLoading} = useAppContext();
    const navigate = useNavigate();

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormData((current)=>({...current, [name]:value}))
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const isSuccess = await register(formData)
        if(isSuccess){
            setSuccessMessage('Registracija sekminga. Dabar galite prisijungti')
            setTimeout(()=> navigate('/login'), 1200)
        }
        }

        return (
            <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card shadow-sm text-center">
                <div className="card-header">Registracija</div>
                <div className="card-body">
                    <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#registerModal">
                    Atidaryti registracijos formą
                    </button>
                </div>
                <div className="card-footer">Jau registruotas? <Link to="/login">Prisijunk</Link></div>
                </div>
            </div>

            <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">Registruoti vartotoją</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                    <AlertMessage message={error} />
                    <AlertMessage message={successMessage} variant="success" />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <label className="form-label">Vartotojo vardas</label>
                        <input className="form-control" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                        <label className="form-label">El. paštas</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Slaptažodis</label>
                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <button className="btn btn-success" type="submit" disabled={isLoading}>
                        {isLoading ? 'Registruojama...' : 'Registruotis'}
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
  )
    }
