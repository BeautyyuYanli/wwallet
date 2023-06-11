USE d1;
INSERT INTO Records (account_id, value, datetime, category, comment)
VALUES ((SELECT id FROM Accounts WHERE name = 'cash'), -235, DATE_SUB(NOW(), INTERVAL 2 DAY), 'Household', 'Anything');
INSERT INTO Records (account_id, value, datetime, category, comment)
VALUES ((SELECT id FROM Accounts WHERE name = 'cash'), -236, DATE_SUB(NOW(), INTERVAL 2 DAY), 'Household', 'Anything');
INSERT INTO Records (account_id, value, datetime, category, comment)
VALUES ((SELECT id FROM Accounts WHERE name = 'cash'), -237, DATE_SUB(NOW(), INTERVAL 2 DAY), 'Household', 'Anything');