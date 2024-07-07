import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized!" });
  }

  // if token exists then verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid" });
    }

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user) {
      console.log("Verify user called, user is authenticated");
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      // console.log("User is an admin:", req.user);
      next();
    } else {
      // console.log("User is not an admin:", req.user);
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }
  });
};
