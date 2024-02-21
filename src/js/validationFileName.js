export default function validationFileName(fileName, validLength) {
  if (fileName.length > validLength) {
    const arr = fileName.split('.');
    const lastIndex = arr.length - 1;

    return `${arr.filter((el) => el !== arr[lastIndex]).join('.').slice(0, validLength - 3)}... ${arr[lastIndex]}`;
  }

  return fileName;
}
