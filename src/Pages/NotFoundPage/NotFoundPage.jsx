import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'
import notFound from '../../assets/notFound.jpg'

const NotFoundPage = () => {
   return (
      <div className="wrap justify-content-center">
         <img className="notfound-img" src={notFound} alt="NotFound img" />
         <Link to={'/'} className="btn-link">
            <Button className="home-button btn-warning">GO TO HOME</Button>
         </Link>
      </div>
   )
}

export default NotFoundPage
