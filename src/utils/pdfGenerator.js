import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (data) => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16
  });

  const itrData = data.ITR;
  const formKeys = Object.keys(itrData).filter(k => k !== 'CreationInfo');
  const formKey = formKeys[0] || 'ITR4';
  const form = itrData[formKey];
  const formMeta = form.Form_ITR4 || form.Form_ITR1 || form.Form_ITR2 || form.Form_ITR3 || {};
  const personalInfo = form.PersonalInfo;
  const incomeDeductions = form.IncomeDeductions;
  const filingStatus = form.FilingStatus;
  const taxComputation = form.TaxComputation;
  const taxPaid = form.TaxPaid?.TaxesPaid || {};
  const scheduleBP = form.ScheduleBP;
  const verification = form.Verification;
  const refund = form.Refund;
  const scheduleIT = form.ScheduleIT;
  const tdsOnOthThanSals = form.TDSonOthThanSals;
  const tdsOnSalaries = form.TDSonSalaries;
  const scheduleTCS = form.ScheduleTCS;

  const formName = form.Form_ITR4 ? 'ITR-4 (Sugam)' :
                   form.Form_ITR1 ? 'ITR-1 (Sahaj)' :
                   form.Form_ITR2 ? 'ITR-2' :
                   form.Form_ITR3 ? 'ITR-3' : formKey;
  const rawAy = formMeta.AssessmentYear || '—';
  let ay = rawAy;
  if (rawAy.includes('-')) {
    const parts = rawAy.split('-');
    if (parts[1].length === 2) {
      ay = `${parts[0]}-20${parts[1]}`;
    }
  }
  const formDesc = formMeta.FormName || '';
  const formDescription = formMeta.Description || '';
  const schemaVer = formMeta.SchemaVer || '—';
  const formVer = formMeta.FormVer || '—';

  const primary = [26, 35, 126];
  const primaryLight = [45, 55, 160];
  const secondary = [63, 81, 181];
  const accent = [255, 111, 0];
  const green = [46, 125, 50];
  const greenLight = [232, 245, 233];
  const lightGray = [245, 245, 245];
  const medGray = [235, 235, 235];
  const borderGray = [189, 189, 189];
  const darkText = [33, 33, 33];
  const medText = [80, 80, 80];
  const white = [255, 255, 255];
  const blueLight = [232, 234, 246];
  const orangeLight = [255, 243, 224];
  const redLight = [255, 235, 238];

  const W = 210;
  const H = 297; // A4 Height
  const ML = 14;
  const MR = 14;
  const MB = 35; // Increased Bottom Margin to 35mm to protect footer

  const fmt = (num) => {
    if (num === undefined || num === null || num === 0) return '0';
    return Number(num).toLocaleString('en-IN');
  };

  const sectionHead = (title) => [[{ content: title, colSpan: 2, styles: { halign: 'center', fontSize: 10, fontStyle: 'bold' } }]];

  const infoTable = (startY, head, body) => {
    doc.autoTable({
      startY,
      head,
      headStyles: { fillColor: primary, textColor: white, fontSize: 9.5, fontStyle: 'bold' },
      body,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2.2, textColor: darkText },
      columnStyles: {
        0: { cellWidth: 72, fontStyle: 'bold', fillColor: lightGray, textColor: darkText },
        1: { cellWidth: 'auto', textColor: darkText }
      },
      margin: { left: ML, right: MR, bottom: MB }
    });
  };

  const amountTable = (startY, head, body) => {
    doc.autoTable({
      startY,
      head,
      headStyles: { fillColor: primary, textColor: white, fontSize: 9.5, fontStyle: 'bold' },
      body,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2.2, textColor: darkText },
      columnStyles: {
        0: { cellWidth: 145, textColor: darkText },
        1: { cellWidth: 38, halign: 'right', textColor: darkText, fontStyle: 'bold' }
      },
      margin: { left: ML, right: MR, bottom: MB }
    });
  };

  let y = 62;

  const gap = (mm = 7) => { y = doc.lastAutoTable.finalY + mm; };

  // --- Header ---
  // Background rectangle for header
  doc.setFillColor(...primary);
  doc.rect(0, 0, W, 50, 'F'); 

  // Add a subtle white overlay for texture
  doc.setFillColor(255, 255, 255);
  doc.setGState(new doc.GState({ opacity: 0.1 }));
  doc.rect(0, 40, W, 10, 'F');
  doc.setGState(new doc.GState({ opacity: 1.0 }));

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('INCOME TAX COMPUTATION', W / 2, 22, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('DEVELOPED BY ASHISH DAS | FINACE INDIA', W / 2, 30, { align: 'center' });

  // Assessment Year Badge
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(W / 2 - 30, 35, 60, 8, 2, 2, 'F');
  doc.setTextColor(...primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`ASSESSMENT YEAR ${ay}`, W / 2, 40.5, { align: 'center' });

  // ============ 1. PERSONAL INFORMATION ============
  const name = `${personalInfo.AssesseeName.FirstName} ${personalInfo.AssesseeName.MiddleName || ''} ${personalInfo.AssesseeName.SurNameOrOrgName}`.toUpperCase();
  const addr = `${personalInfo.Address.ResidenceNo}, ${personalInfo.Address.ResidenceName || ''}, ${personalInfo.Address.LocalityOrArea}, ${personalInfo.Address.CityOrTownOrDistrict} \u2014 ${personalInfo.Address.PinCode}`;

  infoTable(y, sectionHead('PERSONAL INFORMATION'), [
    ['Name of Assessee', name],
    ['Permanent Account Number (PAN)', personalInfo.PAN],
    ['Aadhaar Number', personalInfo.AadhaarCardNo ? `XXXXXXXX ${personalInfo.AadhaarCardNo.slice(-4)}` : 'N/A'],
    ['Date of Birth / Incorporation', personalInfo.DOB],
    ['Status', personalInfo.Status === 'I' ? 'Individual' : personalInfo.Status],
    ['Mobile Number', `+91 ${personalInfo.Address.MobileNo}`],
    ['Email Address', personalInfo.Address.EmailAddress],
    ['Residential Address', addr],
  ]);

  // ============ 2. FILING INFORMATION ============
  gap();
  const filingSec = filingStatus.ReturnFileSec === 11 ? 'Section 139(1) \u2014 On or before due date' :
    filingStatus.ReturnFileSec === 12 ? 'Section 139(4) \u2014 Belated Return' :
    filingStatus.ReturnFileSec === 13 ? 'Section 139(5) \u2014 Revised Return' : `Section ${filingStatus.ReturnFileSec}`;
  const regime = filingStatus.OptOutNewTaxRegime === 'N' ? 'New Tax Regime (Default)' : 'Old Tax Regime';

  infoTable(y, sectionHead('FILING INFORMATION'), [
    ['Return Filed Under', filingSec],
    ['Tax Regime', regime],
    ['Filing Due Date', filingStatus.ItrFilingDueDate],
    ['Assessee represented by agent', filingStatus.AsseseeRepFlg === 'Y' ? 'Yes' : 'No'],
  ]);

  // ============ 3. BUSINESS INCOME (SCHEDULE BP) ============
  gap();
  const bizRows = [];
  if (scheduleBP?.NatOfBus44AD?.length) {
    scheduleBP.NatOfBus44AD.forEach(b => {
      bizRows.push(['Business / Profession Name', b.NameOfBusiness]);
      bizRows.push(['Nature of Business', b.Description]);
      bizRows.push(['Business Code (NIC)', b.CodeAD]);
      bizRows.push(['']);
    });
  }
  if (scheduleBP?.PersumptiveInc44AD) {
    const p = scheduleBP.PersumptiveInc44AD;
    bizRows.push(['Gross Total Turnover / Receipts', fmt(p.GrsTotalTrnOver)]);
    bizRows.push(['  \u2014 Through Banking Channels', fmt(p.GrsTrnOverBank)]);
    bizRows.push(['Presumptive Income @ 6% (u/s 44AD)', fmt(p.PersumptiveInc44AD6Per)]);
    bizRows.push(['Presumptive Income @ 8% (u/s 44AD)', fmt(p.PersumptiveInc44AD8Per)]);
    bizRows.push([{ content: 'Total Presumptive Income (44AD)', styles: { fontStyle: 'bold', fillColor: blueLight } }, { content: fmt(p.TotPersumptiveInc44AD), styles: { fontStyle: 'bold', fillColor: blueLight } }]);
  }
  if (scheduleBP?.PersumptiveInc44ADA?.GrsReceipt > 0) {
    const p = scheduleBP.PersumptiveInc44ADA;
    bizRows.push(['']);
    bizRows.push(['Gross Receipts (44ADA)', fmt(p.GrsReceipt)]);
    bizRows.push([{ content: 'Total Presumptive Income (44ADA)', styles: { fontStyle: 'bold', fillColor: blueLight } }, { content: fmt(p.TotPersumptiveInc44ADA), styles: { fontStyle: 'bold', fillColor: blueLight } }]);
  }
  if (scheduleBP?.PersumptiveInc44AE?.TotPersumInc44AE > 0) {
    const p = scheduleBP.PersumptiveInc44AE;
    bizRows.push(['']);
    bizRows.push(['Presumptive Income (44AE)', fmt(p.TotPersumInc44AE)]);
    bizRows.push(['Income Chargeable under Business', fmt(p.IncChargeableUnderBus)]);
  }

  amountTable(y, sectionHead('INCOME FROM BUSINESS / PROFESSION (SCHEDULE BP)'), bizRows);

  // ============ 4. FINANCIAL PARTICULARS ============
  if (scheduleBP?.FinanclPartclrOfBusiness) {
    gap();
    const fp = scheduleBP.FinanclPartclrOfBusiness;
    const finRows = [
      [{ content: 'CAPITAL & LIABILITIES', colSpan: 2, styles: { fontStyle: 'bold', fillColor: medGray, halign: 'center', fontSize: 8.5 } }],
      ['Capital / Partner\u2019s Capital', fmt(fp.PartnerMemberOwnCapital)],
      ['Sundry Creditors', fmt(fp.SundryCreditors)],
      ['Other Current Liabilities', fmt(fp.OthrCurrLiab)],
      [{ content: 'Total Capital & Liabilities', styles: { fontStyle: 'bold', fillColor: blueLight } }, { content: fmt(fp.TotCapLiabilities), styles: { fontStyle: 'bold', fillColor: blueLight } }],
      [''],
      [{ content: 'ASSETS', colSpan: 2, styles: { fontStyle: 'bold', fillColor: medGray, halign: 'center', fontSize: 8.5 } }],
      ['Fixed Assets', fmt(fp.FixedAssets)],
      ['Inventories (Stock-in-trade)', fmt(fp.Inventories)],
      ['Sundry Debtors', fmt(fp.SundryDebtors)],
      ['Balance with Banks', fmt(fp.BalWithBanks)],
      ['Cash in Hand', fmt(fp.CashInHand)],
      ['Other Assets', fmt(fp.OtherAssets)],
      [{ content: 'Total Assets', styles: { fontStyle: 'bold', fillColor: blueLight } }, { content: fmt(fp.TotalAssets), styles: { fontStyle: 'bold', fillColor: blueLight } }],
    ];
    amountTable(y, sectionHead('FINANCIAL PARTICULARS OF BUSINESS'), finRows);
  }

  // ============ 5. INCOME SUMMARY ============
  gap();
  amountTable(y, sectionHead('COMPUTATION OF TOTAL INCOME'), [
    ['1. Income from Business / Profession (u/s 44AD / 44ADA / 44AE)', fmt(incomeDeductions.IncomeFromBusinessProf)],
    ['2. Gross Salary / Pension', fmt(incomeDeductions.GrossSalary)],
    ['3. Income from House Property', fmt(incomeDeductions.TotalIncomeOfHP)],
    ['4. Income from Other Sources', fmt(incomeDeductions.IncomeOthSrc)],
    [{ content: 'GROSS TOTAL INCOME (1+2+3+4)', styles: { fontStyle: 'bold', fillColor: blueLight, fontSize: 8.5 } }, { content: fmt(incomeDeductions.GrossTotIncome), styles: { fontStyle: 'bold', fillColor: blueLight, fontSize: 8.5 } }],
    ['5. Less: Deductions under Chapter VI-A', fmt(incomeDeductions.TotalChapVIADeductions || 0)],
    [{ content: 'TOTAL TAXABLE INCOME', styles: { fontStyle: 'bold', fillColor: secondary, textColor: white, fontSize: 8.5 } }, { content: fmt(incomeDeductions.TotalIncome), styles: { fontStyle: 'bold', fillColor: secondary, textColor: white, fontSize: 8.5 } }],
  ]);

  // ============ 6. HOUSE PROPERTY ============
  if (incomeDeductions.TotalIncomeOfHP > 0) {
    gap();
    const hp = incomeDeductions;
    const hpLabel = hp.TypeOfHP === 'L' ? 'Let-out' : hp.TypeOfHP === 'S' ? 'Self-occupied' : 'Deemed let-out';
    amountTable(y, sectionHead('INCOME FROM HOUSE PROPERTY'), [
      ['Type of House Property', hpLabel],
      ['Gross Rent Received / Receivable', fmt(hp.GrossRentReceived)],
      ['Municipal Taxes Paid to Local Authority', fmt(hp.TaxPaidlocalAuth)],
      ['Net Annual Value', fmt(hp.AnnualValue)],
      ['Standard Deduction @ 30% u/s 24(a)', fmt(hp.AnnualValue30Percent)],
      [{ content: 'Net Income from House Property', styles: { fontStyle: 'bold', fillColor: greenLight } }, { content: fmt(hp.TotalIncomeOfHP), styles: { fontStyle: 'bold', fillColor: greenLight } }],
    ]);
  }

  // ============ 7. OTHER SOURCES BREAKDOWN ============
  if (incomeDeductions?.OthersInc?.OthersIncDtlsOthSrc?.length) {
    gap();
    const osRows = [];
    incomeDeductions.OthersInc.OthersIncDtlsOthSrc.forEach(item => {
      const d = item.OthSrcNatureDesc === 'SAV' ? 'Interest from Savings Account' :
                item.OthSrcNatureDesc === 'IFD' ? 'Interest from Fixed Deposits' : item.OthSrcNatureDesc;
      osRows.push([d, fmt(item.OthSrcOthAmount)]);
    });
    osRows.push([{ content: 'Total Income from Other Sources', styles: { fontStyle: 'bold', fillColor: greenLight } }, { content: fmt(incomeDeductions.IncomeOthSrc), styles: { fontStyle: 'bold', fillColor: greenLight } }]);
    amountTable(y, sectionHead('INCOME FROM OTHER SOURCES'), osRows);
  }

  // ============ 8. CHAPTER VI-A DEDUCTIONS ============
  const chapDed = incomeDeductions.DeductUndChapVIA || incomeDeductions.UsrDeductUndChapVIA;
  if (chapDed && chapDed.TotalChapVIADeductions > 0) {
    gap();
    const dedRows = [];
    if (chapDed.Section80C) dedRows.push(['Section 80C (LIC, PPF, ELSS, NSC, etc.)', fmt(chapDed.Section80C)]);
    if (chapDed.Section80CCC) dedRows.push(['Section 80CCC', fmt(chapDed.Section80CCC)]);
    if (chapDed.Section80CCDEmployeeOrSE) dedRows.push(['Section 80CCD (Employee contribution)', fmt(chapDed.Section80CCDEmployeeOrSE)]);
    if (chapDed.Section80CCD1B) dedRows.push(['Section 80CCD(1B) \u2014 NPS Additional', fmt(chapDed.Section80CCD1B)]);
    if (chapDed.Section80CCDEmployer) dedRows.push(['Section 80CCD (Employer contribution)', fmt(chapDed.Section80CCDEmployer)]);
    if (chapDed.Section80D) dedRows.push(['Section 80D \u2014 Medical Insurance Premium', fmt(chapDed.Section80D)]);
    if (chapDed.Section80DD) dedRows.push(['Section 80DD \u2014 Disabled Dependent', fmt(chapDed.Section80DD)]);
    if (chapDed.Section80DDB) dedRows.push(['Section 80DDB \u2014 Medical Treatment', fmt(chapDed.Section80DDB)]);
    if (chapDed.Section80E) dedRows.push(['Section 80E \u2014 Education Loan Interest', fmt(chapDed.Section80E)]);
    if (chapDed.Section80EE) dedRows.push(['Section 80EE \u2014 Home Loan Interest', fmt(chapDed.Section80EE)]);
    if (chapDed.Section80EEA) dedRows.push(['Section 80EEA \u2014 Affordable Housing Loan', fmt(chapDed.Section80EEA)]);
    if (chapDed.Section80EEB) dedRows.push(['Section 80EEB \u2014 EV Loan Interest', fmt(chapDed.Section80EEB)]);
    if (chapDed.Section80G) dedRows.push(['Section 80G \u2014 Donations', fmt(chapDed.Section80G)]);
    if (chapDed.Section80GG) dedRows.push(['Section 80GG \u2014 House Rent (no HRA)', fmt(chapDed.Section80GG)]);
    if (chapDed.Section80GGC) dedRows.push(['Section 80GGC \u2014 Political Party Donations', fmt(chapDed.Section80GGC)]);
    if (chapDed.Section80TTA) dedRows.push(['Section 80TTA \u2014 Savings Account Interest', fmt(chapDed.Section80TTA)]);
    if (chapDed.Section80TTB) dedRows.push(['Section 80TTB \u2014 Senior Citizen Interest', fmt(chapDed.Section80TTB)]);
    if (chapDed.Section80U) dedRows.push(['Section 80U \u2014 Disability', fmt(chapDed.Section80U)]);
    if (chapDed.AnyOthSec80CCH) dedRows.push(['Any Other Section 80CCH', fmt(chapDed.AnyOthSec80CCH)]);
    dedRows.push([{ content: 'Total Deductions under Chapter VI-A', styles: { fontStyle: 'bold', fillColor: orangeLight, fontSize: 8.5 } }, { content: fmt(chapDed.TotalChapVIADeductions), styles: { fontStyle: 'bold', fillColor: orangeLight, fontSize: 8.5 } }]);
    amountTable(y, sectionHead('DEDUCTIONS UNDER CHAPTER VI-A'), dedRows);
  }

  // ============ 9. TAX COMPUTATION ============
  gap();
  const tc = taxComputation || {};
  amountTable(y, sectionHead('TAX COMPUTATION'), [
    ['Gross Tax Liability', fmt(tc.GrossTaxLiability)],
    ['Less: Rebate under Section 87A', fmt(tc.Rebate87A)],
    ['Tax Payable on Rebate', fmt(tc.TaxPayableOnRebate)],
    ['Add: Education Cess @ 4%', fmt(tc.EducationCess)],
    ['Less: Relief under Section 89', fmt(tc.Section89)],
    [{ content: 'NET TAX LIABILITY', styles: { fontStyle: 'bold', fillColor: blueLight, fontSize: 8.5 } }, { content: fmt(tc.NetTaxLiability), styles: { fontStyle: 'bold', fillColor: blueLight, fontSize: 8.5 } }],
    [''],
    [{ content: 'INTEREST & FEE', colSpan: 2, styles: { fontStyle: 'bold', fillColor: medGray, halign: 'center', fontSize: 8.5 } }],
    ['Interest u/s 234A (Late filing of return)', fmt(tc.IntrstPay?.IntrstPayUs234A)],
    ['Interest u/s 234B (Default in payment of tax)', fmt(tc.IntrstPay?.IntrstPayUs234B)],
    ['Interest u/s 234C (Deferred advance tax)', fmt(tc.IntrstPay?.IntrstPayUs234C)],
    ['Late Filing Fee u/s 234F', fmt(tc.IntrstPay?.LateFilingFee234F)],
    [{ content: 'Total Tax + Interest Payable', styles: { fontStyle: 'bold', fillColor: orangeLight, fontSize: 8.5 } }, { content: fmt(tc.TotTaxPlusIntrstPay || tc.TotalTaxPayable), styles: { fontStyle: 'bold', fillColor: orangeLight, fontSize: 8.5 } }],
  ]);

  // ============ 10. TAX PAID ============
  gap();
  const totalTaxPaid = (taxPaid.TDS || 0) + (taxPaid.TCS || 0) + (taxPaid.AdvanceTax || 0) + (taxPaid.SelfAssessmentTax || 0);
  amountTable(y, sectionHead('TAX PAYMENT DETAILS'), [
    ['Tax Deducted at Source (TDS)', fmt(taxPaid.TDS)],
    ['Tax Collected at Source (TCS)', fmt(taxPaid.TCS)],
    ['Advance Tax Paid', fmt(taxPaid.AdvanceTax)],
    ['Self Assessment Tax Paid', fmt(taxPaid.SelfAssessmentTax)],
    [{ content: 'TOTAL TAX PAID', styles: { fontStyle: 'bold', fillColor: greenLight, fontSize: 8.5 } }, { content: fmt(totalTaxPaid), styles: { fontStyle: 'bold', fillColor: greenLight, fontSize: 8.5 } }],
  ]);

  // ============ TDS ON SALARIES ============
  if (tdsOnSalaries?.TDSOnSalary?.length) {
    gap();
    const salRows = [['Employer Name', 'TAN', 'Income', 'Tax Deducted']];
    tdsOnSalaries.TDSOnSalary.forEach(e => {
      salRows.push([
        e.EmployerName || e.Employer?.Name || '\u2014',
        e.EmployerTAN || e.Employer?.TAN || '\u2014',
        fmt(e.SalaryPaid),
        fmt(e.TaxDeducted)
      ]);
    });
    doc.autoTable({
      startY: y,
      head: [['TDS ON SALARIES']],
      headStyles: { fillColor: primary, textColor: white, fontSize: 9.5, fontStyle: 'bold' },
      body: salRows,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2.2, textColor: darkText },
      columnStyles: {
        0: { cellWidth: 70, fontStyle: 'bold', textColor: darkText },
        1: { cellWidth: 32, textColor: darkText },
        2: { cellWidth: 40, halign: 'right', textColor: darkText },
        3: { cellWidth: 40, halign: 'right', textColor: darkText, fontStyle: 'bold' }
      },
      margin: { left: ML, right: MR, bottom: MB }
    });
  }

  // ============ TDS ON OTHER THAN SALARIES ============
  if (tdsOnOthThanSals?.TDSonOther?.length) {
    gap();
    const othRows = [['Deductor Name', 'TAN', 'Section', 'Amount', 'TDS']];
    tdsOnOthThanSals.TDSonOther.forEach(e => {
      othRows.push([
        e.DedName || e.DedName2 || '\u2014',
        e.DedTAN || '\u2014',
        e.Section || '\u2014',
        fmt(e.PaidAmt || e.Amount),
        fmt(e.TdsAmt || e.TaxDeducted)
      ]);
    });
    doc.autoTable({
      startY: y,
      head: [['TDS ON OTHER THAN SALARIES']],
      headStyles: { fillColor: primary, textColor: white, fontSize: 9.5, fontStyle: 'bold' },
      body: othRows,
      theme: 'grid',
      styles: { fontSize: 7.5, cellPadding: 2, textColor: darkText },
      columnStyles: {
        0: { cellWidth: 62, fontStyle: 'bold', textColor: darkText },
        1: { cellWidth: 30, textColor: darkText },
        2: { cellWidth: 22, textColor: darkText },
        3: { cellWidth: 34, halign: 'right', textColor: darkText },
        4: { cellWidth: 34, halign: 'right', textColor: darkText, fontStyle: 'bold' }
      },
      margin: { left: ML, right: MR, bottom: MB }
    });
  }

  // ============ TCS DETAILS ============
  if (scheduleTCS?.TCSDtls?.length) {
    gap();
    const tcsRows = [['Collector Name', 'TAN', 'Amount', 'TCS']];
    scheduleTCS.TCSDtls.forEach(e => {
      tcsRows.push([e.ColName || '\u2014', e.ColTAN || '\u2014', fmt(e.Amount), fmt(e.TaxCollected)]);
    });
    doc.autoTable({
      startY: y,
      head: [['TAX COLLECTED AT SOURCE (TCS)']],
      headStyles: { fillColor: primary, textColor: white, fontSize: 9.5, fontStyle: 'bold' },
      body: tcsRows,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2.2, textColor: darkText },
      columnStyles: {
        0: { cellWidth: 75, fontStyle: 'bold', textColor: darkText },
        1: { cellWidth: 32, textColor: darkText },
        2: { cellWidth: 38, halign: 'right', textColor: darkText },
        3: { cellWidth: 38, halign: 'right', textColor: darkText, fontStyle: 'bold' }
      },
      margin: { left: ML, right: MR, bottom: MB }
    });
  }

  // ============ 11. TAX LIABILITY SUMMARY ============
  gap();
  const totalLiability = tc.TotTaxPlusIntrstPay || tc.TotalTaxPayable || 0;
  const refundDue = refund?.RefundDue ?? (totalTaxPaid - totalLiability);
  const balTax = totalLiability - totalTaxPaid;

  const summaryRows = [
    ['Total Tax Liability (incl. interest & fee)', fmt(totalLiability)],
    ['Less: Total Tax Paid', `(${fmt(totalTaxPaid)})`],
  ];

  if (refundDue > 0) {
    summaryRows.push([{ content: 'REFUND DUE', styles: { fontStyle: 'bold', fillColor: greenLight, textColor: green, fontSize: 9 } }, { content: fmt(refundDue), styles: { fontStyle: 'bold', fillColor: greenLight, textColor: green, fontSize: 9 } }]);
  } else if (balTax > 0) {
    summaryRows.push([{ content: 'BALANCE TAX PAYABLE', styles: { fontStyle: 'bold', fillColor: redLight, textColor: [180, 30, 30], fontSize: 9 } }, { content: fmt(balTax), styles: { fontStyle: 'bold', fillColor: redLight, textColor: [180, 30, 30], fontSize: 9 } }]);
  } else {
    summaryRows.push([{ content: 'NO TAX LIABILITY / NO REFUND', styles: { fontStyle: 'bold', fillColor: greenLight, textColor: green, fontSize: 9 } }, { content: '0', styles: { fontStyle: 'bold', fillColor: greenLight, textColor: green, fontSize: 9 } }]);
  }

  amountTable(y, sectionHead('TAX LIABILITY SUMMARY'), summaryRows);

  // ============ 12. BANK ACCOUNT ============
  if (refund?.BankAccountDtls?.AddtnlBankDetails?.length) {
    gap();
    const bank = refund.BankAccountDtls.AddtnlBankDetails[0];
    const accType = bank.AccountType === 'SB' ? 'Savings Bank' : bank.AccountType === 'CA' ? 'Current Account' : bank.AccountType || '\u2014';
    infoTable(y, sectionHead('BANK ACCOUNT DETAILS (FOR REFUND)'), [
      ['Bank Name', bank.BankName],
      ['Account Number', bank.BankAccountNo],
      ['IFSC Code', bank.IFSCCode],
      ['Account Type', accType],
      [{ content: 'Refund Amount', styles: { fontStyle: 'bold', fillColor: greenLight, textColor: green } }, { content: fmt(refund.RefundDue), styles: { fontStyle: 'bold', fillColor: greenLight, textColor: green } }],
    ]);
  }

  // ============ 13. VERIFICATION ============
  gap();
  infoTable(y, sectionHead('VERIFICATION'), [
    ['Assessee Name', verification?.Declaration?.AssesseeVerName || name],
    ['Father\u2019s Name', verification?.Declaration?.FatherName || 'N/A'],
    ['PAN', verification?.Declaration?.AssesseeVerPAN || personalInfo.PAN],
    ['Capacity', verification?.Capacity === 'S' ? 'Self' : verification?.Capacity === 'P' ? 'Partner' : 'Authorized Signatory'],
  ]);

  gap(5);
  doc.setFontSize(7.5);
  doc.setTextColor(...medText);
  const stmt = 'I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.';
  const splitStmt = doc.splitTextToSize(stmt, W - ML - MR);
  doc.text(splitStmt, W / 2, y, { align: 'center' });
  y += splitStmt.length * 3.5 + 12;

  doc.setFontSize(9);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(`Place: ${verification?.Place || '\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014'}`, ML, y);
  doc.text('Date: \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014', ML, y + 6);
  doc.text('(Signature of Assessee / Authorized Representative)', W - MR, y + 6, { align: 'right' });

  // ============ FOOTER ============
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    const footerY = 285;
    
    // Clean separator line
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.2);
    doc.line(ML, footerY - 4, W - MR, footerY - 4);

    // Left: Generated Date & Time
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, ML, footerY);

    // Center: Made by Ashish Das (Highlighted)
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primary[0], primary[1], primary[2]);
    doc.text('MADE BY ASHISH DAS', W / 2, footerY, { align: 'center' });

    // Right: Page Numbers
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, W - MR, footerY, { align: 'right' });

    // Disclaimer below (Very small)
    doc.setFontSize(6.5);
    doc.setTextColor(180, 180, 180);
    doc.text('This is a computer-generated statement based on the provided ITR JSON. Please verify with official income tax records.', W / 2, footerY + 5, { align: 'center' });
  }

  doc.save(`ITR_Computation_${personalInfo.PAN}_AY${ay}.pdf`);
};
