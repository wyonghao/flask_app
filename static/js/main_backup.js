// Open a tab
function openTab(tabName, elmnt) {
    // ...existing code...
  }
  
  // Load crypto info
  function loadCryptoInfo(coin_id) {
    // ...existing code...
  }
  
  // New function to load forensic content
  function loadForensicContent() {
    // ...existing code...
  }
  
  // Consolidate all DOMContentLoaded event listeners into a single one
  document.addEventListener("DOMContentLoaded", function() {
    // Code for the copy button
    var copyButton = document.getElementById('copyButton');
    if (copyButton) {
      copyButton.addEventListener('click', function() {
        // ...existing code...
      });
    }
  
    // Add Event Listener for Forensic Tab
    const forensicTab = document.getElementById('forensic_tab');
    if (forensicTab) {
      forensicTab.addEventListener('click', loadForensicContent);
    }
  
    // Get the element with class="tablink" and click on the first one
    var firstTabLink = document.getElementsByClassName("tablink")[0];
    if (firstTabLink) {
      firstTabLink.click();
    }
  
    // Load crypto info
    loadCryptoInfo('bitcoin');
    loadCryptoInfo('ethereum');
  });
  

  // Existing 'DOMContentLoaded' listener
document.addEventListener('DOMContentLoaded', (event) => {
    // ...existing code...
    
    const forensicTab = document.getElementById('forensic_tab');
    if (forensicTab) {
      forensicTab.addEventListener('click', loadForensicContent);
    }
  
    // ...existing code...
  });
  