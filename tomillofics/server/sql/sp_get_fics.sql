USE tomillofics;

DROP PROCEDURE IF EXISTS sp_get_fics;

DELIMITER $$

CREATE PROCEDURE sp_get_fics (
	IN in_option			VARCHAR(10),
	IN in_iduser			INT, 
    IN in_nfics             INT,
    IN in_npage             INT,
    IN in_idfic             INT,
    IN in_text              VARCHAR(100),
    IN in_tags              VARCHAR(100)
)
BEGIN
    IF in_option = 'user' THEN
        SELECT idfic FROM Fic
        WHERE iduser = in_iduser
        ORDER BY created DESC
        LIMIT in_nfics OFFSET in_npage;
    END IF;
    IF in_option = 'filtered' THEN
        SELECT idfic FROM Fic
        WHERE title LIKE CONCAT('%', in_text, '%')
        OR description LIKE CONCAT('%', in_text, '%')
        ORDER BY created DESC
        LIMIT in_nfics OFFSET in_npage;
    END IF;
    IF in_option = 'basic' THEN
        SELECT title, img_route FROM Fic 
        WHERE idfic = in_idfic;
    END IF;
    IF in_option = 'tagged' THEN 
        SELECT title, username, description, img_route, GROUP_CONCAT(name) AS tags
        FROM Fic
        JOIN User ON Fic.iduser = User.iduser
        JOIN FicTag ON Fic.idfic = FicTag.idfic
        JOIN Tag ON FicTag.idtag = Tag.idtag
        WHERE Fic.idfic = in_idfic;
    END IF;
    IF in_option = 'complete' THEN
        SELECT 
        Fic.title, 
        Fic.iduser, 
        User.username, 
        Fic.description, 
        Fic.img_route,
        GROUP_CONCAT(Tag.name) AS tags,
        COUNT(Favorites.iduser) AS nfavs,
        COUNT(Comment.idcomment) AS ncomments,
        COUNT(Views.iduser) AS nviews,
        MAX(CASE WHEN Favorites.iduser = in_iduser THEN 1 ELSE 0 END) AS saved
        FROM Fic
        JOIN User ON Fic.iduser = User.iduser
        LEFT JOIN FicTag ON Fic.idfic = FicTag.idfic
        LEFT JOIN Tag ON FicTag.idtag = Tag.idtag
        LEFT JOIN Favorites ON Fic.idfic = Favorites.idfic
        LEFT JOIN Comment ON Fic.idfic = Comment.idfic
        LEFT JOIN Views ON Fic.idfic = Views.idfic
        WHERE Fic.idfic = in_idfic
        ;
    END IF;
    IF in_option = 'save' THEN
        IF EXISTS (SELECT * FROM Favorites WHERE iduser = in_iduser AND idfic = in_idfic) THEN
            DELETE FROM Favorites WHERE iduser = in_iduser AND idfic = in_idfic;
        ELSE
            INSERT INTO Favorites (iduser, idfic) VALUES (in_iduser, in_idfic);
        END IF;
    END IF;
END$$

DELIMITER ;
