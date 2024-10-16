CREATE TABLE orgs (
	org_id SERIAL PRIMARY KEY,
	org_name VARCHAR(255) NOT NULL UNIQUE,
	org_email VARCHAR(255) NULL UNIQUE,
	org_description TEXT NULL,
	org_icon VARCHAR(255) NULL,
	org_verified BOOLEAN DEFAULT FALSE NOT NULL,
	org_reputation INT DEFAULT 0 NOT NULL
);

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	user_name VARCHAR(255) NOT NULL,
	user_email VARCHAR(255) NOT NULL UNIQUE,
	user_mod BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE tags (
	tag_id SERIAL PRIMARY KEY,
	tag_name VARCHAR(255) NOT NULL,
	tag_official BOOLEAN DEFAULT FALSE NOT NULL
);
CREATE UNIQUE INDEX tag_name_unique_lower ON tags (LOWER(tag_name));

CREATE TABLE events (
	event_id SERIAL PRIMARY KEY,
	contributor_id INT NOT NULL,
	event_name VARCHAR(255) NOT NULL,
	event_description TEXT NULL,
	event_likes INT DEFAULT 0 NOT NULL,

	start_time TIMESTAMP NULL,
    end_time TIMESTAMP NULL,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,


	-- If both start_time and end_time are not null, then start_time must be less than end_time
	CHECK (start_time IS NULL OR end_time IS NULL OR start_time < end_time),
	FOREIGN KEY(contributor_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Stores all user offical affiliations
CREATE TABLE userorgs (
	user_id INT,
	org_id INT,
	PRIMARY KEY(user_id, org_id),
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY(org_id) REFERENCES orgs(org_id) ON DELETE CASCADE
);

-- Stores event org affiliations
CREATE TABLE eventorgs (
	event_id INT,
	org_id INT,
	PRIMARY KEY(event_id, org_id),
	FOREIGN KEY(event_id) REFERENCES events(event_id) ON DELETE CASCADE,
	FOREIGN KEY(org_id) REFERENCES orgs(org_id) ON DELETE CASCADE
);

-- Stores all tags for each event
CREATE TABLE eventtags (
	event_id INT,
	tag_id INT,
	PRIMARY KEY(event_id, tag_id),
	FOREIGN KEY(event_id) REFERENCES events(event_id) ON DELETE CASCADE,
	FOREIGN KEY(tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

-- Stores all tags for each org
CREATE TABLE orgtags (
	org_id INT,
	tag_id INT,
	PRIMARY KEY(org_id, tag_id),
	FOREIGN KEY(org_id) REFERENCES orgs(org_id) ON DELETE CASCADE,
	FOREIGN KEY(tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

-- Stores all alternate org names
CREATE TABLE alternateorgnames (
	alternate_name_id SERIAL PRIMARY KEY,
	org_id INT,
	alternate_name VARCHAR(255),
	FOREIGN KEY (org_id) REFERENCES orgs(org_id) ON DELETE CASCADE
);

-- Stores all tag analytics
-- CREATE TABLE taganalytics (

-- )

