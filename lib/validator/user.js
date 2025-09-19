const nameRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+[0-9]{6,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const cityStateRegex = /^[a-zA-Z\s-]{2,}$/;
const zipRegex = /^[a-zA-Z0-9\s-]{3,20}$/;

export const errorMessage = {
  name: "Invalid name format. Name must be at least 2 characters long and can only contain letters and spaces.",
  email: "Invalid email format.",
  password:
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
  confirmPassword: "Passwords do not match.",
  phoneNumber:
    "Invalid phone number format. It should start with '+' followed by 6 to 15 digits.",
  city: "Invalid city format.",
  state: "Invalid state format.",
  zip: "Invalid zip format.",
  birthDate: "Invalid birth date.",
  description: "Description must be at least 10 characters long.",
  websiteUrl: "Invalid website URL format.",
  allFields: "Please fill in all fields.",
};

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
    errors.all = errorMessage.allFields;
  }

  if (!nameRegex.test(name)) {
    errors.name = errorMessage.name;
  }

  if (!emailRegex.test(emailTrimmed)) {
    errors.email = errorMessage.email;
  }

  if (!passwordRegex.test(password)) {
    errors.password = errorMessage.password;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = errorMessage.confirmPassword;
  }

  if (role !== "candidate" && role !== "employer") {
    errors.role = "Role must be either 'candidate' or 'employer'.";
  }

  if (!phoneRegex.test(phoneNumber)) {
    errors.phoneNumber = errorMessage.phoneNumber;
  }

  if (!cityStateRegex.test(city)) {
    errors.city = errorMessage.city;
  }

  if (!cityStateRegex.test(state)) {
    errors.state = errorMessage.state;
  }

  if (!zipRegex.test(zip)) {
    errors.zip = errorMessage.zip;
  }

  if (role === "candidate") {
    ({ birthDate } = userRelation);

    const today = new Date();
    const birthday = new Date(birthDate);

    if (isNaN(Date.parse(birthDate))) {
      errors.birthDate = errorMessage.birthDate;
    } else if (birthday > today) {
      errors.birthDate = "Birth date cannot be in the future.";
    } else if (today.getFullYear() - birthday.getFullYear() < 18) {
      errors.birthDate = "You must be at least 18 years old.";
    }
  } else {
    ({ description, websiteUrl } = userRelation);

    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;

    if (description.length < 10) {
      errors.description = errorMessage.description;
    }
    if (websiteUrl && !urlRegex.test(websiteUrl)) {
      errors.websiteUrl = errorMessage.websiteUrl;
    }
  }

  return errors;
}

export function validateProfileData(data) {
  const { name, email, role, phoneNumbers, zip, city, state, ...userRelation } =
    data;

  const errors = {};
  let birthDate, description, websiteUrl;

  if (
    !name ||
    !phoneNumbers ||
    !zip ||
    !city ||
    !state ||
    (role === "CANDIDATE" ? !userRelation.birthDate : !userRelation.description)
  ) {
    errors.all = errorMessage.allFields;
  }

  if (!nameRegex.test(name)) {
    errors.name = errorMessage.name;
  }

  if (!phoneNumbers.every(phone => phoneRegex.test(phone.number))) {
    errors.phoneNumber = errorMessage.phoneNumber;
  }

  if (!cityStateRegex.test(city)) {
    errors.city = errorMessage.city;
  }

  if (!cityStateRegex.test(state)) {
    errors.state = errorMessage.state;
  }

  if (!zipRegex.test(zip)) {
    errors.zip = errorMessage.zip;
  }

  if (role === "CANDIDATE") {
    ({ birthDate } = userRelation);

    const today = new Date();
    const birthday = new Date(birthDate);

    if (isNaN(Date.parse(birthDate))) {
      errors.birthDate = errorMessage.birthDate;
    } else if (birthday > today) {
      errors.birthDate = "Birth date cannot be in the future.";
    } else if (today.getFullYear() - birthday.getFullYear() < 18) {
      errors.birthDate = "You must be at least 18 years old.";
    }
  } else {
    ({ description, websiteUrl } = userRelation);

    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;

    if (description.length < 10) {
      errors.description = errorMessage.description;
    }
    if (websiteUrl && !urlRegex.test(websiteUrl)) {
      errors.websiteUrl = errorMessage.websiteUrl;
    }
  }

  return errors;
}
