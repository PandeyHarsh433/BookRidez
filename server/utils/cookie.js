const setAuthCookie = (res, userId, role, token) => {
  res.cookie("userId", userId, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    domain: process.env.DOMAIN_URL,
    sameSite: "None",
  });

  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    domain: process.env.DOMAIN_URL,
    sameSite: "None",
  });

  res.cookie("loggedIn", true, {
    secure: true,
    httpOnly: true,
    domain: process.env.DOMAIN_URL,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: "None",
  });

  res.cookie("role", role, {
    secure: true,
    httpOnly: true,
    domain: process.env.DOMAIN_URL,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: "None",
  });
};

module.exports = setAuthCookie;
