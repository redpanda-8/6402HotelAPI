import { getAuthHeaders, request } from "./apiClient";

const getAllReviews = (token) =>{
    return request('/api/v1/reviews/reviews',{
        headers: getAuthHeaders(token)
    })
}

const getReviewsByHotelId = (hotelId, token) =>{
    return request(`/api/v1/reviews/hotels/${hotelId}/reviews`,{
        headers: getAuthHeaders(token)
    })
}

const createReview = (payload, token) =>{
    return request('/api/v1/reviews/reviews',{
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(payload)
    })
}

export const reviewsService = {
    getAllReviews,
    getReviewsByHotelId,
    createReview
}