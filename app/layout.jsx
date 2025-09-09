/* eslint-disable react-refresh/only-export-components */
import '@/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@/public/assets/css/line-icons.css';
import '@/app/global.css';
import '@/public/assets/css/responsive.css';

export const metadata = {
  title: "Job Portal",
  description: "Find your dream job with our portal",
  keywords: ["Bootstrap", "Landing page", "Template", "Registration", "Landing"],
  // authors: [{ name: "UIdeck" }],
  charset: "utf-8",
  icons: {
    icon: "/favicon.ico",
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  shrinkToFit: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer>
          <section className="footer-Content">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-xs-12">
                  <div className="widget">
                    {/* <div className="footer-logo"><img src="assets/img/logo-footer.png" alt="" /></div> */}
                    <div className="textwidget">
                      <p>Sed consequat sapien faus quam bibendum convallis quis in nulla. Pellentesque volutpat odio eget diam
                        cursus semper.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-4 col-xs-12">
                  <div className="widget">
                    <h3 className="block-title">Quick Links</h3>
                    <ul className="menu">
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Support</a></li>
                      <li><a href="#">License</a></li>
                      <li><a href="#">Contact</a></li>
                    </ul>
                    <ul className="menu">
                      <li><a href="#">Terms & Conditions</a></li>
                      <li><a href="#">Privacy</a></li>
                      <li><a href="#">Refferal Terms</a></li>
                      <li><a href="#">Product License</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-xs-12">
                  <div className="widget">
                    <h3 className="block-title">Subscribe Now</h3>
                    <p>Sed consequat sapien faus quam bibendum convallis.</p>
                    <form method="post" id="subscribe-form" name="subscribe-form" className="validate">
                      <div className="form-group is-empty">
                        <input type="email" className="form-control" id="EMAIL" placeholder="Enter Email..." />
                        <button type="submit" name="subscribe" id="subscribes" className="btn btn-common sub-btn"><i
                          className="lni-envelope"></i></button>
                        <div className="clearfix"></div>
                      </div>
                    </form>
                    <ul className="mt-3 footer-social">
                      <li><a className="facebook" href="#"><i className="lni-facebook-filled"></i></a></li>
                      <li><a className="twitter" href="#"><i className="lni-twitter-filled"></i></a></li>
                      <li><a className="linkedin" href="#"><i className="lni-linkedin-fill"></i></a></li>
                      <li><a className="google-plus" href="#"><i className="lni-google-plus"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="site-info text-center">
                    <p>Designed and Developed by <a href="https://uideck.com" rel="nofollow">UIdeck</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* 
        <a href="#" class="back-to-top">
          <i class="lni-arrow-up"></i>
        </a> */}
      </body>
    </html>
  );
}
