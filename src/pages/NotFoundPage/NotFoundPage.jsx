import { Link } from "react-router-dom";

export const NotFoundPage = ()=>{
    return(
    <div className="text-center py-5">
        <h1 className="display-5">404</h1>
        <p className="lead">Puslapis nerastas.</p>
        <Link className="btn btn-primary" to="/">Grįžti į pradžią</Link>
    </div>
    )
}