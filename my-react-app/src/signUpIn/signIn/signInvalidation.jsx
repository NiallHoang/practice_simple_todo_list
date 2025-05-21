
function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //follow pattern: ljdsf@piup.lkjlk
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/; //follow pattern: contains at least 1 digit, 1 lowercase, 1 uppercase, minimum length of 8 characters, only contains alphanumeric character.

  if (values.email === "") {
    error.email = "Name should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Didn't match";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password didn't match";
  } else {
    error.password = "";
  }

  return error;
}
export default Validation;