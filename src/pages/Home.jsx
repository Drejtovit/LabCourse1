import  Header  from '../components/Header.jsx';
import  HowItWorks  from '../components/HowItWorks.jsx'
import  Testimonal  from '../components/Testimonal.jsx'
import Category  from '../components/Category.jsx'
import ListingSection from '../components/ListingSection.jsx'
import LatestJobsSection from '../components/LatestJobsSection.jsx'

export default function Home() {

  return (
    <>
      <Header />
      {/* Category Section Start */}
      <section className="category section bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse Categories</h2>
            <p>Most popular categories of portal, sorted by popularity</p>
          </div>
          <div className="row">
            <Category number="4286" icon="lni-home" icon_number="1">Finance</Category>
            <Category number="2000" icon="lni-world" icon_number="2">Sale/Markting</Category>
            <Category number="1450" icon="lni-book" icon_number="3">Education/Training</Category>
            <Category number="5100" icon="lni-display" icon_number="4" extra="border-right-0">Technologies</Category>
            <Category number="5079" icon="lni-brush" icon_number="5" extra="border-bottom-0">Art/Design</Category>
            <Category number="3235" icon="lni-heart" icon_number="6" extra="border-bottom-0">Healthcare</Category>
            <Category number="1800" icon="lni-funnel" icon_number="7" extra="border-bottom-0">Science</Category>
            <Category number="4286" icon="lni-cup" icon_number="8" extra="border-right-0  border-bottom-0">Food Services</Category>
          </div>
        </div>
      </section>
      {/* Category Section End */}

      {/* Listings Section Start */}
      <section id="job-listings" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Jobs</h2>
            <p>Hand-picked jobs featured depending on popularity and benifits</p>
          </div>
          <div className="row">
            <img src="./assets/img/features/img1.png" alt="" />
            <ListingSection company="MizTech" state="New York" employer="John Smith" type="full-time">
              Software Engineer
            </ListingSection>
            <ListingSection company="Hunter Inc." state="New York" employer="John Smith" type="part-time">
              Graphic Designer
            </ListingSection>
            <ListingSection company="MagNews" state="New York" employer="John Smith" type="full-time">
              Managing Director
            </ListingSection>
            <ListingSection company="AmazeSoft" state="New York" employer="John Smith" type="full-time">
              Software Engineer
            </ListingSection>
            <ListingSection company="MagNews" state="New York" employer="John Smith" type="part-time">
              Managing Director
            </ListingSection>
            <ListingSection company="Bingo" state="New York" employer="John Smith" type="full-time">
              Graphic Designer
            </ListingSection>
            <div className="col-12 text-center mt-4">
              <a href="job-page.html" className="btn btn-common">Browse All Jobs</a>
            </div>
          </div>
        </div>
      </section>
      {/* Listings Section End */}

      {/* Browse jobs Section Start */}
      <div id="browse-jobs" className="section bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="text-wrapper">
                <div>
                  <h3>7,000+ Browse Jobs</h3>
                  <p>Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on
                    over 600,000 companies worldwide. The right job is out there.</p>
                  <a className="btn btn-common" href="#">Search jobs</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="img-thumb">
                <img className="img-fluid" src="assets/img/search.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Browse jobs Section End */}

      {/* How It Work Section Start */}
      <HowItWorks />
      {/* How It Work Section End */}

      {/* Latest Section Start */}
      <section id="latest-jobs" className="section bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Jobs</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et  metus effici turac
            fringilla lorem facilisis.</p>
          </div>
          <div className="row">
            <LatestJobsSection company="MizTech" state="New York" employer="John Smith" type="full-time">
              Software Engineer
            </LatestJobsSection>
            <LatestJobsSection company="Hunter Inc." state="New York" employer="John Smith" type="part-time">
              Graphic Designer
            </LatestJobsSection>
            <LatestJobsSection company="MagNews" state="New York" employer="John Smith" type="full-time">
              Managing Director
            </LatestJobsSection>
            <LatestJobsSection company="AmazeSoft" state="New York" employer="John Smith" type="full-time">
              Software Engineer
            </LatestJobsSection>
            <LatestJobsSection company="MagNews" state="New York" employer="John Smith" type="part-time">
              Managing Director
            </LatestJobsSection>
            <LatestJobsSection company="Bingo" state="New York" employer="John Smith" type="full-time">
              Graphic Designer
            </LatestJobsSection>
            <div className="col-12 text-center mt-4">
              <a href="job-page.html" className="btn btn-common">Browse All Jobs</a>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Section End */}

      {/* Testimonial Section Start */}
      <Testimonal></Testimonal>
      {/* Testimonial Section End */}
    </>
  )
}