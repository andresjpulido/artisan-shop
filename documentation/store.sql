-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.1
-- PostgreSQL version: 10.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: new_database | type: DATABASE --
-- -- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- -- ddl-end --
-- 

-- object: public.sec_emp | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.sec_emp CASCADE;
CREATE SEQUENCE public.sec_emp
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: public.sec_payslip | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.sec_payslip CASCADE;
CREATE SEQUENCE public.sec_payslip
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: public.sec_inventory | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.sec_inventory CASCADE;
CREATE SEQUENCE public.sec_inventory
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: public.sec_movement | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.sec_movement CASCADE;
CREATE SEQUENCE public.sec_movement
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: public.payslip | type: TABLE --
-- DROP TABLE IF EXISTS public.payslip CASCADE;
CREATE TABLE public.payslip(
	id integer NOT NULL DEFAULT nextval('public.sec_payslip'::regclass),
	description text,
	creation_date date DEFAULT now(),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	isprocessed boolean DEFAULT false,
	employeeid integer,
	CONSTRAINT payslip_pk PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public.payslip (id, description, creation_date, "createdAt", "updatedAt", isprocessed, employeeid) VALUES (E'1', DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'false', E'1');
-- ddl-end --

-- object: public.employee | type: TABLE --
-- DROP TABLE IF EXISTS public.employee CASCADE;
CREATE TABLE public.employee(
	id integer NOT NULL DEFAULT nextval('public.sec_emp'::regclass),
	"firstName" varchar(100),
	"lastName" varchar(100),
	movil varchar(30),
	address varchar(150),
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now(),
	email varchar(60),
	ird varchar(13),
	"typeDocument" varchar(4) DEFAULT 'PASS',
	document varchar(10),
	"birthDate" date,
	"position" varchar(30),
	"bankName" varchar(30),
	"accountNumber" varchar(30),
	salary integer,
	CONSTRAINT "PK_ID_EMP" PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public.employee (id, "firstName", "lastName", movil, address, "createdAt", "updatedAt", email, ird, "typeDocument", document, "birthDate", "position", "bankName", "accountNumber") VALUES (E'1', E'Ernesto', E'Ovalle', E'445654', E'Albert Street', DEFAULT, DEFAULT, E'admin@oronegro.co.nz', E'026-175-319', DEFAULT, E'A7567', E'1965-02-15', E'manager', E'BNZ', E'546-231-789');
-- ddl-end --
INSERT INTO public.employee (id, "firstName", "lastName", movil, address, "createdAt", "updatedAt", email, ird, "typeDocument", document, "birthDate", "position", "bankName", "accountNumber") VALUES (E'2', E'Juan', E'Grande', E'0219854324', E'west', DEFAULT, DEFAULT, E'juan@gmail.com', E'056-175-319', DEFAULT, E'A3267', E'1979-02-15', E'jeller', E'ASB', E'656-321-789');
-- ddl-end --
INSERT INTO public.employee (id, "firstName", "lastName", movil, address, "createdAt", "updatedAt", email, ird, "typeDocument", document, "birthDate", "position", "bankName", "accountNumber") VALUES (E'3', E'Juan', E'Arias', E'02169745321', E'Newton', DEFAULT, DEFAULT, E'juan-daniel@gmail.com', E'079-788-122', DEFAULT, E'A8789', E'1987-02-15', E'jeller', E'BNZ', E'369-741-852');
-- ddl-end --
INSERT INTO public.employee (id, "firstName", "lastName", movil, address, "createdAt", "updatedAt", email, ird, "typeDocument", document, "birthDate", "position", "bankName", "accountNumber") VALUES (E'4', E'Andres', E'Pulido', E'02102651559', E'80/308 Halsey Street', DEFAULT, DEFAULT, E'andresjpulido@gmail.com', E'126-075-219', DEFAULT, E'AT4567', E'1979-02-15', E'jeller', E'Kiwi Bank', E'123-654-789');
-- ddl-end --

-- object: public.sec_hour | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.sec_hour CASCADE;
CREATE SEQUENCE public.sec_hour
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: public.hour | type: TABLE --
-- DROP TABLE IF EXISTS public.hour CASCADE;
CREATE TABLE public.hour(
	id integer NOT NULL DEFAULT nextval('public.sec_hour'::regclass),
	activity text,
	start_date timestamp,
	end_date timestamp DEFAULT now(),
	id_emp integer,
	"updatedAt" date DEFAULT now(),
	"createdAt" date DEFAULT now(),
	"isPaid" boolean NOT NULL DEFAULT false,
	payslipid integer,
	id_activity integer,
	amount integer,
	CONSTRAINT hour_pk PRIMARY KEY (id)

);
-- ddl-end --

-- Appended SQL commands --
insert into hour (activity,start_date,end_date,id_emp) values('polishing','2019-10-01 13:00:00','2019-10-01 17:00:00',1);
insert into hour (activity,start_date,end_date,id_emp) values('polishing','2019-10-02 13:00:00','2019-10-02 17:00:00',1);

-- ddl-end --

-- object: public.sec_order | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.sec_order CASCADE;
CREATE SEQUENCE public.sec_order
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: public.sec_user | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.sec_user CASCADE;
CREATE SEQUENCE public.sec_user
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: public."user" | type: TABLE --
-- DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE public."user"(
	id integer NOT NULL DEFAULT nextval('public.sec_user'::regclass),
	username varchar(11),
	password varchar(11),
	lastlogin timestamp with time zone DEFAULT now(),
	"creationDate" date DEFAULT now(),
	id_employee integer,
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now(),
	CONSTRAINT user_pk PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public."user" (id, username, password, lastlogin, "creationDate", id_employee) VALUES (E'1', E'apulido', E'password', DEFAULT, DEFAULT, E'4');
-- ddl-end --
INSERT INTO public."user" (id, username, password, lastlogin, "creationDate", id_employee) VALUES (E'2', E'admin', E'password', DEFAULT, DEFAULT, E'1');
-- ddl-end --
INSERT INTO public."user" (id, username, password, lastlogin, "creationDate", id_employee) VALUES (E'3', E'jarias', E'password', DEFAULT, DEFAULT, E'3');
-- ddl-end --
INSERT INTO public."user" (id, username, password, lastlogin, "creationDate", id_employee) VALUES (E'4', E'juan', E'password', DEFAULT, DEFAULT, E'2');
-- ddl-end --

-- object: employee_fk | type: CONSTRAINT --
-- ALTER TABLE public."user" DROP CONSTRAINT IF EXISTS employee_fk CASCADE;
ALTER TABLE public."user" ADD CONSTRAINT employee_fk FOREIGN KEY (id_employee)
REFERENCES public.employee (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_uq | type: CONSTRAINT --
-- ALTER TABLE public."user" DROP CONSTRAINT IF EXISTS user_uq CASCADE;
ALTER TABLE public."user" ADD CONSTRAINT user_uq UNIQUE (id_employee);
-- ddl-end --

-- object: employee_fk | type: CONSTRAINT --
-- ALTER TABLE public.payslip DROP CONSTRAINT IF EXISTS employee_fk CASCADE;
ALTER TABLE public.payslip ADD CONSTRAINT employee_fk FOREIGN KEY (employeeid)
REFERENCES public.employee (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: payslip_fk | type: CONSTRAINT --
-- ALTER TABLE public.hour DROP CONSTRAINT IF EXISTS payslip_fk CASCADE;
ALTER TABLE public.hour ADD CONSTRAINT payslip_fk FOREIGN KEY (payslipid)
REFERENCES public.payslip (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.sell | type: TABLE --
-- DROP TABLE IF EXISTS public.sell CASCADE;
CREATE TABLE public.sell(
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
	CONSTRAINT sell_pk PRIMARY KEY (id)

);
-- ddl-end --

-- object: public.product | type: TABLE --
-- DROP TABLE IF EXISTS public.product CASCADE;
CREATE TABLE public.product(
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
	"id_productType" integer,
	name varchar(255),
	description varchar(255),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT product_pk PRIMARY KEY (id)

);
-- ddl-end --

-- object: public."productType" | type: TABLE --
-- DROP TABLE IF EXISTS public."productType" CASCADE;
CREATE TABLE public."productType"(
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(255),
	description varchar(255),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "productType_pk" PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Koru', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Twist', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Hei-Matau', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Manaia', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Circle', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Tiki', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Toki', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Whale', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Dolphin', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public."productType" (id, name, description, "createdAt", "updatedAt") VALUES (DEFAULT, E'Turtle', DEFAULT, DEFAULT, DEFAULT);
-- ddl-end --

-- object: public."operationType" | type: TABLE --
-- DROP TABLE IF EXISTS public."operationType" CASCADE;
CREATE TABLE public."operationType"(
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
	description varchar(255),
	name varchar(200),
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now(),
	CONSTRAINT "operationType_pk" PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public."operationType" (id, description, name) VALUES (DEFAULT, DEFAULT, E'input');
-- ddl-end --
INSERT INTO public."operationType" (id, description, name) VALUES (DEFAULT, DEFAULT, E'output');
-- ddl-end --

-- object: public.inventory | type: TABLE --
-- DROP TABLE IF EXISTS public.inventory CASCADE;
CREATE TABLE public.inventory(
	id integer NOT NULL DEFAULT nextval('public.sec_inventory'::regclass),
	description varchar(255),
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now(),
	amount smallint DEFAULT 0,
	"id_productType" integer,
	id_size integer,
	CONSTRAINT inventory_pk PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public.inventory (id, description, "createdAt", "updatedAt", amount, "id_productType", id_size) VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'50', E'7', E'1');
-- ddl-end --
INSERT INTO public.inventory (id, description, "createdAt", "updatedAt", amount, "id_productType", id_size) VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'15', E'1', E'1');
-- ddl-end --
INSERT INTO public.inventory (id, description, "createdAt", "updatedAt", amount, "id_productType", id_size) VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'1', E'2', E'2');
-- ddl-end --
INSERT INTO public.inventory (id, description, "createdAt", "updatedAt", amount, "id_productType", id_size) VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'1', E'3', E'2');
-- ddl-end --
INSERT INTO public.inventory (id, description, "createdAt", "updatedAt", amount, "id_productType", id_size) VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'2', E'7', E'2');
-- ddl-end --
INSERT INTO public.inventory (id, description, "createdAt", "updatedAt", amount, "id_productType", id_size) VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'30', E'3', E'3');
-- ddl-end --

-- object: "productType_fk" | type: CONSTRAINT --
-- ALTER TABLE public.product DROP CONSTRAINT IF EXISTS "productType_fk" CASCADE;
ALTER TABLE public.product ADD CONSTRAINT "productType_fk" FOREIGN KEY ("id_productType")
REFERENCES public."productType" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: "productType_fk" | type: CONSTRAINT --
-- ALTER TABLE public.inventory DROP CONSTRAINT IF EXISTS "productType_fk" CASCADE;
ALTER TABLE public.inventory ADD CONSTRAINT "productType_fk" FOREIGN KEY ("id_productType")
REFERENCES public."productType" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.size | type: TABLE --
-- DROP TABLE IF EXISTS public.size CASCADE;
CREATE TABLE public.size(
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(255),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT size_pk PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public.size (id, name, "createdAt", "updatedAt") VALUES (DEFAULT, E'small', DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public.size (id, name, "createdAt", "updatedAt") VALUES (DEFAULT, E'medium', DEFAULT, DEFAULT);
-- ddl-end --
INSERT INTO public.size (id, name, "createdAt", "updatedAt") VALUES (DEFAULT, E'largue', DEFAULT, DEFAULT);
-- ddl-end --

-- object: size_fk | type: CONSTRAINT --
-- ALTER TABLE public.inventory DROP CONSTRAINT IF EXISTS size_fk CASCADE;
ALTER TABLE public.inventory ADD CONSTRAINT size_fk FOREIGN KEY (id_size)
REFERENCES public.size (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.operation | type: TABLE --
-- DROP TABLE IF EXISTS public.operation CASCADE;
CREATE TABLE public.operation(
	id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ,
	name varchar(255),
	description varchar,
	"id_operationType" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT operation_pk PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public.operation (id, name, description, "id_operationType") VALUES (DEFAULT, E'New piece', DEFAULT, E'1');
-- ddl-end --
INSERT INTO public.operation (id, name, description, "id_operationType") VALUES (DEFAULT, E'Restoration', DEFAULT, E'1');
-- ddl-end --
INSERT INTO public.operation (id, name, description, "id_operationType") VALUES (DEFAULT, E'Sale', DEFAULT, E'2');
-- ddl-end --
INSERT INTO public.operation (id, name, description, "id_operationType") VALUES (DEFAULT, E'Damage', DEFAULT, E'2');
-- ddl-end --

-- object: "operationType_fk" | type: CONSTRAINT --
-- ALTER TABLE public.operation DROP CONSTRAINT IF EXISTS "operationType_fk" CASCADE;
ALTER TABLE public.operation ADD CONSTRAINT "operationType_fk" FOREIGN KEY ("id_operationType")
REFERENCES public."operationType" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.movement | type: TABLE --
-- DROP TABLE IF EXISTS public.movement CASCADE;
CREATE TABLE public.movement(
	id integer NOT NULL DEFAULT nextval('public.sec_movement'::regclass),
	description varchar(255),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	amount smallint DEFAULT 0,
	id_size integer,
	id_operation integer,
	"id_productType" integer,
	username varchar(11),
	CONSTRAINT movement_pk PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public.movement (id, description, "createdAt", "updatedAt", amount, id_size, id_operation, "id_productType") VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'2', E'1', E'1', E'7');
-- ddl-end --
INSERT INTO public.movement (id, description, "createdAt", "updatedAt", amount, id_size, id_operation, "id_productType") VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, E'1', E'2', E'1', E'7');
-- ddl-end --

-- object: size_fk | type: CONSTRAINT --
-- ALTER TABLE public.movement DROP CONSTRAINT IF EXISTS size_fk CASCADE;
ALTER TABLE public.movement ADD CONSTRAINT size_fk FOREIGN KEY (id_size)
REFERENCES public.size (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: operation_fk | type: CONSTRAINT --
-- ALTER TABLE public.movement DROP CONSTRAINT IF EXISTS operation_fk CASCADE;
ALTER TABLE public.movement ADD CONSTRAINT operation_fk FOREIGN KEY (id_operation)
REFERENCES public.operation (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: "productType_fk" | type: CONSTRAINT --
-- ALTER TABLE public.movement DROP CONSTRAINT IF EXISTS "productType_fk" CASCADE;
ALTER TABLE public.movement ADD CONSTRAINT "productType_fk" FOREIGN KEY ("id_productType")
REFERENCES public."productType" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.rol | type: TABLE --
-- DROP TABLE IF EXISTS public.rol CASCADE;
CREATE TABLE public.rol(
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(255),
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now(),
	CONSTRAINT rol_pk PRIMARY KEY (id)

);
-- ddl-end --

-- object: public.resource | type: TABLE --
-- DROP TABLE IF EXISTS public.resource CASCADE;
CREATE TABLE public.resource(
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(255),
	id_rol integer,
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now()
);
-- ddl-end --

-- object: public."userRol" | type: TABLE --
-- DROP TABLE IF EXISTS public."userRol" CASCADE;
CREATE TABLE public."userRol"(
	id_user integer,
	id_rol integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public."userRol" DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public."userRol" ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: rol_fk | type: CONSTRAINT --
-- ALTER TABLE public."userRol" DROP CONSTRAINT IF EXISTS rol_fk CASCADE;
ALTER TABLE public."userRol" ADD CONSTRAINT rol_fk FOREIGN KEY (id_rol)
REFERENCES public.rol (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: rol_fk | type: CONSTRAINT --
-- ALTER TABLE public.resource DROP CONSTRAINT IF EXISTS rol_fk CASCADE;
ALTER TABLE public.resource ADD CONSTRAINT rol_fk FOREIGN KEY (id_rol)
REFERENCES public.rol (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.activity | type: TABLE --
-- DROP TABLE IF EXISTS public.activity CASCADE;
CREATE TABLE public.activity(
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(50),
	description varchar(255),
	CONSTRAINT activity_pk PRIMARY KEY (id)

);
-- ddl-end --

-- object: activity_fk | type: CONSTRAINT --
-- ALTER TABLE public.hour DROP CONSTRAINT IF EXISTS activity_fk CASCADE;
ALTER TABLE public.hour ADD CONSTRAINT activity_fk FOREIGN KEY (id_activity)
REFERENCES public.activity (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public."order" | type: TABLE --
-- DROP TABLE IF EXISTS public."order" CASCADE;
CREATE TABLE public."order"(
	id integer NOT NULL DEFAULT nextval('public.sec_order'::regclass),
	"updatedAt" timestamp DEFAULT now(),
	"createdAt" timestamp DEFAULT now(),
	"id_orderStatus" integer,
	id_customer integer,
	CONSTRAINT order_pk PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public."order" (id, "createdAt", "id_orderStatus", id_customer) VALUES (E'1', DEFAULT, E'1', E'1');
-- ddl-end --

-- object: public.catalog | type: TABLE --
-- DROP TABLE IF EXISTS public.catalog CASCADE;
CREATE TABLE public.catalog(
	code varchar(4) NOT NULL,
	description varchar(255),
	CONSTRAINT catalog_pk PRIMARY KEY (code)

);
-- ddl-end --

-- object: public."typeCatalog" | type: TABLE --
-- DROP TABLE IF EXISTS public."typeCatalog" CASCADE;
CREATE TABLE public."typeCatalog"(

);
-- ddl-end --

-- object: public."orderStatus" | type: TABLE --
-- DROP TABLE IF EXISTS public."orderStatus" CASCADE;
CREATE TABLE public."orderStatus"(
	id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ,
	name varchar(50),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "orderStatus_pk" PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public."orderStatus" (id, name) VALUES (E'1', E'Received');
-- ddl-end --
INSERT INTO public."orderStatus" (id, name) VALUES (E'2', E'Closed');
-- ddl-end --
INSERT INTO public."orderStatus" (id, name) VALUES (E'3', E'In progress');
-- ddl-end --

-- object: "orderStatus_fk" | type: CONSTRAINT --
-- ALTER TABLE public."order" DROP CONSTRAINT IF EXISTS "orderStatus_fk" CASCADE;
ALTER TABLE public."order" ADD CONSTRAINT "orderStatus_fk" FOREIGN KEY ("id_orderStatus")
REFERENCES public."orderStatus" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.customer | type: TABLE --
-- DROP TABLE IF EXISTS public.customer CASCADE;
CREATE TABLE public.customer(
	id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ,
	"firstName" varchar(100),
	"lastName" varchar(100),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT customer_pk PRIMARY KEY (id)

);
-- ddl-end --

INSERT INTO public.customer (id, "firstName", "lastName") VALUES (E'1', E'steve', E'simmons');
-- ddl-end --

-- object: customer_fk | type: CONSTRAINT --
-- ALTER TABLE public."order" DROP CONSTRAINT IF EXISTS customer_fk CASCADE;
ALTER TABLE public."order" ADD CONSTRAINT customer_fk FOREIGN KEY (id_customer)
REFERENCES public.customer (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.parameter | type: TABLE --
-- DROP TABLE IF EXISTS public.parameter CASCADE;
CREATE TABLE public.parameter(
	code varchar(9) NOT NULL,
	value varchar(255),
	label varchar(150),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT parameter_pk PRIMARY KEY (code)

);
-- ddl-end --

INSERT INTO public.parameter (code, value, label) VALUES (E'COM_ADDR', E' 283 Karangahape Road, Samoa House', E'Company address');
-- ddl-end --
INSERT INTO public.parameter (code, value, label) VALUES (E'COM_NAME', E'Oro Negro', E'Company name');
-- ddl-end --
INSERT INTO public.parameter (code, value, label) VALUES (E'TAX_PERC', E'4', E'Tax Percentage');
-- ddl-end --
INSERT INTO public.parameter (code, value, label) VALUES (E'COST_HOUR', E'15', E'Cost per hour (NZD)');
-- ddl-end --


