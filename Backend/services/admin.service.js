import Admin from "../models/admin.model.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gymImages, trainerImages, subsciptionPrices, location } = req.body;

    if (!firstName || !lastName || !email || !password || !gymImages || !trainerImages || !subsciptionPrices || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await Admin.hashPassword(password);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gymImages,
      trainerImages,
      subsciptionPrices,
      location
    });

    const savedAdmin = await newAdmin.save();

    return res.status(201).json({ message: "Admin registered", admin: savedAdmin });

  } catch (err) {
    console.error("🔥 Registration error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};







