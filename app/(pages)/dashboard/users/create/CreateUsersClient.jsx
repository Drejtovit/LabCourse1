"use client"
import InputLabel from "@/components/InputLabel.jsx";
import { useState } from "react";
import { handleInputChange } from "@/lib/utils/helpers.js";
import SideBar from "@/components/SideBar.jsx";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateUsersClient() {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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

        if (response.ok && data.success) {
            toast.success("User created successfully!", { toastId: "user-created" });
            router.replace("/dashboard/users");
        } else {
            setIsLoading(false);
            setErrors(data.errors);
        }
    }

    return (
        <>
            <div className="d-flex min-vh-100 bg-light">
                <SideBar></SideBar>
                <main className="flex-grow-1 p-3 p-md-4 mt-5 mt-lg-3" style={{ background: "#f8f9fa" }}>
                    <section id="content" className="section-padding ">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5 col-md-6 col-xs-12">
                                    <div className="page-login-form box">
                                        <h3>
                                            Create a new User
                                        </h3>
                                        <form className="login-form" onSubmit={e => {
                                            e.preventDefault();
                                            handleSubmit(new FormData(e.target));
                                        }}>
                                            <div className="mb-3">
                                                <label htmlFor="role-select">Select Role</label>
                                                <div className="input-icon">
                                                    <i className="lni-chevron-down-circle"></i>
                                                    <select className="form-control"
                                                        id="role-select" name="role"
                                                        onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                        value={formValues.role}
                                                        style={errors?.role ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                                    >
                                                        <option value="candidate">Candidate</option>
                                                        <option value="employer">Employer/Company</option>
                                                    </select>
                                                    {errors?.role && <p className="text-danger">{errors.role}</p>}
                                                </div>
                                            </div>
                                            <InputLabel icon="user" type="text"
                                                name="name"
                                                placeholder={formValues.role === "candidate" ? "Full Name" : "Company Name"}
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                value={formValues.name}
                                                style={errors?.name ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                            />
                                            {errors?.name && <p className="text-danger">{errors.name}</p>}

                                            <InputLabel icon="envelope" type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                value={formValues.email}
                                                style={errors?.email || errors.general ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                            />
                                            {errors?.email && <p className="text-danger">{errors.email}</p>}

                                            <InputLabel icon="lock" type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                value={formValues.password}
                                                style={errors?.password ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                            />
                                            {errors?.password && <p className="text-danger">{errors.password}</p>}

                                            <InputLabel icon="lock" type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                value={formValues.confirmPassword}
                                                style={errors?.confirmPassword ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                            />
                                            {errors?.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}

                                            <InputLabel icon="phone" type="text"
                                                name="phoneNumber"
                                                placeholder="+38345123123"
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                value={formValues.phoneNumber}
                                                style={errors?.phoneNumber ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                            />
                                            {errors?.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}

                                            <label htmlFor="location">Location</label>
                                            <InputLabel icon="map" type="text"
                                                name="zip"
                                                placeholder="ZIP code"
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                value={formValues.zip}
                                                style={errors?.zip ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                            />
                                            {errors?.zip && <p className="text-danger">{errors.zip}</p>}

                                            <InputLabel icon="home" type="text"
                                                name="city"
                                                placeholder="City"
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                value={formValues.city}
                                                style={errors?.city ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                            />
                                            {errors?.city && <p className="text-danger">{errors.city}</p>}

                                            <InputLabel icon="map-marker" type="text"
                                                name="state"
                                                placeholder="State"
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                value={formValues.state}
                                                style={errors?.state ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                            />
                                            {errors?.state && <p className="text-danger">{errors.state}</p>}

                                            {formValues.role === "candidate" && (
                                                <div className="mb-3">
                                                    <label htmlFor="birthDate">Birth Date</label>
                                                    <InputLabel icon="calendar" type="date"
                                                        name="birthDate"
                                                        onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                        value={formValues.birthDate}
                                                        style={errors?.birthDate ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                                    />
                                                    {errors?.birthDate && <p className="text-danger">{errors.birthDate}</p>}
                                                </div>
                                            )}

                                            {formValues.role === "employer" && (
                                                <div className="mb-3">
                                                    <label htmlFor="description">Description</label>
                                                    <InputLabel icon="briefcase" type="text"
                                                        name="description"
                                                        placeholder="Company Description"
                                                        onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                        value={formValues.description}
                                                        style={errors?.description ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                                    />
                                                    {errors?.description && <p className="text-danger">{errors.description}</p>}

                                                    <label htmlFor="websiteUrl">Website URL(optional)</label>
                                                    <InputLabel icon="link" type="text"
                                                        name="websiteUrl"
                                                        placeholder="https://yourcompany.com"
                                                        onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                        value={formValues.websiteUrl}
                                                        style={errors?.websiteUrl ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                                    />
                                                    {errors?.websiteUrl && <p className="text-danger">{errors.websiteUrl}</p>}
                                                </div>
                                            )}

                                            {errors?.all && <p className="text-danger">{errors.all}</p>}
                                            {errors?.general && <p className="text-danger">{errors.general}</p>}
                                            <button className="btn btn-common log-btn mt-3" type="submit" disabled={isLoading}>
                                                {isLoading ? "Creating User..." : "Create User"}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </main>
            </div>
        </>
    )
}