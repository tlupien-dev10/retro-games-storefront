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

create table game (
	game_id int primary key auto_increment,
    genre varchar(50) not null,
    publisher varchar(50) not null,
    release_date date not null,
    constraint fk_game_listing_id
		foreign key (listing_id)
        references listing(listing_id)
);

        
