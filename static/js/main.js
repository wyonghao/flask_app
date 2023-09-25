// Declare the openTab function outside the DOMContentLoaded event listener
function openTab(tabName, elmnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-tab", "");
    }
    document.getElementById(tabName).style.display = "block";
    elmnt.className += " active-tab";
}

//load crypto info functions using coinmarketcap? api
function loadCryptoInfo(coin_id) {
    console.log(`Fetching info for ${coin_id}...`);  // Debugging line
    fetch(`/crypto_info/${coin_id}`)
        .then(response => {
            console.log(`Received response for ${coin_id}`, response);  // Debugging line
            return response.json();
        })
        .then(data => {
            console.log(`Received data for ${coin_id}`, data);  // Debugging line
            var price = data[coin_id]['usd'];
            var marketCap = data[coin_id]['usd_market_cap'];
            var table = document.getElementById('cryptoTable');
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = coin_id;
            cell2.innerHTML = price;
            cell3.innerHTML = marketCap;
        })
        .catch(error => {
            console.error(`Error fetching data for ${coin_id}:`, error);  // Debugging line
        });
}

// New function to load forensic content
function loadForensicContent() {
    fetch('/forensic')
      .then(response => response.text())
      .then(html => {
        document.getElementById('forensic_content').innerHTML = html;
      })
      .catch(error => console.error('Error:', error));
  }

// Consolidate all DOMContentLoaded event listeners into a single one

document.addEventListener("DOMContentLoaded", function() {
    // Code for the copy button
    var copyButton = document.getElementById('copyButton');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            var text_to_copy = document.querySelector('.result').innerText;

            if (!navigator.clipboard) {
                // Fallback for browsers that don't support navigator.clipboard
                var tempTextarea = document.createElement('textarea');
                tempTextarea.value = text_to_copy;
                document.body.appendChild(tempTextarea);
                tempTextarea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextarea);
                alert('Result copied to clipboard!');
            } else {
                navigator.clipboard.writeText(text_to_copy).then(
                    function() {
                        alert('Result copied to clipboard!'); // success
                    })
                    .catch(
                        function() {
                            alert('Failed to copy text!'); // error
                        });
            }
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


// Path: static/js/main.js
