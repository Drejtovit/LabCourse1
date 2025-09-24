"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleInputChange } from "@/lib/utils/helpers.js";
import SideBar from "@/components/SideBar.jsx";

export default function JobAdminClient({ employers }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        type: "",
        description: "",
        closingDate: "",
        employerId: "",
    });
    async function handleSubmit(formData) {
        setErrorMessage({});
        setIsLoading(true);
        const res = await fetch('/api/job', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: formData.get('title'),
                type: formData.get('type'),
                description: formData.get('description'),
                closingDate: formData.get('closingDate'),
                employerId: formData.get('employerId'),
            })
        });

        const data = await res.json();

        if (res.ok && data.success) {
            toast.success("Job created successfully!", { toastId: "job-create-success" });
            router.push("/dashboard/jobs");
        }
        setErrorMessage(data.errors);
        setIsLoading(false);
    }

    const [selectedEmployer, setSelectedEmployer] = useState(null);

    function handleEmployerChange(e) {
        const employerId = e.target.value;
        setFormValues({ ...formValues, employerId });

        const employer = employers.find((employer) => employer.employerId === employerId);
        setSelectedEmployer(employer || null);
    }

    return (
        <div className="d-flex min-vh-100 bg-light">
            <SideBar></SideBar>
            <main className="flex-grow-1 p-3 p-md-4 mt-5 mt-lg-3" style={{ background: "#f8f9fa" }}>
                <section className="section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-9 col-md-12 col-xs-12">
                                <div className="post-job box">
                                    <h3 className="job-title">Create a Job</h3>
                                    <form className="form-ad" onSubmit={e => {
                                        e.preventDefault();
                                        handleSubmit(new FormData(e.target));
                                    }}>
                                        <div className="mb-3">
                                            <label className="control-label">Job Title</label>
                                            <input type="text" className="form-control" placeholder="Write job title"
                                                name='title'
                                                value={formValues.title || ""}
                                                onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                style={errorMessage?.title ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}} />
                                            {errorMessage?.title && <p className="text-danger mt-2">{errorMessage.title}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="control-label me-3">Select Employer:</label>
                                            <select
                                                value={formValues.employerId || ""}
                                                onChange={handleEmployerChange}
                                                className="border p-2 w-full"
                                                name="employerId"
                                                required
                                            >
                                                <option value="">Select Employer</option>
                                                {employers.map((employer, index) => (
                                                    <option key={index} value={employer?.employerId}>
                                                        {employer?.user?.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="control-label">Company</label>
                                            <input type="text" className="form-control" placeholder="Write company name" value={selectedEmployer?.user?.name || ""} readOnly={true} style={{ backgroundColor: "#e3f2fd" }} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="control-label">Location</label>
                                            <input type="text" className="form-control" placeholder="e.g.London"
                                                value={selectedEmployer ? (selectedEmployer?.zip + ' ' + selectedEmployer?.city + ', ' + selectedEmployer?.state) : ""}
                                                readOnly={true} style={{ backgroundColor: "#e3f2fd" }} />
                                        </div>

                                        <section id="editor">
                                            <div className="mb-3">
                                                <label htmlFor="comment">Description</label>
                                                <textarea className="form-control" rows="5" id="comment" placeholder='Enter job description'
                                                    name='description'
                                                    value={formValues.description || ""}
                                                    onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                                    style={errorMessage?.description ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                                ></textarea>
                                                {errorMessage?.description && <p className="text-danger mt-2">{errorMessage.description}</p>}
                                            </div>
                                        </section>
                                        <div className="mb-3">
                                            <label className="control-label">Application email</label>
                                            <input type="text" className="form-control"
                                                placeholder="Enter an email address"
                                                value={selectedEmployer?.user?.email || ""} readOnly={true} style={{ backgroundColor: "#e3f2fd" }} />
                                        </div>
                                        {selectedEmployer?.websiteUrl && (
                                            <div className="mb-3">
                                                <label className="control-label">URL(optional)</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter a website URL"
                                                    value={selectedEmployer?.websiteUrl || ""} readOnly={true} style={{ backgroundColor: "#e3f2fd" }} />
                                            </div>
                                        )}
                                        <div className="mb-3">
                                            <label className="control-label">Closing Date <span>(optional)</span></label>
                                            <input type="date" className="form-control" placeholder="yyyy-mm-dd" name="closingDate"
                                                style={errorMessage?.closingDate ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}} />
                                            {errorMessage?.closingDate && <p className="text-danger mt-2">{errorMessage.closingDate}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label ">Type of Job</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="type"
                                                        id="jobTypeFullTime"
                                                        value="full-time"
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="jobTypeFullTime">
                                                        Full Time
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="type"
                                                        id="jobTypePartTime"
                                                        value="part-time"
                                                    />
                                                    <label className="form-check-label" htmlFor="jobTypePartTime">
                                                        Part Time
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="type"
                                                        id="jobTypeContract"
                                                        value="contract"
                                                    />
                                                    <label className="form-check-label" htmlFor="jobTypeContract">
                                                        Contract
                                                    </label>
                                                </div>
                                                {errorMessage?.type && <p className="text-danger mt-2">{errorMessage.type}</p>}
                                            </div>
                                        </div>
                                        {errorMessage?.general && <p className="text-danger mt-2">{errorMessage.general}</p>}
                                        <button className="btn btn-common mt-4" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Creating...' : 'Create Job'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}