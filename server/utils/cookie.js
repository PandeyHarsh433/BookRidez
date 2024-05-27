const setAuthCookie = (res, userId, role, token) => {
  res.cookie("userId", userId, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.cookie("loggedIn", true, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "None",
  });

  res.cookie("role", role, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "None",
  });
};

module.exports = setAuthCookie;
