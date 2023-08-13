import Navbar from './components/Navbar'
import './app.css'
import Home from './pages/Home'
import Post from './pages/Post'
import Login from './pages/Login'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {

        const getUser = () => {
            fetch('http://localhost:5000/auth/login/success', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
            })
                .then((responce) => {
                    if (responce.status === 200) return responce.json()
                    throw new Error('authenticaton has been failed!')
                })
                .then((resObject) => {
                    setUser(resObject.user)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getUser()

    }, [])

    console.log(user)
    return (
        <BrowserRouter>
            <div>
                <Navbar user={user} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
                    <Route path='/post/:id' element={user ? <Post /> : <Navigate to='/login' />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
