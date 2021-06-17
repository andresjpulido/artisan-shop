"use strict";

import model from "../models";

const { hour, user } = model;

class Hours {
	static create(req, res) {
		const { activity, start_date, stop_date, id_emp, amount } = req.body;
		const { userId } = req.params;

		return hour
			.create({
				activity,
				start_date,
				stop_date,
				id_emp,
				amount,
			})
			.then((emp) =>
				res.status(201).send(emp)
			)
			.catch(function (err) {
				console.log(" se petaquio esta joda", err);
				return res.status(500).send({
					success: "false",
					code: "CODE",
					message: "Error" + err,
				});
			});
	}

	static getHours(req, res) {
		return hour.findAll().then((hours) => res.status(200).send(hours));
	}

	static getHoursById(req, res) {
		return hour
			.findOne({
				where: {
					id: req.params.id,
				},
			})
			.then((hour) => res.status(200).send(hour));
	}

	static getHoursByUserId(req, res) {

		hour.sequelize
			.query(
				'select h.* from hour h inner join employee e on h.id_emp = e.id inner join "user" u on e.id = u.id_employee where u.username = ? ',
				{
					replacements: [req.params.username],
					type: hour.sequelize.QueryTypes.SELECT,
				}
			)
			.then((hours) => res.status(200).send(hours))
			.catch(function (err) {
				console.log(" se petaquio esta joda", err);
				return res.status(500).send({
					success: "false",
					code: "CODE",
					message: "Error" + err,
				});
			});

		/*
        return hour.findAll({
            where: {
              id_emp: req.params.empId,
              isPaid: req.params.isPaid
            }
        }).then(hours => res.status(200).send(hours));*/
	}

	static async delete(req, res) {
		const id = req.params.id;
		const { hour } = model;

		try {
			const cus = await hour.findOne({ where: { id: id } });
			await cus.destroy();
			return res.status(200).send();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	static async deleteCollection(req, res) {
		const ids = req.body.ids;
    	const username = req.body.username;

		const { hour } = model;
  
		try {
			//const cus = await hour.findAll({ where: { id: ids } });
			await hour.destroy({ where: { id: ids } });
			return res.status(200).send();
		} catch (e) {
			console.log(e);
			return {};
		} 

	}
}

export default Hours;
