//grab the input form for github queries
const inputForm = document.querySelector('#github-form');

// adding an event listener
document.addEventListener("DOMContentLoaded", () => {
    inputForm.addEventListener("submit", searchUsers);
})

//fetching the github users information
let searchUsers = (event) => {
    event.preventdefault();
    const userName = document.querySelector('#search').value;
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(response => response.json())
    .then(users => { renderUserDetails(users.items) })
    .catch(error => { alert("We ran into an issue")}) //catch errors in case of issues during the API call

}

// Rendering the retrived users' details
