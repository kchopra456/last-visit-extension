function buildLastVisit(data) {
  divName = "lastVisit_div";
  var popupDiv = document.getElementById(divName);

  var ul = document.createElement('ul');
  popupDiv.appendChild(ul);

  if (data === undefined) {
    ul.appendChild(document.createTextNode("Cannot resolve url!"))
    return;
  }

  var li = document.createElement('li');
  ul.appendChild(li);
  li.appendChild(document.createTextNode(`# of Visits - ${data.visitCount}`));

  var date = new Date(data.lastVisitTime);
  li = document.createElement('li');
  ul.appendChild(li);
  li.appendChild(document.createTextNode(date));
}

async function getActiveUrl() {
  let [tabs] = await chrome.tabs.query({ "active": true, "currentWindow": true });
  return tabs.url;
}

async function getLastVisit(url, callback) {
  var query = {
    "text": url
  };
  chrome.history.search(query, (item) => {
    callback(item[0]);
  });

}

document.addEventListener('DOMContentLoaded', function () {
  var url = getActiveUrl();
  url.then(v => {
    getLastVisit(v, buildLastVisit)
  })
});