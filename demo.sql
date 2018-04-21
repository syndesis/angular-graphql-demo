
CREATE SCHEMA IF NOT EXISTS demo;

DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'demo') LOOP
    EXECUTE 'DROP TABLE IF EXISTS demo.' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'demo_private') LOOP
    EXECUTE 'DROP TABLE IF EXISTS demo_private.' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;

BEGIN;

--------------------------------------------------------------------------------
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
GRANT USAGE ON schema demo TO demo_anonymous, demo_user, demo_admin;

--------------------------------------------------------------------------------
CREATE TABLE demo.hero (
    hero_id         serial  PRIMARY KEY,
    hero_name       text,
    secret_identity text
);
COMMENT ON TABLE demo.hero IS 'Heroes';
COMMENT ON COLUMN demo.hero.hero_name IS 'Name';
COMMENT ON COLUMN demo.hero.secret_identity IS '@deprecated Secret identity of hero should not be revealed';


INSERT INTO demo.hero (hero_name, secret_identity) VALUES ('Mr. Nice', 'Clark Kent');
INSERT INTO demo.hero (hero_name) VALUES ('Narco');
INSERT INTO demo.hero (hero_name) VALUES ('Bombasto');
INSERT INTO demo.hero (hero_name) VALUES ('Celeritas');
INSERT INTO demo.hero (hero_name) VALUES ('Magneta');
INSERT INTO demo.hero (hero_name) VALUES ('RubberMan');
INSERT INTO demo.hero (hero_name) VALUES ('Dynama');
INSERT INTO demo.hero (hero_name) VALUES ('Dr. IQ');
INSERT INTO demo.hero (hero_name) VALUES ('Magma');
INSERT INTO demo.hero (hero_name) VALUES ('Tornado');

--------------------------------------------------------------------------------
CREATE TABLE demo.power (
    power_id    serial  PRIMARY KEY,
    power_name  text    UNIQUE NOT NULL
);
COMMENT ON TABLE demo.power IS 'Powers';
COMMENT ON COLUMN demo.power.power_name IS 'Name of power';
GRANT USAGE, SELECT, UPDATE ON SEQUENCE demo.power_power_id_seq TO demo_user;

INSERT INTO demo.power (power_name) VALUES ('Telekinesis');
INSERT INTO demo.power (power_name) VALUES ('Laser Vision');
INSERT INTO demo.power (power_name) VALUES ('Invisibility');
INSERT INTO demo.power (power_name) VALUES ('Invulnerability');
INSERT INTO demo.power (power_name) VALUES ('Sonic Scream');
INSERT INTO demo.power (power_name) VALUES ('Super Strength');
INSERT INTO demo.power (power_name) VALUES ('Telepathy');
INSERT INTO demo.power (power_name) VALUES ('X-ray Vision');
INSERT INTO demo.power (power_name) VALUES ('Energy Blasts');
INSERT INTO demo.power (power_name) VALUES ('Teleportation');

--------------------------------------------------------------------------------
CREATE TABLE demo.hero_power (
    hero_power_id   serial  PRIMARY KEY,
    hero            integer NOT NULL REFERENCES demo.hero(hero_id),
    power           integer NOT NULL REFERENCES demo.power(power_id),
    UNIQUE(hero, power)
);

COMMENT ON TABLE demo.hero_power IS 'Represents many-to-many relationship between heroes and power';
COMMENT ON COLUMN demo.hero_power.hero IS 'Hero ID';
COMMENT ON COLUMN demo.hero_power.power IS 'Power ID';
GRANT USAGE, SELECT, UPDATE ON SEQUENCE demo.hero_power_hero_power_id_seq TO demo_user;

--------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION demo.add_hero_power (
    hero_id      integer,
    power_name   text
) RETURNS demo.hero_power as $$
DECLARE
    powerId     demo.power.power_id%TYPE;
    power       demo.power%ROWTYPE;
    heroPower   demo.hero_power%ROWTYPE;
BEGIN
    SELECT * INTO power FROM demo.power p WHERE p.power_name ilike $2;
    IF NOT FOUND THEN
        EXECUTE format('INSERT INTO demo.power (power_name) VALUES (%L) RETURNING *',
         $2) INTO power;
    END IF;
    EXECUTE format('INSERT INTO demo.hero_power (hero, power) VALUES (%L, %L) RETURNING *',
        $1, power.power_id) INTO heroPower;
    return heroPower;
END;
$$ language plpgsql;
COMMENT ON FUNCTION demo.add_hero_power(integer, text) IS 'Add a power to a hero, creating it if it does not exist';
GRANT EXECUTE ON FUNCTION demo.add_hero_power(integer, text) TO demo_user;

--------------------------------------------------------------------------------


GRANT ALL ON ALL TABLES IN SCHEMA demo TO demo_user;

COMMIT;
