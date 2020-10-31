function normalizeText(text, upperCase = true) {
  text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "");

  return upperCase ? text.toUpperCase() : text;
}

export default normalizeText;
