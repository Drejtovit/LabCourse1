import Category from "@/components/Category.jsx";
import PageHeader from "@/components/PageHeader.jsx";
import Link from "next/link";

export default function Categories() {
    return (
        <>
            <PageHeader>Categories</PageHeader>

            <section className="category section bg-gray">
                <div className="container">
                    <div className="row">
                        <Category number="4286" icon="lni-home" icon_number="1">
                            Finance
                        </Category>
                        <Category number="2000" icon="lni-world" icon_number="2">
                            Sale/Markting
                        </Category>
                        <Category number="1450" icon="lni-book" icon_number="3">
                            Education/Training
                        </Category>
                        <Category
                            number="5100"
                            icon="lni-display"
                            icon_number="4"
                            extra="border-right-0"
                        >
                            Technologies
                        </Category>
                        <Category
                            number="5079"
                            icon="lni-brush"
                            icon_number="5"
                            extra="border-bottom-0"
                        >
                            Art/Design
                        </Category>
                        <Category
                            number="3235"
                            icon="lni-heart"
                            icon_number="6"
                            extra="border-bottom-0"
                        >
                            Healthcare
                        </Category>
                        <Category
                            number="1800"
                            icon="lni-funnel"
                            icon_number="7"
                            extra="border-bottom-0"
                        >
                            Science
                        </Category>
                        <Category
                            number="4286"
                            icon="lni-cup"
                            icon_number="8"
                            extra="border-right-0  border-bottom-0"
                        >
                            Food Services
                        </Category>
                    </div>
                </div>
            </section>
            <section className="all-categories section">
                <div className="container">
                    <h2 className="categories-title">Browse All Categories</h2>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <h3 className="cat-title">
                                Business <span>(33 Sub Categories)</span>
                            </h3>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Accounting & Finance</Link>
                                </li>
                                <li>
                                    <Link href="#">Asset Management</Link>
                                </li>
                                <li>
                                    <Link href="#">Capital Markets</Link>
                                </li>
                                <li>
                                    <Link href="#">Commercial Banking</Link>
                                </li>
                                <li>
                                    <Link href="#">Commodities</Link>
                                </li>
                                <li>
                                    <Link href="#">Consultiong</Link>
                                </li>
                                <li>
                                    <Link href="#">Corporate</Link>
                                </li>
                                <li>
                                    <Link href="#">Credit</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Debt/Fixed Income</Link>
                                </li>
                                <li>
                                    <Link href="#">Derivatives</Link>
                                </li>
                                <li>
                                    <Link href="#">Equities</Link>
                                </li>
                                <li>
                                    <Link href="#">FX & Money Markets</Link>
                                </li>
                                <li>
                                    <Link href="#">Global Custody</Link>
                                </li>
                                <li>
                                    <Link href="#">Covernment</Link>
                                </li>
                                <li>
                                    <Link href="#">Graduates & Internships</Link>
                                </li>
                                <li>
                                    <Link href="#">Hedge Funds</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Information Services</Link>
                                </li>
                                <li>
                                    <Link href="#">Insurance</Link>
                                </li>
                                <li>
                                    <Link href="#">Investment Consulting</Link>
                                </li>
                                <li>
                                    <Link href="#">Investment Banking</Link>
                                </li>
                                <li>
                                    <Link href="#">Islamic Finance</Link>
                                </li>
                                <li>
                                    <Link href="#">Operations</Link>
                                </li>
                                <li>
                                    <Link href="#">Private Banking</Link>
                                </li>
                                <li>
                                    <Link href="#">Private Equity & Venture Capital</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Quantitative Analytics</Link>
                                </li>
                                <li>
                                    <Link href="#">Real Estate</Link>
                                </li>
                                <li>
                                    <Link href="#">Research</Link>
                                </li>
                                <li>
                                    <Link href="#">Retail Banking</Link>
                                </li>
                                <li>
                                    <Link href="#">Risk Management</Link>
                                </li>
                                <li>
                                    <Link href="#">Trading</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h3 className="cat-title">
                                Science <span>(34 Sub Categories)</span>
                            </h3>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Aeronautical Engineering</Link>
                                </li>
                                <li>
                                    <Link href="#">Aerospace Engineering</Link>
                                </li>
                                <li>
                                    <Link href="#">Algorthm</Link>
                                </li>
                                <li>
                                    <Link href="#">Biology</Link>
                                </li>
                                <li>
                                    <Link href="#">Broadcast Engineering</Link>
                                </li>
                                <li>
                                    <Link href="#">Circuit Design</Link>
                                </li>
                                <li>
                                    <Link href="#">Civil Engineering</Link>
                                </li>
                                <li>
                                    <Link href="#">Clean Technology</Link>
                                </li>
                                <li>
                                    <Link href="#">Construction Monitoring</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Climate Sciences</Link>
                                </li>
                                <li>
                                    <Link href="#">Cryptography</Link>
                                </li>
                                <li>
                                    <Link href="#">Data Mining</Link>
                                </li>
                                <li>
                                    <Link href="#">Data Science</Link>
                                </li>
                                <li>
                                    <Link href="#">Digital Design</Link>
                                </li>
                                <li>
                                    <Link href="#">Drones</Link>
                                </li>
                                <li>
                                    <Link href="#">Electrical Engineering</Link>
                                </li>
                                <li>
                                    <Link href="#">Electronics</Link>
                                </li>
                                <li>
                                    <Link href="#">Engineering</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Gelolgy</Link>
                                </li>
                                <li>
                                    <Link href="#">Human Science</Link>
                                </li>
                                <li>
                                    <Link href="#">Imaging</Link>
                                </li>
                                <li>
                                    <Link href="#">Industrial Engineering</Link>
                                </li>
                                <li>
                                    <Link href="#">Instrumentation</Link>
                                </li>
                                <li>
                                    <Link href="#">Machine Learning</Link>
                                </li>
                                <li>
                                    <Link href="#">Mathematics</Link>
                                </li>
                                <li>
                                    <Link href="#">Machanical Engineering</Link>
                                </li>
                                <li>
                                    <Link href="#">Medical</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Nanotechnology</Link>
                                </li>
                                <li>
                                    <Link href="#">Natural Language</Link>
                                </li>
                                <li>
                                    <Link href="#">Physics</Link>
                                </li>
                                <li>
                                    <Link href="#">Quantum</Link>
                                </li>
                                <li>
                                    <Link href="#">Remote Sensing</Link>
                                </li>
                                <li>
                                    <Link href="#">Robotics</Link>
                                </li>
                                <li>
                                    <Link href="#">Statistics</Link>
                                </li>
                                <li>
                                    <Link href="#">Wireless</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <h3 className="cat-title">
                                Sales & Marketing <span>(21 Sub Categories)</span>
                            </h3>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Display Advertising</Link>
                                </li>
                                <li>
                                    <Link href="#">Email Marketing</Link>
                                </li>
                                <li>
                                    <Link href="#">Lead Generation</Link>
                                </li>
                                <li>
                                    <Link href="#">Market &amp; Customer Research</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Marketing Strategy</Link>
                                </li>
                                <li>
                                    <Link href="#">Public Relations</Link>
                                </li>
                                <li>
                                    <Link href="#">Telemarketing &amp; Telesales</Link>
                                </li>
                                <li>
                                    <Link href="#">Other - Sales &amp; Marketing</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">SEM - Search Engine Marketing</Link>
                                </li>
                                <li>
                                    <Link href="#">SEO - Search Engine Optimization</Link>
                                </li>
                                <li>
                                    <Link href="#">SMM - Social Media Marketing</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <Link href="#">Climate Sciences</Link>
                                </li>
                                <li>
                                    <Link href="#">Cryptography</Link>
                                </li>
                                <li>
                                    <Link href="#">Data Mining</Link>
                                </li>
                                <li>
                                    <Link href="#">Digital Design</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
