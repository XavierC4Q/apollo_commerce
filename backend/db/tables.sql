DROP DATABASE IF EXISTS apollo_commerce;
CREATE DATABASE apollo_commerce;

\c apollo_commerce
--- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);
--- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL
);

--- PRODUCT CATEGORIES

CREATE TABLE footwear (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id) UNIQUE,
    product_name TEXT REFERENCES products (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    sub_category TEXT NOT NULL
);

CREATE TABLE tops (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id) UNIQUE,
    product_name TEXT REFERENCES products (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    sub_category TEXT NOT NULL
);

--- PRODUCT SUB CATEGORIES

CREATE TABLE sneakers (
    id SERIAL PRIMARY KEY,
    product_name TEXT REFERENCES footwear (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    product_id INTEGER REFERENCES footwear (product_id),
    male BOOLEAN NOT NULL,
    female BOOLEAN NOT NULL,
    child BOOLEAN NOT NULL
);

CREATE TABLE boots (
    id SERIAL PRIMARY KEY,
    product_name TEXT REFERENCES footwear (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    product_id INTEGER REFERENCES footwear (product_id),
    male BOOLEAN NOT NULL,
    female BOOLEAN NOT NULL,
    child BOOLEAN NOT NULL
);

CREATE TABLE dress_shoe (
    id SERIAL PRIMARY KEY,
    product_name TEXT REFERENCES footwear (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    product_id INTEGER REFERENCES footwear (product_id),
    male BOOLEAN NOT NULL,
    female BOOLEAN NOT NULL,
    child BOOLEAN NOT NULL
);

CREATE TABLE shirt (
    id SERIAL PRIMARY KEY,
    product_name TEXT REFERENCES tops (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    product_id INTEGER REFERENCES tops (product_id),
    male BOOLEAN NOT NULL,
    female BOOLEAN NOT NULL,
    child BOOLEAN NOT NULL
);

CREATE TABLE tank_top (
    id SERIAL PRIMARY KEY,
    product_name TEXT REFERENCES tops (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    product_id INTEGER REFERENCES tops (product_id),
    male BOOLEAN NOT NULL,
    female BOOLEAN NOT NULL,
    child BOOLEAN NOT NULL
);

CREATE TABLE sweatshirt (
    id SERIAL PRIMARY KEY,
    product_name TEXT REFERENCES tops (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    product_id INTEGER REFERENCES tops (product_id),
    male BOOLEAN NOT NULL,
    female BOOLEAN NOT NULL,
    child BOOLEAN NOT NULL
);

CREATE TABLE dress_shirt (
    id SERIAL PRIMARY KEY,
    product_name TEXT REFERENCES tops (product_name) DEFERRABLE INITIALLY IMMEDIATE UNIQUE,
    product_id INTEGER REFERENCES tops (product_id),
    male BOOLEAN NOT NULL,
    female BOOLEAN NOT NULL,
    child BOOLEAN NOT NULL
);

--- PRODUCT INFO

CREATE TABLE product_sizes (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id),
    sizes TEXT []
);

CREATE TABLE product_colors (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id),
    colors TEXT []
);

CREATE TABLE prices (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products (id),
    price FLOAT
);

--- Function for deleting product and all relations
CREATE OR REPLACE FUNCTION product_deleted()
RETURNS trigger
AS $product_delete_func$
DECLARE get_category TEXT; get_sub_category TEXT;
BEGIN

--- Get the category of item to be deleted
    get_category := (SELECT LOWER(category) 
        FROM products 
        WHERE id = OLD.id);

--- Create temporary table to get items sub_category using the category above
    EXECUTE format('CREATE TEMP TABLE findSubCategory
        ON COMMIT DROP 
        AS SELECT sub_category FROM %1$I
        WHERE product_id = CAST(%2$s AS FLOAT)',
        get_category, OLD.id);

--- Get sub_category of item to be deleted
    get_sub_category := (SELECT LOWER(sub_category)
        FROM findSubCategory);

-- Delete items in reverse order.
    EXECUTE format('DELETE FROM %1$I
        WHERE product_id = CAST(%2$s AS FLOAT)',
        get_sub_category, OLD.id);

    EXECUTE format('DELETE FROM %1$I 
        WHERE product_id = CAST(%2$s AS FLOAT)', 
        get_category, OLD.id);

    RETURN OLD;
END;
$product_delete_func$ LANGUAGE plpgsql;

--- Function to update a product/product_name and all relations
CREATE OR REPLACE FUNCTION product_updated()
RETURNS trigger
AS $product_updated_func$
DECLARE update_in_category TEXT; update_in_sub_category TEXT;
BEGIN
--- Defer foreign key constraints to allow for UPDATE
SET CONSTRAINTS ALL DEFERRED;

--- Get category of item to be updated
    update_in_category := (SELECT LOWER(category)
        FROM products
        WHERE id = NEW.id);

--- Create temporary table with the sub_category of the updated item using the category
    EXECUTE format('CREATE TEMP TABLE findSubCategory
        ON COMMIT DROP
        AS SELECT sub_category FROM %1$I
        WHERE product_id = CAST(%2$s AS FLOAT)',
        update_in_category, NEW.id);

--- Get the sub_category from above table
    update_in_sub_category := (SELECT LOWER(sub_category)
        FROM findSubCategory);

--- Update the tables in order
    EXECUTE format('UPDATE %1$I
        SET product_name = %2$L
        WHERE product_id = CAST(%3$s AS FLOAT)',
        update_in_category, NEW.product_name, NEW.id);

    EXECUTE format('UPDATE %1$I
        SET product_name = %2$L
        WHERE product_id = CAST(%3$s AS FLOAT)',
        update_in_sub_category, NEW.product_name, NEW.id);

    RETURN NEW;
END;
$product_updated_func$ LANGUAGE plpgsql;


--- Triggers
CREATE TRIGGER product_deleted_trigger
BEFORE DELETE
ON products
FOR EACH ROW
EXECUTE PROCEDURE product_deleted();

CREATE TRIGGER product_updated_trigger
BEFORE UPDATE
ON products
FOR EACH ROW
EXECUTE PROCEDURE product_updated();

--- Inserts
INSERT INTO users (username, password, email) 
VALUES
('Xavier','$2a$10$cP5yvGxHTDI9SChQinrYBehqMLO8qs.U.3xLuWn5MRX.ZrtbC9CyC','email'),
('Matthew','$2a$10$cP5yvGxHTDI9SChQinrYBehqMLO8qs.U.3xLuWn5MRX.ZrtbC9CyC','messages'),
('Jesus','$2a$10$cP5yvGxHTDI9SChQinrYBehqMLO8qs.U.3xLuWn5MRX.ZrtbC9CyC','church.org'),
('Sally','$2a$10$cP5yvGxHTDI9SChQinrYBehqMLO8qs.U.3xLuWn5MRX.ZrtbC9CyC','watermail');

INSERT INTO products (product_name, category)
VALUES
('Air Jordan 6', 'FOOTWEAR'), 
('Blue Denim Shirt', 'TOPS'),
('Black Ripped Jeans', 'BOTTOM'), 
('Snake Leather Boots', 'FOOTWEAR'),
('Trenchcoat by Polo', 'OUTERWEAR'), 
('Gucci Belt', 'ACCESSORY'),
('Rolling Stones T-shirt', 'TOPS'), 
('Adidas Boost', 'FOOTWEAR'),
('Camo Joggers', 'BOTTOM'), 
('Raincoat by Eazy', 'OUTERWEAR'),
('Moonstone Ring', 'ACCESSORY'),
('Brogues', 'FOOTWEAR'),
('Beach Shorts', 'BOTTOM'),
('Christmas Sweater', 'TOPS'),
('Puffy Coat', 'OUTERWEAR'),
('Boar Tooth Necklace', 'ACCESSORY'),
('Doc Marten Deluxe', 'FOOTWEAR'),
('Glass Slippers', 'FOOTWEAR'),
('Purple Slacks', 'BOTTOM'),
('Banana Tank Top', 'TOPS'),
('Pearl Necklace', 'ACCESSORY'),
('Bear Fur Coat', 'OUTERWEAR'),
('Golden Cleats', 'FOOTWEAR'),
('Skinny Biker Jeans', 'BOTTOM'),
('Chelsea Boots', 'FOOTWEAR'),
('Orange Logo V-neck', 'TOPS');

INSERT INTO footwear (product_id, product_name, sub_category)
VALUES
(1, 'Air Jordan 6', 'SNEAKERS'),
(4, 'Snake Leather Boots', 'BOOTS'),
(8, 'Adidas Boost', 'SNEAKERS'),
(12, 'Brogues', 'DRESS_SHOE'),
(17, 'Doc Marten Deluxe', 'BOOTS'),
(18, 'Glass Slippers', 'CASUAL'),
(23, 'Golden Cleats', 'SNEAKERS'),
(25, 'Chelsea Boots', 'BOOTS');

INSERT INTO sneakers (product_name, product_id, male, female, child)
VALUES
('Air Jordan 6', 1, true, true, true),
('Adidas Boost', 8, true, false, false),
('Golden Cleats', 23, true, false, false);

INSERT INTO boots (product_name, product_id, male, female, child)
VALUES 
('Snake Leather Boots', 4, false, true, false),
('Doc Marten Deluxe', 17, true, true, false),
('Chelsea Boots', 25, true, false, false);

INSERT INTO dress_shoe (product_name, product_id, male, female, child)
VALUES
('Brogues', 12, true, false, false);

INSERT INTO product_sizes (product_id, sizes)
VALUES
(1, '{7.5, 8, 9, 9.5, 10.5, 12}'),
(2, '{S, M, L, XXL}'),
(3, '{30, 31, 33, 34}'),
(4, '{9.5, 12.5}'),
(5, '{L, XL, XXL}'),
(6, '{28, 30, 32}'),
(7, '{M, L}'),
(8, '{5.5, 6, 7.5, 8, 10}'),
(9, '{30, 32, 33, 36}'),
(10, '{L, XXL}'),
(11, '{6, 7, 8}'),
(12, '{9, 9.5, 11.5}'),
(13, '{26, 28, 30}'),
(14, '{XS, S, M, L}'),
(15, '{L, XXL}'),
(16, '{16, 17.5, 18.5}'),
(17, '{7, 8, 10, 11}'),
(18, '{3.5, 4.5, 5}'),
(19, '{29, 32, 33, 34}'),
(20, '{S, L}'),
(21, '{15.5, 16, 16.5, 17.5}'),
(22, '{M, L, XL}'),
(23, '{10.5, 11.5, 13}'),
(24, '{26, 28, 31, 32}'),
(25, '{9.5, 10, 11}'),
(26, '{XXS, XS, S, M}');

INSERT INTO prices (product_id, price)
VALUES
(1, 260.50), (2, 50.00),(3, 99.85), (4, 155.25), (5, 635.50), (6, 500.00),
(7, 45.50), (8, 135.00), (9, 65.35), (10, 250.45), (11, 300.50),
(12, 125.50), (13, 25.00), (14, 55.55), (15, 120.25), (16, 21.50),
(17, 145.00), (18, 66.75), (19, 74.30), (20, 98.75), (21, 750.99),
(22, 365.75), (23, 233.00), (24, 135.65), (25, 85.60), (26, 45.00);

INSERT INTO product_colors (product_id, colors)
VALUES
(1, '{"BLACK", "RED", "WHITE"}'),
(2, '{"BLUE"}'),
(3, '{"BLACK"}'),
(4, '{"RATTLESNAKE GOLD", "DESERT TAN"}'),
(5, '{"GREY", "BLACK", "BROWN"}'),
(6, '{"WHITE", "GREEN", "BLACK"}'),
(7, '{"NAVY", "RED", "BLACK"}'),
(8, '{"BOOST YELLOW", "NEON", "FLASHY CRIMSON"}'),
(9, '{"FOREST CAMO", "ARTIC CAMO"}'),
(10, '{"YELLOW", "EAZY ORANGE"}'),
(11, '{"SILVER", "WHITE GOLD"}'),
(12, '{"BROWN", "BLACK", "ASH GREY"}'),
(13, '{"ORANGE", "TYE-DIE"}'),
(14, '{"RED", "GREEN", "PURPLE"}'),
(15, '{"SKYBLUE", "GREEN"}'),
(16, '{"BLACK"}'),
(17, '{"SOOT", "EMERALD", "DUCK YELLOW"}'),
(18, '{"LIGHT BLUE"}'),
(19, '{"PURPLE"}'),
(20, '{"YELLOW", "GREEN"}'),
(21, '{"TAN"}'),
(22, '{"BROWN", "BLACK"}'),
(23, '{"GOLD"}'),
(24, '{"FADED BLUE", "GREY"}'),
(25, '{"TAN", "GREY"}'),
(26, '{"ORANGE"}');

INSERT INTO tops (product_id, product_name, sub_category)
VALUES
(2, 'Blue Denim Shirt', 'SHIRT'),
(7, 'Rolling Stones T-shirt', 'SHIRT'),
(14, 'Christmas Sweater', 'SWEATSHIRT'),
(20, 'Banana Tank Top', 'TANK_TOP'),
(26, 'Orange Logo V-neck', 'SHIRT');

INSERT INTO shirt (product_name, product_id, male, female, child)
VALUES
('Blue Denim Shirt', 2, false, true, false),
('Rolling Stones T-shirt', 7, true, false, false),
('Orange Logo V-neck', 26, false, false, true);

INSERT INTO tank_top (product_name, product_id, male, female, child)
VALUES
('Banana Tank Top', 20, true, false, false);

INSERT INTO sweatshirt (product_name, product_id, male, female, child)
VALUES
('Christmas Sweater', 14, true, false, false);