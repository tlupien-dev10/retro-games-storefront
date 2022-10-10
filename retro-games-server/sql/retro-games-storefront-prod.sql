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
    quantity int not null 
);

create table merchandise (
	merchandise_id int primary key auto_increment,
    merchandise_name varchar(100),
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
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);
    
insert into app_user_role values 
	(1, 2),
    (2, 1);
    



        
