import { useState } from "react";

const initialState = {
    name: '',
    address: '',
    rankingAverage: 4.5,
    roomPrice: '',
    priceDiscount: '',
    comfort: 3,
    summary:'',
    description:'',
    imageCover:''
}

export const HotelForm = ({initialValues, onSubmit, submitText}) =>{
    const [formData, setFormData] = useState(initialValues || initialState);

    const handleChange = (event) =>{
        const {name, value } = event.target
        setFormData((current)=>({...current, [name]: value}))
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        await onSubmit({
            ...formData,
            rankingAverage: Number(formData.rankingAverage),
            roomPrice: Number(formData.roomPrice),
            priceDiscount: formData.priceDiscount === '' ? null : Number(formData.priceDiscount),
            comfort: Number(formData.comfort)
        })
    }

    return(
         <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Pavadinimas</label>
          <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Adresas</label>
          <input className="form-control" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Vidutinis įvertinimas</label>
          <input className="form-control" name="rankingAverage" type="number" min="1" max="5" step="0.1" value={formData.rankingAverage} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Kambario kaina</label>
          <input className="form-control" name="roomPrice" type="number" min="1" value={formData.roomPrice} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Nuolaida</label>
          <input className="form-control" name="priceDiscount" type="number" min="0" value={formData.priceDiscount} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Komfortas</label>
          <input className="form-control" name="comfort" type="number" min="1" max="7" value={formData.comfort} onChange={handleChange} required />
        </div>
        <div className="col-md-8">
          <label className="form-label">Nuotraukos URL</label>
          <input className="form-control" name="imageCover" value={formData.imageCover} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="form-label">Santrauka</label>
          <input className="form-control" name="summary" value={formData.summary} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="form-label">Aprašymas</label>
          <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange} />
        </div>
      </div>
      <div className="mt-3">
        <button type="submit" className="btn btn-success">{submitText || 'Išsaugoti viešbutį'}</button>
      </div>
    </form>
    )
}