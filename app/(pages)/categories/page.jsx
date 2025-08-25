import Header from "@/components/Header.jsx";
import Category from "@/components/Category.jsx";
import PageHeader from "@/components/PageHeader.jsx";

export default function Categories() {
    return (
        <>
            <Header />
            <PageHeader>Categories</PageHeader>

            <section class="category section bg-gray">
                <div class="container">
                    <div class="row">
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
            <section class="all-categories section">
                <div class="container">
                    <h2 class="categories-title">Browse All Categories</h2>
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <h3 class="cat-title">
                                Business <span>(33 Sub Categories)</span>
                            </h3>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Accounting & Finance</a>
                                </li>
                                <li>
                                    <a href="#">Asset Management</a>
                                </li>
                                <li>
                                    <a href="#">Capital Markets</a>
                                </li>
                                <li>
                                    <a href="#">Commercial Banking</a>
                                </li>
                                <li>
                                    <a href="#">Commodities</a>
                                </li>
                                <li>
                                    <a href="#">Consultiong</a>
                                </li>
                                <li>
                                    <a href="#">Corporate</a>
                                </li>
                                <li>
                                    <a href="#">Credit</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Debt/Fixed Income</a>
                                </li>
                                <li>
                                    <a href="#">Derivatives</a>
                                </li>
                                <li>
                                    <a href="#">Equities</a>
                                </li>
                                <li>
                                    <a href="#">FX & Money Markets</a>
                                </li>
                                <li>
                                    <a href="#">Global Custody</a>
                                </li>
                                <li>
                                    <a href="#">Covernment</a>
                                </li>
                                <li>
                                    <a href="#">Graduates & Internships</a>
                                </li>
                                <li>
                                    <a href="#">Hedge Funds</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Information Services</a>
                                </li>
                                <li>
                                    <a href="#">Insurance</a>
                                </li>
                                <li>
                                    <a href="#">Investment Consulting</a>
                                </li>
                                <li>
                                    <a href="#">Investment Banking</a>
                                </li>
                                <li>
                                    <a href="#">Islamic Finance</a>
                                </li>
                                <li>
                                    <a href="#">Operations</a>
                                </li>
                                <li>
                                    <a href="#">Private Banking</a>
                                </li>
                                <li>
                                    <a href="#">Private Equity & Venture Capital</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Quantitative Analytics</a>
                                </li>
                                <li>
                                    <a href="#">Real Estate</a>
                                </li>
                                <li>
                                    <a href="#">Research</a>
                                </li>
                                <li>
                                    <a href="#">Retail Banking</a>
                                </li>
                                <li>
                                    <a href="#">Risk Management</a>
                                </li>
                                <li>
                                    <a href="#">Trading</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <h3 class="cat-title">
                                Science <span>(34 Sub Categories)</span>
                            </h3>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Aeronautical Engineering</a>
                                </li>
                                <li>
                                    <a href="#">Aerospace Engineering</a>
                                </li>
                                <li>
                                    <a href="#">Algorthm</a>
                                </li>
                                <li>
                                    <a href="#">Biology</a>
                                </li>
                                <li>
                                    <a href="#">Broadcast Engineering</a>
                                </li>
                                <li>
                                    <a href="#">Circuit Design</a>
                                </li>
                                <li>
                                    <a href="#">Civil Engineering</a>
                                </li>
                                <li>
                                    <a href="#">Clean Technology</a>
                                </li>
                                <li>
                                    <a href="#">Construction Monitoring</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Climate Sciences</a>
                                </li>
                                <li>
                                    <a href="#">Cryptography</a>
                                </li>
                                <li>
                                    <a href="#">Data Mining</a>
                                </li>
                                <li>
                                    <a href="#">Data Science</a>
                                </li>
                                <li>
                                    <a href="#">Digital Design</a>
                                </li>
                                <li>
                                    <a href="#">Drones</a>
                                </li>
                                <li>
                                    <a href="#">Electrical Engineering</a>
                                </li>
                                <li>
                                    <a href="#">Electronics</a>
                                </li>
                                <li>
                                    <a href="#">Engineering</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Gelolgy</a>
                                </li>
                                <li>
                                    <a href="#">Human Science</a>
                                </li>
                                <li>
                                    <a href="#">Imaging</a>
                                </li>
                                <li>
                                    <a href="#">Industrial Engineering</a>
                                </li>
                                <li>
                                    <a href="#">Instrumentation</a>
                                </li>
                                <li>
                                    <a href="#">Machine Learning</a>
                                </li>
                                <li>
                                    <a href="#">Mathematics</a>
                                </li>
                                <li>
                                    <a href="#">Machanical Engineering</a>
                                </li>
                                <li>
                                    <a href="#">Medical</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Nanotechnology</a>
                                </li>
                                <li>
                                    <a href="#">Natural Language</a>
                                </li>
                                <li>
                                    <a href="#">Physics</a>
                                </li>
                                <li>
                                    <a href="#">Quantum</a>
                                </li>
                                <li>
                                    <a href="#">Remote Sensing</a>
                                </li>
                                <li>
                                    <a href="#">Robotics</a>
                                </li>
                                <li>
                                    <a href="#">Statistics</a>
                                </li>
                                <li>
                                    <a href="#">Wireless</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-12 col-md-12 col-xs-12">
                            <h3 class="cat-title">
                                Sales & Marketing <span>(21 Sub Categories)</span>
                            </h3>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Display Advertising</a>
                                </li>
                                <li>
                                    <a href="#">Email Marketing</a>
                                </li>
                                <li>
                                    <a href="#">Lead Generation</a>
                                </li>
                                <li>
                                    <a href="#">Market &amp; Customer Research</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Marketing Strategy</a>
                                </li>
                                <li>
                                    <a href="#">Public Relations</a>
                                </li>
                                <li>
                                    <a href="#">Telemarketing &amp; Telesales</a>
                                </li>
                                <li>
                                    <a href="#">Other - Sales &amp; Marketing</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">SEM - Search Engine Marketing</a>
                                </li>
                                <li>
                                    <a href="#">SEO - Search Engine Optimization</a>
                                </li>
                                <li>
                                    <a href="#">SMM - Social Media Marketing</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-6 col-xs-12">
                            <ul>
                                <li>
                                    <a href="#">Climate Sciences</a>
                                </li>
                                <li>
                                    <a href="#">Cryptography</a>
                                </li>
                                <li>
                                    <a href="#">Data Mining</a>
                                </li>
                                <li>
                                    <a href="#">Digital Design</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
