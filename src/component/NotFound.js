import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/notfound.css'

const NotFound = () => {
   useEffect(()=>{
    document.title = 'Mama Recipe - Not Found'
   })
  return (
    <div>
        <div className="section" style={{ "textAlign": "center" }}>
            <div>
                <h2 className="text-muted">Mama Recipe</h2>
            </div>
            <h1 className="error">4<img alt='' className="img-fluid rotate ms-2" src="/img/l3.png" width="125"></img>4</h1>
            <div className="page">Ooops!!! The page you are looking for is not found</div>
            <Link to="/" className="back-home" href="/">Back to home</Link>
        </div>
    </div>
  )
}

export default NotFound