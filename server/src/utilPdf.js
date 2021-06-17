import pdfMakePrinter from 'pdfmake/src/printer';
import path from 'path';

function fontPath(file) {
    return path.resolve('Roboto', file);
}

function generatePdf(docDefinition, callback) {

    var fontDescriptors = {
        Roboto: {
            normal: fontPath('Roboto-Regular.ttf'),
            bold: fontPath('Roboto-Medium.ttf'),
            italics: fontPath('Roboto-Italic.ttf'),
            bolditalics: fontPath('Roboto-Italic.ttf'),
        }
    };

    try {

        const printer = new pdfMakePrinter(fontDescriptors);
        const doc = printer.createPdfKitDocument(docDefinition);

        let chunks = [];

        doc.on('data', (chunk) => {
            chunks.push(chunk);
        });

        doc.on('end', () => {
            //const result = Buffer.concat(chunks);
            //callback('data:application/pdf;base64,' + result.toString('base64'));
            callback(Buffer.concat(chunks));
        });

        doc.end();

    } catch (err) {
        throw (err);
    }
};


export { generatePdf }