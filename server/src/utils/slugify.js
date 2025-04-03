module.exports.slugify = (text) => {
   return text
      .toLowerCase()
      .normalize("NFD")
      .trim()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
};
