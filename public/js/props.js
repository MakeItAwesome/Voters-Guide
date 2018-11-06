function saveYesVote(propId, user) {
  console.log("clicked on YES side");
    axios.post('/save-vote', {
        yesVote: propId
    }).then(res => {
        document.getElementById(propId+'-yes').classList.add("prop-voted");
        document.getElementById(propId+'-yes').innerHTML = 'Undo Vote';
        document.getElementById(propId+'-yes').setAttribute("onClick", "undoYesVote('{{prop.id}}')");

        document.getElementById(propId+'-no').classList.remove("prop-voted");
        document.getElementById(propId+'-no').innerHTML = 'Save Vote';
        document.getElementById(propId+'-no').setAttribute("onClick", "saveNoVote('{{prop.id}}')");
    }).catch(error => {
        console.error(error);
    });
}
function saveNoVote(propId, user) {
  console.log("clicked on NO side");
    axios.post('/save-vote', {
        noVote: propId
    }).then(res => {
        document.getElementById(propId+'-no').classList.add("prop-voted");
        document.getElementById(propId+'-no').innerHTML = 'Undo Vote';
        document.getElementById(propId+'-no').setAttribute("onClick", "undoNoVote('{{prop.id}}')");

        document.getElementById(propId+'-yes').classList.remove("prop-voted");
        document.getElementById(propId+'-yes').innerHTML = 'Save Vote';
        document.getElementById(propId+'-yes').setAttribute("onClick", "saveYesVote('{{prop.id}}')");
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
