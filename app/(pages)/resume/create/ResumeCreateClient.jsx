"use client";
import PageHeader from '@/components/PageHeader.jsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumeCreateClient({ session, user }) {
    const [errorMessage, setErrorMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        profession: '',
        salary: '',
        age: user.candidate ? new Date().getFullYear() - new Date(user.candidate.birthDate).getFullYear() : '',
        details: '',
    });
    const router = useRouter();

    function handleInputChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(formData) {
        setErrorMessage({});
        setIsLoading(true);
        const res = await fetch('/api/resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                profession: formData.get('profession'),
                salary: formData.get('salary'),
                candidateId: user.candidate.candidateId,
                age: formData.get('age'),
                details: formData.get('details'),
            })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            alert("Resume created successfully!");
            router.push("/resume");
        }
        setErrorMessage(data.errors);
        setIsLoading(false);
    }
    return (
        <>
            <PageHeader>Create Resume</PageHeader>
            <section id="content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-12 col-xs-12">
                            <div className="add-resume box">
                                <form className="form-ad" onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit(new FormData(e.target));
                                }}>
                                    <h3>Basic information</h3>
                                    <div className="mb-3">
                                        <label className="control-label">Name</label>
                                        <input type="text" name='name' value={user.name} readOnly={true} className="form-control" placeholder="Name"
                                            style={{ backgroundColor: "#e3f2fd" }} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label"></label>
                                        <label className="control-label">Email</label>
                                        <input type="text" name='email' value={user.email} readOnly={true} className="form-control" placeholder="Your@domain.com"
                                            style={{ backgroundColor: "#e3f2fd" }} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Profession Title</label>
                                        <input type="text" className="form-control"
                                            name='profession'
                                            placeholder="Headline (e.g. Front-end developer)"
                                            value={formValues.profession}
                                            onChange={handleInputChange}
                                            style={errorMessage?.profession ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}} />
                                        {errorMessage?.profession && <p className="text-danger mt-2">{errorMessage.profession}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Location</label>
                                        <input type="text" name='location' className="form-control" placeholder="Location, e.g" readOnly={true}
                                            value={user.candidate.city + ", " + user.candidate.state}
                                            style={{ backgroundColor: "#e3f2fd" }} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Salary</label>
                                        <input type="text" name="salary" className="form-control" placeholder="Salary"
                                            value={formValues.salary} onChange={handleInputChange}
                                            style={errorMessage?.salary ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}} />
                                        {errorMessage?.salary && <p className="text-danger mt-2">{errorMessage.salary}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Age(Optional)</label>
                                        <input type="number" name="age" className="form-control" placeholder="Age"
                                            value={formValues.age || ""} onChange={handleInputChange}
                                            style={errorMessage?.age ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}} />
                                        {errorMessage?.age && <p className="text-danger mt-2">{errorMessage.age}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">About Me(Optional)</label>
                                        <textarea className="form-control" rows="7" value={formValues.details || ""} onChange={handleInputChange} name="details" placeholder='Tell us about yourself'
                                            style={errorMessage?.details ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}></textarea>
                                        {errorMessage?.details && <p className="text-danger mt-2">{errorMessage.details}</p>}
                                    </div>
                                    <hr className='mt-4' />
                                    <h3 className="mt-4">Education</h3>
                                    <div className="mb-3">
                                        <label className="control-label">Degree</label>
                                        <input type="text" className="form-control" placeholder="Degree, e.g. Bachelor" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Field of Study</label>
                                        <input type="text" className="form-control" placeholder="Major, e.g Computer Science" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">School</label>
                                        <input type="text" className="form-control"
                                            placeholder="School name, e.g. Massachusetts Institute of Technology" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label">From</label>
                                                <input type="text" className="form-control" placeholder="e.g 2014" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label">To</label>
                                                <input type="text" className="form-control" placeholder="e.g 2020" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Description</label>
                                        <textarea className="form-control" rows="7"></textarea>
                                    </div>
                                    <div className="add-post-btn">
                                        <div className="float-start">
                                            <a href="#" className="btn-added"><i className="ti-plus"></i> Add New Education</a>
                                        </div>
                                        <div className="float-end">
                                            <a href="#" className="btn-delete"><i className="ti-trash"></i> Delete This</a>
                                        </div>
                                    </div>
                                    <div className="divider">
                                        <h3>Work Experience</h3>
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Company Name</label>
                                        <input type="text" className="form-control" placeholder="Company name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Title</label>
                                        <input type="text" className="form-control" placeholder="e.g UI/UX Researcher" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label">Date Form</label>
                                                <input type="text" className="form-control" placeholder="e.g 2014" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label">Date To</label>
                                                <input type="text" className="form-control" placeholder="e.g 2020" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Description</label>
                                        <textarea className="form-control" rows="7"></textarea>
                                    </div>
                                    <div className="add-post-btn">
                                        <div className="float-start">
                                            <a href="#" className="btn-added"><i className="ti-plus"></i> Add New Experience</a>
                                        </div>
                                        <div className="float-end">
                                            <a href="#" className="btn-delete"><i className="ti-trash"></i> Delete This</a>
                                        </div>
                                    </div>
                                    <div className="divider">
                                        <h3>Skills</h3>
                                    </div>
                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label">Skill Name</label>
                                                <input className="form-control" placeholder="Skill name, e.g. HTML" type="text" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label">% (1-100)</label>
                                                <input className="form-control" placeholder="Skill proficiency, e.g. 90" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-post-btn">
                                        <div className="float-start">
                                            <a href="#" className="btn-added"><i className="ti-plus"></i> Add New Skills</a>
                                        </div>
                                        <div className="float-end">
                                            <a href="#" className="btn-delete"><i className="ti-trash"></i> Delete This</a>
                                        </div>
                                    </div>
                                    {errorMessage?.general && <p className="text-danger mt-2">{errorMessage.general}</p>
                                    }
                                    {errorMessage?.maxResumes && <p className="text-danger mt-2">{errorMessage.maxResumes}</p>}
                                    <button className="btn btn-common mt-4" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Creating...' : 'Create Resume'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}