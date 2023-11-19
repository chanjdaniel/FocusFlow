// RemoveChild.js

import React, { useEffect } from 'react';

const RemoveChild = () => {
  useEffect(() => {
    // Retrieve the overlay element
    const overlayElement = document.getElementById('my-overlay');

    if (overlayElement) {
      // Remove the overlay element
      overlayElement.remove();

      // Enable scrolling on the original body
      document.body.style.overflow = 'visible';
    }
  }, []); // Empty dependency array to run the effect only once on mount

  return null; // This component doesn't render anything
};

export default RemoveChild;