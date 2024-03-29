DROP DATABASE IF EXISTS	seed;
CREATE DATABASE seed DEFAULT CHARACTER SET utf16;

USE seed;

DROP TABLE IF EXISTS manufacturers;
CREATE TABLE manufacturers (
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

DROP TABLE IF EXISTS picturies;
CREATE TABLE picturies (
	id		 			INT 			NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    seedId				INT             NOT NULL,
    picture				varchar(255) 	NOT NULL
);

DROP TABLE IF EXISTS seeds;
CREATE TABLE seeds (
	id		 			INT 			    NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    name				varchar(255)        NOT NULL,
    info				varchar(255),        
    price               INT, 
    manufacturerId       INT
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

DROP TABLE IF EXISTS additionalInformations;
CREATE TABLE additionalInformations (
	id		 			INT 			    NOT NULL 	AUTO_INCREMENT PRIMARY KEY,
    seedId				int                 NOT NULL,
    title				varchar(255)        NOT NULL,
    content				varchar(255)        NOT NULL
);

ALTER TABLE `additionalInformations` 
	ADD CONSTRAINT `FK_seeds_id_addInfo_seedId` 
    FOREIGN KEY (`seedId`) REFERENCES `seeds`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;        

ALTER TABLE `seedCategories` 
	ADD CONSTRAINT `FK_categories_id_seedCategories_categoryId` 
    FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`)
		ON DELETE CASCADE 
		ON UPDATE CASCADE;

ALTER TABLE `picturies` 
	ADD CONSTRAINT `FK_seeds_id_picturies_seedId` 
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
    FOREIGN KEY (`manufacturerId`) REFERENCES `manufacturers`(`id`)
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

INSERT INTO `manufacturers` (name)
VALUES 
       ("Sad i Ogorod"),
       ("Usadba"),
       ("Dobronom");  
        
INSERT INTO `seeds` (name,info,price,manufacturerId)
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
        
INSERT INTO `picturies` (id,seedId,picture)
VALUES 
       ( 1,1,"pic1"),
       ( 2,2,"pic2"),
       ( 3,3,"pic3");        
        
INSERT INTO `categories` (name,priority)
VALUES 
       ( "category1",1),
       ( "category2",1),
       ( "category2(3)",1),
	   ( "category1",2),
       ( "category2",2),
       ( "category2(3)",2),
       ("Sad i Ogorod",3),
       ("Usadba",3),
       ("Dobronom",3);			

INSERT INTO `seedCategories` (seedId, categoryId)
VALUES 
       ( 1,1),
       ( 1,3),
       ( 2,2),
       ( 2,3),
       ( 3,4),
       ( 3,1);   

INSERT INTO `additionalInformations` (seedId, title, content)
VALUES 
       ( 1,"topic1","info1"),
       ( 1,"topic2","info2"),
       ( 2,"topic3","info3"),
       ( 2,"topic4","info4"),
       ( 3,"topic5","info5"),
       ( 3,"topic6","info6");  

#SELECT *  FROM seeds   left JOIN seedPictures ON seeds.id=seedPictures.seedId 
#SELECT *  FROM seeds   left JOIN seedCategories ON seeds.id=seedCategories.seedId 
#select * from seeds  ;
#SELECT seedPictures.id,seedId,picture  FROM seedPictures   left JOIN pictures ON pictures.id=seedPictures.pictureId 
#SELECT seedCategories.id,seedId,category  FROM seedCategories   left JOIN categories ON categories.id=seedCategories.categoryId 



