export default function InputLabel({ icon, type, name=undefined, placeholder }) {
    return (
        <div className="mb-3">
            <div className="input-icon">
                <i className={`lni-${icon}`}></i>
                <input type={type} className="form-control" name={name} placeholder={placeholder} />
            </div>
        </div>
    );
}