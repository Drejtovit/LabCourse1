export function validateUserData(data) {
  const { name, email, password, confirmPassword, role, phoneNumber } = data;
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+[0-9]{6,15}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const emailTrimmed = email?.trim();
  if (
    !name ||
    !emailTrimmed ||
    !password ||
    !confirmPassword ||
    !role ||
    !phoneNumber
  ) {
    errors.general = "Please fill in all fields.";
    return errors;
  }

  if (!emailRegex.test(emailTrimmed)) {
    errors.email = "Invalid email format.";
  }

  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (role !== "candidate" && role !== "employer") {
    errors.role = "Role must be either 'candidate' or 'employer'.";
  }

  if (!phoneRegex.test(phoneNumber)) {
    errors.phoneNumber =
      "Invalid phone number format. It should start with '+' followed by 6 to 15 digits.";
  }

  return errors;
}
