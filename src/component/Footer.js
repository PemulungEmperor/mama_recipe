import React from 'react'

const Footer = () => {
  return (
  <div>
      <footer className="container-fluid" style={{ "padding": "20vh 20vh 3vh 20vh", "backgroundColor": "#EFC81A"}}>
      <div className="row text-center">
        <div className="col">
          <h1>Eat, Cook, Repeat</h1>
          <p className="text-muted mt-5">Share Your Best Recipe By Uploading Here!</p>
        </div>
      </div>

  <div className="row" >
    <ul className="d-flex justify-content-center" style={{"listStyleType":"none" }}>
      <li className="footerItem">
        <a className="text-muted" href="/#">Product</a>
      </li>
      <li className="footerItem">
        <a className="text-muted" href="/#">Company</a>
      </li>
      <li className="footerItem">
        <a className="text-muted" href="/#">Learn More</a>
      </li>
      <li className="footerItem">
        <a className="text-muted" href="/#">Get In Touch</a>
      </li>
    </ul>

    <div className="d-flex justify-content-end">
      <p style={{ "fontSize": "10px" }}>© PijarCamp</p>
    </div>
  </div>
  
</footer>
  </div>
  )
}

export default Footer
