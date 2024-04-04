'use strict'

const express = require('express')

const utilCtrl = require('../api/controllers/util')
import EmployeesCtrl from '../api/controllers/employeeCtrl'
import PayslipsCtrl from '../api/controllers/payslipCtrl'
import PayslipsPDFCtrl from '../api/controllers/payslipPDFCtrl'
import HoursCtrl from '../api/controllers/hourCtrl'
import UserCtrl from '../api/controllers/admin/userCtrl'
import InventoryCtrl from '../api/controllers/inventoryCtrl'
import SizeCtrl from '../api/controllers/sizeCtrl'
import ParameterCtrl from '../api/controllers/parameterCtrl'
import ProductTypeCtrl from '../api/controllers/ProductTypeCtrl'
import MovementCtrl from '../api/controllers/movementCtrl'
import OperationCtrl from '../api/controllers/operationCtrl'
import StatusCtrl from '../api/controllers/statusCtrl'
import OrderCtrl from '../api/controllers/orderCtrl'
import ReportCtrl from '../api/controllers/reportCtrl'
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