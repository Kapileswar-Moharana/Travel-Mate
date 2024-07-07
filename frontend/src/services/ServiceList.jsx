import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Calculate Weather`,
      desc: `Get real-time weather updates and forecasts to plan your trips with precision and avoid any weather-related surprises.`,
   },
   {
      imgUrl: guideImg,
      title: `Best Tour Guide`,
      desc: `Experience the best destinations with our expert tour guides who will enrich your travels with local knowledge and insights.`,
   },
   {
      imgUrl: customizationImg,
      title: 'Customization',
      desc: `Tailor your trips to your preferences with our customization options, ensuring a unique and personalized travel experience.`,
   },
]

const ServiceList = () => {
   return (
      <>
         {
            servicesData.map((item, index) => (
               <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
                  <ServiceCard item={item} />
               </Col>
            ))
         }
      </>
   )
}

export default ServiceList
