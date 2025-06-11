import User from "../models/user.js";
import Address from "../models/address.js";

export const getUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.json(user);
  }
  return res.status(404).json({ message: "User not found" });
};

export const editProfile = async (req, res) => {
  try {
    const { givenName, familyName, address, phone, email, dateOfBirth } =
      req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (givenName !== undefined) user.givenName = givenName;
    if (familyName !== undefined) user.familyName = familyName;
    if (phone !== undefined) user.phone = phone;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;

    // address là mảng
    if (Array.isArray(address)) {
      for (const addr of address) {
        if (addr && addr.street && addr.city) {
          if (addr._id) {
            // Địa chỉ cũ -> cập nhật
            await Address.findByIdAndUpdate(addr._id, addr, { new: true });

            // Nếu user.address chưa chứa địa chỉ này thì thêm vào
            if (!user.address.includes(addr._id)) {
              user.address.push(addr._id);
            }
          } else {
            // Địa chỉ mới -> tạo mới và gắn userId
            const newAddress = new Address({
              ...addr,
              userId: user._id,
            });
            await newAddress.save();
            user.address.push(newAddress._id);
          }
        }
      }
    }

    await user.save();
    await user.populate("address");

    return res.json({
      status: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("editProfile error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
