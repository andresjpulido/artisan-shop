delete from inventory;
delete from movement;
delete from "size";
INSERT INTO public.size("name")	VALUES ('Small');
INSERT INTO public.size("name")	VALUES ('Small Small');
INSERT INTO public.size("name")	VALUES ('Small Medium');
INSERT INTO public.size("name")	VALUES ('Small Large');
INSERT INTO public.size("name")	VALUES ('Medium');
INSERT INTO public.size("name")	VALUES ('Medium Small');
INSERT INTO public.size("name")	VALUES ('Medium Medium');
INSERT INTO public.size("name")	VALUES ('Medium Large');
INSERT INTO public.size("name")	VALUES ('Large');
INSERT INTO public.size("name")	VALUES ('Large Small');
INSERT INTO public.size("name")	VALUES ('Large Medium');
INSERT INTO public.size("name")	VALUES ('Large Large');
INSERT INTO public.size("name")	VALUES ('Extra Large');
select * from public.size;
INSERT INTO  public.inventory( amount, "id_productType", id_size) VALUES ( 12, 7, 5);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 174, 7, 6);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 93, 7, 7);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 56, 7, 9);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 46, 7, 10);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 30, 7, 11);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 24, 7, 13);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 27, 7, 14);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 10, 7, 15);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 28, 7, 16);

INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 1, 3, 4);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 6, 3, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 10, 3, 12);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 3, 3, 16);

INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 2, 1, 4);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 1, 1, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 2, 1, 12);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 3, 1, 16);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 7, 5, 4);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 11, 5, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 9, 5, 12);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 5, 5, 16);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 5, 4, 8);
INSERT INTO public."productType" ("name") values ('Mere');
INSERT INTO public."productType" ("name") values ('Bracelet');
INSERT INTO public."productType" ("name") values ('Toki Bracelet');
INSERT INTO public."productType" ("name") values ('Breast Plate');
INSERT INTO public."productType" ("name") values ('Triangule');
INSERT INTO public."productType" ("name") values ('Other');
SELECT * FROM public."productType" ;
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 8, 11, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 43, 12, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 12, 13, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 8, 14, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 5, 2, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 6, 15, 8);
INSERT INTO public.inventory( amount, "id_productType", id_size) VALUES ( 5, 16, 8);

 
--drop procedure test();
CREATE OR REPLACE PROCEDURE movement(requested_amount integer, idSize integer,  
idProductType integer, idOperation integer, username varchar)
LANGUAGE plpgsql
AS $$
DECLARE
  available_amount integer := 0;
  operation varchar(20) := '';
BEGIN 
	SELECT amount into available_amount 
	FROM inventory
	WHERE "id_productType" = idProductType
	AND id_size = idSize;
	
  	SELECT op.name into operation FROM operation op WHERE op.id = idOperation;
	RAISE INFO 'operation: %', operation;
	 
  IF idOperation = 1 THEN	
  	IF available_amount IS NULL THEN
		insert into inventory (amount, "id_productType", id_size) 
			values (requested_amount, idProductType, idSize);
	ELSE	
		update inventory 
		SET amount = (available_amount + requested_amount)
		WHERE "id_productType" = idProductType
		AND id_size = idSize;
	END IF;		
	insert into movement (amount, "id_productType", id_size, id_operation, username) 
			values (requested_amount, idProductType, idSize, idOperation, username);
  END IF;
  
  IF idOperation = 2 THEN	 
	--restauration
  END IF;

  IF idOperation = 3 THEN	 
	--sale
	IF available_amount < requested_amount THEN
		RAISE NOTICE 'No existen piezas en el inventario';
		RAISE EXCEPTION 'Amount not available: %', available_amount 
      	USING HINT = 'Dont exist pieces in the inventory';
	ELSE
		update inventory 
		SET amount = (available_amount - requested_amount)
		WHERE "id_productType" = idProductType
		AND id_size = idSize;
	
		INSERT INTO movement (amount, "id_productType", id_size, id_operation, username) 
			VALUES (requested_amount, idProductType, idSize, idOperation, username);		
	END IF;
	
  END IF;

  IF idOperation = 3 THEN	 
	--damage
  END IF;
   
  
END $$;

 








