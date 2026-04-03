import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertMessage } from "../../components/AlertMessage/AlertMessage";
import { useAppContext } from "../../context/AppContext";

export const LoginPage = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const isSuccess = await login(username, password)
        if(isSuccess){
            navigate(location.state?.from || '/')
        }
    }

    return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card shadow-sm text-center">
          <div className="card-header">Prisijungimas</div>
          <div className="card-body">
            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">
              Atidaryti prisijungimo formą
            </button>
          </div>
          <div className="card-footer">Neturi paskyros? <Link to="/register">Registruokis</Link></div>
        </div>
      </div>

      <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Prisijungti</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <AlertMessage message={error} />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Vartotojo vardas</label>
                  <input className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Slaptažodis</label>
                  <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </div>
                <button className="btn btn-primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Jungiamasi...' : 'Prisijungti'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

