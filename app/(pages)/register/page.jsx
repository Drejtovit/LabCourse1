"use client"
import Header from "@/components/Header"
import InputLabel from "@/components/InputLabel"
import PageHeader from "@/components/PageHeader.jsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useActionState } from "react";

export default function Register() {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    // const [state, formAction, isLoading] = useActionState(createUser, { errors: {} });
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "candidate",
        phoneNumber: ""
    })

    function handleInputChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(formData) {
        setErrors({});
        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword"),
                role: formData.get("role"),
                phoneNumber: formData.get("phoneNumber"),
            })
        })

        const data = await response.json();

        if (response.ok) {
            router.push("/");
            alert(data.message);
        } else {
            setErrors(data.errors);
        }
    }

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
                                <form className="login-form" action={handleSubmit}>
                                    <InputLabel icon="user" type="text" name="name" placeholder="Full Name" onChange={handleInputChange} value={formValues.name || ''} />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                    <InputLabel icon="envelope" type="email" name="email" placeholder="Email Address" onChange={handleInputChange} value={formValues.email || ''} />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                    <InputLabel icon="lock" type="password" name="password" placeholder="Password" onChange={handleInputChange} value={formValues.password || ''} />
                                    {errors.password && <p className="text-danger">{errors.password}</p>}
                                    <InputLabel icon="lock" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} value={formValues.confirmPassword || ''} />
                                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                                    <InputLabel icon="phone" type="text" name="phoneNumber" placeholder="+38345123123" pattern="\+[0-9]{3,}" onChange={handleInputChange} value={formValues.phoneNumber || ''} />
                                    {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                                    <div className="mb-3">
                                        <label htmlFor="role-select">Select Role</label>
                                        <div className="input-icon">
                                            <i className="lni-chevron-down-circle"></i>
                                            <select className="form-control" id="role-select" name="role" onChange={handleInputChange} value={formValues.role}>
                                                <option value="candidate">Candidate</option>
                                                <option value="employer">Employer/Company</option>
                                            </select>
                                        </div>
                                    </div>
                                    {errors.role && <p className="text-danger">{errors.role}</p>}
                                    {errors.all && <p className="text-danger">{errors.all}</p>}
                                    {errors.general && <p className="text-danger">{errors.general}</p>}
                                    <button className="btn btn-common log-btn mt-3">
                                        Create Account
                                    </button>
                                    <p className="text-center">Already have an account?<a href="/signin"> Sign In</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}