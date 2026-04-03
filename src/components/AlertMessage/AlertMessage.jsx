export const AlertMessage = ({message, variant = 'danger'}) =>{
    if(!message){
        return null
    }

    return(
        <div className={`alert alert-${variant}`} role="alert">
            {message}
        </div>
    )
}