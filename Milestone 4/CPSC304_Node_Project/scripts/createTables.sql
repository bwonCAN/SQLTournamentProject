CREATE TABLE CountryRegion(
    country VARCHAR(90) PRIMARY KEY,
    region VARCHAR(32) NOT NULL
);

INSERT INTO CountryRegion(country, region)
VALUES ('England', 'Europe');

INSERT INTO CountryRegion(country, region)
VALUES ('Korea', 'Asia');

INSERT INTO CountryRegion(country, region)
VALUES ('France', 'Europe');

INSERT INTO CountryRegion(country, region)
VALUES ('Germany', 'Europe');

INSERT INTO CountryRegion(country, region)
VALUES ('Canada', 'North America');

INSERT INTO CountryRegion(country, region)
VALUES ('USA', 'North America');

INSERT INTO CountryRegion(country, region)
VALUES ('Trisolaris', 'Alpha Centauri');


CREATE TABLE Player(
    playerName VARCHAR(32) PRIMARY KEY,
    email VARCHAR(320) NOT NULL UNIQUE,
    passwordHash VARCHAR(64) NOT NULL,
    country VARCHAR(90),
    wins INT DEFAULT 0 NOT NULL, 
    losses INT DEFAULT 0 NOT NULL, 
    points INT DEFAULT 0 NOT NULL, 
    elo INT DEFAULT 1500 NOT NULL,
    FOREIGN KEY (country)
        REFERENCES CountryRegion(country)
        ON DELETE SET NULL
);


INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
VALUES ('Harry Potter', 'roonilwazlib@hogwarts.edu', '12345', 'England', 42, 42, 3742, 1579);

INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
VALUES ('Ronald Weasley', 'lavenderxoxo@hogwarts.edu', '12345', 'England', 97, 0, 6978, 3197);

INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
VALUES ('Hermione Granger', 'hermionegranger@hogwarts.edu', '12345', 'England', 37, 55, 2555, 1442);

INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
VALUES ('Neville Longbottom', 'mimbulusmimbletonia@hogwarts.edu', '12345', 'England', 65, 34, 4323, 1978);

INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
VALUES ('Severus Snape', 'thehalfbloodprince@hogwarts.edu', '12345', 'England', 75, 17, 5946, 2678);

INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
VALUES ('Magnus Carlsen', 'mc@norwegianemail.com', '12345', NULL, 1000, 0, 9001, 9001);

-- Using password hashes
-- INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
-- VALUES ('Harry Potter', 'roonilwazlib@hogwarts.edu', '401357cf18542b4117ca59800657b64cce2a36d8ad4c56b6102a1e0b03049e97', 'England', 42, 42, 3742, 1579);

-- INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
-- VALUES ('Ronald Weasley', 'lavenderxoxo@hogwarts.edu', '5986b6102a1e0b03049e9700657b64cce2a36d8ad4c5401357cf18542b4117ca', 'England', 97, 0, 6978, 3197);

-- INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
-- VALUES ('Hermione Granger', 'hermionegranger@hogwarts.edu', 'a59800657b64cce2a36d8a401357cf18542b4117cd4c56b63049e97102a1e0b0', 'England', 37, 55, 2555, 1442);

-- INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
-- VALUES ('Neville Longbottom', 'mimbulusmimbletonia@hogwarts.edu', 'f18542b41401357c17ca5a1e0b03049e979800657b64cce2a36d8ad4c56b6102', 'England', 65, 34, 4323, 1978);

-- INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
-- VALUES ('Severus Snape', 'thehalfbloodprince@hogwarts.edu', 'ca59856b6102a1e0b03049e9700657b64cce2a36d8ad4401357cf18542b4117c', 'England', 75, 17, 5946, 2678);

-- INSERT INTO Player(playerName, email, passwordHash, country, wins, losses, points, elo)
-- VALUES ('Magnus Carlsen', 'mc@norwegianemail.com', 'b03049e9700657b64cce2a36856b6102a1e04117cd8ad4401357cf18542bca59', NULL, 1000, 0, 9001, 9001);


CREATE TABLE ComputerPlayer(
    playerName VARCHAR(32) PRIMARY KEY,
    email VARCHAR(320),
    passwordHash CHAR(64),
    country VARCHAR(90),
    wins INT DEFAULT 0 NOT NULL, 
    losses INT DEFAULT 0 NOT NULL, 
    points INT DEFAULT 0 NOT NULL, 
    elo INT DEFAULT 1500 NOT NULL,
    algorithmID INT NOT NULL,
    FOREIGN KEY (country)
        REFERENCES CountryRegion(country)
        ON DELETE SET NULL
);

