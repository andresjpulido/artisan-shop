"use strict";

import model from "../models/index";
import { Service, Inject } from "typedi";
import { getNameOfDay } from "../utils/util";
import { generatePdf } from "../utils/utilPdf";
import parameterService from "./parameterService";

const fs = require("fs");
//const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

const { payslip } = model;

@Service()
export default class payslipPDFService {
	constructor() {}

	private getParam(params, code) {
		for (var i = 0; i < params.length; i++) {
			if (params[i].code === code) {
				return params[i].value;
			}
		}
	}

	public readPayslip(dataObj: any) {
		
console.log("dataObj", dataObj)

		const employee = dataObj.payslip.employee;
 
		//TODO find out companyname, company address
		const companyName = this.getParam(dataObj.params, "COM_NAME");
		const companyAddress = this.getParam(dataObj.params, "COM_ADDR");
		const taxCode = this.getParam(dataObj.params, "TAX_CODE");
		const hourValue = this.getParam(dataObj.params, "COST_HOUR");

		const bankName = employee.bankName;
		const employeeName = employee.firstName + " " + employee.lastName;
		const position = employee.position;
		const irdNumber = employee.ird;

		const period = dataObj.payslip.period;
		const total = dataObj.payslip.total;
		const taxes = dataObj.payslip.taxes;
		const hours = dataObj.payslip.hours;
		const hoursDB = dataObj.hours;

		var hoursList = [];
		var dayValue = 0;
		var dateFormated = "";

		for (var i = 0; i < hoursDB.length; i++) {
			var d = new Date(hoursDB[i].start_date);
			dateFormated =	d.getDate() + "/" + (d.getMonth() + 1) + " " + getNameOfDay(d.getDay());
			dayValue = hoursDB[i].amount * hoursDB[i].hourValue;
			hoursList.push([dateFormated, hoursDB[i].amount, hoursDB[i].hourValue, dayValue]);
		}

		hoursList.push(["Basic Income -  worked hours:", hours, "", ""]);
		hoursList.push(["PAYE incl. EL (ACC)", "", "", taxes]);
		hoursList.push(["Take Home Pay:", "", "", total]);

		//http://pdfmake.org/playground.html

		var docDefinition = {
			content: [
				{
					text: ["Employee Payslip"],
					style: "header1",
				},
				{
					text: [companyName + ", " + companyAddress],
					style: "subheader",
				},
				{
					text: ["Period - " + period],
					style: "subheader",
				},
				{
					style: "table1",
					table: {
						widths: ["*", "*", "*", "*"],
						body: [
							[
								{ text: "Employee Name:", style: "label" },
								employeeName,
								{ text: "Position:", style: "label" },
								position,
							],
							[
								{ text: "IRD Number :", style: "label" },
								irdNumber,
								{ text: "Tax Code :", style: "label" },
								taxCode,
							],
						],
					},
					layout: "noBorders",
				},
				{
					text: "Gross Taxable Income",
					style: "header2",
				},
				{
					style: "tableEmployee",
					table: {
						widths: ["*", "*", "*", "*"],
						body: hoursList,
					},
					layout: "noBorders",
				},
				{
					text: "Payment Detail",
					style: "header2",
				},
				{
					style: "tableEmployee",
					table: {
						widths: ["*", "*", "*", "*"],
						body: [[bankName, "38-9019-0652827-00", employeeName, "$" + total]],
					},
					layout: "noBorders",
				},
			],
			styles: {
				header1: {
					fontSize: 18,
					bold: true,
					alignment: "center",
					margin: [0, 10, 0, 0],
				},
				subheader: {
					fontSize: 10,
					alignment: "center",
					margin: [0, 0, 0, 0],
				},
				header2: {
					fontSize: 14,
					bold: true,
					alignment: "center",
					margin: [0, 20, 60, 0],
				},
				table1: {
					margin: [45, 40, 0, 15],
				},
				tableEmployee: {
					margin: [45, 20, 0, 15],
				},
				textEmployer: {
					alignment: "center",
					fontSize: 10,
					margin: [45, 20, 0, 15],
				},
				label: {
					bold: true,
				},
			},
			defaultStyle: {
				// alignment: 'justify'
			},
		};

		return docDefinition;
	}
}
