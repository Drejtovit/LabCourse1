export default function InputLabel({ icon, type, name=undefined, placeholder }) {
    return (
        <div className="form-group">
            <div className="input-icon">
                <i className={`lni-${icon}`}></i>
                <input type={type} className="form-control" name={name} placeholder={placeholder} />
            </div>
        </div>
    );
}