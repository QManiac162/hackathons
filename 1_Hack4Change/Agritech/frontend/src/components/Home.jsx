import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    <div className="container">
      <div className="link-wrapper">
        <a href="/crop_health" className="link">Crop Health</a>
        <a href="/climate_adapt" className="link">Climate Adaptation</a>
        <a href="/crop_yeild" className="link">Crop Yeild</a>
        <a href="/water_management" className="link">Water Management</a>
      </div>
    </div>
  )
}

export default Home