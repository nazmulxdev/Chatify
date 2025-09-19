const signUp = async (req, res) => {
  try {
    res.send("signup endpoint");
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
const login = async (req, res) => {
  try {
    res.send("login endpoint");
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
const logout = async (req, res) => {
  try {
    res.send("logout endpoint");
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

export { signUp, login, logout };
