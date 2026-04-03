import { Link } from "react-router-dom";

export const HomePage = ()=>{
    return (
    <header className="py-5 mb-4 bg-white border rounded-3 shadow-sm">
      <div className="container px-lg-5">
        <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
          <div className="m-4 m-lg-5">
            <h1 className="display-5 fw-bold">Viešbučių valdymo sistema</h1>
            <p className="fs-5">
              Pavyzdinė WEB aplikacija, kuri naudojama kartu su Spring REST API.
            </p>
            <Link className="btn btn-primary btn-lg" to="/hotels">
              Viešbučių sąrašas
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}