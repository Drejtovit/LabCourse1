export function formatDate(date, includeTime = true) {
  return new Date(date).toLocaleDateString("en-US", {
    hour: includeTime ? "2-digit" : undefined,
    minute: includeTime ? "2-digit" : undefined,
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatSalary(salary) {
  if (typeof salary !== "number") return null;
  return salary.toLocaleString("en-US");
}

export function addItem(list, setList, emptyItem) {
  setList([...list, emptyItem]);
}

export function updateItem(list, setList, index, e) {
  const { name, value } = e.target;
  const updated = list.map((item, i) =>
    i === index ? { ...item, [name]: value } : item
  );
  setList(updated);
}

export function removeItem(list, setList, index) {
  setList(list.filter((_, i) => i !== index));
}

export function handleInputChange({ list, setList, index, e }) {
  const { name, value } = e.target;
  //Maybe make it only setList and e

  if (list && index !== undefined) {
    setList(
      list.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  } else if (setList) {
    setList((prev) => ({ ...prev, [name]: value }));
  }
}
