USE tomillofics;

DROP PROCEDURE IF EXISTS sp_get_chapters;

DELIMITER $$

CREATE PROCEDURE sp_get_chapters (
	IN in_option			VARCHAR(10),
    IN in_idfic             INT,
    IN in_idchapter         INT
)
BEGIN
    IF in_option = "chapters" THEN
        SELECT idchapter, title, created
        FROM Chapter
        WHERE idfic = in_idfic;
    END IF;
    IF in_option = "text" THEN
        SELECT idchapter, title, text
        FROM Chapter
        WHERE idfic = in_idfic AND idchapter = in_idchapter;
    END IF;
END$$

DELIMITER ;
