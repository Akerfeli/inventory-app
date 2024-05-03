export const validateSignInSignUp = (email, password, setErrors, isSignUp) => {
  const errors = {};

  // Validate email
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid.";
  }

  // Validate password
  if (!password) {
    errors.password = "Password is required.";
  } else if (isSignUp && password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  // Set errors
  setErrors(errors);

  // Return true if there are no errors, false otherwise
  return Object.keys(errors).length === 0;
};
