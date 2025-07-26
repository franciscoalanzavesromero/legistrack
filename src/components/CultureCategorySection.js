import React from 'react';
import postLandscape1 from '../assets/img/post-landscape-1.jpg';
import postLandscape2 from '../assets/img/post-landscape-2.jpg';
import postLandscape6 from '../assets/img/post-landscape-6.jpg';
import person2 from '../assets/img/person-2.jpg';

const CultureCategorySection = () => {
  return (
    <section id="culture-category" className="culture-category section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <div className="section-title-container d-flex align-items-center justify-content-between">
          <h2>Culture</h2>
          <p><a href="#">See All Culture</a></p>
        </div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-md-9">
            <div className="d-lg-flex post-entry">
              <a href="#" className="me-4 thumbnail mb-4 mb-lg-0 d-inline-block">
                <img src={postLandscape6} alt="" className="img-fluid" />
              </a>
              <div>
                <div className="post-meta"><span className="date">Culture</span> <span className="mx-1">•</span> <span>Jul 5th '22</span></div>
                <h3><a href="#">What is the son of Football Coach John Gruden, Deuce Gruden doing Now?</a></h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio placeat exercitationem magni voluptates dolore. Tenetur fugiat voluptates quas.</p>
                <div className="d-flex align-items-center author">
                  <div className="photo"><img src={person2} alt="" className="img-fluid" /></div>
                  <div className="name">
                    <h3 className="m-0 p-0">Wade Warren</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="post-list border-bottom">
                  <a href="#"><img src={postLandscape1} alt="" className="img-fluid" /></a>
                  <div className="post-meta"><span className="date">Culture</span> <span className="mx-1">•</span> <span>Jul 5th '22</span></div>
                  <h2 className="mb-2"><a href="#">11 Work From Home Part-Time Jobs You Can Do Now</a></h2>
                  <span className="author mb-3 d-block">Jenny Wilson</span>
                  <p className="mb-4 d-block">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>

                <div className="post-list">
                  <div className="post-meta"><span className="date">Culture</span> <span className="mx-1">•</span> <span>Jul 5th '22</span></div>
                  <h2 className="mb-2"><a href="#">5 Great Startup Tips for Female Founders</a></h2>
                  <span className="author mb-3 d-block">Jenny Wilson</span>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="post-list">
                  <a href="#"><img src={postLandscape2} alt="" className="img-fluid" /></a>
                  <div className="post-meta"><span className="date">Culture</span> <span className="mx-1">•</span> <span>Jul 5th '22</span></div>
                  <h2 className="mb-2"><a href="#">How to Avoid Distraction and Stay Focused During Video Calls?</a></h2>
                  <span className="author mb-3 d-block">Jenny Wilson</span>
                  <p className="mb-4 d-block">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="post-list border-bottom">
                <div className="post-meta"><span className="date">Culture</span> <span className="mx-1">•</span> <span>Jul 5th '22</span></div>
                <h2 className="mb-2"><a href="#">{index === 0 ? "How to Avoid Distraction and Stay Focused During Video Calls?" : 
                  index === 1 ? "17 Pictures of Medium Length Hair in Layers That Will Inspire Your New Haircut" :
                  index === 2 ? "9 Half-up/half-down Hairstyles for Long and Medium Hair" :
                  index === 3 ? "Life Insurance And Pregnancy: A Working Mom's Guide" :
                  index === 4 ? "The Best Homemade Masks for Face (keep the Pimples Away)" :
                  "10 Life-Changing Hacks Every Working Mom Should Know"}</a></h2>
                <span className="author mb-3 d-block">Jenny Wilson</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureCategorySection;