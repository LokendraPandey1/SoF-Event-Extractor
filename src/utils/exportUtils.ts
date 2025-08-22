import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export interface LaytimeData {
  vesselName: string;
  port: string;
  cargo: string;
  charterParty: string;
  laycanPeriod: string;
  totalTimeUsed: string;
  excludedTime: string;
  netLaytime: string;
  balance: string;
  dispatch: string;
  status: string;
}

export interface ExtractedEvent {
  timestamp: string;
  event: string;
  status: 'operational' | 'waiting' | 'delay';
  description: string;
}

export const generatePDFReport = (laytimeData: LaytimeData, events: ExtractedEvent[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('LAYTIME STATEMENT', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${laytimeData.vesselName} - January 2024`, 105, 30, { align: 'center' });
  
  // Vessel Details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Vessel Details', 20, 50);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Vessel: ${laytimeData.vesselName}`, 20, 60);
  doc.text(`Port: ${laytimeData.port}`, 20, 68);
  doc.text(`Cargo: ${laytimeData.cargo}`, 20, 76);
  doc.text(`Charter Party: ${laytimeData.charterParty}`, 20, 84);
  
  // Laytime Terms
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Laytime Terms', 110, 50);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Laytime Allowed: ${laytimeData.laycanPeriod}`, 110, 60);
  doc.text('Rate: PWWD SHEX', 110, 68);
  doc.text('Demurrage: $8,500/day', 110, 76);
  doc.text('Dispatch: $4,250/day', 110, 84);
  
  // Events Table
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Event Timeline', 20, 105);
  
  // Table headers
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Date/Time', 20, 115);
  doc.text('Event', 60, 115);
  doc.text('Status', 120, 115);
  doc.text('Description', 150, 115);
  
  // Table content
  doc.setFont('helvetica', 'normal');
  let yPos = 125;
  events.forEach((event, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.text(event.timestamp, 20, yPos);
    doc.text(event.event, 60, yPos);
    doc.text(event.status, 120, yPos);
    
    // Wrap description text
    const description = event.description;
    if (description.length > 30) {
      doc.text(description.substring(0, 30) + '...', 150, yPos);
    } else {
      doc.text(description, 150, yPos);
    }
    
    yPos += 8;
  });
  
  // Summary
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('LAYTIME CALCULATION SUMMARY', 20, yPos);
  
  yPos += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Time Used: ${laytimeData.totalTimeUsed}`, 20, yPos);
  doc.text(`Excluded Time: ${laytimeData.excludedTime}`, 20, yPos + 8);
  doc.text(`Net Laytime: ${laytimeData.netLaytime}`, 20, yPos + 16);
  doc.text(`Balance: ${laytimeData.balance}`, 20, yPos + 24);
  
  // Final result
  yPos += 40;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 128, 0);
  doc.text(`DISPATCH PAYABLE: ${laytimeData.dispatch}`, 20, yPos);
  
  // Save the PDF
  doc.save('Laytime_Statement_Pacific_Glory.pdf');
};

export const generateExcelReport = (laytimeData: LaytimeData, events: ExtractedEvent[]) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Vessel Information Sheet
  const vesselInfo = [
    ['LAYTIME STATEMENT'],
    [''],
    ['Vessel Details', ''],
    ['Vessel Name', laytimeData.vesselName],
    ['Port', laytimeData.port],
    ['Cargo', laytimeData.cargo],
    ['Charter Party', laytimeData.charterParty],
    [''],
    ['Laytime Terms', ''],
    ['Laytime Allowed', laytimeData.laycanPeriod],
    ['Rate', 'PWWD SHEX'],
    ['Demurrage Rate', '$8,500/day'],
    ['Dispatch Rate', '$4,250/day']
  ];
  
  const vesselWS = XLSX.utils.aoa_to_sheet(vesselInfo);
  XLSX.utils.book_append_sheet(wb, vesselWS, 'Vessel Info');
  
  // Events Timeline Sheet
  const eventsData = [
    ['Date/Time', 'Event', 'Status', 'Description'],
    ...events.map(event => [
      event.timestamp,
      event.event,
      event.status,
      event.description
    ])
  ];
  
  const eventsWS = XLSX.utils.aoa_to_sheet(eventsData);
  XLSX.utils.book_append_sheet(wb, eventsWS, 'Events Timeline');
  
  // Calculation Sheet
  const calculationData = [
    ['LAYTIME CALCULATION'],
    [''],
    ['Item', 'Value'],
    ['Laytime Allowed', laytimeData.laycanPeriod],
    ['Total Time Used', laytimeData.totalTimeUsed],
    ['Excluded Time', laytimeData.excludedTime],
    ['Net Laytime Used', laytimeData.netLaytime],
    ['Balance', laytimeData.balance],
    ['Status', laytimeData.status],
    [''],
    ['FINANCIAL SUMMARY'],
    ['Dispatch Payable', laytimeData.dispatch]
  ];
  
  const calcWS = XLSX.utils.aoa_to_sheet(calculationData);
  XLSX.utils.book_append_sheet(wb, calcWS, 'Calculations');
  
  // Save the Excel file
  XLSX.writeFile(wb, 'Laytime_Analysis_Pacific_Glory.xlsx');
};

export const copyDashboardLink = () => {
  const dashboardUrl = `${window.location.origin}/dashboard/pacific-glory-jan2024`;
  
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(dashboardUrl).then(() => {
      alert('Dashboard link copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      fallbackCopyTextToClipboard(dashboardUrl);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(dashboardUrl);
  }
};

const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    alert('Dashboard link copied to clipboard!');
  } catch (err) {
    alert(`Dashboard link: ${text}`);
  }
  
  document.body.removeChild(textArea);
};