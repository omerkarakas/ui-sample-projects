const addBookmark = document.getElementById("show-modal");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

// show modal and close modal
addBookmark.addEventListener("click", () => {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal)
    modal.classList.remove("show-modal");
});

/*
if (!urlValue.includes('http://', 'https://')) {     
    urlValue = `https://${urlValue}`; 
} 
 
// New Version
if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
     urlValue = `https://${urlValue}`; 
}
*/

bookmarkForm.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }

  if (!nameValue || !urlValue) {
    alert("Please enter website name and/or website url");
    return;
  } else if (!validURL(urlValue)) {
    alert("Please enter a valid URL");
    return;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue
  };
  bookmarks.push(bookmark);

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  loadBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();

}

function validURL(url) {
  var regexp = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gum
  return regexp.test(url);
}

function deleteBookmark(url) {
  //console.log(url);
  bookmarks.forEach((bmk, index) => {
    if (bmk.url === url) {
      bookmarks.splice(index, 1);
    }
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  showBookmarks();

}

function loadBookmarks() {
  if (localStorage.getItem("bookmarks"))
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  else {
    bookmarks = [{ name: "okarakas", url: "http://okarakas.com" }];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  showBookmarks();
}

function showBookmarks() {
  bookmarksContainer.innerHTML = "";
  for (const bmk of bookmarks) {
    bookmarksContainer.innerHTML +=
      `<div class="item">
        <i class="fa-solid fa-trash-can delete-bookmark" title="Delete" onClick="deleteBookmark('${bmk.url}')"></i>
        <div class="name">
          <img src="https://s2.googleusercontent.com/s2/favicons?domain=${bmk.url}" alt="Favicon">
            <a href="${bmk.url}" target="_blank">${bmk.name}</a>
        </div>
      </div>`;
  }

}

loadBookmarks();