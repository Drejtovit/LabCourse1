export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatSalary(salary) {
  if (typeof salary !== "number") return null;
  return salary.toLocaleString("en-US");
}
