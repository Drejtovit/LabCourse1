'use client';
import PageHeader from '@/components/PageHeader.jsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleInputChange } from '@/lib/utils/helpers.js';
import { toast } from 'react-toastify';
export default function EditJobClient({ session, job }) {


    const [errorMessage, setErrorMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        title: job?.title || '',
        type: job?.type === 'FULL_TIME' ? "full-time" : job?.type === 'PART_TIME' ? "part-time" : job?.type === 'CONTRACT' ? "contract" : '',
        description: job?.description || '',
        closingDate: job?.closingDate.split("T")[0] || '',
    });
    const router = useRouter();

    async function handleSubmit(formData) {
        setErrorMessage({});
        setIsLoading(true);
        const res = await fetch(`/api/job/${job.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: formData.get('title'),
                type: formData.get('type'),
                description: formData.get('description'),
                closingDate: formData.get('closingDate'),
            })
        });

        const data = await res.json();

        if (res.ok && data.success) {
            toast.success("Job edited successfully!", { toastId: "job-edit-success" });
            router.replace("/job/manage");
        }
        setErrorMessage(data.errors);
        setIsLoading(false);
    }
    return (
        <>

            <PageHeader>Edit Job</PageHeader>
            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-12 col-xs-12">
                            <div className="post-job box">
                                <h3 className="job-title">Edit Job</h3>
                                <form className="form-ad" onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit(new FormData(e.target));
                                }}>
                                    <div className="mb-3">
                                        <label className="control-label">Job Title</label>
                                        <input type="text" className="form-control" placeholder="Write job title"
                                            name='title'
                                            value={formValues.title}
                                            onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                            style={errorMessage?.title ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}} />
                                        {errorMessage?.title && <p className="text-danger mt-2">{errorMessage.title}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Company</label>
                                        <input type="text" className="form-control" placeholder="Write company name" value={job?.employer?.user?.name} readOnly={true} style={{ backgroundColor: "#e3f2fd" }} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Location <span>(optional)</span></label>
                                        <input type="text" className="form-control" placeholder="e.g.London"
                                            value={job?.employer?.zip + ' ' + job?.employer?.city + ', ' + job?.employer?.state}
                                            readOnly={true} style={{ backgroundColor: "#e3f2fd" }} />
                                    </div>

                                    <section id="editor">
                                        <div className="mb-3">
                                            <label htmlFor="comment">Description</label>
                                            <textarea className="form-control" rows="5" id="comment" placeholder='Enter job description'
                                                name='description'
                                                value={formValues.description}
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
                                            value={job?.employer?.user?.email} readOnly={true} style={{ backgroundColor: "#e3f2fd" }} />
                                    </div>
                                    {job?.employer?.websiteUrl && (
                                        <div className="mb-3">
                                            <label className="control-label">URL(optional)</label>
                                            <input type="text" className="form-control"
                                                placeholder="Enter a website URL"
                                                value={job?.employer?.websiteUrl} readOnly={true} style={{ backgroundColor: "#e3f2fd" }} />
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="control-label">Closing Date <span>(optional)</span></label>
                                        <input type="date" className="form-control" placeholder="yyyy-mm-dd" name="closingDate" value={formValues.closingDate}
                                            onChange={(e) => handleInputChange({ setList: setFormValues, e })}
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
                                                    checked={formValues.type === "full-time"}
                                                    onChange={(e) => handleInputChange({ setList: setFormValues, e })}

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
                                                    checked={formValues.type === "part-time"}
                                                    onChange={(e) => handleInputChange({ setList: setFormValues, e })}
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
                                                    checked={formValues.type === "contract"}
                                                    onChange={(e) => handleInputChange({ setList: setFormValues, e })}
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
                                        {isLoading ? 'Editing...' : 'Edit Job'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}