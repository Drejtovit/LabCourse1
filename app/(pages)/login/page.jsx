import Header from "@/components/Header";
import InputLabel from "@/components/InputLabel";
import PageHeader from "@/components/PageHeader.jsx";

export default function Login() {
  return (
    <>
      <Header />

      <PageHeader>Login</PageHeader>

      <section id="content" className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 col-xs-12">
              <div className="page-login-form box">
                <h3>Login</h3>
                <form className="login-form">
                  <InputLabel
                    icon="user"
                    type="email"
                    name="email"
                    placeholder="Username"
                  />
                  <InputLabel
                    icon="lock"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <div className="form-check mb-3">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" htmlFor="exampleCheck1">Keep Me Signed In</label>
                  </div> 
                  <button className="btn btn-common log-btn mt-3">
                    Submit
                  </button>
                  <p className="text-center">
                    <a href="/register">Don't have an account?</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
