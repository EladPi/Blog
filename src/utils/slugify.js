export function slugify(text) {
  return text
    .toString()          // Convert to string
    .toLowerCase()       // Convert the string to lowercase letters
    .trim()              // Remove whitespaces from the start and end
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
