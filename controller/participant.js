axios.get(INDEX_URL).then((response) => {
  users.push(...response.data.results);
  renderUserPage(users.length);
  renderNameList(getUserByPage(1), dataPanel);
});

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".user-avatar")) {
    showUserInfoModal(event.target.dataset.id);
  }
});
paginator.addEventListener("click", function onPaginatorClicked(event) {
  if (event.target.matches(".page-link")) {
    const targetPage = getUserByPage(event.target.dataset.page);
    renderNameList(targetPage, dataPanel);
  }
});
modalButton.addEventListener("click", function onModalClicked(event) {
  if (event.target.matches(".vote-clicked")) {
    const voteId = event.target.dataset.id;
    addToVote(Number(voteId));
  }
});
