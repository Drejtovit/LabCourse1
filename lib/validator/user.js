export function validateUserData(data) {
  const {
    name,
    email,
    password,
    confirmPassword,
    role,
    phoneNumber,
    zip,
    city,
    state,
    ...userRelation
  } = data;

  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+[0-9]{6,15}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const cityRegex = /^[a-zA-Z\s-]{2,}$/;
  const stateRegex = /^[a-zA-Z\s-]{2,}$/;
  const zipRegex = /^[a-zA-Z0-9\s-]{3,20}$/;
  const emailTrimmed = email?.trim();
  let birthDate, description, websiteUrl;

  if (
    !name ||
    !emailTrimmed ||
    !password ||
    !confirmPassword ||
    !role ||
    !phoneNumber ||
    !zip ||
    !city ||
    !state ||
    (role === "candidate" ? !userRelation.birthDate : !userRelation.description)
  ) {
    errors.all = "Please fill in all fields.";
    return errors;
  }

  if (!emailRegex.test(emailTrimmed)) {
    errors.email = "Invalid email format.";
    return errors;
  }

  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    return errors;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
    return errors;
  }

  if (role !== "candidate" && role !== "employer") {
    errors.role = "Role must be either 'candidate' or 'employer'.";
    return errors;
  }

  if (!phoneRegex.test(phoneNumber)) {
    errors.phoneNumber =
      "Invalid phone number format. It should start with '+' followed by 6 to 15 digits.";
    return errors;
  }

  if (!cityRegex.test(city)) {
    errors.city = "Invalid city format.";
    return errors;
  }

  if (!stateRegex.test(state)) {
    errors.state = "Invalid state format.";
    return errors;
  }

  if (!zipRegex.test(zip)) {
    errors.zip = "Invalid zip format.";
    return errors;
  }

  if (role === "candidate") {
    ({ birthDate } = userRelation);

    const today = new Date();
    const birthday = new Date(birthDate);

    if (isNaN(Date.parse(birthDate))) {
      errors.birthDate = "Invalid birth date.";
    } else if (birthday > today) {
      errors.birthDate = "Birth date cannot be in the future.";
    } else if (today.getFullYear() - birthday.getFullYear() < 18) {
      errors.birthDate = "You must be at least 18 years old."; // make this check if the user had their birthday this year or not
    }
  } else {
    ({ description, websiteUrl } = userRelation);

    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;

    if (description.length < 10) {
      errors.description = "Description must be at least 10 characters long.";
      return errors;
    }
    if (websiteUrl && !urlRegex.test(websiteUrl)) {
      errors.websiteUrl = "Invalid website URL format.";
      return errors;
    }
  }

  return errors;
}
