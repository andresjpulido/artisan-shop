'use strict'

const express = require('express')

const utilCtrl = require('../controllers/util')
import EmployeesCtrl from '../controllers/employeeCtrl'
import PayslipsCtrl from '../controllers/payslipCtrl'
import PayslipsPDFCtrl from '../controllers/payslipPDFCtrl'
import HoursCtrl from '../controllers/hourCtrl'
import UserCtrl from '../controllers/admin/userCtrl'
import InventoryCtrl from '../controllers/inventoryCtrl'
import SizeCtrl from '../controllers/sizeCtrl'
import ParameterCtrl from '../controllers/parameterCtrl'
import ProductTypeCtrl from '../controllers/ProductTypeCtrl'
import MovementCtrl from '../controllers/movementCtrl'
import OperationCtrl from '../controllers/operationCtrl'
import StatusCtrl from '../controllers/statusCtrl'
import OrderCtrl from '../controllers/orderCtrl'
import ReportCtrl from '../controllers/reportCtrl'
import { url } from 'inspector';

const auth = require('../middlewares/auth')
const api = express.Router()
const asyncMiddleware = require('../middlewares/asyncMiddleware');
/*
api.get('/echo/:echo', utilCtrl.echo)
api.get('/', utilCtrl.test)
*/
/*
api.get('/hours', auth, HoursCtrl.getHours)
api.get('/hour/:id', auth, HoursCtrl.getHoursById)
api.get('/hours/:username/:isPaid', auth, HoursCtrl.getHoursByUserId)
api.post('/hour',  HoursCtrl.create)
*/
/*
api.post('/inventory', InventoryCtrl.createEntry)
api.get('/inventory', InventoryCtrl.findAll)
*/
/* 
api.get('/employees', auth, EmployeesCtrl.findAll)
api.post('/employee', EmployeesCtrl.create)
api.delete('/employees/:idEmp', auth, EmployeesCtrl.remove)
api.put('/employees/:idEmp', auth, EmployeesCtrl.modify)*/
/*
api.get('/movements', MovementCtrl.findAll)
api.post('/movement', MovementCtrl.new)
api.get('/movement/report/:date1/:date2', MovementCtrl.report)
api.get('/movements/:date1/:date2', MovementCtrl.findBetween)
*/
//api.get('/operations', OperationCtrl.findAll)
/*
api.get('/order', OrderCtrl.getAll)
api.get('/orders/opened', OrderCtrl.getOpened)
*/
//api.get('/payslips', PayslipsCtrl.getPayslips)
//api.get('/payslips/:userid', PayslipsCtrl.getPayslipsByUserId)
/*
api.get('/parameters', ParameterCtrl.findAll)
*/
/*
api.get('/productType', ProductTypeCtrl.findAll)
api.post('/productType', ProductTypeCtrl.create)
*/


//return pdf file
/*
api.get('/payslip/:payslipid', PayslipsCtrl.getPayslipsById)
api.get('/payslippdf/:payslipid', PayslipsPDFCtrl.getPayslipsById)
api.post('/payslip', PayslipsCtrl.create)
api.get('/payslips', auth, PayslipsCtrl.getPayslips)
*/
/*
api.get('/status', StatusCtrl.getAll)
*/
/*
api.get('/sizes', SizeCtrl.findAll)
*/
/*
api.post('/signup', UserCtrl.signUp)
api.post('/signIn', UserCtrl.signIn)
api.post('/user', auth, UserCtrl.create)
api.get('/version',UserCtrl.version )
api.post('/private', auth, UserCtrl.private) 
*/
/*
api.get('/productionreport/:startdate/:enddate', ReportCtrl.production )
*/
 
module.exports = api