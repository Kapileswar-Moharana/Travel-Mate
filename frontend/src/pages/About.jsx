import React from 'react';
import aboutImage from '../assets/images/AboutUsImage.jpg';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <img src={aboutImage} alt="About Us" className="img-fluid" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex align-items-center">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '2rem' }}>Who we Are</h2>
            <p>
              <span className="fw-bold">Travel mate</span> is a Professional <span className="fw-bold">travel</span> Platform. 
              Here we will only provide you with interesting content that you will enjoy very much. 
              We are committed to providing you the best of <span className="fw-bold">travel</span>, 
              with a focus on reliability and <span className="fw-bold">tour search booking</span>. 
              We strive to turn our passion for <span className="fw-bold">travel</span> into a thriving website. 
              We hope you enjoy our <span className="fw-bold">travel</span> as much as we enjoy giving them to you.
            </p>
            <p>
              I will keep on posting such valuable and knowledgeable information on my Website for all of you. 
              Your love and support matter a lot.
            </p>
            <p className="fw-bold">
              Thank you For Visiting Our Site<br /><br />
              <span className="text-primary">
                Have a great day!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
