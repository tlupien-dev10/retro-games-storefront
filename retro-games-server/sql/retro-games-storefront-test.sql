drop database if exists retro_games_test;
create database retro_games_test;
use retro_games_test;

-- Create tables and relationships
create table app_user (
	app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    disabled bit not null default(0)
);

create table app_role (
	app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
	app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
		primary key (app_user_id, app_role_id),
	constraint fk_app_user_role_user_id
		foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_role_role_id
		foreign key (app_role_id)
        references app_role(app_role_id)
);

create table listing (
	listing_id int primary key auto_increment,
    listing_name varchar(75) not null,
    listing_description varchar(300) not null,
    image_path varchar(1000) not null,
    listing_type varchar(50) not null,
    quantity int not null,
    price numeric(8, 2),
    deleted bit not null default(0)
);

create table merchandise (
	merchandise_id int primary key auto_increment,
    merchandise_category varchar(100) not null,
    listing_id int not null,
    deleted bit not null default(0),
    constraint fk_merchandise_listing_id
		foreign key (listing_id)
        references listing(listing_id)
);

create table game (
	game_id int primary key auto_increment,
    genre varchar(50) not null,
    publisher varchar(50) not null,
    release_date date not null,
    listing_id int not null,
    deleted bit not null default(0),
    constraint fk_game_listing_id
		foreign key (listing_id)
        references listing(listing_id)
);

create table console (
	console_id int primary key auto_increment,
    console_version varchar(50) not null,
    company varchar(50) not null,
    console_release_date date not null,
    listing_id int not null,
    deleted bit not null default(0),
    constraint fk_console_listing_id
		foreign key (listing_id)
        references listing(listing_id)
);

create table game_console (
	game_id int not null,
    console_id int not null,
    deleted bit not null default(0),
    constraint pk_game_console
		primary key (game_id, console_id),
	constraint fk_game_console_game_id
		foreign key (game_id)
        references game(game_id),
	constraint fk_game_console_console_id
		foreign key (console_id)
        references console(console_id)
);

create table review (
	review_id int primary key auto_increment,
    review_title varchar(50),
    review_author int not null,
    review_description varchar(400),
    listing_id int not null,
    deleted bit not null default(0),
    constraint fk_review_listing_id
		foreign key (listing_id)
        references listing(listing_id),
	constraint fk_review_author
		foreign key (review_author)
        references app_user(app_user_id)
);

