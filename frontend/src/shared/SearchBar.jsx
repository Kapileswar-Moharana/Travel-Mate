import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
   const locationRef = useRef('');
   const distanceRef = useRef('');
   const maxGroupSizeRef = useRef('');
   const navigate = useNavigate();

   const searchHandler = async () => {
      const location = locationRef.current.value;
      const distance = distanceRef.current.value;
      const maxGroupSize = maxGroupSizeRef.current.value;

      try {
         if (!location && !distance && !maxGroupSize) {
            return alert('Please provide at least one search parameter.');
         }

         let searchParams = '';

         // Search by location and distance
         if (location && distance) {
            searchParams = `city=${location}&distance=${distance}`;
         }
         // Search by location and maxGroupSize
         else if (location && maxGroupSize) {
            searchParams = `city=${location}&maxGroupSize=${maxGroupSize}`;
         }
         // Search by distance and maxGroupSize
         else if (distance && maxGroupSize) {
            searchParams = `distance=${distance}&maxGroupSize=${maxGroupSize}`;
         }
         // Search by location only
         else if (location) {
            searchParams = `city=${location}`;
         }
         // Search by distance only
         else if (distance) {
            searchParams = `distance=${distance}`;
         }
         // Search by maxGroupSize only
         else if (maxGroupSize) {
            searchParams = `maxGroupSize=${maxGroupSize}`;
         }

         const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${searchParams}`);
         if (!res.ok) throw new Error('Something  wrong, minimum :100km & minimum 4 maxgroupsize');

         const result = await res.json();
         navigate(`/tours/search?${searchParams}`, { state: result.data });
      } catch (error) {
         alert(error.message);
      }
   };

   return (
      <Col lg="12">
         <div className="search__bar">
            <Form className='d-flex align-items-center gap-4'>
               <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                  <span><i className='ri-map-pin-line'></i></span>
                  <div>
                     <h6>Location</h6>
                     <input type="text" placeholder='Where are you going?' ref={locationRef} />
                  </div>
               </FormGroup>
               <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                  <span><i className='ri-map-pin-time-line'></i></span>
                  <div>
                     <h6>Distance</h6>
                     <input type="number" placeholder='Distance k/m' ref={distanceRef} />
                  </div>
               </FormGroup>
               <FormGroup className='d-flex gap-3 form__group form__group-last'>
                  <span><i className='ri-group-line'></i></span>
                  <div>
                     <h6>Max People</h6>
                     <input type="number" placeholder='0' ref={maxGroupSizeRef} />
                  </div>
               </FormGroup>

               <span className='search__icon' type='submit' onClick={searchHandler}>
                  <i className='ri-search-line'></i>
               </span>
            </Form>
         </div>
      </Col>
   );
};

export default SearchBar;
