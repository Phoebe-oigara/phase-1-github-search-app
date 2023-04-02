//grab the git users form for github queries
const userForm = document.querySelector('#github-form');

// adding an event listener
document.addEventListener("DOMContentLoaded", () => {
    userForm.addEventListener("submit", searchUsers);
})

//fetching the github users information
let searchUsers = (event) => {
    event.preventDefault();
    const username = document.querySelector('#search').value;
   fetch(`https://api.github.com/search/users?q=${username}`)
    .then(response => response.json())
    .then(users => { renderUserDetails(users.items) })
    .catch(error => { alert("We ran into an issue")}) //catch errors in case of issues during the API call

}

// Rendering the retrieved users' details
let renderUserDetails = users => {
    users.forEach(user => { createUserCardElement(user)})
}

//Creating a card to hold the specifc user details
let createUserCardElement = user => {
    const gitUserCard = document.createElement("div");
    gitUserCard.className = "user-card";
    document.querySelector("#user-list").appendChild(gitUserCard);
    gitUserCard.innerHTML = `<img src="${user.avatar_url}" >`
                            + `<h2>${user.login}</h2>`
                            + `<a class="fs11" href="${user.html_url}" target="_blank">Go to Github Profile</a><br>`
                            + `<button class="submit-btn fs11">View ${user.login}'s Repos</button>`
    gitUserCard.querySelector(".submit-btn").addEventListener('click', () => {
       fetchRepositories(user)
    })
 }

 // Fetching repositories using the url provided.
let fetchRepositories = username => {
    fetch(`https://api.github.com/users/${username.login}/repos`)
    .then(resp => resp.json())
    .then(repos => { renderRepositoryDetails(repos) })
    .catch(error => { alert("Error fetching repositories!") });
 }

 // Rendering the repository details to the DOM
let renderRepositoryDetails = repos => {
    repos.forEach(repo => createReposCardElement(repo) )
 }

 // Creates the card and it's child elements that will hold the fetched repositories
 let createReposCardElement = repo => {
    const repositoryCard = document.createElement("div");
    repositoryCard.className = "repo-card"
    document.querySelector("#repos-list").appendChild(repositoryCard);
    repositoryCard.innerHTML = `<h2 class="margin-none">${repo.name}</h2>`
                               + `<p class="fs14 margin-none">${repo.description}</p>`
 }