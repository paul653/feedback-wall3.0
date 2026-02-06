import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

document.getElementById("send").onclick = () => {
  const input = document.getElementById("msg");
  const text = input.value.trim();

  if (!text || text.length > 120) return;

  push(ref(db, "feedback"), { text });
  input.value = "";
};
