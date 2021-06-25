export const onlyInteger = (event) => {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode);
  if (/\+|-/.test(keyValue)) {
    event.preventDefault();
  }
  if (
    [46, 8, 9, 27, 13, 110, 190, 189, 173].indexOf(event.keyCode) !== -1 ||
    // Allow: Ctrl+A
    (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
    // Allow: Ctrl+C
    (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
    // Allow: Ctrl+V
    (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
    // Allow: Ctrl+X
    (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
    // Allow: home, end, left, right
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    // let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (
    (event.shiftKey || event.keyCode < 48 || event.keyCode > 57) &&
    (event.keyCode < 96 || event.keyCode > 105)
  ) {
    event.preventDefault();
  }
};

export const validateMobileNumber = (event) => {
  const keyCode = event.keyCode || event.which;
  console.log(keyCode);
  const keyValue = String.fromCharCode(keyCode);
  if (/\+|-/.test(keyValue)) {
    event.preventDefault();
  }
  if (
    [32, 46, 8, 9, 27, 13, 109, 110, 190, 187, 189, 173].indexOf(
      event.keyCode
    ) !== -1 ||
    // Allow: Ctrl+A
    (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
    (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
    (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
    (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    // let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (
    (event.shiftKey || event.keyCode < 48 || event.keyCode > 57) &&
    (event.keyCode < 96 || event.keyCode > 105)
  ) {
    event.preventDefault();
  }
};
