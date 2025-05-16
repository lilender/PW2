USE tomillofics;

DROP PROCEDURE IF EXISTS sp_get_fics;

DELIMITER $$

CREATE PROCEDURE sp_get_fics (
    IN in_option            VARCHAR(10),
    IN in_iduser            INT, 
    IN in_nfics             INT,
    IN in_npage             INT,
    IN in_idfic             INT,
    IN in_text              VARCHAR(100),
    IN in_idtags            VARCHAR(100),
    IN in_excludeidtags      VARCHAR(100),
    IN in_lastread          INT
)
BEGIN
    DECLARE count_only BOOLEAN;
    DECLARE base_query TEXT;

    IF in_option = 'edit' THEN
        SELECT f.idfic, f.title, f.description, f.img_route, f.completed
        FROM Fic f
        WHERE f.idfic = in_idfic;

        SELECT t.idtag, t.name
        FROM Tag t
        JOIN FicTag ft ON t.idtag = ft.idtag
        WHERE ft.idfic = in_idfic;

        SELECT c.idchapter, c.title, c.text
        FROM Chapter c
        WHERE c.idfic = in_idfic
        ORDER BY c.idchapter;
    END IF;
    IF in_option = 'favorite' THEN
        SELECT idfic, COUNT(idfic) AS nfavs
        FROM Favorites
        GROUP BY idfic
        ORDER BY nfavs DESC
        LIMIT 3;
    END IF;
    IF in_option = 'lastread' THEN
        SELECT idfic
        FROM Views
        WHERE iduser = in_iduser
        ORDER BY time DESC
        LIMIT 5;
    END IF;
    IF in_option = 'library' THEN
        SELECT idfic
        FROM Favorites
        WHERE iduser = in_iduser
        LIMIT in_nfics OFFSET in_npage;
    END IF;
    IF in_option = 'commented' THEN
        SELECT idfic, COUNT(idfic) AS ncomments
        FROM Comment
        GROUP BY idfic
        ORDER BY ncomments DESC
        LIMIT 15;
    END IF;
    IF in_option = 'newest' THEN
        SELECT idfic
        FROM Fic
        ORDER BY created DESC
        LIMIT 15;
    END IF;
    IF in_option = 'longest' THEN
        SELECT idfic, COUNT(idfic) AS nchapters
        FROM Chapter
        GROUP BY idfic
        ORDER BY nchapters DESC
        LIMIT 15;
    END IF;
    IF in_option = 'user' THEN
        SELECT idfic FROM Fic
        WHERE iduser = in_iduser
        ORDER BY created DESC
        LIMIT in_nfics OFFSET in_npage;
    END IF;
    IF in_option LIKE 'nfiltered%' OR in_option LIKE 'filtered%' THEN
        SET count_only = (in_option LIKE 'nfiltered%');
        
        SET base_query = CONCAT('
            SELECT ', IF(count_only, 'COUNT(*) AS nresults', 'Fic.idfic'), '
            FROM Fic
            ', IF(in_idtags != '', 'JOIN FicTag ON Fic.idfic = FicTag.idfic', ''), '
            WHERE (title LIKE CONCAT(''%'', ''', in_text, ''', ''%'')
            OR description LIKE CONCAT(''%'', ''', in_text, ''', ''%''))');
        
        IF in_option LIKE '%c' THEN
            SET base_query = CONCAT(base_query, ' AND completed = 1');
        ELSEIF in_option LIKE '%p' THEN
            SET base_query = CONCAT(base_query, ' AND completed = 0');
        END IF;
        
        IF in_idtags != '' THEN
            SET base_query = CONCAT(base_query, ' 
                AND idtag IN (SELECT idtag FROM Tag WHERE FIND_IN_SET(idtag, ''', in_idtags, '''))');
        END IF;
        
        IF in_excludeidtags != '' THEN
            SET base_query = CONCAT(base_query, ' 
                AND NOT EXISTS (
                    SELECT 1 FROM FicTag 
                    WHERE FicTag.idfic = Fic.idfic 
                    AND FicTag.idtag IN (SELECT idtag FROM Tag WHERE FIND_IN_SET(idtag, ''', in_excludeidtags, '''))
                )');
        END IF;
        
        IF in_idtags != '' THEN
            SET base_query = CONCAT(base_query, ' 
                GROUP BY ', IF(count_only, 'Fic.idfic', 'FicTag.idfic'), '
                HAVING COUNT(DISTINCT idtag) = (SELECT COUNT(*) FROM Tag WHERE FIND_IN_SET(idtag, ''', in_idtags, '''))');
        END IF;
        
        IF NOT count_only THEN
            SET base_query = CONCAT(base_query, '
                ORDER BY created DESC
                LIMIT ', in_nfics, ' OFFSET ', in_npage);
        END IF;
        
        -- Prepare and execute the dynamic SQL
        SET @sql = base_query;
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    
    END IF;
    IF in_option = 'top' THEN
        SELECT title, username, description, img_route, profile_image
        FROM Fic
        JOIN User ON Fic.iduser = User.iduser
        WHERE Fic.idfic = in_idfic;
    END IF;
    IF in_option = 'basic' THEN
        SELECT title, img_route FROM Fic 
        WHERE idfic = in_idfic;
    END IF;
    IF in_option = 'tagged' THEN 
        SELECT title, User.iduser AS iduser, username, description, img_route, GROUP_CONCAT(name) AS tags
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
            Fic.completed,
			(SELECT GROUP_CONCAT(name)
				FROM Fic
				JOIN FicTag ON Fic.idfic = FicTag.idfic
				JOIN Tag ON FicTag.idtag = Tag.idtag
				WHERE Fic.idfic = in_idfic) AS tags,
            (SELECT COUNT(Favorites.idfic)
                FROM Favorites
                JOIN Fic ON Fic.idfic = Favorites.idfic
                WHERE Fic.idfic= in_idfic) AS nfavs,
			(SELECT COUNT(Fic.idfic)
				FROM Comment
                JOIN Fic ON Fic.idfic = Comment.idfic
                WHERE Fic.idfic= in_idfic) AS ncomments,
            (SELECT COUNT(Views.iduser)
                FROM Views
                JOIN Fic ON Fic.idfic = Views.idfic
                WHERE Fic.idfic= in_idfic) AS nviews,
			MAX(CASE WHEN Favorites.iduser = in_iduser THEN 1 ELSE 0 END) AS saved
		FROM Fic
		JOIN User ON Fic.iduser = User.iduser
		LEFT JOIN Favorites ON Fic.idfic = Favorites.idfic
		LEFT JOIN Views ON Fic.idfic = Views.idfic
		WHERE Fic.idfic = in_idfic;
    END IF;
    IF in_option = 'view' THEN
        INSERT INTO Views (iduser, idfic)
        VALUES (in_iduser, in_idfic)
        ON DUPLICATE KEY UPDATE time = CURRENT_TIMESTAMP;
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