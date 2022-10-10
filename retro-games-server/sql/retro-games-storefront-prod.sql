drop database if exists retro_games;
create database retro_games;
use retro_games;

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
    price numeric(8, 2)
);

create table merchandise (
	merchandise_id int primary key auto_increment,
    merchandise_category varchar(100) not null,
    listing_id int not null,
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
    constraint fk_console_listing_id
		foreign key (listing_id)
        references listing(listing_id)
);

create table game_console (
	game_id int not null,
    console_id int not null,
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
    review_description varchar(200),
    listing_id int not null,
    constraint fk_review_listing_id
		foreign key (listing_id)
        references listing(listing_id)
);

create table `order` (
	order_id int primary key auto_increment,
    total numeric(8, 2),
    app_user_id int not null,
    constraint fk_order_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table order_listing (
	order_id int not null,
    listing_id int not null,
    constraint pk_order_listing
		primary key (order_id, listing_id),
	constraint fk_order_listing_order_id
		foreign key (order_id)
        references `order`(order_id),
	constraint fk_order_listing_listing_id
		foreign key (listing_id)
        references listing(listing_id)
);

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
	('Super Mario Sunshine', 'Explore Isle Delfino as Mario with F.L.U.D.D. to stop Shadow Mario and Rescue Princess Peach', 'imagepath', 'GAME', 14, 69.99),
    ("Luigi's Mansion", 'Luigi has just inherited a luxury mansion, but it is filled with ghosts! Now Luigi must rescue Mario from King Boo', 'imagepath', 'GAME', 8, 49.99),
    ('Donkey Kong 64', "Donkey Kong's friends have been kidnapped! It is up to you as DK to stop King K. Rool and maybe pick up some bananas along the way", 'imagepath', 'GAME', 12, 49.99),
    ('Super Mario 64', "Bowser has hidden Princess Peach somewhere in her castle and it is up to you in Mario's first 3-D game to jump through painting and collect stars to save her!", 'imagepath', 'GAME', 4, 89.99),
    ('GoldenEye 007', "When a powerful satellite falls into the wrong hands, it is up to you as James Bond to 006 from destroying the world!", 'imagepath', 'GAME', 23, 49.99),
    ('Nintendo 64', "The successor to the Super NES, this system revolutionized gaming with it's amazing 3-D capabilities", 'imagepath', 'CONSOLE', 14, 149.99),
    ('Super Nintendo Entertainment System', 'The successor to the NES, this system introduced advanced graphics compared to other systems at the time. The most popular games it supports are Super Mario World, Super Metroid, Donkey Kong Country, and more!', 'imagepath', 'CONSOLE', 5, 114.99),
    ('Sega Genesis', 'The Console that helped start the console War in 1991 in the U.S. and Europe. This system can play classics such as Sonic the Hedgehog and Mortal Kombat', 'imagepath', 'CONSOLE', 1, 79.99),
    ('PlayStation', 'Created as as CD-ROM peripheral for the Super NES, this system has many premier franchises including Crash Bandicoot, Tomb Raider, and Final Fantasy', 'imagepath', 'CONSOLE', 26, 149.99),
    ('GameCube', "Known for it's extensive library of high-quality games, this system had tons of exclusive features for cross system play and exclusive content", 'imagepath', 'CONSOLE', 19, 99.99),
    ('GameCube Controller', 'Controller for the GameCube with extra joysticks and satisfaction guaranteed', 'imagepath', 'MERCHANDISE', 5, 19.99);
    
insert into merchandise values
	('Controller', 11);
    
insert game values
	('Platformer', 'Nintendo', '2002/07/19', 1);
    
    
    
    
    
    

    



        
