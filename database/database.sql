-- ================================
-- TOUR MANAGEMENT DATABASE SCHEMA
-- ================================
-- MySQL/MariaDB compatible schema with AUTO_INCREMENT IDs

-- ================================
-- CORE TABLES
-- ================================

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    url_avatar VARCHAR(500),
    phone VARCHAR(20),
    street VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    role VARCHAR(50) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    province VARCHAR(100),
    city VARCHAR(100),
    address TEXT,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category_tours (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    location_id INTEGER NOT NULL,
    total_tours INTEGER DEFAULT 0,
    total_hotels INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE tours (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    category_tour_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    days INTEGER NOT NULL,
    nights INTEGER NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    created_by INTEGER,
    total_bookings INTEGER DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    avg_rating DECIMAL(3,2),
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_tour_id) REFERENCES category_tours(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE hotels (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_tour_id INTEGER NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_tour_id) REFERENCES category_tours(id) ON DELETE CASCADE
);

-- ================================
-- STAFF MANAGEMENT TABLES
-- ================================

CREATE TABLE tour_managers (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(100),
    hire_date TIMESTAMP NOT NULL,
    salary DECIMAL(12,2),
    total_guides_managed INTEGER DEFAULT 0,
    total_tours_managed INTEGER DEFAULT 0,
    department_revenue DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tour_guides (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    managed_by INTEGER NOT NULL,
    hire_date TIMESTAMP NOT NULL,
    salary DECIMAL(12,2),
    experience INTEGER,
    certifications JSON,
    languages JSON,
    specialties JSON,
    working_areas JSON,
    avg_rating DECIMAL(3,2) DEFAULT 0,
    completed_tours INTEGER DEFAULT 0,
    cancelled_tours INTEGER DEFAULT 0,
    total_tours_guided INTEGER DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (managed_by) REFERENCES tour_managers(id) ON DELETE CASCADE
);

-- ================================
-- SCHEDULE AND ASSIGNMENT TABLES
-- ================================

CREATE TABLE tour_schedules (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tour_id INTEGER NOT NULL,
    hotel_id INTEGER NOT NULL,
    tour_manager_id INTEGER NOT NULL,
    primary_guide_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    available_slots INTEGER NOT NULL,
    final_price DECIMAL(10,2) NOT NULL,
    registration_open_date DATE NOT NULL,
    registration_close_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_manager_id) REFERENCES tour_managers(id) ON DELETE CASCADE,
    FOREIGN KEY (primary_guide_id) REFERENCES tour_guides(id) ON DELETE CASCADE
);

CREATE TABLE guide_assignments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tour_schedule_id INTEGER NOT NULL,
    guide_id INTEGER NOT NULL,
    assigned_by INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_schedule_id) REFERENCES tour_schedules(id) ON DELETE CASCADE,
    FOREIGN KEY (guide_id) REFERENCES tour_guides(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES tour_managers(id) ON DELETE CASCADE
);

CREATE TABLE guide_evaluations (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tour_schedule_id INTEGER NOT NULL,
    guide_id INTEGER NOT NULL,
    evaluator_id INTEGER NOT NULL,
    communication_rating INTEGER,
    professionalism_rating INTEGER,
    punctuality_rating INTEGER,
    overall_rating DECIMAL(3,2),
    feedback TEXT,
    completed_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_schedule_id) REFERENCES tour_schedules(id) ON DELETE CASCADE,
    FOREIGN KEY (guide_id) REFERENCES tour_guides(id) ON DELETE CASCADE,
    FOREIGN KEY (evaluator_id) REFERENCES tour_managers(id) ON DELETE CASCADE
);

-- ================================
-- BOOKING AND PAYMENT TABLES
-- ================================

CREATE TABLE bookings (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(50) UNIQUE,
    user_id INTEGER NOT NULL,
    tour_schedule_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    num_people INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_schedule_id) REFERENCES tour_schedules(id) ON DELETE CASCADE
);

