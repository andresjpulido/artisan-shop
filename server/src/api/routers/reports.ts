import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import reportService from "../../services/reportService";
import { Container } from "typedi";

const auth = require("../middlewares/auth");
const route = Router();
 
export default (app) => {
	app.get("/productionreport", async (req, res, next) => {
		//TODO validate inputs
		const startDate = req.query.startDate;
		const lastDate = req.query.lastDate;

		const serviceInstance = Container.get(reportService);
		const list = await serviceInstance.production(startDate, lastDate);

		//create the structure of the report

		let report = {
			weeks: [],
			total: 0,
			period: startDate + " - " + lastDate,
		};

		let firstdayofweek = "";

		for (var i = 0; i < list.length; i++) {
			
			report.total = report.total + list[i].amount;

			if (i === 0) {
				firstdayofweek = list[i].firstdayofweek;
				report.weeks.push({
					period: list[i].firstdayofweek + " " + list[i].firstdayofweek,
					items: [{ product: list[i].name, amount: list[i].amount }],
					total: list[i].amount
				});
                continue;
			
			}  

            if(list[i].firstdayofweek === firstdayofweek ){                
                report.weeks[report.weeks.length-1].period = list[i].firstdayofweek + " " + list[i].firstdayofweek,
                report.weeks[report.weeks.length-1].items.push({ product: list[i].name, amount: list[i].amount })
                report.weeks[report.weeks.length-1].total = report.weeks[report.weeks.length-1].total + list[i].amount
               
            } else{
                firstdayofweek = list[i].firstdayofweek;
				report.weeks.push({                    
					period: list[i].firstdayofweek + " " + list[i].firstdayofweek,
					total: list[i].amount,
					items: [{ product: list[i].name, amount: list[i].amount }],
				});

            }
           
		}

		return res.json(report);
	});
};
