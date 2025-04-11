USE tomillofics;

DROP PROCEDURE IF EXISTS sp_update_users;

DELIMITER $$

CREATE PROCEDURE sp_update_users (
	IN in_option			VARCHAR(10),
	IN in_username			VARCHAR(25), 
    IN in_password          CHAR(64),
    IN in_email             VARCHAR(254),
    IN in_profile_image     MEDIUMTEXT,
    IN in_mode_pref         BOOLEAN,
	IN in_iduser		    INT
)
BEGIN
    DECLARE pass CHAR(64);
    IF in_option = 'info' THEN
        SELECT User.iduser, username, email, profile_image, COUNT(Fic.idfic) AS written_fics, COUNT(Favorites.idfic) AS saved_fics, mode_pref, User.created 
        FROM User 
        LEFT JOIN Fic ON User.iduser = Fic.iduser
        LEFT JOIN Favorites ON User.iduser = Favorites.iduser
        WHERE User.iduser = in_iduser;
    END IF;
    IF in_option = 'public' THEN
        SELECT User.iduser, username, profile_image, COUNT(Fic.idfic) AS written_fics, User.created 
        FROM User
        LEFT JOIN Fic ON User.iduser = Fic.iduser
        LEFT JOIN Favorites ON User.iduser = Favorites.iduser
        WHERE User.iduser = in_iduser;
    END IF;
    IF in_option = 'login' THEN
        SET pass = (SELECT password FROM User WHERE BINARY username = in_username);

        IF pass IS NOT NULL THEN
            IF pass = SHA2(in_password, 256) THEN
                SELECT iduser, username, profile_image, mode_pref FROM User WHERE BINARY username = in_username;
            ELSE
                SELECT 'ER_WRONG_PASS' AS error;
            END IF;
        ELSE
            SELECT 'ER_NOT_FOUND' AS error;
        END IF;
    END IF;
    IF in_option = 'create' THEN
        INSERT INTO User (username, email, password, mode_pref) 
        VALUES (in_username, in_email, SHA2(in_password, 256), in_mode_pref);
    END IF;
    IF in_option = 'update' THEN
        UPDATE User
        SET
            username = COALESCE(in_username, username),
            email = COALESCE(in_email, email),
            profile_image = COALESCE(in_profile_image, profile_image),
            mode_pref = COALESCE(in_mode_pref, mode_pref)
        WHERE iduser = in_iduser; 
    END IF;
    IF in_option = 'update_pass' THEN
        UPDATE User
        SET password = SHA2(in_password, 256)
        WHERE iduser = in_iduser; 
    END IF;

END$$

DELIMITER ;
