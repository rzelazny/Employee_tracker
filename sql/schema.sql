drop database if exists company_db;
create database company_db;

use company_db;

create table department(
    id int auto_increment not null,
    dept_name varchar(30),
    primary key (id)
);

create table role (
    id int auto_increment not null,
    title varchar(30),
    salary decimal (10,2),
    department_id int,
    primary key (id),
    foreign key (department_id) references department(id) on delete cascade
);

create table employee (
    id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int,
    manager_id int,
    primary key (id),
    foreign key (role_id) references role(id) on delete cascade,
    foreign key (manager_id) references employee(id) on delete cascade
);