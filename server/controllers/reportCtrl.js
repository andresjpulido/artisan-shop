'use strict'

import data from './response.json'


class Reports {

    static production(req, res) {
        return res.status(200).send(data)  ;
    }

}

export default Reports;