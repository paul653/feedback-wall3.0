import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyANeYDqOJQZWlnqMA9VolH6gU_EPYENqq8",
  authDomain: "stream-feedback-18bad.firebaseapp.com",
  projectId: "stream-feedback-18bad",
  storageBucket: "stream-feedback-18bad.firebasestorage.app",
  messagingSenderId: "35863687137",
  appId: "1:35863687137:web:e916a9ba953a592c52eca0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const center = document.getElementById("center");

let queue = [];
let floating = [];
let isShowing = false;
let lastMessage = "";

const MAX_FLOATING = 10;

onChildAdded(ref(db, "feedback"), (snapshot) => {
  const msg = snapshot.val().text;
  queue.push(msg);
  showNext();
});

function showNext() {
  if (isShowing || queue.length === 0) return;

  isShowing = true;
  const msg = queue.shift();

  if (lastMessage) {
    addFloating(lastMessage);
  }

  lastMessage = msg;
  center.textContent = msg;

  setTimeout(() => {
    isShowing = false;
    showNext();
  }, 4000);
}

function addFloating(text) {
  const div = document.createElement("div");
  div.className = "float";
  div.textContent = text;

  // Avoid center: place top OR bottom
  const placeTop = Math.random() < 0.5;

  if (placeTop) {
    // Top zone
    div.style.top = 10 + Math.random() * 25 + "%";
  } else {
    // Bottom zone
    div.style.top = 65 + Math.random() * 25 + "%";
  }

  div.style.left = Math.random() * 70 + "%";
  div.style.animationDuration = 18 + Math.random() * 10 + "s";

  document.body.appendChild(div);
  floating.push(div);

  if (floating.length > MAX_FLOATING) {
    const old = floating.shift();
    old.remove();
  }
}
