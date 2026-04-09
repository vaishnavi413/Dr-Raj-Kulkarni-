import React, { forwardRef } from 'react';

const ReceiptView = forwardRef(({ data }, ref) => {
  if (!data) return null;

  // Naturopathy theme colors
  const primaryColor = "#4ca1af"; // A calming teal/cyan
  const lightBg = "#f4f9f9";

  const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const wholeNum = Math.floor(num);
    if (wholeNum === 0) return 'Zero Only';
    if (wholeNum.toString().length > 9) return 'Amount too large';

    let n = ('000000000' + wholeNum).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';

    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    if (n[5] != 0) {
      str += (str != '') ? 'and ' : '';
      str += (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only';
    } else {
      str += 'Only';
    }
    return str.trim();
  };

  return (
    <div ref={ref} style={{ width: '210mm', minHeight: '297mm', padding: '30mm 20mm', margin: '0 auto', background: 'white', color: '#333', fontFamily: '"Arial", sans-serif' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div style={{ width: '65%', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src="/logo.jpeg" alt="Doctor Logo" style={{ width: '85px', height: '85px', objectFit: 'contain' }} />
          <div>
            <h1 style={{ color: primaryColor, margin: 0, fontSize: '28px', letterSpacing: '1px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>DR. RAJ KULKARNI</h1>
            <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#666', fontWeight: 'bold' }}>BNYS, FSS</p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#666' }}>Reg no. 0762/TNBIM/2007</p>
          </div>
        </div>

        <div style={{ width: '35%', textAlign: 'right' }}>
          {/* Heading removed per user request */}
          <table style={{ width: '100%', fontSize: '13px' }}>
            <tbody>
              <tr><td style={{ fontWeight: 'bold', padding: '3px 0' }}>Receipt Number:</td><td style={{ padding: '3px 0' }}>{data.receiptNo}</td></tr>
              <tr><td style={{ fontWeight: 'bold', padding: '3px 0' }}>Receipt Date:</td><td style={{ padding: '3px 0' }}>{new Date(data.date).toLocaleDateString()}</td></tr>
              <tr><td style={{ fontWeight: 'bold', padding: '3px 0' }}>Payment Method:</td><td style={{ padding: '3px 0' }}>UPI / Online</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Addresses Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '14px' }}>
        <div style={{ width: '45%' }}>
          <h3 style={{ borderBottom: `2px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}></h3>
          <p style={{ margin: '3px 0', fontWeight: 'bold' }}>Integrative Healing Center</p>
          <p style={{ margin: '3px 0' }}>Acupuncture | Functional Medicine</p>
          <p style={{ margin: '3px 0' }}>Pain and Lifestyle Disorders Management</p>
          <p style={{ margin: '3px 0' }}>Viman Nagar, Pune - 411014</p>
          <p style={{ margin: '3px 0' }}>Contact: 9767995655</p>
        </div>

        <div style={{ width: '45%' }}>
          <h3 style={{ borderBottom: `2px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}></h3>
          <p style={{ margin: '3px 0', fontWeight: 'bold' }}>{data.patientName}</p>
          <p style={{ margin: '3px 0' }}>Age: {data.age}</p>
          <p style={{ margin: '3px 0' }}>Gender: {data.gender}</p>
        </div>
      </div>



      {/* Services Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: primaryColor, color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '10px', width: '60%' }}>DESCRIPTION</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>QTY</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>AMOUNT (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.services.consultation > 0 && (
            <tr style={{ backgroundColor: lightBg, borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>Consultation fees</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{data.services.consultation.toFixed(2)}</td>
            </tr>
          )}
          {data.services.acupuncture > 0 && (
            <tr style={{ backgroundColor: 'white', borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>Acupuncture</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{data.services.acupuncture.toFixed(2)}</td>
            </tr>
          )}
          {data.services.nutritionChart > 0 && (
            <tr style={{ backgroundColor: lightBg, borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>Functional medicine nutrition chart</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{data.services.nutritionChart.toFixed(2)}</td>
            </tr>
          )}
          {data.services.therapy > 0 && (
            <tr style={{ backgroundColor: 'white', borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>Therapy session</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{data.services.therapy.toFixed(2)}</td>
            </tr>
          )}
          {data.services.package > 0 && (
            <tr style={{ backgroundColor: lightBg, borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>Integrative Package</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{data.services.package.toFixed(2)}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals Section */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <table style={{ width: '45%', fontSize: '13px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '6px', fontWeight: 'bold' }}>Subtotal</td>
              <td style={{ padding: '6px', textAlign: 'right' }}>₹ {data.total.toFixed(2)}</td>
            </tr>
            <tr style={{ backgroundColor: primaryColor, color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
              <td style={{ padding: '8px' }}>Total</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>₹ {data.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '15px', fontSize: '13px', fontStyle: 'italic' }}>
        <p style={{ margin: 0 }}><strong>Total in words: </strong> {numberToWords(data.total)}</p>
      </div>

      {/* Treatment Info */}
      <div style={{ marginBottom: '25px', fontSize: '14px' }}>
        <p style={{ margin: 0 }}>
          <strong>Treatment for - </strong>
          <span style={{ borderBottom: '1px solid #333', minWidth: '100px', display: 'inline-block', padding: '0 10px' }}>{data.treatmentFor || '________'}</span>
          <strong> back pain & digestive issues</strong>
        </p>
      </div>

      {/* Scan to Pay & Signatures */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>

        {/* QR Section */}
        <div style={{ width: '30%' }}>
          <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>Scan to Pay</p>
          <p style={{ fontSize: '11px', color: '#555', marginBottom: '8px' }}>UPI: drrajkulkarni.ibz@icici</p>
          <div style={{ border: `1px solid ${primaryColor}`, padding: '8px', display: 'inline-block', borderRadius: '10px' }}>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=drrajkulkarni.ibz@icici%26pn=Dr%20Raj%20Kulkarni" alt="UPI Scan to Pay QR Code" style={{ width: '100px', height: '100px' }} />
          </div>
        </div>

        {/* Notes Section */}
        <div style={{ width: '45%', fontSize: '11px', color: '#555', lineHeight: '1.6' }}>
          <p style={{ margin: '0' }}>This is a computer-generated receipt.</p>

          <p style={{ margin: '0' }}>Wishing you good health & recovery.</p>
          <p style={{ marginTop: '8px', color: '#333', fontWeight: 'bold' }}>Follow-up plan recommended for best results</p>
        </div>

        {/* Signature */}
        <div style={{ width: '30%', textAlign: 'center' }}>


        </div>
      </div>

    </div>
  );
});

export default ReceiptView;
