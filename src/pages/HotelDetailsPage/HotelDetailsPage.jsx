import { useEffect, useMemo, useState } from "react";
import { Modal } from "bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AlertMessage } from "../../components/AlertMessage/AlertMessage";
import { HotelForm } from "../../components/HotelForm/HotelForm";
import { useAppContext } from "../../context/AppContext";
import { ReviewForm } from "../../components/ReviewForm/ReviewForm";
import { ReviewList } from "../../components/ReviewList/ReviewList";

export const HotelDetailsPage = ()=>{
       const closeModal = (modalId) => {
            const el = document.getElementById(modalId)
            if (!el) return
            const modal = Modal.getOrCreateInstance(el)
            modal.hide()

            document.body.classList.remove('modal-open')
            document.body.style.removeProperty('padding-right')
            document.querySelectorAll('.modal-backdrop').forEach((backdrop)=>backdrop.remove())
        }
        
      
        const {hotelId} = useParams();
        const navigate = useNavigate();

          console.log('viesbucio id', hotelId)

        const{
            selectedHotel,
            auth,
            error,
            fetchHotelById,
            updateHotel,
            patchHotel,
            removeHotel,
            hotelReviews,
            createReview,
            fetchHotelReviews
        } = useAppContext();

        const [patchSummary, setPatchSummary] = useState('');

        useEffect(()=>{
            fetchHotelById(hotelId)
            fetchHotelReviews(hotelId)
        },[hotelId])

        const initialValues = useMemo(()=>{
            if(!selectedHotel){
                return null;
            }
            return{
                name: selectedHotel.name || '',
                address:selectedHotel.address || '',
                rankinAverage: selectedHotel.rankinAverage || '',
                roomPrice:  selectedHotel.roomPrice || '',
                priceDiscount: selectedHotel.priceDiscount || '',
                comfort: selectedHotel.comfort || '',
                summary: selectedHotel.summary || '',
                description: selectedHotel.description || '',
                imageCover: selectedHotel.imageCover || ''
            }
        }, [selectedHotel])

        const handlePut = async (payload) =>{
            const updatedHotel = await updateHotel(Number(hotelId), payload)
            if(updatedHotel){
                closeModal('updateHotelModal')
            }
        }

        const handlePatch = async (event) =>{
            event.preventDefault();
            if(!patchSummary){
                return;
            }
            const patchedHotel = await patchHotel(Number(hotelId), {summary: patchSummary})
            if(patchedHotel){
                 setPatchSummary('')
                 closeModal('patchHotelModal')
            }
           
        }

        const handleDelete = async () =>{
            const isDeleted = await removeHotel(Number(hotelId))
            if(isDeleted){
                navigate('/hotels')
            }
        }

        const handleCreateReview = async(payload) =>{
          const createdReview = await createReview(payload)
          if(createdReview)
            closeModal('createReviewModal')
            await fetchHotelReviews(hotelId)
        }

        if(!selectedHotel || !initialValues){
            return <p>Kraunami duomenys....</p>
        }

        const isOwner = auth?.id === selectedHotel.ownerId

        return(
            <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">{selectedHotel.name}</h2>
        <div className="d-flex gap-2">
          {isOwner ? (
            <>
              <button className="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#updateHotelModal">
                Redaguoti
              </button>
              <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#patchHotelModal">
                Keisti santrauką
              </button>
            </>
          ) : null}
          <button className="btn btn-outline-secondary" type="button" onClick={() => navigate('/hotels')}>
            Grįžti
          </button>
        </div>
      </div>

      <AlertMessage message={error} />
      {isOwner ? null : <AlertMessage message="Šį viešbutį redaguoti gali tik jo savininkas." variant="warning" />}

      <div className="card shadow-sm mb-4">
        <div className="card-header">Viešbučio informacija</div>
        <div className="card-body">
          <p className="mb-1"><strong>Adresas:</strong> {selectedHotel.address}</p>
          <p className="mb-1"><strong>Kaina:</strong> EUR {selectedHotel.roomPrice}</p>
          <p className="mb-1"><strong>Komfortas:</strong> {selectedHotel.comfort}</p>
          <p className="mb-1"><strong>Santrauka:</strong> {selectedHotel.summary}</p>
          <p className="mb-0"><strong>Aprašymas:</strong> {selectedHotel.description || 'Aprašymo nėra'}</p>
        </div>
      </div>

      {isOwner ? (
        <div className="mb-4">
          <button className="btn btn-outline-danger" type="button" onClick={handleDelete}>
            Ištrinti šį viešbutį
          </button>
        </div>
      ) : null}

      <button className="btn btn-primary mb-3" type="button" data-bs-toggle="modal" data-bs-target="#createReviewModal">
        Prideti atsiliepimą
      </button>
      <ReviewList reviews={hotelReviews}/>

     

      {isOwner ? (
        <div className="modal fade" id="updateHotelModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Redaguoti viešbutį</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <HotelForm submitText="Išsaugoti pakeitimus" initialValues={initialValues} onSubmit={handlePut} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isOwner ? (
        <div className="modal fade" id="patchHotelModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pakeisti santrauką</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form onSubmit={handlePatch}>
                  <label className="form-label">Nauja santrauka</label>
                  <input className="form-control" value={patchSummary} onChange={(event) => setPatchSummary(event.target.value)} />
                  <button className="btn btn-warning mt-3" type="submit">
                    Atnaujinti santrauką
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="modal fade" id="createReviewModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Palikite atsiliepima</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ReviewForm  hotelId={hotelId} onSubmit={handleCreateReview}/>
            </div>
          </div>
        </div>
      </div>
    </>
        )
}