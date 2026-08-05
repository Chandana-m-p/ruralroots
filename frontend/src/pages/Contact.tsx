import React from 'react';
import { Footer } from '../components/Footer';

export const Contact: React.FC = () => {
  return (
    <div>
      <div className="container" style={{ padding: '40px 0 60px', maxWidth: '600px' }}>
        <h2>Contact RuralRoots & Hub Support</h2>
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Questions about artisan orders or registering your Kirana store as a Village Hub?</p>

        <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! Our Hub team will contact you.'); }}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input type="text" required className="form-input" placeholder="Ramesh Patel" />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" required className="form-input" placeholder="9876543210" />
          </div>

          <div className="form-group">
            <label className="form-label">Message / Hub Pincode Inquiry</label>
            <textarea required rows={4} className="form-input" placeholder="Enter message..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
