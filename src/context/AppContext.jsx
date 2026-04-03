import { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";
import { hotelsService } from "../services/hotelsService";

const AppContext = createContext(null);

const USER_STORAGE_KEY = 'hotel_app_user';

const getStoredUser = ()=>{
    try{
        const raw = localStorage.getItem(USER_STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    }catch{
        return null
    }
}

export const AppProvider  = ({children}) =>{
    const [auth, setAuth] = useState(()=>getStoredUser())
    const [hotels, setHotels] = useState([])
    const [selectedHotel, setSetectedHotel] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const token = auth?.token || ''
    const isAuthenticated = Boolean(token)

    const saveUserSession = (sessionData) =>{
        setAuth(sessionData)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionData))
    }

    const logout = ()=>{
        setAuth(null)
        setHotels([])
        setSetectedHotel(null)
        setError('')
        localStorage.removeItem(USER_STORAGE_KEY)
    }

    const login = async (username, password) =>{
        setIsLoading(true)
        setError('')
        try{
            const response = await authService.sigIn({username, password})
            saveUserSession({
                id: response.id,
                username: response.username,
                email: response.email,
                roles: response.roles,
                token: response.accessToken
            })

            return true
        }catch(err){
            setError(err.message)
            return false
        }
    }

    const register = async ({username, email, password}) =>{
        setIsLoading(true)
        setError('')
        try{
            const payload = {
                username,
                email,
                password
            }
            await authService.signUp(payload)
            return true;
        }catch(err){
            setError(err.message)
            return false
        }finally{
            setIsLoading(false)
        }
    }

    const fetchHotels  = async (params) =>{
        setIsLoading(true);
        setError('');
        try{
            const response = await hotelsService.getHotels(params, token)
            setHotels(response.data || [])
            return response;
        }catch(err){
            setError(err.message)
        }finally{
            setIsLoading(false)
        }
    }

    const fetchHotelById = async (hotelId) => {
        setIsLoading(true);
        setError('');
        try{
            const response = await hotelsService.getHotelById(hotelId, token)
            setSetectedHotel(response);
            return response;
        }catch(err){
            setError(err.message);
            return null
        }finally{
            setIsLoading(false)
        }
    }

    const createHotel = async (payload) =>{
        setIsLoading(true);
        setError('');
        try{
            const createHotel = await hotelsService.createHotel(payload, token)
            setHotels((current)=>[createHotel, ...current])
            return createHotel
        }catch(err){
            setError(err.message)
        }finally{
            setIsLoading(false)
        }
    }

    const updateHotel = async (hotelId, payload) =>{
        setIsLoading(true)
        setError('')
        try{
            const updatedHotel = await hotelsService.updateHotel(hotelId, payload, token)
            setHotels((current)=>{
                current.map((hotel) => (hotel.id === updatedHotel.id ? updatedHotel: hotel))
            })
            setSetectedHotel(updatedHotel);
            return updatedHotel
        }catch(err){
            setError(err.message)
        }finally{
            setIsLoading(false)
        }
    }

     const patchHotel = async (hotelId, payload) =>{
        setIsLoading(true)
        setError('')
        try{
            const patchedHotel = await hotelsService.patchHotel(hotelId, payload, token)
            setHotels((current)=>{
                current.map((hotel) => (hotel.id === patchedHotel.id ? patchedHotel: hotel))
            })
            setSetectedHotel(patchedHotel);
            return patchedHotel
        }catch(err){
            setError(err.message)
        }finally{
            setIsLoading(false)
        }
    }

    const removeHotel = async (hotelId)=>{
        setIsLoading(true);
        setError('');
        try{
            await hotelsService.deleteHotel(hotelId, token);
            setHotels((current)=> current.filter((hotel)=> hotel.id !== hotelId))
            return true
        }catch(err){
            setError(err.message)
        }finally{
            setIsLoading(false)
        }
    }

    const value = {
        auth,
        isAuthenticated,
        token,
        hotels,
        selectedHotel,
        isLoading,
        error,
        login,
        register,
        logout,
        setError,
        fetchHotels,
        fetchHotelById,
        createHotel,
        updateHotel,
        patchHotel,
        removeHotel
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = ()=>{
    const context = useContext(AppContext)
    if(!context){
        throw new Error('useAppContext must be inside AppProvider')
    }

    return context
}

