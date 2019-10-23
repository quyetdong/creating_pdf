const fs = require('fs');
const puppeteer = require('puppeteer');
// Build paths
const { htmlFilePath, pdfFilePath } = require('./lib/buildPaths');

const printPdf = async () => {
	console.log('Starting: Generating PDF Process, Kindly wait ..');
	/** Launch a headleass browser */
	const browser = await puppeteer.launch();

	/* 1- Ccreate a newPage() object. It is created in default browser context. */
	const page = await browser.newPage();
	console.log('---browser to newpage ok ----', htmlFilePath);
	/* 2- Will open our generated `.html` file in the new Page instance. */
	await page.goto('file:' + htmlFilePath, { waitUntil: 'networkidle0' });
	console.log('---page goto ok----');
	/* 3- Take a snapshot of the PDF */
	const pdf = await page.pdf({
		format: 'A4',
		margin: {
			top: '5mm',
			right: '8mm',
			bottom: '8mm',
			left: '5mm'
		}
	});
	/* 4- Cleanup: close browser. */
	await browser.close();
	console.log('Ending: Generating PDF Process');
	
	return pdf;
};

const init = async () => {
	try {
		const pdf = await printPdf();
		fs.writeFileSync(pdfFilePath, pdf);
		console.log('Succesfully created an PDF table');
	} catch (error) {
		console.log('Error generating PDF', error);
	}
};

init();