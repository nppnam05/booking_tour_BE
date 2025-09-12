const jwt = require('jsonwebtoken');


const authenticateUser = (req, res, next) => {
    // Lấy token từ header
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader?.split(' ')[1];

    try {
        // Verify và decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // decoded = {
        //   userId: 456,
        //   email: 'user@gmail.com',
        //   role: 'customer',
        //   iat: 1640995200,
        //   exp: 1641600000
        // }

        // Attach user info vào request
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = authenticateUser;