/* eslint-disable react-refresh/only-export-components */
import '@/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@/public/assets/css/line-icons.css';
import '@/app/global.css';
import '@/public/assets/css/responsive.css';
import { SessionProvider } from 'next-auth/react';
import SessionRefresher from '@/lib/sessionRefresh.js';
import Link from 'next/link';

export const metadata = {
  title: "Job Portal",
  description: "Find your dream job with our portal",
  keywords: ["Bootstrap", "Landing page", "Template", "Registration", "Landing"],
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
        <SessionProvider>
          <SessionRefresher />
          {children}
        </SessionProvider>

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
                      <li><Link href="/about">About Us</Link></li>
                      <li><Link href="#">Support</Link></li>
                      <li><Link href="#">License</Link></li>
                      <li><Link href="/contact">Contact</Link></li>
                    </ul>
                    <ul className="menu">
                      <li><Link href="#">Terms & Conditions</Link></li>
                      <li><Link href="/privacy-policy">Privacy</Link></li>
                      <li><Link href="#">Refferal Terms</Link></li>
                      <li><Link href="#">Product License</Link></li>
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
        </footer>
      </body>
    </html>
  );
}
