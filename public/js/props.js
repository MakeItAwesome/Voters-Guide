function saveYesVote(propId) {
  console.log("clicked on YES side");
    axios.post('/save-vote', {
        yesVote: propId
    }).then(res => {
        const yesButton = document.getElementById(propId+'-yes');
        yesButton.classList.add("prop-voted");
        yesButton.innerHTML = 'Undo Vote';
        yesButton.setAttribute("onClick", `undoYesVote('${propId}')`);

        const noButton = document.getElementById(propId+'-no');
        noButton.classList.remove("prop-voted");
        noButton.innerHTML = 'Save Vote';
        noButton.setAttribute("onClick", `saveNoVote('${propId}')`);
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
          yesButton.innerHTML = 'Save Vote';
          yesButton.classList.remove("prop-voted");
          yesButton.setAttribute("onClick", `saveYesVote('${propId}')`);
  
          const noButton = document.getElementById(propId+'-no');
          noButton.classList.remove("prop-voted");
          noButton.innerHTML = 'Save Vote';
          noButton.setAttribute("onClick", `saveNoVote('${propId}')`);
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
          noButton.innerHTML = 'Save Vote';
          noButton.classList.remove("prop-voted");
          noButton.setAttribute("onClick", `saveNoVote('${propId}')`);
          
          const yesButton = document.getElementById(propId+'-yes');
          yesButton.classList.remove("prop-voted");
          yesButton.innerHTML = 'Save Vote';
          yesButton.setAttribute("onClick", `saveYesVote('${propId}')`);
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
        document.getElementById(propId+'-no').innerHTML = 'Undo Vote';
        document.getElementById(propId+'-no').setAttribute("onClick", `undoNoVote('${propId}')`);

        document.getElementById(propId+'-yes').classList.remove("prop-voted");
        document.getElementById(propId+'-yes').innerHTML = 'Save Vote';
        document.getElementById(propId+'-yes').setAttribute("onClick", `saveYesVote('${propId}')`);
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
