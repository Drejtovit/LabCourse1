import Header from "../components/Header"
import InputLabel from "../components/InputLabel"
import PageHeader from "../components/PageHeader.jsx";
export default function Register() {

    return (
        <><Header />

           <PageHeader>Create your Account</PageHeader>

            <section id="content" className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6 col-xs-12">
                            <div className="page-login-form box">
                                <h3>
                                    Create Your account
                                </h3>
                                <form className="login-form">
                                    <InputLabel icon="user" type="text" name="name" placeholder="Full Name" />
                                    <InputLabel icon="envelope" type="email" name="email" placeholder="Email Address" />
                                    <InputLabel icon="lock" type="password" name="password" placeholder="Password" />
                                    <InputLabel icon="lock" type="password" name="confirmPassword" placeholder="Confirm Password" />
                                    <button className="btn btn-common log-btn mt-3">Register</button>
                                    <p className="text-center">Already have an account?<a href="login.html"> Sign In</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}