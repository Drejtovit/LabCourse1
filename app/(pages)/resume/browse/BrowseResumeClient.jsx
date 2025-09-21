'use client';
import BrowseResume from "@/components/BrowseResume";
import PageHeader from "@/components/PageHeader.jsx";
import Link from "next/link";
import ResumeRedirect from "@/components/redirect/ResumeRedirect.jsx";
import { useState } from "react";

export default function BrowseResumesClient({ resumes }) {
    const [filteredResumes, setFilteredResumes] = useState(resumes);
    const [sort, setSort] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function handleFiltering(formData) {
        setErrors({});
        setIsLoading(true);
        const sort = formData.get('sort') || '';

        const res = await fetch(`/api/resume/browse?sort=${encodeURIComponent(sort)}`, { cache: 'no-store' });
        const data = await res.json();
        if (!res.ok || data.errors) {
            setErrors(data.errors);
            setIsLoading(false);
        }
        setFilteredResumes(data.resumes);
        setIsLoading(false);
    }
    return (
        <>
            <PageHeader>Browse Resumes</PageHeader>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleFiltering(new FormData(e.target));
                            }}>
                                <div className="wrap-search-filter row align-items-end g-3 mb-4">
                                    <div className="col-lg-2 col-md-3 col-12">
                                        <select className="form-control" style={{ fontWeight: 300, color: "#383838ff" }}
                                            name="sort"
                                            value={sort}
                                            onChange={e => setSort(e.target.value)}>
                                            <option value=""
                                                style={{ color: "#565656ff" }}>
                                                Sort By
                                            </option>
                                            <option value="desc"
                                                style={{ color: "#565656ff" }}>
                                                Newest
                                            </option>
                                            <option value="asc" style={{ color: "#565656ff" }}>Oldest</option>
                                        </select>
                                    </div>
                                    {errors?.general && (
                                        <p className="text-danger">{errors.general}</p>
                                    )}
                                    <div className="col-lg-2 col-md-12 col-12">
                                        <button type="submit" className="btn btn-secondary w-100" disabled={isLoading || sort === ''}>
                                            {isLoading ? 'Filtering...' : 'Filter Resumes'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {!filteredResumes && <ResumeRedirect hasResume={false} message={"There are no resumes available to browse."} route={'/'} type={'info'} />}
                        {filteredResumes?.length > 0 && filteredResumes.map((resume) => {
                            return <BrowseResume
                                key={resume?.id}
                                id={resume?.id}
                                name={resume?.candidate?.user?.name}
                                profession={resume?.profession}
                                email={resume?.candidate?.user?.email}
                                location={resume?.candidate?.city + "," + resume?.candidate?.state}
                                skills={resume?.SkillsOnResumes?.map(s => s.skill.name)}
                            >
                                {resume?.details}
                            </BrowseResume>
                        })}
                    </div>
                </div >
            </div >
            {/* Start Pagination  */}
            {/* <ul ul className="pagination" >
        <li className="active">
          <Link href="#" className="btn btn-common">
            <i className="ti-angle-left"></i> prev
          </Link>
        </li>
        <li>
          <Link href="#">1</Link>
        </li>
        <li>
          <Link href="#">2</Link>
        </li>
        <li>
          <Link href="#">3</Link>
        </li>
        <li>
          <Link href="#">4</Link>
        </li>
        <li>
          <Link href="#">5</Link>
        </li>
        <li className="active">
          <Link href="#" className="btn btn-common">
            Next <i className="ti-angle-right"></i>
          </Link>
        </li>
      </ul > */}
            {/* <!-- End Pagination --> */}
        </>
    );
}
