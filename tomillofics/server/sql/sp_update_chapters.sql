USE tomillofics;

DROP PROCEDURE IF EXISTS sp_update_chapters;

DELIMITER $$

CREATE PROCEDURE sp_update_chapters (
	IN in_option			VARCHAR(10),
    IN in_title             VARCHAR(50),
    IN in_text              TEXT,
    IN in_idfic             INT,
    IN in_idchapter         INT,
    IN in_previdchapter     INT
)
BEGIN
    IF in_option = 'create' THEN
        INSERT INTO Chapter (idfic, idchapter, title, text) 
        VALUES (in_idfic, in_idchapter, in_title, in_text);
    END IF;
    /*
    for example, if the id is 2 but the prev id is 3,
    i need to update all the comments to have the id 2
    and the chapter to have the id 2 as well
    */
    IF in_option = 'update' THEN
        IF(in_idchapter != in_previdchapter) THEN
            DELETE FROM Comment
            WHERE idfic = in_idfic AND idchapter = in_idchapter;

            DELETE FROM Chapter
            WHERE idfic = in_idfic AND idchapter = in_idchapter;

            UPDATE Chapter
            SET idchapter = in_idchapter,
            title = in_title,
            text = in_text
            WHERE idfic = in_idfic AND idchapter = in_previdchapter;

            UPDATE Comment
            SET idchapter = in_idchapter
            WHERE idfic = in_idfic AND idchapter = in_previdchapter;
        ELSE
            UPDATE Chapter
            SET title = in_title,
            text = in_text
            WHERE idfic = in_idfic AND idchapter = in_idchapter;
        END IF;
    END IF;
    IF in_option = 'delete' THEN
        DELETE FROM Comment
        WHERE idfic = in_idfic AND idchapter > in_idchapter;
        
        DELETE FROM Chapter
        WHERE idfic = in_idfic AND idchapter > in_idchapter;
    END IF;

END$$

DELIMITER ;
