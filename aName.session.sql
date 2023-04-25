CREATE TABLE user(
    userID  INT PRIMARY KEY,
    userEmail TEXT NOT NULL,
    userPassword TEXT NOT NULL
);

CREATE TABLE folder(
    userID  INT NOT NULL,
    folderID INT,
    folderName TEXT NOT NULL,
    PRIMARY KEY( userID, folderID)
    FOREIGN KEY(userID) REFERENCES user(userID)
);

CREATE TABLE definitions(
    userID  INT NOT NULL,
    folderID INT NOT NULL,
    definitionsID INT,
    definitions TEXT NOT NULL,
    PRIMARY KEY( userID, folderID, definitionsID)
    FOREIGN KEY(userID) REFERENCES user(userID)
    FOREIGN KEY(folderID) REFERENCES folder(folderID)
    
);

