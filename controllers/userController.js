exports.allAccess = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Public Content."
  });
};

exports.userBoard = (req, res) => {
  res.status(200).json("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).json("Admin Content.");
};

exports.modBoard = (req, res) => {
  res.status(200).json("mod Content.");
};
