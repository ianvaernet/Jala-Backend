import { FileSaver } from "./fileSaver";
import { Invoice } from "./invoice";
import { InvoiceExporter } from "./invoiceExporter";
import { Printer } from "./printer";

const invoice = new Invoice();
const invoiceExporter = new InvoiceExporter(invoice);

FileSaver.save(invoiceExporter.toPDF(), 'invoice.pdf');
Printer.print(invoiceExporter, 'A4');

