"use client";
import Image from "next/image";
import { useState, useRef } from "react";

export default function ProfilePageClient({ session }) {

    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [fileUrl, setFileUrl] = useState("");
    const fileInputRef = useRef(null);

    async function handleImageUpload(e) {
        const image = e.target.files[0];
        setIsUploading(true);

        // if (!image) {
        //     setIsUploading(false);
        //     alert("Please select an image to upload.");
        //     return;
        // }

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
        let fileLink = data.url;
        setFileUrl(fileLink);
        setIsUploading(false);
        window.location.reload();
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center min-vh-100"
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
                                    src={fileUrl || session?.user?.image || "/assets/img/default-avatar.png"}
                                    alt="profile-avatar"
                                    width={100}
                                    height={100}
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="small font-italic text-muted mb-4">
                                    JPG or PNG or WEBP no larger than 5 MB
                                </div>
                                <input type="file" ref={fileInputRef} style={{ display: "none" }} disabled={isUploading} onChange={handleImageUpload} />
                                {errorMessage?.image || errorMessage?.details && <p className="text-danger">{errorMessage.image || errorMessage.details}</p>}
                                <button className="btn btn-primary" type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                                    {isUploading ? "Uploading..." : "Upload new image"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="name">
                                            Full Name
                                        </label>
                                        <input
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            type="text"
                                            defaultValue={session?.user?.name || ""}
                                            placeholder={session?.user?.role === 'EMPLOYER' ? "Enter your company name" : "Enter your full name"}
                                        />
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
                                                defaultValue={session?.user?.email || ""}
                                            />
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
                                                defaultValue={session?.user?.phoneNumber[0]?.number || ""}
                                                placeholder="Enter your phone number"
                                            />
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
                                                placeholder="Enter your zip code"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLocation">
                                                Location
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputLocation"
                                                type="text"
                                                placeholder="Enter your location"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">
                                            Email address
                                        </label>
                                        <input
                                            className="form-control"
                                            id="inputEmailAddress"
                                            type="email"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone">
                                                Phone number
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputPhone"
                                                type="tel"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputBirthday">
                                                Birthday
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputBirthday"
                                                type="text"
                                                name="birthday"
                                                placeholder="Enter your birthday"
                                            />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" type="button">
                                        Save changes
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
