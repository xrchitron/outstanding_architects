axios.get(INDEX_URL).then((response) => {
  users.push(...response.data.results);
  renderNameList(getRandomList(), dataPanel);
});

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".user-avatar")) {
    showUserInfoModal(event.target.dataset.id);
  }
});
