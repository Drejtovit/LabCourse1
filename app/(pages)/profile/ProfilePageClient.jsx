"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { readonly } from "zod";

export default function ProfilePageClient({ session, user }) {

    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [editButton, setEditButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [formValues, setFormValues] = useState({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber[0].number,//TODO FIX FOR EMPLOYEE
        zip: user.role === "CANDIDATE" ? user.candidate?.zip : user.employer?.location.zip,
        city: user.role === "CANDIDATE" ? user.candidate?.city : user.employer?.location.city,
        state: user.role === "CANDIDATE" ? user.candidate?.state : user.employer?.location.state,
        birthDate: user.candidate?.birthDate,
        description: user.employer?.description,
        websiteUrl: user.employer?.websiteUrl,
    })

    function handleInputChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    async function handleImageUpload(e) {
        const image = e.target.files[0];
        setIsUploading(true);

        const formData = new FormData();
        formData.set("image", image);

        const res = await fetch("/api/user/profileimg", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();

        if (!data.success || !res.ok) {
            setIsUploading(false);
            setErrorMessage(data.errors);
            return;
        }
        setIsUploading(false);
        window.location.reload();
    }
    async function handleSubmit(formData) {
        setErrorMessage({});
        setIsLoading(true);
        let userRelation;
        if (user.role === "CANDIDATE") {
            userRelation = {
                birthDate: formData.get("birthDate"),
            }
        } else {
            userRelation = {
                description: formData.get("description"),
                websiteUrl: formData.get("websiteUrl"),
            }
        }
        const response = await fetch(`/api/user/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.get("name"),
                role: user.role,
                phoneId: user.role === "CANDIDATE" ? user.phoneNumber[0]?.id : user.phoneNumber?.id,//TODO FIX WHICH [] POSITION IS THE ID OF THE PHONE NUMBER
                phoneNumber: formData.get("phoneNumber"),
                zip: formData.get("zip"),
                city: formData.get("city"),
                state: formData.get("state"),
                ...userRelation
            })
        })

        const data = await response.json();

        if (response.ok && data.success) {
            alert(data.message);
            window.location.reload();
        } else {
            setIsLoading(false);
            setErrorMessage(data.errors);
        }

    }


    return (
        <div
            className="d-flex justify-content-center align-items-center min-vh-100 mt-5"
            style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            }}
        >
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0 shadow-sm">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                <Image
                                    className="img-account-profile rounded-circle mb-2"
                                    src={user?.image || "/assets/img/default-avatar.png"}
                                    alt="profile-avatar"
                                    width={100}
                                    height={100}
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="small font-italic text-muted mb-4">
                                    JPG or PNG or WEBP no larger than 5 MB
                                </div>
                                <input type="file" ref={fileInputRef} style={{ display: "none", marginBottom: "10px" }} disabled={isUploading} onChange={handleImageUpload} />
                                {(errorMessage?.image || errorMessage?.details) && <p className="text-danger">{errorMessage.image || errorMessage.details}</p>}
                                <button className="btn btn-primary"
                                    style={{ backgroundColor: "#00BCD4" }} type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                                    {isUploading ? "Uploading..." : "Upload new image"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit(new FormData(e.target));
                                }}>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="name">
                                            {user?.role === 'EMPLOYER' ? "Company Name" : "Full Name"}
                                        </label>
                                        <input
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formValues.name}
                                            onChange={handleInputChange}
                                            placeholder={user?.role === 'EMPLOYER' ? "Enter your company name" : "Enter your full name"}
                                            readOnly={!editButton}
                                            style={errorMessage.name ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                        />
                                        {errorMessage?.name && <p className="text-danger">{errorMessage.name}</p>}
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                type="text"
                                                placeholder="Enter your email"
                                                value={formValues.email}
                                                readOnly={true}
                                                style={errorMessage.email ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: "#e3f2fd" }}

                                            />
                                            {errorMessage?.email && <p className="text-danger">{errorMessage.email}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="phoneNumber">
                                                Phone Number
                                            </label>
                                            <input
                                                className="form-control"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="text"
                                                value={formValues.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter your phone number"
                                                readOnly={!editButton}
                                                style={errorMessage.phoneNumber ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                            />
                                            {errorMessage?.phoneNumber && <p className="text-danger">{errorMessage.phoneNumber}</p>}
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="zip">
                                                ZIP code
                                            </label>
                                            <input
                                                className="form-control"
                                                id="zip"
                                                name="zip"
                                                type="text"
                                                value={formValues.zip}
                                                onChange={handleInputChange}
                                                placeholder="Enter your zip code"
                                                readOnly={!editButton}
                                                style={errorMessage.zip ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                            />
                                            {errorMessage?.zip && <p className="text-danger">{errorMessage.zip}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="city">
                                                City
                                            </label>
                                            <input
                                                className="form-control"
                                                id="city"
                                                name="city"
                                                type="text"
                                                value={formValues.city}
                                                onChange={handleInputChange}
                                                placeholder="City"
                                                readOnly={!editButton}
                                                style={errorMessage.city ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}

                                            />
                                            {errorMessage?.city && <p className="text-danger">{errorMessage.city}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="state">
                                            State
                                        </label>
                                        <input
                                            className="form-control"
                                            id="state"
                                            name="state"
                                            type="text"
                                            value={formValues.state}
                                            onChange={handleInputChange}
                                            placeholder="State"
                                            readOnly={!editButton}
                                            style={errorMessage.state ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                        />
                                        {errorMessage?.state && <p className="text-danger">{errorMessage.state}</p>}
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        {/* <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone">
                                                Phone number
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputPhone"
                                                type="tel"
                                                placeholder="Enter your phone number"
                                            />
                                        </div> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="birthDate">
                                                Birthday
                                            </label>
                                            <input
                                                className="form-control"
                                                id="birthDate"
                                                type="date"
                                                name="birthDate"
                                                value={formValues.birthDate.split("T")[0]}
                                                onChange={handleInputChange}
                                                placeholder="Enter your birthday"
                                                readOnly={!editButton}
                                                style={errorMessage.birthDate ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                            />
                                            {errorMessage?.birthDate && <p className="text-danger">{errorMessage.birthDate}</p>}
                                        </div>
                                    </div>
                                    {errorMessage?.general && <p className="text-danger">{errorMessage.general}</p>}
                                    {errorMessage?.message && <p className="text-info">{errorMessage.message}</p>}
                                    <button className="btn btn-primary" style={{ backgroundColor: "#00BCD4" }} type="submit" disabled={isLoading}>
                                        {isLoading ? "Saving..." : "Save Changes"}
                                    </button>
                                    {!editButton && <button className="btn btn-secondary" style={{ marginLeft: "10px" }} type="button" onClick={() => setEditButton(true)} disabled={editButton}>
                                        EDIT
                                    </button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
