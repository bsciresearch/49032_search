function allActions(){


  // Get URL parameters
  function getParameterByName(variable)
  {
         let query = window.location.search.substring(1);
         let vars = query.split("&");
         for (let i=0; i<vars.length; i++) {
                 let pair = vars[i].split("=")
                 if(pair[0] == variable){return pair[1]}
         }
         return(false);
  }


  // Give the parameter a variable name
  let dC_h = getParameterByName('hpp');
  
  if(!dC_h) {
  	dC_h = ""
  }

  dC_h = decodeURIComponent(dC_h)
  
  let dC_h_original = dC_h

  if(String(dC_h).includes(" Find resources and learn")) {
  	dC_h = dC_h.replace(" Find resources", "<br>Find resources")
  }

  if(String(dC_h).includes(" Learn more about")) {
  	dC_h = dC_h.replace(" Learn more", "<br>Learn more")
  }

  let elem = document.querySelector('#dynamic-content');


  // Set HTML content
  if (dC_h.length > 0) {
    elem.innerHTML = dC_h
  }


  // Get HTML content
  let dispC_h = elem.innerHTML


  // Get Worker ID
  let wid = getParameterByName('w')

  if (!wid) {
    wid = "no_id_provided"
  }


  // Capture click location
  let click_location = "default"

  document.getElementById("search-bar").onkeydown = function (e) {

  	let key = e.which || e.keyCode

    if (key === 13) {
    	e.preventDefault()
    	click_location = "srch-ent"
    	redirectQualtrics()
    }

  }

  document.getElementById("search-button").addEventListener("click", function() {
  	click_location = "srch"
    redirectQualtrics()
  })


  document.getElementById("dynamic-content").addEventListener("click", function() {
  	click_location = "hpp"
    redirectQualtrics()
  })


  // Redirect after 10 seconds, regardless of activity
  setTimeout(redirectQualtrics, 10000)


  // Combine data and redirect
  function redirectQualtrics() {
    const urlRedirect= `https://google.qualtrics.com/jfe/form/SV_3KQICCdoEHKYe8d?wr='${wid}'&cl='${click_location}'&dC_h='${dC_h_original}'&dispC_h='${dispC_h}'&v=1`
    window.location = urlRedirect
  }

}
