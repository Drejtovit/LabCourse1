export default function BrowseResumes() {

    return (
        <>
        <Header></Header>
            <div class="page-header">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="inner-header">
                        <h3>Browse Resumes</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* CandidateResumeCard */}
            {/* Start Pagination  */}
            < ul class="pagination" >
                <li class="active"><a href="#" class="btn btn-common"><i class="ti-angle-left"></i> prev</a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li class="active"><a href="#" class="btn btn-common">Next <i
                    class="ti-angle-right"></i></a></li>
            </ul >
            {/* <!-- End Pagination --> */}</>
    )
}