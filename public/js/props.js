// function saveVote(propId) {
//     axios.post('/save-vote', {
//         yesVote: propId
//     }).then(res => {
//         console.log('Saved Vote');
//         const savedVote = document.getElementById(propId+'-yes-button');
//         savedVote.style.backgroundColor = 'lightgreen';
//     }).catch(error => {
//         console.error(error);
//     });
// }
// how to make this function more modular and reusable by passing in the element we'd like to copy?
// i tried passing in the actual text but that didn't work, i also tried the elements id which didn't work :(
function copyText(id) {
    var copyText = document.getElementById(id);
    console.log(copyText);
    copyText.select();
    document.execCommand("copy");
}