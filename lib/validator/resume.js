export function validateResumeData(data) {
  const errors = {};
  const yearsRegex = /^(19|20)\d{2}$/;
  const { profession, age, educations, experiences, skills } = data;

  if (!profession) {
    errors.general = "Please fill in all required fields.";
  }

  if (profession.trim().length < 5) {
    errors.profession = "Profession must be at least 5 characters long.";
  }
  if (age && age < 18) {
    errors.age = "Age must be at least 18.";
  }
  if (
    educations.some((education) => {
      const degree = education.degree.trim().toLowerCase();
      const isHighSchool = degree === "high school";
      return (
        !education.degree ||
        (!isHighSchool && !education.fieldOfStudy) ||
        !education.school ||
        !yearsRegex.test(education.startDate) ||
        (education.endDate && !yearsRegex.test(education.endDate))
      );
    })
  ) {
    errors.educations =
      "Please fill in all required fields with valid info for each education.";
  }

  if (
    experiences.length !== 0 &&
    experiences.some((experience) => {
      return (
        !experience.companyName ||
        !experience.professionTitle ||
        !yearsRegex.test(experience.startDate) ||
        (experience.endDate && !yearsRegex.test(experience.endDate))
      );
    })
  ) {
    errors.experiences =
      "Please fill in all required fields with valid info for each experience.";
  }

  if (skills.some((skill) => !skill.skillName || !skill.proficiency)) {
    errors.skills =
      "Please fill in all required fields with valid info for each skill.";
  }

  return errors;
}
