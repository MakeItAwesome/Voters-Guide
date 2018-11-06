function saveYesVote(propId) {
  console.log("clicked on YES side");
    axios.post('/save-vote', {
        yesVote: propId
    }).then(res => {
        const yesButton = document.getElementById(propId+'-yes');
        yesButton.classList.add("prop-voted");
        yesButton.innerHTML = 'Undo <strong>YES</strong>';
        yesButton.setAttribute("onClick", `undoYesVote('${propId}')`);

        const noButton = document.getElementById(propId+'-no');
        noButton.classList.remove("prop-voted");
        noButton.innerHTML = 'Save <strong>NO</strong>';
        noButton.setAttribute("onClick", `saveNoVote('${propId}')`);
    }).catch(error => {
        console.error(error);
    });
}

function saveNoVote(propId) {
  console.log("clicked on NO side");
    axios.post('/save-vote', {
        noVote: propId
    }).then(res => {
        document.getElementById(propId+'-no').classList.add("prop-voted");
        document.getElementById(propId+'-no').innerHTML = 'Undo <strong>NO</strong>';
        document.getElementById(propId+'-no').setAttribute("onClick", `undoNoVote('${propId}')`);

        document.getElementById(propId+'-yes').classList.remove("prop-voted");
        document.getElementById(propId+'-yes').innerHTML = 'Save <strong>YES</strong>';
        document.getElementById(propId+'-yes').setAttribute("onClick", `saveYesVote('${propId}')`);
    }).catch(error => {
        console.error(error);
    });
}

function undoYesVote(propId) {
    console.log("clicked on undo YES side");
      axios.post('/save-vote', {
          yesVote: propId
      }).then(res => {
          const yesButton = document.getElementById(propId+'-yes');
          yesButton.innerHTML = 'Save <strong>YES</strong>';
          yesButton.classList.remove("prop-voted");
          yesButton.setAttribute("onClick", `saveYesVote('${propId}')`);

      }).catch(error => {
          console.error(error);
      });
}

function undoNoVote(propId) {
    console.log("clicked on undo NO side");
      axios.post('/save-vote', {
          noVote: propId
      }).then(res => {
          const noButton = document.getElementById(propId+'-no');
          noButton.innerHTML = 'Save <strong>NO</strong>';
          noButton.classList.remove("prop-voted");
          noButton.setAttribute("onClick", `saveNoVote('${propId}')`);

      }).catch(error => {
          console.error(error);
      });
  }

// how to make this function more modular and reusable by passing in the element we'd like to copy?
// i tried passing in the actual text but that didn't work, i also tried the elements id which didn't work :(
function copyText(id) {
    var copyText = document.getElementById(id);
    console.log(copyText);
    copyText.select();
    document.execCommand("copy");
}
