// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
//Functionality for popping states (with back button)
window.addEventListener('popstate', (event) =>{
  setState(event.state, true);
})
// Transition back to Home page
document.querySelector('header').children[0].addEventListener('click', () => {
  setState({page: 'home', entryNum: null}, false);
});
//Transition to Setting page
document.querySelector('header').children[1].addEventListener('click', () => {
  setState({page: 'settings', entryNum: null}, false);
});

document.addEventListener('DOMContentLoaded', () => {
  let entryNumber = 1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.id = entryNumber;
        entryNumber = entryNumber + 1;
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          setState({page: 'entry', entryNum: newPost.id}, false)
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});

