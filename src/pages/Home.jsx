import { Link } from "react-router-dom"

function Home() {

    return (
        <div className="body">
            <h1>Contacts Manager</h1>

            <div className="btns">
                <Link className="button" to='/sign-in'>Sign In</Link>
                <Link className="button" to='/sign-up'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Home
