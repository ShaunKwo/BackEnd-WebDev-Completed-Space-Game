const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

const SQLSTATEMENT = `

DROP TABLE IF EXISTS QuestProgress;
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS Abilities;
DROP TABLE IF EXISTS Powers;
DROP TABLE IF EXISTS Quests;
DROP TABLE IF EXISTS Appearances;
DROP TABLE IF EXISTS Inventory;
DROP TABLE IF EXISTS Colonies;
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Planets;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS User;



CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT,
    appearance_id INT DEFAULT 1
   );

   CREATE TABLE Messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    reciever_id INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
   
   CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
   );
   
   CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
   );
   
CREATE TABLE Appearances (
    appearance_id INT PRIMARY KEY AUTO_INCREMENT,
    appearance_name TEXT,
    cost INT
);

CREATE TABLE Items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name TEXT,
    description TEXT
);

CREATE TABLE Planets (
    planet_id INT PRIMARY KEY AUTO_INCREMENT,
    planet_name TEXT,
    description TEXT
);


CREATE TABLE Colonies (
    user_id INT,
    colony_id INT PRIMARY KEY AUTO_INCREMENT,
    planet_id INT NOT NULL
);

CREATE TABLE Powers (
    power_id INT PRIMARY KEY AUTO_INCREMENT,
    power_level INT
);


CREATE TABLE Inventory (
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    item_id INT NOT NULL
);

CREATE TABLE Abilities (
    ability_id INT PRIMARY KEY AUTO_INCREMENT,
    planet_id TEXT,
    ability_name TEXT
);

CREATE TABLE Quests (
    quest_id INT PRIMARY KEY AUTO_INCREMENT,
    quest_name TEXT,
    item_id INT,
    planet_id INT
);

CREATE TABLE QuestProgress (
    quest_progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    quest_id INT NOT NULL,
    quest_completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quest_notes TEXT
);

INSERT INTO Appearances (appearance_name, cost) VALUES
('Civilian', 0),
('Captain', 1000),
('Scientist', 800),
('Engineer', 600);

INSERT INTO User (username, email, password) VALUES
('admin', 'a@a.com', '${hash}'),
('jack99', 'j@j.com', '${hash}');


INSERT INTO Task (title, description, points) VALUES
('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
('Commessagesing', 'Start commessagesing kitchen scraps to create natural fertilizer.', 35),
('Becoming Spaceship Captain','To be Captain sum points must be >1000 points',-1000),
('Becoming Spaceship Scientist','To be Scientist sum points must be >800 points',-800),
('Becoming Spaceship Engineer','To be Engineer sum points must be >600 points',-600);


INSERT INTO Quests (quest_name, item_id, planet_id) VALUES
('Explore the Galaxy', 2,1),
('Uncover Ancient Artifacts', 3,2 ),
('Establish Interstellar Diplomacy', 1,3);

INSERT INTO Items (item_name, description) VALUES
('Stellarium Ore', 'A rare ore found in the depths of space, known for its mesmerizing glow.'),
('Quantum Alloy', 'A futuristic metal with quantum properties, perfect for advanced technologies.'),
('Luminarite Crystal', 'A crystal infused with radiant energy, ideal for powering interstellar devices.');

INSERT INTO Inventory (user_id, item_id) VALUES
(1, 1),
(1, 2),
(2, 1);

INSERT INTO Planets (planet_name, description) VALUES
('Earth', 'The third planet from the sun and the only known celestial body to support life.'),
('Mars', 'The fourth planet from the sun, often referred to as the Red Planet.'),
('Alpha Centauri Bb', 'An exoplanet orbiting the star Alpha Centauri B.');


INSERT INTO Abilities (planet_id, ability_name) VALUES
(1, 'Earthquake Resistance'),
(2, 'Martian Soil Farming'),
(3, 'Telepathic Communication');


`;

pool.query(SQLSTATEMENT, callback);
}
});
