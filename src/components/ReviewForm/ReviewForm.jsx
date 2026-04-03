import { useState } from "react";

export const ReviewForm = ({hotelId, onSubmit}) =>{
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5)

    const handleSubmit = (event) =>{
        event.preventDefault();
        onSubmit({
            review,
            rating: Number(rating),
            hotelId: Number(hotelId)
        })
        setReview('')
        setRating(5)
    }
    return(
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-9">
                    <label className="form-label">Atsiliepimas</label>
                    <input type="text" 
                    className="form-control" 
                    value={review} 
                    onChange={(event)=>setReview(event.target.value)}
                    required
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label">Įvertinimas</label>
                    <input type="number"
                    min="1"
                    max="5"
                    className="form-control"
                    value={rating}
                    onChange={(event)=>setRating(event.target.value)}
                    required
                     />
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">Save atsiliepimą</button>
                </div>
            </div>
        </form>
    )
}