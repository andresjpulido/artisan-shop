/*********************************
function to get fist day in a week
parameter:
	number of week: integer
return:
	date of first day in the week:date
*********************************/
CREATE OR REPLACE FUNCTION firstDayOfWeek(inputdate date) RETURNS date AS $$
	DECLARE
		resultDate date := CURRENT_DATE;
		dayofweek integer := 0;
	BEGIN
		--week := cast(DATE_PART('week', inputdate) as integer);
		--de acuerdo al dia hacer la resta
		dayofweek := EXTRACT(DOW FROM inputdate);
		CASE
			 WHEN dayofweek = 1  THEN resultDate := inputdate;
			 WHEN dayofweek = 2  THEN resultDate := inputdate - interval '1 day';
			 WHEN dayofweek = 3  THEN resultDate := inputdate - interval '2 day';
			 WHEN dayofweek = 4  THEN resultDate := inputdate - interval '3 day';
			 WHEN dayofweek = 5  THEN resultDate := inputdate - interval '4 day';
			 WHEN dayofweek = 6  THEN resultDate := inputdate - interval '5 day';
			 WHEN dayofweek = 0  THEN resultDate := inputdate - interval '6 day';			
		END case;
		RETURN resultDate;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION lastDayOfWeek(inputdate date) RETURNS date AS $$
	DECLARE
		resultDate date := CURRENT_DATE;
		dayofweek integer := 0;
	BEGIN
		--week := cast(DATE_PART('week', inputdate) as integer);
		--de acuerdo al dia hacer la resta
		dayofweek := EXTRACT(DOW FROM inputdate);
		CASE
			 WHEN dayofweek = 1  THEN resultDate := inputdate + interval '6 day';
			 WHEN dayofweek = 2  THEN resultDate := inputdate + interval '5 day';
			 WHEN dayofweek = 3  THEN resultDate := inputdate + interval '4 day';
			 WHEN dayofweek = 4  THEN resultDate := inputdate + interval '3 day';
			 WHEN dayofweek = 5  THEN resultDate := inputdate + interval '2 day';
			 WHEN dayofweek = 6  THEN resultDate := inputdate + interval '1 day';
			 WHEN dayofweek = 0  THEN resultDate := inputdate;		
		END case;
		RETURN resultDate;
        END;
$$ LANGUAGE plpgsql;
