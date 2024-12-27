import { useState } from "react"
import api from "../../data/api"

function SignUpCard() {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        await api.post('user/register', data)
            .then(res => {
                alert(res.data)
                if (res.data == 'User created successfully') {
                    window.location.href = '/sign-in'
                }
            })
            .catch(e => {
                alert('One or more invalid fields')
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    return (
        <div>
            <h1>Create Account</h1>
            <form action="submit">
                <p>
                    <label htmlFor="name">
                        Name:
                        <input type="text" id="name" name="name" value={data.name} onChange={handleChange} required />
                    </label>
                </p>
                <p>
                    <label htmlFor="email">
                        Email:
                        <input type="email" id="email" name="email" value={data.email} onChange={handleChange} required />
                    </label>
                </p>
                <p>
                    <label htmlFor="password">
                        Password:
                        <input type="password" id="password" name="password" value={data.password} onChange={handleChange} required />
                    </label>
                </p>
                <p>
                    <label htmlFor="phone">
                        Phone:
                        <input type="number" id="phone" name="phone" value={data.phone} onChange={handleChange} required />
                    </label>
                </p>
                <p>
                    <button onClick={handleSubmit}>Submit</button>
                </p>
            </form>
        </div>
    )
}

export default SignUpCard
