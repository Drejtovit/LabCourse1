"use client";
import PageHeader from '@/components/PageHeader.jsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addItem, handleInputChange, removeItem, updateItem } from '@/lib/utils/helpers.js';
import { toast } from 'react-toastify';

export default function ResumeCreateClient({ session, user }) {
    const [errorMessage, setErrorMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        profession: '',
        age: user.candidate ? new Date().getFullYear() - new Date(user.candidate.birthDate).getFullYear() : '',
        details: '',
    });
    const router = useRouter();
    const [educations, setEducations] = useState([
        { degree: "", fieldOfStudy: "", school: "", from: "", to: "", description: "" }
    ]);
    const [experiences, setExperiences] = useState([
        { companyName: "", professionTitle: "", from: "", to: "", description: "" }
    ]);
    const [skills, setSkills] = useState([
        { name: "", proficiency: "" }
    ]);

    async function handleSubmit(formData) {
        setErrorMessage({});
        setIsLoading(true);
        const res = await fetch('/api/resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                profession: formData.get('profession'),
                candidateId: user.candidate.candidateId,
                age: formData.get('age'),
                details: formData.get('details'),
            })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            toast.success("Resume created successfully!", { toastId: "resume-create-success" });
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
                                            onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                            style={errorMessage?.profession ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}} />
                                        {errorMessage?.profession && <p className="text-danger mt-2">{errorMessage.profession}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Location</label>
                                        <input type="text" name='location' className="form-control"
                                            placeholder="Location, e.g"
                                            readOnly={true}
                                            value={user.candidate.city + ", " + user.candidate.state}
                                            style={{ backgroundColor: "#e3f2fd" }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">Age(Optional)</label>
                                        <input type="number" name="age" className="form-control"
                                            placeholder="Age"
                                            value={formValues.age || ""}
                                            onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                            style={errorMessage?.age ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                        />
                                        {errorMessage?.age && <p className="text-danger mt-2">{errorMessage.age}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="control-label">About Me(Optional)</label>
                                        <textarea className="form-control" rows="7"
                                            value={formValues.details || ""}
                                            onChange={(e) => handleInputChange({ setList: setFormValues, e })}
                                            name="details"
                                            placeholder='Tell us about yourself'
                                            style={errorMessage?.details ? { borderColor: "red", backgroundColor: "#ffe6e6" } : {}}
                                        ></textarea>
                                        {errorMessage?.details && <p className="text-danger mt-2">{errorMessage.details}</p>}
                                    </div>
                                    <hr className='mt-4 border border-dark border-3' />

                                    <div className="divider">
                                        <h3>Education</h3>
                                    </div>
                                    {educations.map((education, index) => (
                                        <div key={index} className='education-form'>
                                            <div className="mb-3">
                                                <label className="control-label">Degree</label>
                                                <input type="text" className="form-control"
                                                    name='degree'
                                                    placeholder="Degree, e.g. Bachelor"
                                                    value={education.degree || ""}
                                                    onChange={(e) => updateItem(educations, setEducations, index, e)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="control-label">Field of Study</label>
                                                <input type="text" className="form-control"
                                                    name='fieldOfStudy'
                                                    placeholder="Major, e.g Computer Science"
                                                    value={education.fieldOfStudy || ""}
                                                    onChange={(e) => updateItem(educations, setEducations, index, e)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="control-label">School</label>
                                                <input type="text" className="form-control"
                                                    name='school'
                                                    placeholder="School name, e.g. Massachusetts Institute of Technology"
                                                    value={education.school || ""}
                                                    onChange={(e) => updateItem(educations, setEducations, index, e)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="control-label">From</label>
                                                        <input type="text" className="form-control"
                                                            name='from'
                                                            placeholder="e.g 2014"
                                                            value={education.from || ""}
                                                            onChange={(e) => updateItem(educations, setEducations, index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="control-label">To</label>
                                                        <input type="text" className="form-control"
                                                            name='to'
                                                            placeholder="e.g 2020"
                                                            value={education.to || ""}
                                                            onChange={(e) => updateItem(educations, setEducations, index, e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="control-label">Description</label>
                                                <textarea className="form-control"
                                                    name='description'
                                                    rows="7"
                                                    value={education.description || ""}
                                                    onChange={(e) => updateItem(educations, setEducations, index, e)}
                                                ></textarea>
                                            </div>

                                            {index > 0 && <div className="add-post-btn">
                                                <div className="float-end">
                                                    <button className='btn-delete'
                                                        disabled={index === 0}
                                                        onClick={() => removeItem(educations, setEducations, index)}>
                                                        Delete This
                                                    </button>
                                                </div>
                                            </div>}
                                            <hr className='mt-1' />
                                        </div>))}

                                    {educations.length < 5 && (
                                        <div className="add-post-btn">
                                            <div className="float-end">
                                                <button className='btn-added'
                                                    disabled={educations.length >= 5}
                                                    onClick={() => addItem(educations, setEducations,
                                                        { degree: "", fieldOfStudy: "", school: "", from: "", to: "", description: "" })}>
                                                    <i>Add New Education</i>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <hr className='mt-4 border border-dark border-3' />
                                    <div className="divider">
                                        <h3>Work Experience(Optional)</h3>
                                    </div>
                                    {experiences.map((experience, index) => (
                                        <div key={index} className='work-experience-section'>
                                            <div className="mb-3">
                                                <label className="control-label">Company Name</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Company name"
                                                    name="companyName"
                                                    value={experience.companyName || ""}
                                                    onChange={(e) => updateItem(experiences, setExperiences, index, e)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="control-label">Title</label>
                                                <input type="text" className="form-control"
                                                    placeholder="e.g UI/UX Researcher"
                                                    name="professionTitle"
                                                    value={experience.professionTitle || ""}
                                                    onChange={(e) => updateItem(experiences, setExperiences, index, e)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="control-label">Date From</label>
                                                        <input type="text" className="form-control"
                                                            placeholder="e.g 2014"
                                                            name="from"
                                                            value={experience.from || ""}
                                                            onChange={(e) => updateItem(experience, setExperiences, index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="control-label">Date To</label>
                                                        <input type="text" className="form-control"
                                                            placeholder="e.g 2020"
                                                            name="to"
                                                            value={experience.to || ""}
                                                            onChange={(e) => updateItem(experiences, setExperiences, index, e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="control-label">Description</label>
                                                <textarea className="form-control"
                                                    rows="7"
                                                    name="description"
                                                    value={experience.description || ""}
                                                    onChange={(e) => updateItem(experiences, setExperiences, index, e)}
                                                ></textarea>
                                            </div>

                                            <div className="add-post-btn">
                                                <div className="float-end">
                                                    <button className='btn-delete'
                                                        onClick={() => removeItem(experiences, setExperiences, index)}>
                                                        Delete This
                                                    </button>
                                                </div>
                                            </div>
                                            <hr className='mt-1' />
                                        </div>
                                    ))}
                                    <div className="add-post-btn">
                                        <div className="float-end">
                                            <button className='btn-added'
                                                onClick={() => addItem(experiences, setExperiences,
                                                    { companyName: "", professionTitle: "", from: "", to: "", description: "" })}>
                                                <i>Add New Experience</i>
                                            </button>
                                        </div>
                                    </div>
                                    <hr className='mt-4 border border-dark border-3' />

                                    <div className="divider">
                                        <h3>Skills</h3>
                                    </div>
                                    {skills.map((skill, index) => (
                                        <div key={index} className='skill-section'>
                                            <div className="mb-3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="control-label">Skill Name</label>
                                                        <input className="form-control"
                                                            placeholder="Skill name, e.g. HTML"
                                                            type="text"
                                                            name="name"
                                                            value={skill.name || ""}
                                                            onChange={(e) => updateItem(skills, setSkills, index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="control-label">% (1-100)</label>
                                                        <input className="form-control"
                                                            placeholder="Skill proficiency, e.g. 90"
                                                            type="text"
                                                            name="proficiency"
                                                            value={skill.proficiency || ""}
                                                            onChange={(e) => updateItem(skills, setSkills, index, e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {index > 0 &&
                                                (<div className="add-post-btn">
                                                    <div className="float-end">
                                                        <button className='btn-delete'
                                                            disabled={index === 0}
                                                            onClick={() => removeItem(skills, setSkills, index)}>
                                                            Delete This
                                                        </button>
                                                    </div>
                                                </div>)}
                                            <hr className='mt-1' />
                                        </div>
                                    ))}
                                    <div className="add-post-btn">
                                        <div className="float-end">
                                            <button className='btn-added'
                                                onClick={() => addItem(skills, setSkills,
                                                    { name: "", proficiency: "" }
                                                )}>
                                                <i>Add New Skill</i>
                                            </button>
                                        </div>
                                    </div>

                                    {errorMessage?.general && <p className="text-danger mt-2">{errorMessage.general}</p>}
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