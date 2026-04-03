import {getAuthHeaders, request} from './apiClient';


//get all hotels
const getHotels = (params, token) =>{
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value])=>{
        if(value !== '' && value !==null && value !== undefined){
            queryParams.append(key, String(value));
            // url: /hotels?=search=kaunas&sort=asc
        }
    })

    return request(`/api/v1/hotels?${queryParams.toString()}`,{
        headers: getAuthHeaders(token)
    })
}

//get hotel by id
const getHotelById = (hotelId, token) =>{
    return request(`/api/v1/hotels/${hotelId}`,{
        headers: getAuthHeaders(token)
    })
}

//create new hotel
const createHotel = (payload, token) =>{
    return request('/api/v1/hotels',{
        method: 'POST',
        headers:getAuthHeaders(token),
        body: JSON.stringify(payload)
    })
}

//update hotel
const updateHotel = (hotelId, payload, token) =>{
    return request(`/api/v1/hotels/${hotelId}`,{
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(payload)
    })
}

//patch hotel
const patchHotel = (hotelId, payload, token) =>{
    return request(`/api/v1/hotels/${hotelId}`,{
        method: 'PATCH',
        headers: getAuthHeaders(token),
        body: JSON.stringify(payload)
    })
}

//delete hotel
const deleteHotel = (hotelId, token) =>{
    return request(`/api/v1/hotels/${hotelId}`,{
        method: 'DELETE',
        headers: getAuthHeaders(token)
    })
}

export const hotelsService = {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    patchHotel,
    deleteHotel
}


