import { useState } from "react"
import api from "../../data/api"
import '../../styles/contactCard.css'

function ContactCard({ contact, refresh }) {

  const [editMode, setEditMode] = useState(false)
  const [cont, setCont] = useState({
    id: contact.id,
    name: contact.name,
    phone: contact.phone
  })

  function handleDelete() {
    const token = localStorage.getItem('token')
    api.delete(`contact/delete/${contact.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    refresh(prev => !prev)
  }

  const changeEditStatus = () => setEditMode(p => !p)

  function handleUpdate() {
    changeEditStatus()
    setCont({ ...cont, name: contact.name, phone: contact.phone })

    if (editMode) {

      const token = localStorage.getItem('token')

      api.put("contact/edit", cont, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .catch((e) => {
          if (cont.name.length < 3) {
            alert('Name cannot be empty or too short')
            return
          }
          alert('Invalid phone number')
        })

      refresh(prev => !prev)
      setEditMode(false)
      setCont({ ...cont, name: contact.name, phone: contact.phone })
    }
  }

  function handleChange({ target }) {
    setCont({ ...cont, [target.id]: target.value })
  }

  if (editMode) {
    return (
      <div className="contactCard">
        <div className="info">
          <p>
            <label htmlFor="name">Name:
              <input type="text" id="name" value={cont.name} onChange={handleChange} />
            </label>
          </p>
          <p>
            <label htmlFor="phone">Phone:
              <input type="text" id="phone" value={cont.phone} onChange={handleChange} />
            </label>
          </p>
        </div>
        <div className="btn">
          <button onClick={handleUpdate} title="Save"><i className='bx bx-save'></i></button>
          <button onClick={() => setEditMode(false)} title="Back"><i className='bx bx-left-arrow-alt'></i></button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="contactCard">
        <div className="info">
          <h5>Name: {contact.name} </h5>
          <p>Telefone: {contact.phone} </p>
        </div>
        <div className="btn">
          <button onClick={handleUpdate} title="Edit"><i className='bx bxs-edit-alt'></i></button>
          <button onClick={handleDelete} title="Delete"><i className='bx bx-x'></i></button>
        </div>
      </div >
    )
  }
}

export default ContactCard
