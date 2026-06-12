const PDFDocument = require('pdfkit');

exports.generateInvoice = async (req, res) => {
  try {
    const { tenantId, amount, billingPeriod } = req.body;

    // Create a new PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Stream the PDF directly to the client as a download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Invoice-${tenantId}.pdf"`);

    doc.pipe(res);

    // Build the PDF content
    doc
      .fillColor('#4f46e5')
      .fontSize(24)
      .text('HCL SaaS Invoice', { align: 'right' })
      .moveDown();

    doc
      .fillColor('#000000')
      .fontSize(12)
      .text(`Invoice Date: ${new Date().toLocaleDateString()}`, { align: 'right' })
      .text(`Billing Period: ${billingPeriod}`, { align: 'right' })
      .moveDown(2);

    doc.fontSize(16).text('Billed To:');
    doc.fontSize(12).text(`Tenant ID: ${tenantId}`);
    doc.moveDown(2);

    doc.fontSize(16).text('Service Details');
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    doc.text('Monthly Platform Subscription', 50, doc.y, { continued: true });
    doc.text(`$${amount}`, { align: 'right' });

    doc.moveDown(2);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    doc.fontSize(16).text('Total Due:', 50, doc.y, { continued: true });
    doc.text(`$${amount}`, { align: 'right' });

    // Finalize the PDF
    doc.end();

  } catch (error) {
    console.error('Error generating PDF invoice:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate invoice' });
    }
  }
};
