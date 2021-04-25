import React from 'react';

export default function NewInvoice() {
  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input name="title" placeholder="Enter title..."></input>
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          rows={4}
          name="description"
          placeholder="Describe invoice..."
        ></textarea>
      </div>
      <div className="lines">
        <div className="line">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>
        <div className="line">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>
        <div className="line">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>
      </div>
      <div>timestamp</div>
    </div>
  );
}
