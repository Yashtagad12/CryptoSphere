import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({title}) => {
  return (
    <div>
      <Link to={'/'}><button className="main-btn">{title}</button></Link>
    </div>
  )
}

export default Button;