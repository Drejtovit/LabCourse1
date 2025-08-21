import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import AccountManagement from "../components/AccountManagment";
import NotificationsItem from "../components/NotificationsItem";

const notificationsData = [
  {
    image: "/images/user1.png",
    message: "Your application for React Developer has been viewed",
    time: "2h ago",
  },
  {
    image: "/images/user2.png",
    message: "New job alert: UX Designer in New York",
    time: "Yesterday",
  },
  {
    image: "/images/user3.png",
    message: "Company ABC invited you for an interview",
    time: "3 days ago",
  },
];

export default function Notifications() {
  return (
    <>
      <Header />
      <PageHeader>Notifications</PageHeader>

      <div id="content">
        <div className="container">
          <div className="row">
            {/* Left sidebar */}
            <div className="col-lg-4 col-md-12 col-xs-12">
              <AccountManagement type="notifications" />
            </div>

            {/* Main content */}
            <div className="col-lg-8 col-md-12 col-xs-12">
              <div className="notifications-wrapper">
                <h3 className="section-title">Recent Notifications</h3>

                {notificationsData.map((n, i) => (
                  <NotificationsItem key={i} {...n} />
                ))}

                {/* pagination */}
                <br />
                <br />
                <ul className="pagination">
                  <li className="active"><a href="#" className="btn-prev"><i className="lni-angle-left"></i> prev</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li className="active"><a href="#" className="btn-next">Next <i className="lni-angle-right"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}