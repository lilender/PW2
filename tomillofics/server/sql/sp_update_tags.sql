USE tomillofics;

DROP PROCEDURE IF EXISTS sp_update_tags;

DELIMITER $$

CREATE PROCEDURE sp_update_tags (
	IN in_option			VARCHAR(10),
	IN in_idtag			    INT, 
    IN in_name              CHAR(45),
    IN in_idfic             INT,
    IN in_ntags             INT
)
BEGIN
    IF in_option = 'user' THEN
        SELECT idtag, name FROM Tag 
        WHERE erasable = 1 
        AND name LIKE CONCAT('%', in_name, '%') 
        LIMIT in_ntags;
    END IF;
    IF in_option = 'static' THEN
        SELECT idtag, name FROM Tag 
        WHERE erasable = 0 ;
    END IF;
    IF in_option = 'create' THEN
        INSERT INTO Tag (name, erasable) 
        VALUES (in_name, 1);
        SELECT idtag FROM Tag 
        WHERE name = in_name;
    END IF;
    IF in_option = 'tagfic' THEN
        INSERT INTO FicTag (idtag, idfic) 
        VALUES (in_idtag, in_idfic);
    END IF;
    

END$$

DELIMITER ;
