let bookmarkName = document.getElementById("bookmarkName");
let websiteUrl = document.getElementById("websiteUrl");
let sitesArray;

if (localStorage.sites == null) {
  sitesArray = [];
} else {
  sitesArray = JSON.parse(localStorage.sites);
  showSites();
}

let regex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
function addSite() {
  if (bookmarkName.value != "" && websiteUrl.value != "") {
    if (websiteUrl.value.match(regex)) {
      let sites = {
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
  let myDivs = "";
  for (let i = 0; i < sitesArray.length; i++) {
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
