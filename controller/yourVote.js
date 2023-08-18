axios.get(INDEX_URL).then((response) => {
  users.push(...response.data.results);
  renderNameList(votedList, dataPanel);
});

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".user-avatar")) {
    showUserInfoModalRemove(event.target.dataset.id);
  }
});

modalButton.addEventListener("click", function onModalClicked(event) {
  if (event.target.matches(".vote-clicked")) {
    const voteId = event.target.dataset.id;
    removeFromVote(voteId);
  }
});
