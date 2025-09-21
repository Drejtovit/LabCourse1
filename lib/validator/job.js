export function validateJobData(data) {
    const errors = {};
    const { title, type, description, closingDate } = data;

    if (!title || !type || !description || !closingDate) {
        errors.general = "Please fill in all required fields.";
    }

    if (title.trim().length < 3) {
        errors.title = "Title must be at least 3 characters long.";
    }
    if (type !== "full-time" && type !== "part-time" && type !== "contract") {
        errors.type = "Type must be one of: Full Time, Part Time, Contract.";
    }
    if (description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters long.";
    }
    if (isNaN(Date.parse(closingDate))) {
        errors.closingDate = "Closing date must be a valid date.";
    } else if (new Date(closingDate) <= new Date()) {
        errors.closingDate = "Closing date must be a future date.";
    }
    return errors;
}