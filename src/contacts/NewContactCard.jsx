import { useState } from "react"
import api from "../../data/api"
import '../../styles/newContactModal.css'

function NewContactCard({ setOpen, refresh }) {

    const [contact, setContact] = useState({
        name: '',
        phone: '',
    })

    function handleChange({ target }) {
        setContact({ ...contact, [target.name]: target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const token = localStorage.getItem('token')

        api.post("contact/create", contact, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch((e) => {
                if (contact.name.length < 3) {
                    alert('Name cannot be empty or too short')
                    return
                }
                alert('Invalid phone number')
            })

        refresh(prev => !prev)
    }

    return (
        <div className="newContactModal">
            <form className="form" action="submit">
                <h3>Create new contact</h3>

                <p>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" value={contact.name} onChange={handleChange} />
                </p>

                <p>
                    <label htmlFor="phone">Phone:</label>
                    <input type="number" name="phone" id="phone" value={contact.phone} onChange={handleChange} />
                </p>
                <div>
                    <button onClick={handleSubmit}><i className='bx bx-user-plus' > Create</i></button>
                </div>
            </form>
            <div className="btn">
                <button onClick={() => setOpen(false)}>X</button>
            </div>
        </div>
    )
}

export default NewContactCard
