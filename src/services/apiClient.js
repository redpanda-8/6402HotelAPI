const API_BASE_URL = 'http://localhost:8080'

const request = async (path, options = {}) =>{
    const {headers: customHeaders= {}, ...restOptions} = options

    const response = await fetch(`${API_BASE_URL}${path}`,{
        ...restOptions,
        headers:{
            'Content-Type': 'application/json',
            ...customHeaders,
        },
    })

    const contentType = response.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')
    const body = isJson ? await response.json() : await response.text()

    if(!response.ok){
        const errorMessage = 
        (isJson && (body.message || body.error)) || body || 'Request failed'
            throw new Error(errorMessage)
        
    }

    return body
}

const getAuthHeaders = (token) => {
    if(!token){
        return {}
    }

    return {
        Authorization: `Bearer ${token}`,
    }
}

export {request, getAuthHeaders}
