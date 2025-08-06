export default function Counter({children, icon, number}) {
    return (
        <div className="col-lg-3 col-md-6 col-xs-12">
            <div className="counter-box">
                <div className="icon">
                    <i className={icon}></i>
                </div>
                <div className="fact-count">
                    <h3><span className="counter">{number}</span></h3>
                    <p>{children}</p>
                </div>
            </div>
        </div>
    )
}