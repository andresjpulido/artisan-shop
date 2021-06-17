'use strict'

import model from '../models/index';

import { getNameOfDay } from '../util';
import { generatePdf } from '../utilPdf';

const fs = require("fs");
//const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

const { payslip } = model;

class Payslips {

  static create(req, res) {

    const { description, employeeid, isprocessed } = req.body
    const { userId } = req.params

    //TODO obtener los identificadores de los registros de las horas para enlazarlos al payslip

    return payslip
      .create({
        description, isprocessed, employeeid
      })
      .then(emp => res.status(201).send({
        message: `payslip ${description} has been created successfully `,
        emp
      }))
      .catch(function (err) {
        console.log(" se petaquio esta joda", err)
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        })
      }
      )
  }

  static getPayslips(req, res) {
    console.log("getPayslips")
    return payslip.findAll().then(payslips => res.status(200).send(payslips));
  }

  static getPayslipsByUserId(req, res) {
    console.log("getPayslipsByUserId " + req.params.userid)

    if (!req.params.userid) {
      return res.status(404).send({
        message: 'No records',
      })
    }

    return payslip.findAll({
      where: {
        employeeid: req.params.userid
      }
    }).then(payslips => res.status(200).send(payslips));
  }

  static getHoursByUserId(req, res) {
    return payslip.findAll({
      where: {
        employeeid: req.params.userid
      }
    }).then(payslips => res.status(200).send(payslips));
  }



  static getPayslipsById_(req, res) {

    console.log("req.params.payslipid " + req.params.payslipid)
    if (!req.params.payslipid) {
      return res.status(404).send({
        message: 'No records',
      })
    }

    //TODO hacer la sumatoria de todas las horas disponibles para un empleado en particular

    return payslip.findAll({
      where: {
        id: req.params.payslipid
      }
    }).then(payslips => res.status(200).send(payslips));

  }


  static readPayslip(req, res) {

    const { company, empid, isprocessed } = req.params
    var c = req.params.company

    //TODO find out companyname, company address
    const companyName = "Oro Negro";
    const companyAddress = "283 Karangahape Road, Samoa House"
    const period = "16/07/2018 to 22/07/2018"
    const hourValue = '16.50'
    const bankAccountName = 'Andres Pulido'
    const employeeName = 'Andres Pulido B'
    const position = 'Jeller'
    const irdNumber = '126-075-219'
    const taxCode = 'M'
    const hoursDB = [
      {
        "id": 1,
        "id_emp": 1,
        "activity": "polishing",
        "isPaid": false,
        "start_date": "2019-10-01T13:00:00.000Z",
        "end_date": "2019-10-01T18:30:00.000Z",
        "createdAt": "2019-11-21",
        "updatedAt": "2019-11-21"
      },
      {
        "id": 2,
        "id_emp": 1,
        "activity": "polishing",
        "isPaid": false,
        "start_date": "2019-10-02T13:30:00.000Z",
        "end_date": "2019-10-02T18:00:00.000Z",
        "createdAt": "2019-11-21",
        "updatedAt": "2019-11-21"
      }
    ]

    var hoursList = []
    var totalHoursValue = 0;
    var dayValue = 0;
    var hours = 0;
    var tax = 1;
    var total = 0;
    var dateFormated = ''
    console.log("hoursDB.length " + hoursDB.length)

    for (var i = 0; i < hoursDB.length; i++) {
      var d = new Date(hoursDB[i].end_date);
      var dateFormated = d.getDate() + "/" + (d.getMonth() + 1) + " " + getNameOfDay(d.getDay());
      //+ " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
      hours = (new Date(hoursDB[i].end_date).getTime() - new Date(hoursDB[i].start_date).getTime()) / (1000 * 60 * 60);
      dayValue = hourValue * hours;
      totalHoursValue = totalHoursValue + dayValue
      hoursList.push([dateFormated, hours, hourValue, dayValue])
    }

    hoursList.push(['Basic Income -  worked hours:', hours, '', ''])
    hoursList.push(['PAYE incl. EL (ACC)', '', '', tax])
    total = totalHoursValue - tax;
    hoursList.push(['Take Home Pay:', '', '', total])

    console.log("req.body, req.params" + req.body, req.params)
    console.log(hoursList)

    //http://pdfmake.org/playground.html

    var docDefinition = {
      content: [
        {
          text: ['Employee Payslip'],
          style: 'header1'
        },
        {
          text: [companyName + ', ' + companyAddress],
          style: 'subheader'
        },
        {
          text: ['Period - ' + period],
          style: 'subheader'
        },
        {
          style: 'table1',
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              [{ text: 'Employee Name:', style: 'label' }, employeeName,
              { text: 'Position:', style: 'label' }, position],
              [{ text: 'IRD Number :', style: 'label' }, irdNumber,
              { text: 'Tax Code :', style: 'label' }, taxCode]
            ]
          },
          layout: 'noBorders'
        },
        {
          text: 'Gross Taxable Income',
          style: 'header2'
        },
        {
          style: 'tableEmployee',
          table: {
            widths: ['*', '*', '*', '*'],
            body: hoursList
          },
          layout: 'noBorders'
        },
        {
          text: 'Payment Detail',
          style: 'header2'
        },
        {
          style: 'tableEmployee',
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              ['Kiwi Bank', '38-9019-0652827-00', bankAccountName, '$' + total]
            ]
          },
          layout: 'noBorders',
        }/*,  
      {
        text: 'Year To Date - Tax Year Summary (From 01/04/2018)',
        style: 'header2'
      }, 
      {
        style: 'tableEmployee',
        table: {
          widths: ['*', '*', '*', '*'],
          body: [ 
            ['Taxable Gross Earnings', '$1,608.75'],
            ['P.A.Y.E.', '$209.65'] 
          ]
        },
        layout: 'noBorders',
      }, */
      ],
      styles: {
        header1: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 0]
        },
        subheader: {
          fontSize: 10,
          alignment: 'center',
          margin: [0, 0, 0, 0]
        },
        header2: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
          margin: [0, 20, 60, 0]
        },
        table1: {
          margin: [45, 40, 0, 15]
        },
        tableEmployee: {
          margin: [45, 20, 0, 15]
        },
        textEmployer: {
          alignment: 'center',
          fontSize: 10,
          margin: [45, 20, 0, 15]
        },
        label: {
          bold: true
        }
      },
      defaultStyle: {
        // alignment: 'justify' 

      }
    };

/*
    var fontDescriptors = {
      Roboto: {
        normal: fontPath('Roboto-Regular.ttf'),
        bold: fontPath('Roboto-Medium.ttf'),
        italics: fontPath('Roboto-Italic.ttf'),
        bolditalics: fontPath('Roboto-Italic.ttf'),

      }
    }*/

    //var printer = new pdfMakePrinter(fontDescriptors);
    var fs = require('fs');

    //var pdfDoc = printer.createPdfKitDocument(docDefinition);
    //pdfDoc.pipe(fs.createWriteStream('pdfs/tables.pdf'));
    //pdfDoc.end();

    return docDefinition;
    /*
    generatePdf(docDefinition, (response) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(response); // sends a base64 encoded string to client
    });
*/
  }


}

export default Payslips;
