USE tomillofics;

DROP PROCEDURE IF EXISTS sp_update_fics;

DELIMITER $$

CREATE PROCEDURE sp_update_fics (
	IN in_option			VARCHAR(10),
	IN in_iduser			INT, 
    IN in_title             VARCHAR(50),
    IN in_description       VARCHAR(254),
    IN in_img_route         VARCHAR(254),
    IN completed            BOOLEAN,
    IN in_idfic             INT
)
BEGIN
    IF in_option = 'create' THEN
        INSERT INTO Fic (iduser, title, description, img_route, completed) 
        VALUES (in_iduser, in_title, in_description, in_img_route, completed);
        SELECT LAST_INSERT_ID() AS idfic;
    END IF;
    IF in_option = 'update' THEN
        UPDATE Fic 
        SET title = in_title, 
        description = in_description, 
        img_route = IF(in_img_route IS NULL, img_route, in_img_route),
        completed = completed
        WHERE idfic = in_idfic;
    END IF;

END$$

DELIMITER ;
