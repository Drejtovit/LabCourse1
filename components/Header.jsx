import  Navbar  from './Navbar.jsx';

export default function Header() {
    return (
        <header id="home" className="hero-area">
            <Navbar />
            {/* put this in home page only */}
            <div className="container">
                <div className="row space-100 justify-content-center">
                    <div className="col-lg-10 col-md-12 col-xs-12">
                        <div className="contents">
                            <h2 className="head-title">Find the job that fits your life</h2>
                            <p>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere
                                lacus, <br /> id tincidunt nisi porta sit amet. Suspendisse et sapien varius, pellentesque dui non.</p>
                            <div className="job-search-form">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-5 col-md-6 col-xs-12">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Job Title or Company Name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-xs-12">
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
                                        <div className="col-lg-3 col-md-6 col-xs-12">
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
                                        <div className="col-lg-1 col-md-6 col-xs-12">
                                            <button type="submit" className="button"><i className="lni-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>)
}