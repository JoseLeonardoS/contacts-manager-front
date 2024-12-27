import { useEffect } from 'react'
import api from '../data/api'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import ContactCard from '../components/contacts/ContactCard'
import NewContactCard from '../components/contacts/NewContactCard'

function DashBoard() {

    const [refresh, setRefresh] = useState(false)
    const [expireMessage, setExpireMessage] = useState(null)
    const [contacts, setContacts] = useState(null)
    const [createContactModal, setCreateContactModal] = useState(false)

    useEffect(() => {
        checkTokenExpiration()
    }, [])

    useEffect(() => {
        listContacts()
    }, [refresh])

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            setExpireMessage('Section expired, redirecting to login...');
            alert(expireMessage)
            localStorage.removeItem('token')
            window.location.reload()
        }
    }

    const token = localStorage.getItem('token')

    const listContacts = async () => {
        await api.get("contact/list", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => setContacts(res.data))
            .catch((e) => {
                alert('Invalid token or expiration time exceeded')
                window.location.href = '/sign-in'
            })
    }

    function createtModal() {
        setCreateContactModal(() => setCreateContactModal(true))
    }

    return (
        <div className='contacts'>
            <h1>Contacts List</h1>

            <button onClick={createtModal}><i className='bx bx-user-plus' title='New contact'></i></button>

            {
                createContactModal ? <NewContactCard setOpen={setCreateContactModal} refresh={setRefresh} /> : null
            }

            <div>
                {
                    contacts && contacts.data.map(cont => (
                        <ContactCard key={cont.id} contact={cont} refresh={setRefresh} />
                    ))
                }
            </div>
        </div>
    )
}

export default DashBoard
