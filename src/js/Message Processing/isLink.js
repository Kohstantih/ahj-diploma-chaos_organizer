export default function isLink(value) {
  if (/^[h][t][t][p][s]?[:][/][/]/.test(value)) {
    return true;
  }
  return false;
}
