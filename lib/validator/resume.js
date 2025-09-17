export function validateResumeData(data) {
  const errors = {};
  const { profession, age, details } = data;

  if (!profession) {
    errors.general = "Please fill in all required fields.";
  }

  if (profession.trim().length < 5) {
    errors.profession = "Profession must be at least 5 characters long.";
  }
  if (age && age < 18) {
    errors.age = "Age must be at least 18.";
  }
  return errors;
}
