import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import PayslipsCtrl from "../../controllers/payslipCtrl";
import PayslipsPDFCtrl from "../../controllers/payslipPDFCtrl";
import payslipPDFService from "../../services/payslipPDFService";
import payslipService from "../../services/payslipService";
import hourService from "../../services/hourService";
import { Container } from "typedi";
const auth = require("../middlewares/auth");
const route = Router();
import { generatePdf } from "../../utilPdf";
import parameterService from "../../services/parameterService";

export default (app) => {
	//app.get('/payslips/:payslipid', PayslipsCtrl.getPayslipsById)
	//app.get('/payslippdf/:payslipid', PayslipsPDFCtrl.readPayslip)
	// app.post('/payslip', PayslipsCtrl.create)
	//app.get('/payslips', auth, PayslipsCtrl.getPayslips)
	//app.get('/payslips', PayslipsCtrl.getPayslips)

	app.get("/payslippdf/:payslipid", async (req, res, next) => {
		const payslipid = req.params.payslipid;
		const payslipInstance = Container.get(payslipPDFService);
		const serviceInstance = Container.get(payslipService);
		const parameterInstance = Container.get(parameterService);
		const hourInstance = Container.get(hourService);
		const payslip = await serviceInstance.getOne(payslipid);
		const params = await parameterInstance.getAll();
		const hours = await hourInstance.getAllbyPayslipId(payslipid);
		let dataObj = { params: params, hours: hours, payslip: payslip };
		//TODO get hour by payslip

		const docDefinition = await payslipInstance.readPayslip(dataObj);
		generatePdf(docDefinition, (response) => {
			res.setHeader("Content-Type", "application/pdf");
			res.send(response); // sends a base64 encoded string to client
		});
	});

	app.get("/payslips", async (req, res, next) => {
		let query = req.query;
		const serviceInstance = Container.get(payslipService);
		const list = await serviceInstance.getAll(query);
		return res.json(list);
	});
	app.get("/payslips/:payslipid", async (req, res, next) => {
		const serviceInstance = Container.get(payslipService);
		const id = req.params.id;
		const list = await serviceInstance.getOne(id);
		return res.json(list);
	});
	app.put("/payslips", async (req, res, next) => {
		const serviceInstance = Container.get(payslipService);
		const list = await serviceInstance.update(req.body);
		return res.json(list);
	});
	app.post("/payslips", async (req, res, next) => {
		const serviceInstance = Container.get(payslipService);
		const payslip = await serviceInstance.create(req.body);
		let IDs = req.body.hoursIDs;
		const hourInstance = Container.get(hourService);
		console.log("payslip " , payslip.id)
		let payslipId = parseInt(payslip.id,10);
		if (IDs && IDs.length > 0) {
			for (var i = 0; i < IDs.length; i++) {
				hourInstance.update({id:IDs[i], isPaid:true, payslipid:payslipId})
			}
		}
		return res.json(payslip);
	});
	app.delete("/payslips/:id", async (req, res, next) => {
		const serviceInstance = Container.get(payslipService);
		const id = req.params.id;
		const list = await serviceInstance.delete(id);
		return res.json(list);
	});
};
