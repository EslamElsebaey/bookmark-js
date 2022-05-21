var bookmarkName = document.getElementById("bookmarkName");
var websiteUrl = document.getElementById("websiteUrl");
var sitesArray;

if (localStorage.sites == null) {
  sitesArray = [];
} else {
  sitesArray = JSON.parse(localStorage.sites);
  showSites();
}

var regex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm;
function addSite() {
  if (bookmarkName.value != "" && websiteUrl.value != "") {
    if (websiteUrl.value.match(regex)) {
      var sites = {
        bookmarkName: bookmarkName.value,
        websiteUrl: websiteUrl.value,
      };
      sitesArray.push(sites);
      localStorage.setItem("sites", JSON.stringify(sitesArray));
      showSites();
      clearSites();
    } else {
      alert("you should write the URL correctly");
      websiteUrl.value = "";
    }
  } else {
    alert("you should write the site Name and URL");
  }
}

// show sites
function showSites() {
  var myDivs = "";
  for (var i = 0; i < sitesArray.length; i++) {
    myDivs += `<div class="col-md-12 justify-content-center d-flex">
          <div class="bookmark-output-box d-flex  align-items-center" >
            <h2>${sitesArray[i].bookmarkName}</h2>
            <a href="${sitesArray[i].websiteUrl}" target="_blank" class="me-2">Visit</a>
            <button class="btn btn-danger" onclick="deleteSites(${i})">Delete</button>
          </div>
        </div>`;
  }
  document.getElementById("bookmarkOutputBox").innerHTML = myDivs;
}

// clear inputs

function clearSites() {
  bookmarkName.value = "";
  websiteUrl.value = "";
}

// delete sites

function deleteSites(index) {
  sitesArray.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sitesArray));
  showSites();
}
