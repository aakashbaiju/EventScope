document.addEventListener("DOMContentLoaded", function() {
  var keyword = ["helo", "hi", "example", "search","event", "functionality"]; // Update with your desired keywords
  autocomplete(document.getElementById("myInput"), keyword);
});

function autocomplete(inp, arr) {
  console.log("Autocomplete function called");
  inp.addEventListener("input", function(e) {
      var val = this.value.toLowerCase();
      var suggestions = arr.filter(word => word.toLowerCase().startsWith(val));
      displaySuggestions(suggestions);
  });

  document.addEventListener("click", function (e) {
  if (!e.target.classList.contains('suggestion') && !e.target.matches('#myInput')) {
    clearSuggestions();
  }
});


  inp.addEventListener("keydown", function(e) {
      if (e.keyCode === 13) { // Check if Enter key is pressed
          highlightKeyword(this.value);
          
      }
  });

  function performSearch(keyword) {
    // Implement your search logic here
    // For example, you can redirect to a search results page or filter content based on the keyword
    // In this example, let's just log the keyword to the console
    console.log("Performing search for keyword:", keyword);
 }

  function highlightKeyword(keyword) {
      var body = document.body;
      var regex = new RegExp(keyword, 'gi'); // Create a regular expression to match the keyword globally and case-insensitively
      var bodyHTML = body.innerHTML; // Get the HTML content of the body
      var highlightedHTML = bodyHTML.replace(regex, '<span style="background-color: yellow;">$&</span>'); // Highlight all occurrences of the keyword
      body.innerHTML = highlightedHTML; // Update the body content with highlighted HTML
  }

  function displaySuggestions(suggestions) {
      var suggestionBox = document.getElementById("suggestion-box");
      suggestionBox.innerHTML = '';
      suggestions.forEach(function(word) {
          var suggestion = document.createElement("div");
          suggestion.className = "suggestion";
          suggestion.textContent = word;
          suggestion.addEventListener("click", function() {
              inp.value = word;
              clearSuggestions();
              highlightKeyword(word); // Highlight the selected suggestion
              performSearch(word);
          });
          suggestionBox.appendChild(suggestion);
      });
  }

  function clearSuggestions() {
      document.getElementById("suggestion-box").innerHTML = '';
  }
}
