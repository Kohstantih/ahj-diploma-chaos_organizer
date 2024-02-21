export default function validationLengthMessage(string, length) {
  const lengthMax = length || 15;
  if (string.length < lengthMax) {
    return string;
  }
  const result = `${string.slice(0, lengthMax - 3)}...`;
  return result;
}
