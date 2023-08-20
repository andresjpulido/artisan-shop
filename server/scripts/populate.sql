INSERT INTO public."order" ("id_orderStatus", "id_customer", "description")
SELECT 1, cu.id, 'This is done under a controlled testing environment.'
FROM customer cu
WHERE condition; 

INSERT INTO public."note"("content", "id_order", "updatedAt")
SELECT 'This is done under a controlled testing environment', ord.id, now()
FROM "order" ord;

select * from note