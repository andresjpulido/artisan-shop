select ot.name as namePiece, s.name as "sizepiece",  sum(mov.amount) as totalPieces from movement mov  inner join "productType" ot on mov."id_productType" = ot."id"  inner join "size" s on mov.id_size = s."id"  where mov."createdAt" >= '2020/02/16' and mov."createdAt" <= '2020/02/25'  group by ot.name, s.name  order by ot.name,s.name
 
CALL movement ('2', '5', '1', '1', 'admin') 


select * from movement

ALTER TABLE public.movement
    ALTER COLUMN "createdAt" TYPE timestamp with time zone ;

ALTER TABLE public.movement
    ALTER COLUMN "updatedAt" TYPE timestamp with time zone ;
	