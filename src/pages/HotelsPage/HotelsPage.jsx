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
        removeHotel} = useAppContext();

        const [query, setQuery] = useState({
            page: 0,
            size: 10,
            sortBy: 'id',
            sortDir: 'asc',
            search: ''
        })

        useEffect(()=>{
            fetchHotels(query)
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
        </>
    )
}