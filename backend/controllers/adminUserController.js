const User = require("../models/user");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};


// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting admin
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin user cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      userId: id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};


// Block / Unblock user
exports.toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be blocked",
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};