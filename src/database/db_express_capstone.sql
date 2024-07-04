CREATE DATABASE db_express_capstone;
USE db_express_capstone;


CREATE TABLE nguoi_dung (
    nguoi_dung_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(50) NOT NULL,
    tuoi INT NOT NULL,
    anh_dai_dien VARCHAR(100),
    pass_encrypted BOOLEAN NOT NULL DEFAULT FALSE,
    refresh_token text,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE hinh_anh (
    hinh_id INT AUTO_INCREMENT PRIMARY KEY,
    ten_hinh VARCHAR(100) NOT NULL,
    duong_dan VARCHAR(255) NOT NULL,
    mo_ta VARCHAR(255) NOT NULL,
    nguoi_dung_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE
);

CREATE TABLE binh_luan (
    binh_luan_id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT NOT NULL,
    hinh_id INT NOT NULL,
    ngay_binh_luan DATETIME,
    noi_dung VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE
);


CREATE TABLE luu_anh (
    nguoi_dung_id INT NOT NULL,
    hinh_id INT NOT NULL,
    ngay_luu DATETIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (nguoi_dung_id, hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE
);

INSERT INTO nguoi_dung (email, mat_khau, ho_ten, tuoi, anh_dai_dien) VALUES
('user1@gmail.com', '1234', 'User 1', 25, 'avatar1.jpg'),
('user2@gmail.com', '1234', 'User 2', 30, 'avatar2.jpg'),
('user3@gmail.com', '1234', 'User 3', 22, 'avatar3.jpg'),
('user4@gmail.com', '1234', 'User 4', 28, 'avatar4.jpg'),
('user5@gmail.com', '1234', 'User 5', 35, 'avatar5.jpg'),
('user6@gmail.com', '1234', 'User 6', 27, 'avatar6.jpg'),
('user7@gmail.com', '1234', 'User 7', 32, 'avatar7.jpg'),
('user8@gmail.com', '1234', 'User 8', 29, 'avatar8.jpg'),
('user9@gmail.com', '1234', 'User 9', 31, 'avatar9.jpg'),
('user10@gmail.com', '1234', 'User 10', 26, 'avatar10.jpg');


INSERT INTO hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id) VALUES
('Transparency Demonstration', 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png', 'Transparency Demonstration', 1),
('Forest', 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600', 'Forest', 1),
('Camera', 'https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg?auto=compress&cs=tinysrgb&w=600', 'Camera', 2),
('Forest snow', 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=600', 'Forest snow', 2),
('River', 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600', 'River', 3),
('Snow city', 'https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg?auto=compress&cs=tinysrgb&w=600', 'Snow city', 3),
('Mountain snow', 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600', 'Mountain snow', 4),
('Sea', 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600', 'Sea', 4),
('Beach', 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=600', 'Beach', 5),
('Boat', 'https://images.pexels.com/photos/1482193/pexels-photo-1482193.jpeg?auto=compress&cs=tinysrgb&w=600', 'Boat', 5),
('Jellyfish', 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=600', 'Jellyfish', 6),
('Mountain during night', 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600', 'Scenic View Of Snow Capped Mountains During Night', 6),
('Snow mountain', 'https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&w=600', 'Snow Covered Mountain', 7),
('Tree', 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=600', 'Green Grass Near Tree', 7),
('Gray mountain', 'https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg?auto=compress&cs=tinysrgb&w=600', 'Person Showing Gray Mountain', 8),
('Hanging bridge', 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600', 'First Perspective Photography of Hanging Bridge
', 8),
('Forest', 'https://images.pexels.com/photos/1161375/pexels-photo-1161375.jpeg?auto=compress&cs=tinysrgb&w=600', 'Highway in the Middle of Forest Covered in Fog', 9),
('Bridge', 'https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=600', 'Concrete Bridge over Clear Blue River Beside Mountain', 9),
('Black Concrete Tunnel', 'https://images.pexels.com/photos/228095/pexels-photo-228095.jpeg?auto=compress&cs=tinysrgb&w=600', 'Black Concrete Tunnel', 10),
('Brown Mountain', 'https://images.pexels.com/photos/1731041/pexels-photo-1731041.jpeg?auto=compress&cs=tinysrgb&w=600', 'Brown Mountain', 10);


INSERT INTO binh_luan (nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung) VALUES
(1, 5, '2024-06-23', 'The colors in this picture are amazing! So vibrant and captivating'),
(2, 2, '2024-06-23', 'This angle is really unique, it creates such an interesting perspective'),
(3, 3, '2024-06-23', 'This image truly makes me feel relaxed. The scenery is very peaceful.'),
(4, 4, '2024-06-23', 'The scene in this photo looks good, straight out of a fairy tale!'),
(5, 5, '2024-06-23', 'The details in this picture are captured so well, I can see every line clearly'),
(6, 6, '2024-06-23', 'The lighting in this image is perfect, it really highlights the beauty of the scene'),
(7, 17, '2024-06-23', 'I love how this picture creates a sense of depth and space'),
(8, 8, '2024-06-23', 'This photo reminds me of some beautiful memories'),
(9, 9, '2024-06-23', "I'm impressed by the balance and harmony in the composition of this picture"),
(7, 7, '2024-06-23', 'This image gives off a warm and familiar feeling, very comforting');



INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu) VALUES
(1, 7, '2024-06-03'),
(2, 4, '2024-06-04'),
(3, 1, '2024-06-05'),
(4, 6, '2024-06-06'),
(5, 2, '2024-06-07'),
(6, 5, '2024-06-08'),
(7, 3, '2024-06-09');

