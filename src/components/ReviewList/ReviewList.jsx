export const ReviewList = ({reviews}) => {
    return(
        <div className="card shadow-sm">
            <div className="card-header">Atsiliepimai</div>
            <ul className="list-group list-group-flush">
                {reviews.length === 0 ? (
                    <li className="list-group-item">Atsiliepimų nėra</li>
                ):(
                    reviews.map((review)=>(
                        <li className="list-group-item" key={review.id}>
                            <div className="d-flex justify-content-between">
                                <strong>Įvertinimas: {review.rating}/5</strong>
                                <span className="text-muted small">{review.createdAt} || 'Nera'</span>
                            </div>
                            <p className="mb-0">{review.review}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}