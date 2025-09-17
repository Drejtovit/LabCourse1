export default function InputLabel({ icon, type, name = "", placeholder, value = '', ...props }) {
    return (
        <div className="mb-3">
            <div className="input-icon">
                <i className={`lni-${icon}`}></i>
                <input type={type} className="form-control" name={name} placeholder={placeholder} value={value} {...props} />
            </div>
        </div>
    );
}