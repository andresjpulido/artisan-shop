import { Router } from 'express';
import auth from './routers/auth';
import user from './routers/user.ts';
import hours from './routers/hours.ts';
import employees from './routers/employees.ts';
import reports from './routers/reports.ts';
import inventory from './routers/inventory.ts';
import status from './routers/status.ts';
import size from './routers/size.ts';
import productType from './routers/producttype.ts';
import order from './routers/order.ts';
import parameter from './routers/parameters.ts';
import product from './routers/product.ts';
import customer from './routers/customer.ts';
import operations from './routers/operations.ts';
import movements from './routers/movements';
import image from './routers/image';
import payslip from './routers/payslips';
import rol from './routers/rol';
import resource from './routers/resource';
import location from './routers/location';

// guaranteed to get dependencies
export default () => {
	const app = Router();

	hours(app);
	user(app);
	employees(app);
	reports(app);
	inventory(app);
	status(app);
	size(app);
	productType(app);
	order(app);
	parameter(app);
	product(app);
	customer(app);
	operations(app);
	movements(app);
	image(app);
	payslip(app);
	auth(app);
	rol(app);
	resource(app);
	location(app);
	
	return app
}