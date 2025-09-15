export function validateResumeData(data) {
  const errors = {};
  const { profession, salary, age, details } = data;

  if (!profession || !salary) {
    errors.general = "Please fill in all required fields.";
  }

  if (profession.trim().length < 5) {
    errors.profession = "Profession must be at least 5 characters long.";
  }
  const salaryFloat = parseFloat(salary.trim().replace(/,/g, ""));
  if (isNaN(salaryFloat) || salaryFloat <= 0) {
    errors.salary = "Salary must be a valid number.";
  }
  if (age && age < 18) {
    errors.age = "Age must be at least 18.";
  }
  if (details && details.trim().length < 50) {
    errors.details = "Details must be at least 50 characters long.";
  }
  return errors;
}
