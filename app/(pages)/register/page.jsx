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
    const [isLoading, setIsLoading] = useState(false);
    // const [state, formAction, isLoading] = useActionState(createUser, { errors: {} });
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "candidate",
        phoneNumber: "",
        zip: "",
        city: "",
        state: "",
        birthDate: "",
        description: "",
        websiteUrl: ""
    })

    function handleInputChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(formData) {
        setErrors({});
        setIsLoading(true);
        let userRelation;
        if (formValues.role === "candidate") {
            userRelation = {
                birthDate: formData.get("birthDate"),
            }
        } else {
            userRelation = {
                description: formData.get("description"),
                websiteUrl: formData.get("websiteUrl"),
            }
        }
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
                zip: formData.get("zip"),
                city: formData.get("city"),
                state: formData.get("state"),
                ...userRelation
            })
        })

        const data = await response.json();

        if (response.ok) {
            router.push("/");
            alert(data.message);
        } else {
            setIsLoading(false);
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
                                <form className="login-form" onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit(new FormData(e.target));
                                }}>
                                    <div className="mb-3">
                                        <label htmlFor="role-select">Select Role</label>
                                        <div className="input-icon">
                                            <i className="lni-chevron-down-circle"></i>
                                            <select className="form-control" id="role-select" name="role" onChange={handleInputChange} value={formValues.role}>
                                                <option value="candidate">Candidate</option>
                                                <option value="employer">Employer/Company</option>
                                            </select>
                                            {errors.role && <p className="text-danger">{errors.role}</p>}
                                        </div>

                                    </div>
                                    <InputLabel icon="user" type="text" name="name" placeholder={formValues.role === "candidate" ? "Full Name" : "Company Name"} onChange={handleInputChange} value={formValues.name} />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}

                                    <InputLabel icon="envelope" type="email" name="email" placeholder="Email Address" onChange={handleInputChange} value={formValues.email} />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}

                                    <InputLabel icon="lock" type="password" name="password" placeholder="Password" onChange={handleInputChange} value={formValues.password} />
                                    {errors.password && <p className="text-danger">{errors.password}</p>}

                                    <InputLabel icon="lock" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} value={formValues.confirmPassword} />
                                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}

                                    <InputLabel icon="phone" type="text" name="phoneNumber" placeholder="+38345123123" onChange={handleInputChange} value={formValues.phoneNumber} />
                                    {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}

                                    <label htmlFor="location">Location</label>
                                    <InputLabel icon="map" type="text" name="zip" placeholder="ZIP code" onChange={handleInputChange} value={formValues.zip} />
                                    {errors.zip && <p className="text-danger">{errors.zip}</p>}

                                    <InputLabel icon="home" type="text" name="city" placeholder="City" onChange={handleInputChange} value={formValues.city} />
                                    {errors.city && <p className="text-danger">{errors.city}</p>}

                                    <InputLabel icon="map-marker" type="text" name="state" placeholder="State" onChange={handleInputChange} value={formValues.state} />
                                    {errors.state && <p className="text-danger">{errors.state}</p>}

                                    {formValues.role === "candidate" && (
                                        <div className="mb-3">
                                            <label htmlFor="birthDate">Birth Date</label>
                                            <InputLabel icon="calendar" type="date" name="birthDate" onChange={handleInputChange} value={formValues.birthDate} />
                                            {errors.birthDate && <p className="text-danger">{errors.birthDate}</p>}
                                        </div>
                                    )}

                                    {formValues.role === "employer" && (
                                        <div className="mb-3">
                                            <label htmlFor="description">Description</label>
                                            <InputLabel icon="briefcase" type="text" name="description" placeholder="Company Description" onChange={handleInputChange} value={formValues.description} />
                                            {errors.description && <p className="text-danger">{errors.description}</p>}

                                            <label htmlFor="websiteUrl">Website URL(optional)</label>
                                            <InputLabel icon="link" type="text" name="websiteUrl" placeholder="https://yourcompany.com" onChange={handleInputChange} value={formValues.websiteUrl} />
                                            {errors.websiteUrl && <p className="text-danger">{errors.websiteUrl}</p>}
                                        </div>
                                    )}

                                    {errors.all && <p className="text-danger">{errors.all}</p>}
                                    {errors.general && <p className="text-danger">{errors.general}</p>}
                                    <button className="btn btn-common log-btn mt-3" type="submit" disabled={isLoading}>
                                        {isLoading ? "Creating Account..." : "Create Account"}
                                    </button>
                                    <p className="text-center">Already have an account?<a href="/signin"> Sign In</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}