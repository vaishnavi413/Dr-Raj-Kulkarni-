import React, { forwardRef } from 'react';

const ReceiptView = forwardRef(({ data }, ref) => {
  if (!data) return null;

  // Naturopathy theme colors
  const primaryColor = "#4ca1af"; // A calming teal/cyan
  const lightBg = "#f4f9f9";

  return (
    <div ref={ref} style={{ width: '210mm', minHeight: '297mm', padding: '30mm 20mm', margin: '0 auto', background: 'white', color: '#333', fontFamily: '"Arial", sans-serif' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div style={{ width: '50%', display: 'flex', alignItems: 'center', gap: '15px' }}>
           <img src="/logo.jpeg" alt="Doctor Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
           <div>
             <h2 style={{ color: primaryColor, margin: 0, fontSize: '24px', letterSpacing: '1px' }}>DR. RAJ KULKARNI</h2>
             <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#666' }}>Structured Root-Cause Medicine</p>
           </div>
        </div>
        
        <div style={{ width: '50%', textAlign: 'right' }}>
          {/* Heading removed per user request */}
          <table style={{ width: '100%', fontSize: '14px' }}>
            <tbody>
              <tr><td style={{ fontWeight: 'bold', padding: '3px 0' }}>Receipt Number:</td><td style={{ padding: '3px 0' }}>{data.receiptNo}</td></tr>
              <tr><td style={{ fontWeight: 'bold', padding: '3px 0' }}>Receipt Date:</td><td style={{ padding: '3px 0' }}>{new Date(data.date).toLocaleDateString()}</td></tr>
              <tr><td style={{ fontWeight: 'bold', padding: '3px 0' }}>Payment Method:</td><td style={{ padding: '3px 0' }}>UPI / Online</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Addresses Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', fontSize: '14px' }}>
        <div style={{ width: '45%' }}>
          <h3 style={{ borderBottom: `2px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>Doctor Details</h3>
          <p style={{ margin: '3px 0', fontWeight: 'bold' }}>Integrative Healing Center</p>
          <p style={{ margin: '3px 0' }}>Acupuncture | Functional Medicine | Lifestyle Medicine</p>
          <p style={{ margin: '3px 0' }}>Viman Nagar, Pune</p>
          <p style={{ margin: '3px 0' }}>Contact: 9767995655</p>
        </div>
        
        <div style={{ width: '45%' }}>
          <h3 style={{ borderBottom: `2px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>Patient (Customer)</h3>
          <p style={{ margin: '3px 0', fontWeight: 'bold' }}>{data.patientName}</p>
          <p style={{ margin: '3px 0' }}>Age: {data.age}</p>
          <p style={{ margin: '3px 0' }}>Gender: {data.gender}</p>
        </div>
      </div>

      {/* Services Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: primaryColor, color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '12px', width: '50%' }}>DESCRIPTION</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>QUANTITY</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>AMOUNT (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.services.consultation > 0 && (
            <tr style={{ backgroundColor: lightBg, borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>Consultation & Personalised Healing Protocol</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '12px', textAlign: 'right' }}>{data.services.consultation.toFixed(2)}</td>
            </tr>
          )}
          {data.services.therapy > 0 && (
            <tr style={{ backgroundColor: 'white', borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>Therapy / Sessions</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '12px', textAlign: 'right' }}>{data.services.therapy.toFixed(2)}</td>
            </tr>
          )}
          {data.services.package > 0 && (
            <tr style={{ backgroundColor: lightBg, borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>Treatment Package</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '12px', textAlign: 'right' }}>{data.services.package.toFixed(2)}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals Section */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
        <table style={{ width: '40%', fontSize: '14px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', fontWeight: 'bold' }}>Subtotal</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>₹ {data.total.toFixed(2)}</td>
            </tr>
            <tr style={{ backgroundColor: primaryColor, color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
              <td style={{ padding: '10px' }}>Total</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>₹ {data.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Scan to Pay & Signatures */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '50px' }}>
        
        {/* QR Section */}
        <div style={{ width: '30%' }}>
           <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>Scan to Pay</p>
           <p style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>UPI: drrajkulkarni.ibz@icici</p>
           <div style={{ border: `1px solid ${primaryColor}`, padding: '10px', display: 'inline-block', borderRadius: '10px' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=drrajkulkarni.ibz@icici%26pn=Dr%20Raj%20Kulkarni" alt="UPI Scan to Pay QR Code" style={{ width: '120px', height: '120px' }} />
           </div>
        </div>

        {/* Notes Section */}
        <div style={{ width: '35%', fontSize: '12px', color: '#555' }}>
           <h4 style={{ margin: '0 0 5px 0', borderBottom: '1px solid #ccc', paddingBottom: '3px' }}>Notes</h4>
           <p style={{ margin: '0' }}>Thank you for trusting your healing journey with us. Wishing you great health!</p>
        </div>

        {/* Signature */}
        <div style={{ width: '30%', textAlign: 'center' }}>
          <div style={{ borderBottom: '1px solid #000', height: '40px', marginBottom: '5px' }}></div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Authorized Signature</p>
        </div>
      </div>

    </div>
  );
});

export default ReceiptView;
