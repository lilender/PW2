USE tomillofics;

DROP PROCEDURE IF EXISTS sp_update_comments;

DELIMITER $$

CREATE PROCEDURE sp_update_comments (
	IN in_option			VARCHAR(10),
    IN in_idfic            INT,
    IN in_idchapter        INT,
    IN in_iduser          INT,
    IN in_text            VARCHAR(254)
)
BEGIN
    DECLARE next_comment_id INT;
    IF in_option = 'create' THEN
        SELECT IFNULL(MAX(idcomment), 0) + 1 INTO next_comment_id
        FROM Comment
        WHERE idfic = in_idfic AND idchapter = in_idchapter;
        
        INSERT INTO Comment (idcomment, idfic, idchapter, iduser, text)
        VALUES (next_comment_id, in_idfic, in_idchapter, in_iduser, in_text);
    END IF;

END$$

DELIMITER ;
