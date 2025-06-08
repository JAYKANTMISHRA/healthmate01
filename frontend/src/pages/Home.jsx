import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import AppointmentSection from '../components/appointmentui';

const Home = () => {
  return (
    <div>
    <Header/>
    <AppointmentSection/>
    <SpecialityMenu/>
    {/* <TopDoctors/> */}
    {/* <Banner/> */}
    </div>
  )
}

export default Home
