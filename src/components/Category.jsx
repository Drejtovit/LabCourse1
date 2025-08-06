export default function Category({extra='', children, icon_number, icon,...props}) {
    return (
        <div className={`col-lg-3 col-md-6 col-xs-12 f-category ${extra}`}>
            <a href="browse-jobs.html">
                <div className={`icon bg-color-${icon_number}`}>
                    <i className={icon}></i>
                </div>
                <h3>{children}</h3>
                <p>({props.number} Jobs)</p>
            </a>
        </div>
    )
}