INSERT INTO ComputerPlayer(playerName, email, passwordHash, country, wins, losses, points, elo, algorithmID)
VALUES ('Sophon', 'katana@threebody.net', '2b4117ca598006401357cf185457b64cce2a36d8ad4c52a1e0b03049e976b610', 'Trisolaris', 3, 0, 30, 1619, 3001);

INSERT INTO ComputerPlayer(playerName, email, passwordHash, country, wins, losses, points, elo, algorithmID)
VALUES ('Hal 9000', '2001@aspaceodyssey.com', '2b4117ca598006401357cf185457b64cce2a36d8ad4c52a1e0b03049e976b610', 'England', 12, 1, 10, 1515, 9000);

INSERT INTO ComputerPlayer(playerName, email, passwordHash, country, wins, losses, points, elo, algorithmID)
VALUES ('Skynet', 'capitalism@thepentagon.com', '2b4117ca598006401357cf185457b64cce2a36d8ad4c52a1e0b03049e976b610', 'USA', 0, 99, 0, 50, 4733);

INSERT INTO ComputerPlayer(playerName, email, passwordHash, country, wins, losses, points, elo, algorithmID)
VALUES ('Rock Solid', NULL, NULL, NULL, 3, 9, 10, 1515, 0);

INSERT INTO ComputerPlayer(playerName, email, passwordHash, country, wins, losses, points, elo, algorithmID)
VALUES ('Paper Thin', NULL, NULL, NULL, 3, 9, 10, 1515, 1);

INSERT INTO ComputerPlayer(playerName, email, passwordHash, country, wins, losses, points, elo, algorithmID)
VALUES ('Snip Snip', NULL, NULL, NULL, 3, 9, 10, 1515, 2);


CREATE TABLE Match(
    matchID CHAR(8) PRIMARY KEY, 
    dateTime DATE NOT NULL
);

INSERT INTO Match(matchID, dateTime)
VALUES ('DjUfi8H7', TO_DATE('1995-02-13 11:42:37', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO Match(matchID, dateTime)
VALUES ('J8Kff3Ia', TO_DATE('1995-02-18 12:31:23', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO Match(matchID, dateTime)
VALUES ('I8HNDb6A', TO_DATE('1995-01-03 09:12:12', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO Match(matchID, dateTime)
VALUES ('Ji9Ohb6F', TO_DATE('1995-01-23 18:24:23', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO Match(matchID, dateTime)
VALUES ('8Ju7j7ad', TO_DATE('1995-01-13 17:12:43', 'YYYY-MM-DD HH24:MI:SS'));


CREATE TABLE PlayersPlayInMatch(
    playerName1 VARCHAR(32) NOT NULL, 
    playerName2 VARCHAR(32), 
    matchID CHAR(8) PRIMARY KEY, 
    result INT NOT NULL,
    FOREIGN KEY (playerName1)
        REFERENCES Player(playerName)
        ON DELETE SET NULL,
    FOREIGN KEY (playerName2)
        REFERENCES Player(playerName)
        ON DELETE SET NULL,
    FOREIGN KEY (matchID)
        REFERENCES Match(matchID)
        ON DELETE CASCADE
);

INSERT INTO PlayersPlayInMatch(playerName1, playerName2, matchID, result)
VALUES ('Ronald Weasley', 'Harry Potter', 'DjUfi8H7', 1);

INSERT INTO PlayersPlayInMatch(playerName1, playerName2, matchID, result)
VALUES ('Harry Potter', 'Ronald Weasley', 'J8Kff3Ia', 2);

INSERT INTO PlayersPlayInMatch(playerName1, playerName2, matchID, result)
VALUES ('Ronald Weasley', 'Hermione Granger', 'I8HNDb6A', 1);

INSERT INTO PlayersPlayInMatch(playerName1, playerName2, matchID, result)
VALUES ('Ronald Weasley', 'Severus Snape', 'Ji9Ohb6F', 1);

INSERT INTO PlayersPlayInMatch(playerName1, playerName2, matchID, result)
VALUES ('Harry Potter', 'Severus Snape', '8Ju7j7ad', 2);

