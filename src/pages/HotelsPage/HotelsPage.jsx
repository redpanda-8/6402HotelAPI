import { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import {AlertMessage} from '../../components/AlertMessage/AlertMessage'
import { HotelCard } from "../../components/HotelCard/HotelCard";
import { HotelForm } from "../../components/HotelForm/HotelForm";
import { useAppContext } from "../../context/AppContext";

export const HotelsPage = ()=>{
    const {
        auth, 
        hotels, 
        error, 
        isLoading, 
        fetchHotels, 
        createHotel, 
        removeHotel,
        fetchAllReviews,
        allReviews
    } = useAppContext();

        const [query, setQuery] = useState({
            page: 0,
            size: 10,
            sortBy: 'id',
            sortDir: 'asc',
            search: ''
        })

        useEffect(()=>{
            fetchHotels(query)
            fetchAllReviews()
        },[])

        const closeModal = (modalId) => {
            const el = document.getElementById(modalId)
            if (!el) return
            const modal = Modal.getOrCreateInstance(el)
            modal.hide()

            document.body.classList.remove('modal-open')
            document.body.style.removeProperty('padding-right')
            document.querySelectorAll('.modal-backdrop').forEach((backdrop)=>backdrop.remove())
        }

        const handleSearch = async (event)=>{
            event.preventDefault();
            await fetchHotels(query)
        }

        const handleCreateHotel = async (payload) =>{
            const createdHotel = await createHotel(payload)
            if(createdHotel){
                closeModal('createHotelModal')
            }
        }

        const handleDeleteHotel = async (hotelId) =>{
            await removeHotel(hotelId)
        }

    return(
        <>
        <header className="py-5 mb-4 bg-white border rounded-3 shadow-sm">
            <div className="container px-lg-5">
                <div className="text-center">
                    <h1 className="display-6 fw-bold mb-2">Viešbučių valdymas</h1>
                    <p className="mb-0">Kurkite ir valdykite viešbučius</p>
                </div>
            </div>
        </header>
        <AlertMessage message={error}/>
        <div className="d-flex gap-2 mb-4">
            <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#searchModal">
                Paieška
            </button>
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#createHotelModal">
                Naujas viešbutis
            </button>
        </div>
        <div className="row">
            {hotels.map((hotel)=>(
                <HotelCard
                key = {hotel.id}
                hotel = {hotel}
                canManage={auth?.id === hotel.ownerId}
                onDelete={handleDeleteHotel}
                 />
            ))}
        </div>

        <div className="card shadow-sm mt-2">
            <div className="card-header">Visi atsiliepimai</div>
            <ul className="list-group list-group-flush">
                {allReviews.length === 0 ?(
                    <li className="list-group-item">Atsiliepimu nera</li>
                ):(
                    allReviews.map((review)=>(
                        <li className="list-group-item" key={review.id}>
                            {review.hotelName || `Viešbutis #${review.hotelId}`} | Įvertinimas {review.rating}/5 | {review.review}
                        </li>
                    ))
                )}
            </ul>
        </div>
        <div className="modal fade" id="createHotelModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sukurti naują viešbutį</h5>
                        <button type="submit" className="btn-close" data-bs-dismiss="modal" arial-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <HotelForm submitText="Išsaugoti viešbutį" onSubmit={handleCreateHotel} />
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="searchModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">Paieška ir rikiavimas</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <form className="row g-3" onSubmit={handleSearch}>
        <div className="col-md-4">
        <label className="form-label">Paieška pagal pavadinimą</label>
        <input
                            className="form-control"
                            value={query.search}
                            onChange={(event) => setQuery((current) => ({ ...current, search: event.target.value }))}
                        />
        </div>
        <div className="col-md-3">
        <label className="form-label">Rikiavimo laukas</label>
        <select
                            className="form-select"
                            value={query.sortBy}
                            onChange={(event) => setQuery((current) => ({ ...current, sortBy: event.target.value }))}
        >
        <option value="id">id</option>
        <option value="name">name</option>
        <option value="roomPrice">roomPrice</option>
        <option value="comfort">comfort</option>
        </select>
        </div>
        <div className="col-md-3">
        <label className="form-label">Rikiavimo kryptis</label>
        <select
                            className="form-select"
                            value={query.sortDir}
                            onChange={(event) => setQuery((current) => ({ ...current, sortDir: event.target.value }))}
        >
        <option value="asc">asc</option>
        <option value="desc">desc</option>
        </select>
        </div>
        <div className="col-md-2 d-flex align-items-end">
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            Filtruoti
        </button>
        </div>
        </form>
        </div>
        </div>
        </div>
    </div>
        </>
    )
}