CREATE TABLE payments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- ================================
-- CONTENT AND MEDIA TABLES
-- ================================

CREATE TABLE tour_images (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tour_id INTEGER NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

CREATE TABLE hotel_images (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

CREATE TABLE tour_itineraries (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tour_id INTEGER NOT NULL,
    day INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    activities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    UNIQUE KEY unique_tour_day (tour_id, day)
);

-- ================================
-- USER INTERACTION TABLES
-- ================================

CREATE TABLE reviews (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    tour_id INTEGER NOT NULL,
    booking_id INTEGER,
    rating INTEGER NOT NULL,
    comment TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

CREATE TABLE favorites (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    tour_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_tour_favorite (user_id, tour_id)
);

CREATE TABLE user_completed_tours (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    tour_id INTEGER NOT NULL,
    booking_id INTEGER NOT NULL,
    booking_code VARCHAR(50),
    completed_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_completed_tour (user_id, tour_id, booking_id)
);

CREATE TABLE user_notifications (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    booking_id INTEGER,
    tour_title VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

-- ================================
-- STATISTICS TABLES
-- ================================

CREATE TABLE user_stats (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    completed_tours INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0,
    total_bookings INTEGER DEFAULT 0,
    total_spent DECIMAL(15,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_stats (user_id)
);

-- ================================
-- INDEXES FOR PERFORMANCE
-- ================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_tours_category ON tours(category_tour_id);
CREATE INDEX idx_tours_rating ON tours(avg_rating);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_tour_schedules_date ON tour_schedules(start_date, end_date);
CREATE INDEX idx_reviews_tour ON reviews(tour_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);


-- ================================
-- SAMPLE DATA INSERTS
-- ================================

-- Insert Admin (độc lập)
INSERT INTO admins (email, name, username, password, created_at) VALUES
('admin@gmail.com', 'Admin', 'A', 'A', NOW());

-- Insert Users (customers + staff có thể cũng là users)
INSERT INTO users (name, email, username, password, url_avatar, phone, street, city, country, role, created_at) VALUES
('Nam', 'nppnam05@gmail.com', NULL, NULL, 'https:', '+84901234567', '123 Nguyen Hue', 'Ho Chi Minh', 'Việt Nam', 'customer', NOW()),
('Jon', 'jon@tourmanager.com', 'Jon', '1', NULL, '+84909876543', NULL, NULL, 'Vietnam', 'tour_manager', NOW()),
('guide1', 'guide1@tourguide.com', 'G1', '2', NULL, '+84907654321', NULL, NULL, 'Vietnam', 'tour_guide', NOW()),
('guide2', 'guide2@tourguide.com', 'G2', '3', NULL, '+84907654322', NULL, NULL, 'Vietnam', 'tour_guide', NOW());

-- Insert Locations
INSERT INTO locations (name, country, province, city, address, latitude, longitude, created_at) VALUES
('Biển Nha Trang', 'Vietnam', 'Khánh Hòa', 'Nha Trang', 'Trần Phú, Nha Trang', 12.2388, 109.1967, NOW());

-- Insert Category Tours
INSERT INTO category_tours (name, description, image_url, location_id, total_tours, total_hotels, created_at) VALUES
('Nha Trang Tours', 'Điểm đến bãi biển đẹp...', 'https://example.com/category-nhatrang.jpg', 1, 1, 1, NOW());

-- Insert Hotels
INSERT INTO hotels (
    name, description, category_tour_id, address, latitude, longitude, amenities, created_at
) VALUES (
    'Vinpearl Resort Nha Trang',
    'Khu nghỉ dưỡng sang trọng bên bờ biển...',
    1,
    'Đảo Hòn Tre, Nha Trang',
    12.1833,
    109.2167,
    JSON_ARRAY('Hồ bơi', 'WiFi', 'Bữa ăn sáng', 'Lối vào bãi biển'),
    NOW()
);


-- Insert Tours
INSERT INTO tours (category_tour_id, title, description, days, nights, base_price, created_by, total_bookings, total_revenue, avg_rating, total_reviews, created_at) VALUES
(1, 'Thiên đường biển Nha Trang 4N3D', 'Trải nghiệm những điều tuyệt vời nhất của Nha Trang...', 4, 3, 299.99, 2, 25, 7499.75, 4.70, 18, NOW());

-- Insert Tour Managers (phải có user_id)
INSERT INTO tour_managers (user_id, employee_id, name, email, phone, department, hire_date, salary, total_guides_managed, total_tours_managed, department_revenue, created_at) VALUES
(2, 'TM1', 'Jon', 'jon@tourmanager.com', '+84909876543', 'Khu vực miền Nam', '2025-08-24 00:00:00', 20000000.00, 2, 1, 599.98, '2025-08-24 00:00:00');

-- Insert Tour Guides (phải có user_id)
INSERT INTO tour_guides (user_id, employee_id, name, email, phone, managed_by, hire_date, salary, experience, certifications, languages, specialties, working_areas, avg_rating, completed_tours, cancelled_tours, total_tours_guided, total_revenue, total_reviews, created_at) VALUES
(3, 'TG1', 'guide1', 'guide1@tourguide.com', '+84907654321', 1, '2025-08-24 00:00:00', 12000000.00, 3, JSON_ARRAY('Hướng dẫn viên du lịch được cấp phép'), JSON_ARRAY('Vietnamese', 'English'), JSON_ARRAY('Chuyến tham quan bãi biển'), JSON_ARRAY('Nha Trang', 'Vũng Tàu'), 4.70, 1, 0, 1, 599.98, 1, '2025-08-24 00:00:00'),
(4, 'TG2', 'guide2', 'guide2@tourguide.com', '+84907654322', 1, '2025-08-24 00:00:00', 12000000.00, 2, JSON_ARRAY('Hướng dẫn viên du lịch được cấp phép'), JSON_ARRAY('Vietnamese', 'English'), JSON_ARRAY('Chuyến tham quan bãi biển'), JSON_ARRAY('Nha Trang'), 0.00, 0, 0, 0, 0.00, 0, NOW());

-- Insert Tour Schedules
INSERT INTO tour_schedules (tour_id, hotel_id, tour_manager_id, primary_guide_id, status, start_date, end_date, available_slots, final_price, registration_open_date, registration_close_date, created_at) VALUES
(1, 1, 1, 1, 'confirmed', '2024-03-15', '2024-03-18', 20, 299.99, '2024-01-01', '2024-03-10', NOW());

-- Insert Guide Assignments
INSERT INTO guide_assignments (tour_schedule_id, guide_id, assigned_by, status, notes, created_at) VALUES
(1, 1, 1, 'confirmed', 'Hướng dẫn viên có kinh nghiệm với các nhóm người Việt Nam', '2025-08-24 00:00:00');

-- Insert Guide Evaluations
INSERT INTO guide_evaluations (tour_schedule_id, guide_id, evaluator_id, communication_rating, professionalism_rating, punctuality_rating, overall_rating, feedback, completed_date, created_at) VALUES
(1, 1, 1, 4, 5, 5, 4.70, 'Hiệu suất tuyệt vời', '2025-08-24', '2025-08-24 00:00:00');

-- Insert Bookings
INSERT INTO bookings (booking_code, user_id, tour_schedule_id, status, num_people, total_price, contact_name, contact_email, contact_phone, created_at) VALUES
('NT20241', 1, 1, 'confirmed', 2, 599.98, 'Nam', 'nppnam05@gmail.com', '+84901234567', NOW()),
('NT20251', 1, 1, 'completed', 2, 599.98, 'Nam', 'nppnam05@gmail.com', '+84901234567', '2025-08-24 00:00:00');

-- Insert Payments
INSERT INTO payments (booking_id, amount, payment_method, status, transaction_id, created_at) VALUES
(1, 599.98, 'vnpay', 'completed', 'vnpay_123456789', NOW()),
(2, 599.98, 'vnpay', 'completed', 'vnpay_123456790', '2025-08-24 00:00:00');

-- Insert Tour Images
INSERT INTO tour_images (tour_id, image_url, is_primary, created_at) VALUES
(1, 'https://example.com/tour1-primary.jpg', TRUE, NOW()),
(1, 'https://example.com/tour1-secondary.jpg', FALSE, NOW());

-- Insert Hotel Images
INSERT INTO hotel_images (hotel_id, image_url, is_primary, created_at) VALUES
(1, 'https://example.com/hotel1-primary.jpg', TRUE, NOW()),
(1, 'https://example.com/hotel1-secondary.jpg', FALSE, NOW());

-- Insert Tour Itineraries
INSERT INTO tour_itineraries (tour_id, day, title, description, activities, created_at) VALUES
(1, 1, 'Đến nơi & tắm biển', 'Nhận phòng khách sạn, tự do tắm biển và nghỉ ngơi', 
    JSON_ARRAY(
        JSON_OBJECT('time','14:00','activity','Nhận phòng khách sạn','location','Vinpearl Resort'),
        JSON_OBJECT('time','16:00','activity','Thư giãn tại bãi biển','location','Bãi biển Trần Phú'),
        JSON_OBJECT('time','19:00','activity','Ăn tối và khám phá chợ đêm','location','Chợ đêm Nha Trang')
    ), NOW()),

(1, 2, 'Khám phá vịnh Nha Trang', 'Tham quan đảo, lặn ngắm san hô, vui chơi biển',
    JSON_ARRAY(
        JSON_OBJECT('time','08:00','activity','Khởi hành tour 3 đảo','location','Cảng Cầu Đá'),
        JSON_OBJECT('time','10:00','activity','Lặn biển ngắm san hô','location','Hòn Mun'),
        JSON_OBJECT('time','12:00','activity','Ăn trưa hải sản','location','Hòn Một'),
        JSON_OBJECT('time','15:00','activity','Vui chơi giải trí trên biển','location','Hòn Tằm'),
        JSON_OBJECT('time','18:30','activity','Ăn tối và nghỉ ngơi','location','Vinpearl Resort')
    ), NOW()),

(1, 3, 'Văn hóa & Thư giãn', 'Tham quan danh lam thắng cảnh, trải nghiệm spa',
    JSON_ARRAY(
        JSON_OBJECT('time','09:00','activity','Tham quan Tháp Bà Ponagar','location','Tháp Bà Ponagar'),
        JSON_OBJECT('time','11:00','activity','Tắm bùn khoáng nóng','location','I-Resort Nha Trang'),
        JSON_OBJECT('time','14:00','activity','Mua sắm quà lưu niệm','location','Chợ Đầm'),
        JSON_OBJECT('time','19:00','activity','Gala Dinner bên bờ biển','location','Nhà hàng hải sản')
    ), NOW()),

(1, 4, 'Tạm biệt Nha Trang', 'Tự do nghỉ ngơi, chuẩn bị hành lý và trả phòng',
    JSON_ARRAY(
        JSON_OBJECT('time','07:00','activity','Ăn sáng buffet tại khách sạn','location','Vinpearl Resort'),
        JSON_OBJECT('time','09:00','activity','Tự do tham quan, tắm biển','location','Khuôn viên resort'),
        JSON_OBJECT('time','11:00','activity','Trả phòng khách sạn','location','Vinpearl Resort')
    ), NOW());

-- Insert Reviews
INSERT INTO reviews (user_id, tour_id, booking_id, rating, comment, helpful_count, created_at) VALUES
(1, 1, 2, 5, 'Lần đầu đi, trải nghiệm tuyệt vời!', 12, '2025-08-24 00:00:00');

-- Insert Favorites
INSERT INTO favorites (user_id, tour_id, created_at) VALUES
(1, 1, '2025-08-24 00:00:00');

-- Insert User Completed Tours
INSERT INTO user_completed_tours (user_id, tour_id, booking_id, booking_code, completed_at, created_at) VALUES
(1, 1, 2, 'NT20251', '2025-08-24 00:00:00', '2025-08-24 00:00:00');

-- Insert User Notifications
INSERT INTO user_notifications (user_id, type, title, message, booking_id, tour_title, is_read, created_at) VALUES
(1, 'booking_confirmed', 'Đã xác nhận đặt chỗ', 'Đặt tour của bạn đã được xác nhận', 1, 'Thiên đường biển Nha Trang 4N3D', FALSE, NOW()),
(1, 'payment_success', 'Thanh toán thành công', 'Thanh toán cho booking NT20241 đã thành công', 1, 'Thiên đường biển Nha Trang 4N3D', TRUE, NOW());

-- Insert User Stats
INSERT INTO user_stats (user_id, completed_tours, favorite_count, total_bookings, total_spent) VALUES
(1, 1, 1, 2, 1199.96);

-- ================================
-- UPDATE DENORMALIZED STATS
-- ================================

-- Update tour stats
UPDATE tours SET 
    total_bookings = (SELECT COUNT(*) FROM bookings WHERE tour_schedule_id IN (SELECT id FROM tour_schedules WHERE tour_id = tours.id)),
    total_revenue = (SELECT COALESCE(SUM(total_price), 0) FROM bookings WHERE tour_schedule_id IN (SELECT id FROM tour_schedules WHERE tour_id = tours.id)),
    avg_rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE tour_id = tours.id),
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE tour_id = tours.id);

-- Update category stats  
UPDATE category_tours SET
    total_tours = (SELECT COUNT(*) FROM tours WHERE category_tour_id = category_tours.id),
    total_hotels = (SELECT COUNT(*) FROM hotels WHERE category_tour_id = category_tours.id);

-- Update tour manager stats
UPDATE tour_managers SET
    total_guides_managed = (SELECT COUNT(*) FROM tour_guides WHERE managed_by = tour_managers.id),
    total_tours_managed = (SELECT COUNT(*) FROM tour_schedules WHERE tour_manager_id = tour_managers.id),
    department_revenue = (SELECT COALESCE(SUM(b.total_price), 0) FROM bookings b 
                         JOIN tour_schedules ts ON b.tour_schedule_id = ts.id 
                         WHERE ts.tour_manager_id = tour_managers.id);

-- Update tour guide stats
UPDATE tour_guides SET
    avg_rating = (SELECT COALESCE(AVG(overall_rating), 0) FROM guide_evaluations WHERE guide_id = tour_guides.id),
    completed_tours = (SELECT COUNT(*) FROM guide_evaluations WHERE guide_id = tour_guides.id),
    total_tours_guided = (SELECT COUNT(*) FROM guide_assignments WHERE guide_id = tour_guides.id AND status = 'confirmed'),
    total_revenue = (SELECT COALESCE(SUM(b.total_price), 0) FROM bookings b 
                    JOIN tour_schedules ts ON b.tour_schedule_id = ts.id 
                    WHERE ts.primary_guide_id = tour_guides.id),
    total_reviews = (SELECT COUNT(*) FROM guide_evaluations WHERE guide_id = tour_guides.id);

-- Update user stats
UPDATE user_stats SET
    completed_tours = (SELECT COUNT(*) FROM user_completed_tours WHERE user_id = user_stats.user_id),
    favorite_count = (SELECT COUNT(*) FROM favorites WHERE user_id = user_stats.user_id),
    total_bookings = (SELECT COUNT(*) FROM bookings WHERE user_id = user_stats.user_id),
    total_spent = (SELECT COALESCE(SUM(total_price), 0) FROM bookings WHERE user_id = user_stats.user_id);

