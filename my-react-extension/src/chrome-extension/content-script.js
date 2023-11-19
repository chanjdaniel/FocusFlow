import React, { useEffect, useState } from 'react';

const ContentScript = () => {
  const [webpageBodyHTML, setWebpageBodyHTML] = useState('');

  useEffect(() => {
    // Retrieve the body content of the document
    const fetchWebpageBody = () => {
      setWebpageBodyHTML(document.body.innerHTML);
    };

    // Fetch the initial webpage content
    fetchWebpageBody();

    // Set up an interval to periodically update the overlay content
    const intervalId = setInterval(fetchWebpageBody, 1000); // Update every second, adjust as needed

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div
      id="my-overlay"
      style={{
        position: 'fixed',
        margin: '0',
        padding: '0',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.75)',
        overflow: 'auto',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        maxWidth: '100%',
        // whiteSpace: 'pre-wrap', // Uncomment if needed
      }}
    >
      {webpageBodyHTML && <div dangerouslySetInnerHTML={{ __html: webpageBodyHTML }} />}
    </div>
  );
};

export default ContentScript;