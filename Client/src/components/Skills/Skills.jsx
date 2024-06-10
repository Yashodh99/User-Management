import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import meter1 from '../../assets/img/std1.jpg';
import meter2 from '../../assets/img/std2.jpg';
import meter3 from '../../assets/img/std3.jpg';
import meter4 from '../../assets/img/std4.jpg';
import colorSharp from '../../assets/img/color-sharp.png';
import "./Skills.scss"


const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Stories that Inspire</h2>
              <p> Explore a collection of captivating narratives that ignite motivation and uplift spirits. Our curated selection of 'Stories that Inspire' brings forth tales of triumph,
                
                resilience, and kindness, offering a beacon of hope in today's world. Discover the power of storytelling to inspire positive change and personal growth on our English website.
              </p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                <div className="item">
                  <img src={meter1} alt="Image" />
                  <h5>Thank you teachers for the lessons. They are very useful and I can watch them on my exam days. It was very useful. Thank you so much EnglishEase Education team</h5>
                </div>
                <div className="item">
                  <img src={meter2} alt="Image" />
                  <h5>Thank you so much! Please Continue this good work.EnglishEase education really helped me in my ol's.  I still use EnglishEase for my studies. Thank you so much.</h5>
                </div>
                <div className="item">
                  <img src={meter3} alt="Image" />
                  <h5>I improve my Speacking skill.his channel will be very useful for future students too. So keep doing this work of yours for us.thank you EnglishEase</h5>
                </div>
                <div className="item">
                  <img src={meter4} alt="Image" />
                  <h5>Thank you so much! Please Continue this good work.EnglishEase education really helped me in my higher Studies.  I still use EnglishEase for my studies. Thank you so much.</h5>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )


};

export default Skills;
