import Header from "@/components/Header.jsx";
import HowItWorks from "@/components/HowItWorks.jsx";
import Testimonal from "@/components/Testimonal.jsx";
import Counter from "@/components/Counter.jsx";
import PageHeader from "@/components/PageHeader.jsx";

export default function About() {
    return (
        <>
            <Header />
            <PageHeader>About</PageHeader>

            <div className="about section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-12">
                            <div className="about-content">
                                <h3>About Job Career</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                                    modi, saepe hic esse maxime quasi, sapiente ex debitis quis
                                    dolorum unde, neque quibusdam eveniet nobis enim porro
                                    repudiandae nesciunt quidem.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Magni delectus soluta adipisci beatae ullam quisquam, quia
                                    recusandae rem assumenda, praesentium porro sequi eaque
                                    doloremque tenetur incidunt officiis explicabo optio
                                    perferendis.
                                </p>
                                <a href="#" className="btn btn-common">
                                    Learn More
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-12">
                            <img
                                className="img-fluid float-right"
                                src="assets/img/about/img1.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section id="counter" className="section bg-gray">
                <div className="container">
                    <div className="row">
                        <Counter number="800" icon="lni-home">
                            Jobs Posted
                        </Counter>
                        <Counter number="80" icon="lni-briefcase">
                            All Companies
                        </Counter>
                        <Counter number="900" icon="lni-pencil-alt">
                            Resumes
                        </Counter>
                        <Counter number="1200" icon="lni-save">
                            Applications
                        </Counter>
                    </div>
                </div>
            </section>

            <HowItWorks />
            {/* <Testimonal></Testimonal> */}
        </>
    );
}
