import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const Navbar = ()=>{
    const {auth,isAuthenticated, logout } = useAppContext()
    const navigate  = useNavigate()

    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        <Link className="navbar-brand" to="/">
                Viešbučių valdymo sistema
        </Link>
        <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
                aria-controls="mainNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink className="nav-link" to="/">
                        Pradžia
        </NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/hotels">
                        Viešbučiai
        </NavLink>
        </li>
                    {!isAuthenticated ? (
        <>
        <li className="nav-item">
        <NavLink className="nav-link" to="/login">
                            Prisijungti
        </NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/register">
                            Registruotis
        </NavLink>
        </li>
        </>
                    ) : (
        <li className="nav-item d-flex align-items-center gap-2">
        <span className="text-white-50 small">Prisijungęs: {auth?.username}</span>
        <button type="button" className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                        Atsijungti
        </button>
        </li>
                    )}
        </ul>
        </div>
        </div>
        </nav>
  )
}