create table `order` (
	order_id int primary key auto_increment,
    app_user_id int not null,
    deleted bit not null default(0),
    constraint fk_order_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table order_listing (
	order_id int not null,
    listing_id int not null,
    quantity int not null,
    deleted bit not null default(0),
    constraint pk_order_listing
		primary key (order_id, listing_id),
	constraint fk_order_listing_order_id
		foreign key (order_id)
        references `order`(order_id),
	constraint fk_order_listing_listing_id
		foreign key (listing_id)
        references listing(listing_id)
);

delimiter //
create procedure set_known_good_state()
begin

	delete from order_listing;
    alter table order_listing auto_increment = 1;
    delete from `order`;
    alter table `order` auto_increment = 1;
	delete from app_user_role;
    alter table app_user_role auto_increment = 1;
	delete from review;
    alter table review auto_increment = 1;
    delete from app_user;
    alter table app_user auto_increment = 1;
    delete from app_role;
    alter table app_role auto_increment = 1;
	delete from game_console;
    alter table game_console auto_increment = 1;
    delete from game;
    alter table game auto_increment = 1;
    delete from console;
    alter table console auto_increment = 1;
    delete from merchandise;
    alter table merchandise auto_increment = 1;
    delete from listing;
    alter table listing auto_increment = 1;
    
    insert into app_role (`name`) values
	('USER'),
    ('ADMIN');
    
insert into app_user (username, password_hash, disabled) values
	('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('tyler@bencs.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('tim@lupien.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('jake@frisch.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('david@smelser.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('irina@cudo.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);
    
insert into app_user_role values 
	(1, 2),
    (2, 1),
    (3, 2),
    (4, 2),
    (5, 2),
    (6, 1),
    (7, 1);
    
insert into listing (listing_name, listing_description, image_path, listing_type, quantity, price) values 
	('Super Mario Sunshine', 'Explore Isle Delfino as Mario with F.L.U.D.D. to stop Shadow Mario and Rescue Princess Peach', './ImageTest/1.jpg', 'GAME', 14, 69.99),
    ("Luigi's Mansion", 'Luigi has just inherited a luxury mansion, but it is filled with ghosts! Now Luigi must rescue Mario from King Boo', './ImageTest/2.jpg', 'GAME', 8, 49.99),
    ('Donkey Kong 64', "Donkey Kong's friends have been kidnapped! It is up to you as DK to stop King K. Rool and maybe pick up some bananas along the way", './ImageTest/3.jpg', 'GAME', 12, 49.99),
    ('Super Mario 64', "Bowser has hidden Princess Peach somewhere in her castle and it is up to you in Mario's first 3-D game to jump through painting and collect stars to save her!", './ImageTest/4.jpg', 'GAME', 4, 89.99),
    ('GoldenEye 007', "When a powerful satellite falls into the wrong hands, it is up to you as James Bond to stop 006 from destroying the world!", './ImageTest/5.jpg', 'GAME', 23, 49.99),
    ('Nintendo 64', "The successor to the Super NES, this system revolutionized gaming with it's amazing 3-D capabilities", './ImageTest/6.jpg', 'CONSOLE', 14, 149.99),
    ('Super Nintendo Entertainment System', 'The successor to the NES, this system introduced advanced graphics compared to other systems at the time. The most popular games it supports are Super Mario World, Super Metroid, Donkey Kong Country, and more!', './ImageTest/6.jpg', 'CONSOLE', 5, 114.99),
    ('Sega Genesis', 'The Console that helped start the console War in 1991 in the U.S. and Europe. This system can play classics such as Sonic the Hedgehog and Mortal Kombat', './ImageTest/8.jpg', 'CONSOLE', 1, 79.99),
    ('PlayStation', 'Created as as CD-ROM peripheral for the Super NES, this system has many premier franchises including Crash Bandicoot, Tomb Raider, and Final Fantasy', './ImageTest/9.jpg', 'CONSOLE', 26, 149.99),
    ('GameCube', "Known for it's extensive library of high-quality games, this system had tons of exclusive features for cross system play and exclusive content", './ImageTest/10.jpg', 'CONSOLE', 19, 99.99),
    ('GameCube Controller', 'Controller for the GameCube with extra joysticks and satisfaction guaranteed', './ImageTest/11.jpg', 'MERCHANDISE', 5, 19.99),
    ('Nintendo 64 Controller', 'A controller known for causing burns to your palm, we have updated the joystick to prevent this', './ImageTest/12.jpg', 'MERCHANDISE', 25, 45.99),
    ('Mario Lamp', 'Cool bedside table lamp that shuts off if it overheats', './ImageTest/1.jpg', 'MERCHANDISE', 13, 29.99);
    
insert into merchandise (merchandise_category, listing_id) values
	('Controller', 11),
    ('Controller', 12),
    ('Decoration', 13);
    
insert into game (genre, publisher, release_date, listing_id) values
	('Platformer', 'Nintendo', '2002-07-19', 1),
    ('Puzzle-Adventure', 'Nintendo', '2001-09-14', 2),
    ('Platformer', 'Nintendo', '1999-11-22', 3),
    ('Platformer', 'Nintendo', '1996-06-23', 4),
    ('First-Person Shooter', 'Nintendo', '1997-08-23', 5);
    
insert into console (console_version, company, console_release_date, listing_id) values
	('3rd Generation', 'Nintendo', '1996-06-23', 6),
	('2nd Generation', 'Nintendo', '1990-11-21', 7),
    ('3rd Generation', 'Sega', '1988-10-29', 8),
    ('1st Generation', 'Sony', '1994-12-03', 9),
    ('4th Generation', 'Nintendo', '2001-09-14', 10);
    
insert into game_console (game_id, console_id) values 
	(1, 1),
    (2, 1),
    (3, 2),
    (4, 2),
    (5, 2);
    
insert into review (review_title, review_author, review_description, listing_id) values
	('Best Game Ever!', 3, 'Without a doubt, the best game I have ever played in my life. Highly Reccommend!', 1),
    ('Critics love it and so do I!', 3, 'Game was super fun, the Fludd mechanics are so unique!', 1),
    ('So spooky!', 3, 'So cool that Luigi finally got his own game, and it is an instant classic!', 2),
    ('A blast', 5, 'As a kid this game is a 10/10', 3),
    ('Revolutionary', 2, 'This game forever changed gaming and is a must-play for all classic video game lovers!', 4),
    ('Incredible', 2, 'One of the original first-person shooters, tons of action', 5),
    ('3-D is amazing', 3, 'I remember playing these at McDonalds all the time. So fun!', 6),
    ('Beautiful graphics', 1, 'Duck Hunt was my favorite game.', 7),
    ('Just ok', 2, 'I think the Dreamcast was better', 8),
    ('Started it all', 1, 'Had a few of my favorite classics like Crash Bandicoot', 9),
    ('Arguably the best system', 3, "A system so good that Nintendo went out of it's way to give it backwards compatibility", 10),
    ('Solid Controller', 1, 'Arrived quickly and lasted a long time', 11),
    ('Burned me!', 2, 'This controller burned my skin when I was spinning the joystick to win a Mario Party mini game!', 12),
    ('Mesmerizing', 1, 'Super fun lamp for the kids', 13);

insert into `order` (app_user_id) values (1), (1), (2), (3);

insert into order_listing (order_id, listing_id) values
	(1, 6, 2),
    (1, 12, 1),
    (2, 13, 1),
    (3, 1, 1),
    (3, 2, 2),
    (3, 10, 1),
    (3, 11, 1);
    
    
end //
delimiter ;