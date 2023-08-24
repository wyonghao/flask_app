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

    // Get the element with class="tablink" and click on the first one
    var firstTabLink = document.getElementsByClassName("tablink")[0];
    if (firstTabLink) {
        firstTabLink.click();
    }
});
