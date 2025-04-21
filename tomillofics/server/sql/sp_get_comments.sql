USE tomillofics;

DROP PROCEDURE IF EXISTS sp_get_comments;

DELIMITER $$

CREATE PROCEDURE sp_get_comments (
    IN in_idfic         INT,
    IN in_idchapter     INT,
    IN in_ncomments     INT,
    IN in_npage         INT
)
BEGIN
    SELECT User.iduser, username, profile_image, idcomment, text
    FROM Comment
    JOIN User ON Comment.iduser = User.iduser
    WHERE idfic = in_idfic AND idchapter = in_idchapter
    ORDER BY Comment.created ASC
    LIMIT in_ncomments OFFSET in_npage;
END$$

DELIMITER ;
