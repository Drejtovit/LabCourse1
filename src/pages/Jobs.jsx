import Header from '../components/Header.jsx';
import Job from '../components/Job.jsx'

export default function Jobs() {

    return (
        <>
            <Header />
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Find Job</h3>
                            </div>
                            <div className="job-search-form">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-5 col-md-5 col-xs-12">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Job Title or Company Name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-5 col-xs-12">
                                            <div className="form-group">
                                                <div className="search-category-container">
                                                    <label className="styled-select">
                                                        <select>
                                                            <option value="none">Locations</option>
                                                            <option value="none">New York</option>
                                                            <option value="none">California</option>
                                                            <option value="none">Washington</option>
                                                            <option value="none">Birmingham</option>
                                                            <option value="none">Chicago</option>
                                                            <option value="none">Phoenix</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <i className="lni-map-marker"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-5 col-xs-12">
                                            <div className="form-group">
                                                <div className="search-category-container">
                                                    <label className="styled-select">
                                                        <select>
                                                            <option>All Categories</option>
                                                            <option>Finance</option>
                                                            <option>IT & Engineering</option>
                                                            <option>Education/Training</option>
                                                            <option>Art/Design</option>
                                                            <option>Sale/Markting</option>
                                                            <option>Healthcare</option>
                                                            <option>Science</option>
                                                            <option>Food Services</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <i className="lni-layers"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-1 col-md-2 col-xs-12">
                                            <button type="submit" className="button"><i className="lni-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             {/* Listings Section Start */}
                  <section id="job-listings" className="section">
                    <div className="container">
                      <div className="section-header">
                        <h2 className="section-title">Featured Jobs</h2>
                        <p>Hand-picked jobs featured depending on popularity and benifits</p>
                      </div>
                      <div className="row">
                        <Job company="MizTech" location="New York" employer="John Smith" type="full-time">
                          Software Engineer
                        </Job>
                        <Job company="Hunter Inc." location="New York" employer="John Smith" type="part-time">
                          Graphic Designer
                        </Job>
                        <Job company="MagNews" location="New York" employer="John Smith" type="full-time">
                          Managing Director
                        </Job>
                        <Job company="AmazeSoft" location="New York" employer="John Smith" type="full-time">
                          Software Engineer
                        </Job>
                        <Job company="MagNews" location="New York" employer="John Smith" type="part-time">
                          Managing Director
                        </Job>
                        <Job company="Bingo" location="New York" employer="John Smith" type="full-time">
                          Graphic Designer
                        </Job>
                        <div className="col-12 text-center mt-4">
                          <a href="job-page.html" className="btn btn-common">Browse All Jobs</a>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* Listings Section End */}
            
        </>
    )
}