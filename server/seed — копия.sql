DROP DATABASE IF EXISTS	seed;
CREATE DATABASE seed DEFAULT CHARACTER SET utf16;

USE seed;

DROP TABLE IF EXISTS manufctories;
CREATE TABLE manufctories (
	id		 				INT 			NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    name				    varchar(255) 	NOT NULL
);


DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
	id		 			INT 			NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
	name 	 		    varchar(255)    NOT NULL,
    priority	 		INT 			NOT NULL
);


DROP TABLE IF EXISTS seedCategories;
CREATE TABLE seedCategories (
	id		 			INT 			NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    seedId				INT,
	categoryId			INT
);

DROP TABLE IF EXISTS pictures;
CREATE TABLE pictures (
	id		 			INT 			NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    picture				varchar(255) 	NOT NULL
);

DROP TABLE IF EXISTS seedPictures;
CREATE TABLE seedPictures (
	id		 			    INT 			NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    seedId				    INT,
    pictureId				INT
);

DROP TABLE IF EXISTS seeds;
CREATE TABLE seeds (
	id		 			INT 			    NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    name				varchar(255)        NOT NULL,
    info				varchar(255),        
    price               INT, 
    ManufactoryId       INT
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
	id		 			INT 			    NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    number				varchar(255)        NOT NULL,
    totalPrice          INT 			    NOT NULL 
);

DROP TABLE IF EXISTS baskets;
CREATE TABLE baskets (
	id		 			INT 			    NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    seedId				int                 NOT NULL,
    orderId             int                 NOT NULL,
    amount				int                 NOT NULL,
    totalPrice          INT                 NOT NULL
);



ALTER TABLE `seedPictures` 
	ADD CONSTRAINT `FK_pictures_id_seedPictures_PictureId` 
    FOREIGN KEY (`pictureId`) REFERENCES `pictures`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;
        

ALTER TABLE `seedCategories` 
	ADD CONSTRAINT `FK_categories_id_seedCategories_categoryId` 
    FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;

ALTER TABLE `seedPictures` 
	ADD CONSTRAINT `FK_seeds_id_seedPictures_seedId` 
    FOREIGN KEY (`seedId`) REFERENCES `seeds`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;

ALTER TABLE `seedCategories` 
	ADD CONSTRAINT `FK_seeds_id_seedCategories_seedId` 
    FOREIGN KEY (`seedId`) REFERENCES `seeds`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;        

ALTER TABLE `seeds` 
	ADD CONSTRAINT `FK_manufctories_id_seeds_ManufactoryId` 
    FOREIGN KEY (`ManufactoryId`) REFERENCES `manufctories`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;
        
ALTER TABLE `baskets` 
	ADD CONSTRAINT `FK_seeds_id_baskets_seedId` 
    FOREIGN KEY (`seedId`) REFERENCES `seeds`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;
        
ALTER TABLE `baskets` 
	ADD CONSTRAINT `FK_orders_id_baskets_orderId` 
    FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;        

INSERT INTO `manufctories` (name)
VALUES 
       ("Sad i Ogorod"),
       ("Usadba"),
       ("Dobronom");  
        
INSERT INTO `seeds` (name,info,price,ManufactoryId)
VALUES 
       ( "tomat","info1",228,3),
       ( "bean","info3",228,2),
       ( "white tomat","info4",228,3),
       ( "melon","info2",333,2),
       ( "pepper","info5",228,1);
           
INSERT INTO `orders` (number, totalPrice)
VALUES 
       ( "8-800-555-35-35",222),
       ( "7-986-888-21-22",333);  
              
INSERT INTO `baskets` (seedId,orderId,amount,totalPrice)
VALUES 
       ( 1,1,228,1),
       ( 2,1,11,1),
       ( 2,2,2,333);
        
INSERT INTO `pictures` (id,picture)
VALUES 
       ( 1,"pic1"),
       ( 2,"pic2"),
       ( 3,"pic3");        

INSERT INTO `seedPictures` (seedId, pictureId)
VALUES 
       ( 1,1),
       ( 2,1),
       ( 2,3),
       ( 2,2),
       ( 1,2);           

INSERT INTO `categories` (id,name,priority)
VALUES 
       ( 1,"category1",1),
       ( 2,"category2",2),
       ( 3,"category3",3);        

INSERT INTO `seedCategories` (seedId, categoryId)
VALUES 
       ( 1,1),
       ( 1,3),
       ( 2,3),
       ( 1,2);   



#SELECT *  FROM seeds   left JOIN seedPictures ON seeds.id=seedPictures.seedId 
SELECT *  FROM seeds   left JOIN seedCategories ON seeds.id=seedCategories.seedId 
#select * from seeds  ;
#SELECT seedPictures.id,seedId,picture  FROM seedPictures   left JOIN pictures ON pictures.id=seedPictures.pictureId 
#SELECT seedCategories.id,seedId,category  FROM seedCategories   left JOIN categories ON categories.id=seedCategories.categoryId 



