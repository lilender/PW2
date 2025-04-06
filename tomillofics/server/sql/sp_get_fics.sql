USE tomillofics;

DROP PROCEDURE IF EXISTS sp_get_fics;

DELIMITER $$

CREATE PROCEDURE sp_update_fics (
	IN in_option			VARCHAR(10),
	IN in_iduser			INT, 
    IN in_nfics             INT,
    IN in_npage             INT,
)
BEGIN
    IF in_option = 'user' THEN
        SELECT idfic FROM Fic
        WHERE iduser = in_iduser
        ORDER BY created DESC
        LIMIT in_nfics OFFSET in_npage;
    END IF;

END$$

DELIMITER ;
