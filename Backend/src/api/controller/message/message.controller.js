const message = (req, res) => {
  try {
    res.send("this is message route");
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

export { message };
