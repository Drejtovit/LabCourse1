"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { handleInputChange, updateItem, addItem, removeItem } from "@/lib/utils/helpers.js";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/DeleteButton.jsx";

export default function ProfilePageClient({ user }) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [editButton, setEditButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [formValues, setFormValues] = useState({
        name: user.name,
        email: user.email,
        zip: user.role === "CANDIDATE" ? user.candidate?.zip : user.employer?.zip,
        city: user.role === "CANDIDATE" ? user.candidate?.city : user.employer?.city,
        state: user.role === "CANDIDATE" ? user.candidate?.state : user.employer?.state,
        birthDate: user.candidate?.birthDate,
        description: user.employer?.description,
        websiteUrl: user.employer?.websiteUrl,
    })
    const [phoneNumbers, setPhoneNumbers] = useState(user?.phoneNumber || [{ number: "" }]);

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
        toast.success("Profile image uploaded successfully", { toastId: 'image-upload-success' });
        router.refresh();
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
                phoneNumbers: phoneNumbers,
                zip: formData.get("zip"),
                city: formData.get("city"),
                state: formData.get("state"),
                ...userRelation
            })
        })

        const data = await response.json();

        if (response.ok && data.success) {
            toast.success(data.message, { toastId: 'profile-update-success' });
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } else {
            setIsLoading(false);
            toast.error('Please provide valid information', { toastId: 'profile-update-error' });
            setErrorMessage(data.errors);
        }

    }
    async function handleDeletePhoneNumber({ id, index }) {
        const res = await fetch('/api/user/phonenumber', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (data.errors?.id) {
            removeItem(phoneNumbers, setPhoneNumbers, index);
        }
        if (res.ok && data.success) {
            removeItem(phoneNumbers, setPhoneNumbers, index);
        } else {
            toast.error(data.errors.general, { toastId: 'delete-phone-error' });
        }
    }

    return (

        <div className="d-flex justify-content-center align-items-center min-vh-100 mt-5" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", }}>
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
                                <input type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none", marginBottom: "10px" }}
                                    disabled={isUploading}
                                    onChange={handleImageUpload}
                                />
                                {(errorMessage?.image || errorMessage?.details) && <p className="text-danger">{errorMessage?.image || errorMessage?.details}</p>}
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
                                            onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                            placeholder={user?.role === 'EMPLOYER' ? "Enter your company name" : "Enter your full name"}
                                            readOnly={!editButton}
                                            style={errorMessage?.name ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
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
                                                style={{ backgroundColor: "#e3f2fd" }}

                                            />
                                            {errorMessage?.email && <p className="text-danger">{errorMessage.email}</p>}
                                        </div>

                                        {phoneNumbers.map((phone, index) => (
                                            <div className="col-md-6" key={index}>
                                                <label className="small mb-1" htmlFor="phoneNumber">
                                                    Phone Number
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="phoneNumber"
                                                    name="number"
                                                    type="text"
                                                    value={phone.number}
                                                    onChange={(e) => updateItem(phoneNumbers, setPhoneNumbers, index, e)}
                                                    placeholder="Enter your phone number"
                                                    readOnly={!editButton}
                                                    style={errorMessage?.phoneNumber ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                                />

                                                {errorMessage?.phoneNumber && <p className="text-danger">{errorMessage.phoneNumber}</p>}
                                                {(index > 0 && editButton) && <div className="add-post-btn">
                                                    <div className="float-end">
                                                        <button className='btn-delete'
                                                            type="button"
                                                            disabled={index === 0 || !editButton}
                                                            onClick={() => handleDeletePhoneNumber({ id: phone.id, index })}>
                                                            Delete This
                                                        </button>
                                                    </div>
                                                </div>}
                                            </div>
                                        ))}

                                        {(phoneNumbers.length < 3 && editButton) && <div className="add-post-btn">
                                            <div className="float-end">
                                                <button className='btn-added' type="button"
                                                    disabled={phoneNumbers.length >= 3 || !editButton}
                                                    onClick={() => addItem(phoneNumbers, setPhoneNumbers,
                                                        { number: "" })}>
                                                    <i>Add New Phone Number</i>
                                                </button>
                                            </div>
                                        </div>}



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
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                placeholder="Enter your zip code"
                                                readOnly={!editButton}
                                                style={errorMessage?.zip ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
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
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                placeholder="City"
                                                readOnly={!editButton}
                                                style={errorMessage?.city ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}

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
                                            onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                            placeholder="State"
                                            readOnly={!editButton}
                                            style={errorMessage?.state ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                        />
                                        {errorMessage?.state && <p className="text-danger">{errorMessage.state}</p>}
                                    </div>
                                    <div className="row gx-3 mb-3">

                                        {user?.role === "CANDIDATE" && (
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
                                                    onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                    placeholder="Enter your birthday"
                                                    readOnly={!editButton}
                                                    style={errorMessage?.birthDate ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                                />
                                                {errorMessage?.birthDate && <p className="text-danger">{errorMessage.birthDate}</p>}
                                            </div>
                                        )}

                                        {/* -------------------------------------------------------- */}

                                        {user?.role === "EMPLOYER" && (
                                            <>
                                                <div className="col-md-6">
                                                    <label className="small mb-1" htmlFor="description">
                                                        Description
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        id="description"
                                                        name="description"
                                                        type="text"
                                                        placeholder="Enter a brief description"
                                                        value={formValues.description || ""}
                                                        onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                        readOnly={!editButton}
                                                        style={errorMessage?.description ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                                    />
                                                    {errorMessage?.description && <p className="text-danger">{errorMessage.description}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1" htmlFor="websiteUrl">
                                                        Website URL(Optional)
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        id="websiteUrl"
                                                        name="websiteUrl"
                                                        type="text"
                                                        placeholder="Enter your website URL"
                                                        value={formValues.websiteUrl || ""}
                                                        onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                        readOnly={!editButton}
                                                        style={errorMessage?.websiteUrl ? { borderColor: "red", backgroundColor: "#ffe6e6", marginBottom: "10px" } : { backgroundColor: !editButton ? "#e3f2fd" : "#fff" }}
                                                    />
                                                    {errorMessage?.websiteUrl && <p className="text-danger">{errorMessage.websiteUrl}</p>}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {errorMessage?.general && <p className="text-danger">{errorMessage.general}</p>}
                                    {errorMessage?.message && <p className="text-info">{errorMessage.message}</p>}
                                    <button className="btn btn-primary" style={{ backgroundColor: "#00BCD4" }} type="submit" disabled={isLoading || !editButton}>
                                        {isLoading ? "Saving..." : "Save Changes"}
                                    </button>
                                    {!editButton && <button className="btn btn-secondary" style={{ marginLeft: "10px" }} type="button" onClick={() => setEditButton(true)} disabled={editButton}>
                                        EDIT
                                    </button>}
                                    <DeleteButton id={user.id} classes="btn btn-danger float-end" disabled={isLoading} item="user">
                                        DELETE
                                    </DeleteButton>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
