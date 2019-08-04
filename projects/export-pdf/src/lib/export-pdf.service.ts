import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {
  constructor() {}
  createPDF(data: object, head: object, orientation= 'potrait') {
    const doc = new jsPDF({
      orientation
    });
    doc.autoTable({
      head: [head],
      body: data
    });

    doc.save('Export.pdf');
  }
}
