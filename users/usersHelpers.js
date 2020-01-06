module.exports = validateUser;

function validateUser(user) {
  const errors = [];

  if (!user.username || user.username.length < 2) {
    errors.push("Please provide a valid username.");
  }

  if (!user.password || user.password.length < 2) {
    errors.push("Please provide a valid password.");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
}
