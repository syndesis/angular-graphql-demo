CREATE ROLE demo_api login password 'demo123';
CREATE ROLE demo_anonymous;
CREATE ROLE demo_user;
CREATE ROLE demo_admin;

GRANT demo_anonymous to demo_api;
GRANT demo_user to demo_api;
GRANT demo_admin to demo_api;
