"use client";
import InputLabel from "@/components/InputLabel";
import PageHeader from "@/components/PageHeader.jsx";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleInputChange } from "@/lib/utils/helpers.js";


export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState({});
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData) {
        setError({});
        setIsLoading(true);
        const email = formData.get("email");
        const password = formData.get("password");

        const signInResult = await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        if (signInResult?.error) {
            setError({ general: "Invalid email or password" });
            setIsLoading(false);
        }
        else {
            router.replace("/");
        }
    }

    return (
        <>
            <PageHeader>Sign In</PageHeader>

            <section id="content" className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6 col-xs-12">
                            <div className="page-login-form box">
                                <h3>Sign In</h3>
                                <form className="login-form" onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(new FormData(e.target));
                                }}>
                                    <InputLabel
                                        icon="user"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formValues.email}
                                        onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                        style={error.general ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                    />
                                    <InputLabel
                                        icon="lock"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formValues.password}
                                        onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                        style={error.general ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                    />
                                    {error.general && <p className="text-danger">{error.general}</p>}
                                    <button className="btn btn-common log-btn mt-3" type="submit" disabled={isLoading}>
                                        {isLoading ? "Loading..." : "Sign In"}
                                    </button>
                                    <p className="text-center">
                                        <a href="/register">Don't have an account?</a>
                                    </p>
                                </form>
                                {/* <hr className="mt-5 mb-4 border-secondary-subtle"></hr>
                <p className="mt-3 mb-3">Or continue with</p>
                <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                  <form action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/" })
                  }} >
                    <button className="btn-google btn-sm " style={{ width: "auto", marginLeft: "10px" }}>
                      <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={24} height={24} alt="goggle-icon" style={{ marginRight: "10px" }} />
                      <span>
                        Sign in with Google
                      </span>
                    </button>
                  </form>
                  <form action={async () => {
                    "use server"
                    await signIn("github", { redirectTo: "/" })
                  }} >
                    <button className="btn-google btn-sm " style={{ width: "auto", marginLeft: "10px" }}>
                      <Image src="/assets/img/github_mark_icon.png" width={24} height={24} alt="git-icon" style={{ marginRight: "10px" }} />
                      <span>
                        Sign in with GitHub
                      </span>
                    </button>
                  </form>
                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
