export const home = async (req, res) => {
  try {
    res.send("Hello");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", err: err.message });
  }
};
