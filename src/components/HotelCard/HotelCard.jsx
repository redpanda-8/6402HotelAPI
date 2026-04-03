import { Link } from "react-router-dom";

export const HotelCard = ({hotel, canManage, onDelete}) =>{
    return(
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
                <img
                className="card-img-top hotel-cover"
                src={hotel.imageCover}
                alt={hotel.name}
                onError={(event)=>{
                    event.currentTarget.src = 'https://placehold.com/600x400?text=Hotel'
                }}
                />
                <div className="card-body">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p className="card-text mb-1">
                        <strong>Adresas:</strong>{hotel.address}
                    </p>
                     <p className="card-text mb-1">
                        <strong>Kaina:</strong> EUR {hotel.roomPrice}
                    </p>
                     <p className="card-text mb-1">
                        <strong>Komfortas:</strong>{hotel.comfort} žvaigždutės
                    </p>
                    <div className="card-footer bg-transperent border-top-0 d-flex gap-2">
                        <Link className="btn btn-primary btn-sm" to={`/hotels/${hotel.id}`}>
                         Detaliau
                        </Link>
                        {canManage ? (
                            <>
                            <Link className="btn btn-warning btn-sm" to={`/hotels/${hotel.id}`}>
                              Redaguoti
                            </Link>
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>onDelete(hotel.id)}>
                                Trinti
                            </button>
                            </>
                        ):null}
                    </div>
                </div>
            </div>
        </div>
    )
}