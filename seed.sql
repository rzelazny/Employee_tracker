use company_db;

INSERT INTO department (dept_name)
VALUES ("Human Resources"), ("Engineering"),("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 90000, 1), ("HR Analyst", 45000, 1),("Team Lead", 95000, 2), 
("Developer", 75000, 2), ("Legal Counsel", 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alice", "Alison", 1, null), ("John", "Johnson", 2, 1),("Steve", "Stately", 3, null),
("Mike", "Michaelson", 4, 3),("Stan", "Smith", 5, null);