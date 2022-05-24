
const postsContainer = document.getElementById("posts-container");
const loading = document.getElementById("loading");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;


async function getPosts() {
  let apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}


async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    postsContainer.innerHTML +=
      `<div class="post">
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
          ${post.body}
        </p>
      </div>
    </div>`
  });


}


showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}


filter.addEventListener("input", (e) => {
  const str = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(str) > -1 || body.indexOf(str) > -1) {
      post.style.display = "flex";
    }
    else {
      post.style.display = "none";
    }

  })
})
