import { Service, Inject } from "typedi";
import model from "../models";

@Service()
export default class customerService {

	public async create(hourObj) {
		const { hour } = model;
		return hour.create(hourObj);
	}

	public async getAll(queryObj) {
		console.log("queryObj", queryObj)
		const { hour } = model;
		return hour.findAll({
			where: queryObj,
			include: [],
			order: [["id"]],
		});
	}

    public async getAllbyPayslipId(payslipid) {
		const { hour, employee } = model;
		return hour.findAll(
            { where: { payslipid: payslipid }, include : [employee] }
        );
	}

	public async getOne(id) {
		const { hour } = model;
		return hour.findOne({
			where: {
				id: id,
			}
		});
	}

	public async getHoursByUserId(req, res) {
		const { hour } = model;
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
	}

	public async delete(id) {
		const { hour } = model;
		return await hour.findOne({ where: { id: id } });
	}

	public async deleteCollection(ids, username) {
	
		const { hour } = model;

		try {
			return await hour.destroy({ where: { id: ids } });
			 
		} catch (e) {
			console.log(e);
			return {};
		}
	}
 
	public async update(hourObj: any) {
		const { hour } = model;
		console.log(hourObj)
        await hour.update(hourObj, {
			where: {
			  id: hourObj.id
			}
		  });
    }
}
