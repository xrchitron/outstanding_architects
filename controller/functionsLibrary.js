const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const USER_PER_PAGE = 12;
const users = [];
const dataPanel = document.querySelector("#data-panel");
const paginator = document.querySelector("#user-paginator");
const modalButton = document.querySelector("#userInfo-modal-button");
const top_12 = document.querySelector("#top-12");
const votedList = JSON.parse(localStorage.getItem("voteArchitect")) || [];

function renderNameList(data, renderPosition) {
  let rawHTML = "";
  //name, avatar

  data.forEach((item) => {
    const avatar = item.avatar || "https://placehold.co/300?text=Image+Not+Found&font=raleway";
    rawHTML += `
        <div class="col-sm-2 card-trigger card-breakpoint" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${item.id}">
        <div class="mb-4">
          <div class="card" style="width: 12rem;">
            <img src="${avatar}" class="card-img-top rounded-circle border border-info border-2 user-avatar" data-id="${item.id}" alt="User photo">
            <div class="card-body">
              <h5 class="card-title text-center" data-id="${item.id}">${item.name}</h5>
            </div>
          </div>
        </div>
      </div>
      `;
    renderPosition.innerHTML = rawHTML;
  });
}

function showUserInfoModal(id) {
  const title = document.querySelector("#userInfo-modal-title");
  const description = document.querySelector("#userInfo-modal-description");
  axios
    .get(INDEX_URL + id)
    .then((res) => {
      const user = res.data;
      title.textContent = `${user.name} ${user.surname}`;
      description.innerHTML = `
      <div class="text-center">
        <img src="${user.avatar}" class="rounded rounded-circle border border-info border-2" alt="user avatar">
        <p class="h5">Region : ${user.region}</p>
        <p class="h6">${user.email}</p>
      </div>
      `;
      modalButton.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary vote-clicked" data-bs-dismiss="modal" data-id=${id}>Vote me</button>
      `;
    })
    .catch((err) => {
      console.log(err);
    });
}

function showUserInfoModalRemove(id) {
  const title = document.querySelector("#userInfo-modal-title");
  const description = document.querySelector("#userInfo-modal-description");
  axios
    .get(INDEX_URL + id)
    .then((res) => {
      const user = res.data;
      title.textContent = `${user.name} ${user.surname}`;
      description.innerHTML = `
      <div class="text-center">
        <img src="${user.avatar}" class="rounded rounded-circle border border-info border-2" alt="user avatar">
        <p class="h5">Region : ${user.region}</p>
        <p class="h6">${user.email}</p>
      </div>
      `;
      modalButton.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger vote-clicked" data-bs-dismiss="modal" data-id=${id}>Remove</button>
      `;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getUserByPage(page) {
  const data = users;
  const startIndex = (page - 1) * USER_PER_PAGE;
  return data.slice(startIndex, startIndex + USER_PER_PAGE);
}

function renderUserPage(amount) {
  const numberOfPage = Math.ceil(amount / USER_PER_PAGE);
  let rawHTML = "";
  for (let page = 1; page <= numberOfPage; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page=${page}>${page}</a></li>`;
  }
  paginator.innerHTML = rawHTML;
}

function randomNum(numRange, numAmount) {
  // 創建一個新的 array
  const numArray = new Array();
  // 創建範圍池，池內為公差１的數列
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  let questionPool = range(1, numRange, 1);
  //隨機的數字（範圍池的index）
  let randomNum;
  //for迴圈
  for (let i = 0; i < numAmount; i++) {
    //隨機的數字（範圍池的index）會隨著i增加而遞減
    randomNum = Math.floor(Math.random() * (numRange - i)) + 1;
    //給定在範圍池的某一index對應值給要輸出的array
    numArray[i] = questionPool[randomNum - 1];
    //將已選出值篩出範圍池
    questionPool = questionPool.filter((element) => element !== numArray[i]);
  }
  return numArray;
}

function addToVote(id) {
  const list = JSON.parse(localStorage.getItem("voteArchitect")) || [];
  if (list.length > 11) return alert("You can only vote 12 architects!");
  const architect = users.find((user) => user.id === id);
  if (list.some((user) => user.id === id)) {
    return alert("This architect has added to your vote.");
  }
  list.push(architect);
  localStorage.setItem("voteArchitect", JSON.stringify(list));
  alert("Voting succeed");
}

function getRandomList() {
  const randomId = randomNum(200, 12);
  const selectedUsers = [];
  users.forEach((user) => {
    const id = parseInt(user.id);
    if (randomId.includes(id)) {
      selectedUsers.push(user);
    }
  });
  return selectedUsers;
}

function removeFromVote(id) {
  if (!votedList || !votedList.length) return;
  const targetIndex = votedList.findIndex((item) => Number(item.id) === Number(id));
  if (targetIndex === -1) return;
  votedList.splice(targetIndex, 1);
  localStorage.setItem("voteArchitect", JSON.stringify(votedList));
  alert("Removed");
  renderNameList(votedList, dataPanel);
}

function setCardWidthClass() {
  const cardBreakpoint = document.querySelectorAll(".card-breakpoint");
  const width = window.innerWidth;
  cardBreakpoint.forEach((card) => {
    if (width <= 767) {
      card.classList.remove("col-sm-4", "col-sm-3", "col-sm-2");
      card.classList.add("col-sm-6");
    } else if (width <= 991) {
      card.classList.remove("col-sm-6", "col-sm-3", "col-sm-2");
      card.classList.add("col-sm-4");
    } else if (width <= 1199) {
      card.classList.remove("col-sm-6", "col-sm-4", "col-sm-2");
      card.classList.add("col-sm-3");
    } else {
      card.classList.remove("col-sm-6", "col-sm-4", "col-sm-3");
      card.classList.add("col-sm-2");
    }
  });
}
// Initial setup on page load
document.addEventListener("DOMContentLoaded", () => {
  setCardWidthClass();
});

// Listen for window resize events
window.addEventListener("resize", setCardWidthClass);
