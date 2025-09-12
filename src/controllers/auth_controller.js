require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
    loginUser: async (req, res) => {
        const user = await User.findByEmail(req.params.email);

        if (!user) return res.status(404).json({ message: "User not found" });


        // Tạo token chứa user info
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: 'customer',
                name: user.name
            },
            process.env.JWT_SECRET,  // Secret key để sign
            { expiresIn: '7d' }      // Token expire sau 7 ngày
        );

        //trả về cho client
        res.status(200).json({
            success: true,
            token: token,  // Client sẽ lưu cái này
            user: { id: user.id, email: user.email, name: user.name }
        });
    }
};

module.exports = authController;