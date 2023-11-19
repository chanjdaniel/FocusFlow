// Background.js
console.log('Background script executed');


import React, { useEffect } from 'react';

const Background = () => {
  useEffect(() => {
    const handleInstalled = () => {
      // Handle onInstalled logic if needed
    };

    const handleClicked = async (tab) => {
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      const nextState = prevState === 'ON' ? 'OFF' : 'ON';

      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
      });

      // Execute the script based on the nextState
      if (nextState === 'ON') {
        chrome.scripting.executeScript({
          target: { tabId: tab.id, allFrames: true },
          files: ['content-script.js'],
        });
      } else if (nextState === 'OFF') {
        chrome.scripting.executeScript({
          target: { tabId: tab.id, allFrames: true },
          files: ['remove-child.js'],
        });
      }
    };

    // Add event listeners
    chrome.runtime.onInstalled.addListener(handleInstalled);
    chrome.action.onClicked.addListener(handleClicked);

    // Clean up event listeners on component unmount
    return () => {
      chrome.runtime.onInstalled.removeListener(handleInstalled);
      chrome.action.onClicked.removeListener(handleClicked);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return null; // This component doesn't render anything
};

export default Background;
