CREATE TABLE Plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    days INT NULL
);

CREATE TABLE Payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    collectorId VARCHAR(255) NULL,
    paymentId VARCHAR(255) NULL,
    status VARCHAR(255) NOT NULL,
    externalReference VARCHAR(255) NULL,
    paymentType VARCHAR(255) NULL,
    processingMode VARCHAR(255) NULL,
    merchantAccountId VARCHAR(255) NULL,
    confirmedDatePayment DATETIME NULL,
    planId INT NOT NULL,
    FOREIGN KEY (planId) REFERENCES Plan(id)
);

CREATE TABLE Person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    customUrl VARCHAR(255),
    urlValidateUntil DATETIME NULL,
    situation  BOOLEAN,
    paymentId INT,
    FOREIGN KEY (paymentId) REFERENCES Payment(id)
);

CREATE TABLE Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url TEXT NOT NULL,
    personId INT,
    FOREIGN KEY (personId) REFERENCES Person(id) ON DELETE CASCADE
);

CREATE TABLE Message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phrase TEXT NOT NULL,
    personId INT,
    FOREIGN KEY (personId) REFERENCES Person(id) ON DELETE CASCADE
);

INSERT INTO Plan (name, description, price, days)
VALUES
('Carinho',  'Contém: 3 fotos, 1 frase, 2 dias de acesso', 9.99, 2),
('Encanto',  'Contém: 6 fotos, 3 frase, 7 dias de acesso, música', 19.99, 7);

INSERT INTO Payment (
    collectorId, paymentId, status, externalReference, 
    paymentType, processingMode, 
    merchantAccountId, confirmedDatePayment, planId
) VALUES
(NULL, NULL, 'approved', NULL, NULL, NULL, NULL, '2025-02-11 16:33:29', 1),
(NULL, NULL, 'approved', NULL, NULL, NULL, NULL, '2025-02-11 16:33:29', 2);



INSERT INTO Person (name, email, customUrl, urlValidateUntil, situation, paymentId) 
VALUES 
('João Silva', 'joao@email.com', '/1/joao-personalizado', '2025-02-11 16:33:29',  1, 1),
('Alexsander Kafka', 'alex@gmail.com', '/2/alex-kafka', '2025-02-11 16:33:29', 1, 2);

INSERT INTO Images (url, personId) 
VALUES 
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24011GyiI1D6_xbEATy8zAaeeyVEFjz_AoRJijE_3yaQehZAWH9RieK%2Ffile-1738759124358-802563116?alt=media&token=01fdf679-35f4-45dd-a10a-96d96cebcc0c', 1),
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24011GyiI1D6_xbEATy8zAaeeyVEFjz_AoRJijE_3yaQehZAWH9RieK%2Ffile-1738759124358-982111270?alt=media&token=83d61df9-a273-45f7-811d-fabf5a23892b', 1),
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24011GyiI1D6_xbEATy8zAaeeyVEFjz_AoRJijE_3yaQehZAWH9RieK%2Ffile-1738759124359-556622710?alt=media&token=50f2184e-f25e-42c9-a3e0-4dafbd0c4cd5', 1),
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24.2pRWF9brMCc31boOBgM6uCT6IOjm08mSUcw3TaAnvQHEQffhxXUS%2FMimou%20logo.png?alt=media&token=3ef8d348-6823-42a0-8320-541c988062ce', 2),
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24.2pRWF9brMCc31boOBgM6uCT6IOjm08mSUcw3TaAnvQHEQffhxXUS%2FGift.png?alt=media&token=fb532380-76b7-4f0d-8d31-4d454fd979a4', 2),
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24.2pRWF9brMCc31boOBgM6uCT6IOjm08mSUcw3TaAnvQHEQffhxXUS%2Fbrooke-cagle-kvKSL7B6eTo-unsplash.jpg?alt=media&token=cf9c2cf7-fde8-40c9-86cc-a1e2d345eac4', 2),
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24.2pRWF9brMCc31boOBgM6uCT6IOjm08mSUcw3TaAnvQHEQffhxXUS%2Ffile-1738757118650-420524538?alt=media&token=ed12f8e2-24ac-4065-b529-879860740924', 2),
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24.2pRWF9brMCc31boOBgM6uCT6IOjm08mSUcw3TaAnvQHEQffhxXUS%2Ffile-1738757118651-486366628?alt=media&token=0f588051-0b5d-413b-a2c7-2fe9aa4c247a', 2),
('https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/upload%2F%242b%2410%24.2pRWF9brMCc31boOBgM6uCT6IOjm08mSUcw3TaAnvQHEQffhxXUS%2Ffile-1738757118651-925211178?alt=media&token=9347e67f-4db4-4980-a6f1-f6ceae86bd79', 2);

INSERT INTO Message(phrase, personId)
VALUES
('Que seu dia seja repleto de sorrisos, alegrias e momentos inesquecíveis. Feliz aniversário!', 1),
('Hoje é o seu dia! Que a felicidade e o amor te acompanhem por todo o ano. Parabéns!', 1),
('Que cada vela acesa no seu bolo traga um desejo realizado. Feliz aniversário!', 1),
('Que a vida continue te proporcionando momentos maravilhosos, assim como este dia especial. Parabéns!', 2),
('Hoje celebramos o seu aniversário, mas todos os dias são uma oportunidade de comemorar sua existência. Felicidades!', 2),
('Feliz aniversário! Que este novo ciclo seja tão incrível quanto você é!', 2),
('Que a alegria e o amor invadam seu coração neste dia tão especial. Parabéns por mais um ano de vida!', 2),
('Que todos os seus sonhos se realizem e que o amor sempre esteja ao seu redor. Feliz aniversário!', 2),
('A cada novo ano, você se torna ainda mais incrível. Que este aniversário seja o começo de um capítulo maravilhoso em sua vida!', 2);


DELIMITER //

CREATE PROCEDURE update_person_situation()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_personId INT;
    DECLARE v_urlValidateUntil DATE;
    
    -- Cursor para percorrer todas as linhas de Person
    DECLARE cur CURSOR FOR 
    SELECT id, urlValidateUntil FROM Person;
    
    -- Handler para controle do fim do cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_personId, v_urlValidateUntil;
        
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Se urlValidateUntil for menor que a data atual, atualiza situation para FALSE
        IF v_urlValidateUntil < CURRENT_DATE THEN
            UPDATE Person 
            SET situation = FALSE 
            WHERE id = v_personId;
        END IF;
    END LOOP;
    
    CLOSE cur;
END;
//

DELIMITER ;


DELIMITER //

CREATE EVENT update_person_situation_event
    ON SCHEDULE EVERY 3 HOUR
DO
BEGIN
    CALL update_person_situation();
END;
//

DELIMITER ;

DROP EVENT IF EXISTS meu_evento;
