export default function PageHeader({children}){
    return (
        <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>{children}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )


}