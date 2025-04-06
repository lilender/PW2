USE tomillofics;

DROP PROCEDURE IF EXISTS sp_update_chapters;

DELIMITER $$

CREATE PROCEDURE sp_update_chapters (
	IN in_option			VARCHAR(10),
    IN in_title             VARCHAR(50),
    IN in_text              TEXT,
    IN in_idfic             INT,
    IN in_idchapter         INT
)
BEGIN
    IF in_option = 'create' THEN
        INSERT INTO Chapter (idfic, idchapter, title, text) 
        VALUES (in_idfic, in_idchapter, in_title, in_text);
    END IF;

END$$

DELIMITER ;
