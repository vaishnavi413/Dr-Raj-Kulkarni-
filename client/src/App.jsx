import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Printer, Save, Undo2, LogOut, CheckCircle2, History, X, Trash2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReceiptView from './components/ReceiptView';
import './index.css';

const App = () => {
  const [formData, setFormData] = useState({
    receiptNo: '',
    date: new Date().toISOString().split('T')[0],
    patientName: '',
    age: '',
    gender: 'Male',
    services: {
      consultation: 0,
      therapy: 0,
      package: 0
    },
    total: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  
  const receiptRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${formData.receiptNo}`,
    onAfterPrint: () => {
      // Clear form and fetch next ID automatically
      setFormData({
        receiptNo: '',
        date: new Date().toISOString().split('T')[0],
        patientName: '',
        age: '',
        gender: 'Male',
        services: { consultation: 0, therapy: 0, package: 0 },
        total: 0
      });
      setEditingId(null);
      fetchLatestNo();
    }
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchLatestNo = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/receipts/latest-no`);
      const latestNoStr = res.data.latestNo;
      // Extract number, increment and format
      const parts = latestNoStr.split('-');
      const num = parseInt(parts[2] || 0) + 1;
      const newNo = `DRK-2026-${num.toString().padStart(3, '0')}`;
      setFormData(prev => ({ ...prev, receiptNo: newNo }));
    } catch (err) {
      console.error(err);
      setFormData(prev => ({ ...prev, receiptNo: 'DRK-2026-001' }));
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/receipts`);
      setHistoryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadReceipt = (receipt) => {
    setFormData(receipt);
    setEditingId(receipt._id);
    setShowHistory(false);
  };

  const deleteReceipt = async (id) => {
    if (window.confirm("Are you sure you want to delete this receipt?")) {
      try {
        await axios.delete(`${API_URL}/api/receipts/${id}`);
        fetchHistory(); // Refresh list
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchLatestNo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseFloat(value);
    
    setFormData(prev => {
      const newServices = { ...prev.services, [name]: numValue };
      const newTotal = Object.values(newServices).reduce((acc, curr) => acc + curr, 0);
      return {
        ...prev,
        services: newServices,
        total: newTotal
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/receipts/${editingId}`, formData);
      } else {
        const res = await axios.post(`${API_URL}/api/receipts`, formData);
        setEditingId(res.data._id); // Transitions into edit mode for this new receipt
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving receipt');
    }
    setLoading(false);
  };

  const triggerBackup = async () => {
    try {
      await axios.get(`${API_URL}/api/trigger-backup`);
      alert('Backup triggered successfully');
    } catch (err) {
      alert('Failed to trigger backup');
    }
  };

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/logo.jpeg" alt="Doctor Logo" style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'contain', background: 'transparent' }} />
            <h2 style={{ margin: 0 }}>DR RAJ KULKARNI - Billing System</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn" style={{ background: 'var(--accent)', color: 'white' }} onClick={() => { setShowHistory(true); fetchHistory(); }}>
              <History size={18} /> View History
            </button>
            <button className="btn" style={{ background: 'var(--text-muted)', color: 'white' }} onClick={triggerBackup}>
              <Save size={18} /> Force Weekly Backup
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="input-group">
              <label>Receipt No.</label>
              <input type="text" name="receiptNo" value={formData.receiptNo} readOnly style={{ background: '#f1f5f9' }} />
            </div>
            <div className="input-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="input-group">
            <label>Patient Name</label>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} placeholder="Enter full name" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="input-group">
              <label>Age</label>
              <input type="text" name="age" value={formData.age} onChange={handleInputChange} placeholder="e.g. 34 Years" />
            </div>
            <div className="input-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <h3>Services Availed</h3>
          <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem' }}>
            <div className="input-group">
              <label>Consultation & Personalised Healing Protocol (₹)</label>
              <input type="number" name="consultation" value={formData.services.consultation} onChange={handleServiceChange} min="0" placeholder="0" />
            </div>
            <div className="input-group">
              <label>Therapy / Sessions (₹)</label>
              <input type="number" name="therapy" value={formData.services.therapy} onChange={handleServiceChange} min="0" placeholder="0" />
            </div>
            <div className="input-group">
              <label>Package (₹)</label>
              <input type="number" name="package" value={formData.services.package} onChange={handleServiceChange} min="0" placeholder="0" />
            </div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px dashed var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total Amount:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)' }}>₹ {formData.total}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn" style={{ background: '#e2e8f0', color: 'var(--text)' }} onClick={() => { setEditingId(null); setFormData({ receiptNo: '', date: new Date().toISOString().split('T')[0], patientName: '', age: '', gender: 'Male', services: { consultation: 0, therapy: 0, package: 0 }, total: 0 }); fetchLatestNo(); }}>
              <Undo2 size={18} /> {editingId ? 'Cancel Edit' : 'Reset'}
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={18} /> {loading ? 'Saving...' : (editingId ? 'Update Receipt' : 'Save Receipt')}
            </button>
            <button type="button" className="btn btn-primary" style={{ background: 'var(--primary)' }} onClick={handlePrint} disabled={!formData.patientName}>
              <Printer size={18} /> Print Receipt
            </button>
          </div>
        </form>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              style={{
                position: 'fixed', bottom: '30px', right: '30px', 
                background: '#10b981', color: 'white', padding: '1rem 2rem', 
                borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)', zIndex: 1000
              }}
            >
              <CheckCircle2 /> Receipt saved to database!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    {/* Live Preview */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Live Receipt Preview</h3>
        <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center', marginBottom: '-20%' }}>
          <ReceiptView ref={receiptRef} data={formData} />
        </div>
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div 
               initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
               style={{ background: 'white', padding: '2rem', borderRadius: '15px', width: '90%', maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2>Receipt History</h2>
                <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              
              {historyData.length === 0 ? <p>No receipts found.</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--primary)', color: 'white', textAlign: 'left' }}>
                      <th style={{ padding: '10px' }}>Receipt No</th>
                      <th style={{ padding: '10px' }}>Date</th>
                      <th style={{ padding: '10px' }}>Patient Name</th>
                      <th style={{ padding: '10px' }}>Total (₹)</th>
                      <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map(receipt => (
                      <tr key={receipt._id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '10px' }}>{receipt.receiptNo}</td>
                        <td style={{ padding: '10px' }}>{new Date(receipt.date).toLocaleDateString()}</td>
                        <td style={{ padding: '10px' }}>{receipt.patientName}</td>
                        <td style={{ padding: '10px', fontWeight: 'bold' }}>₹ {receipt.total}</td>
                        <td style={{ padding: '10px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button onClick={() => loadReceipt(receipt)} title="View / Edit" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--accent)' }}><Eye size={18} /></button>
                          <button onClick={() => deleteReceipt(receipt._id)} title="Delete" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
