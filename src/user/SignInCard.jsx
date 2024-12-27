import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../../data/api"

function SignInCard() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async (e) => {
        e.preventDefault()
        await api.post('/user/login', { email: email, password: password })
            .then(async token => {
                if (token.data != 'Invalid password' && token.data != "User not found") {
                    localStorage.setItem("token", token.data)
                    window.location.href = "/dashboard"
                }
                else {
                    alert(token.data)
                }
            })
            .catch(() => {
                alert('User or password invalid')
            })
    }

    return (
        <div>
            <h1>Login</h1>

            <form action="submit">
                <p>
                    <label htmlFor="email">
                        Email:
                        <input
                            type="text" id="email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            placeholder="example@email.com"
                            required />
                    </label>
                </p>
                <p>
                    <label htmlFor="password">
                        Password:
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            placeholder="********"
                            required />
                    </label>
                </p>

                <button onClick={signIn}>Sign In</button>
                <p>Or <Link className="link" to="/sign-up">create</Link> account</p>
            </form>
        </div>
    )
}

export default SignInCard
