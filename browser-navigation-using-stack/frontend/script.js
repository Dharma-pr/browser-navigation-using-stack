let backStack = [];
let forwardStack = [];
let currentPage = "home.com";
const currentDiv = document.getElementById("current");
const backView = document.getElementById("backStackView");
const forwardView = document.getElementById("forwardStackView");
const backSize = document.getElementById("backSize");
const forwardSize = document.getElementById("forwardSize");
const log = document.getElementById("log");
const toast = document.getElementById("toast");
function showToast(message) {
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
function updateUI() {
  currentDiv.innerText = currentPage;
  backView.innerHTML = "";
  forwardView.innerHTML = "";
  for (let i = backStack.length - 1; i >= 0; i--) {
    let li = document.createElement("li");
    li.innerText = backStack[i];
    backView.appendChild(li);
  }
  for (let i = forwardStack.length - 1; i >= 0; i--) {
    let li = document.createElement("li");
    li.innerText = forwardStack[i];
    forwardView.appendChild(li);
  }
  backSize.innerText = backStack.length;
  forwardSize.innerText = forwardStack.length;
}
function logAction(text) {
  let li = document.createElement("li");
  li.innerText = text;
  log.prepend(li);
}
function visitPage() {
  const url = document.getElementById("url").value;
  if (url === "") return;
  backStack.push(currentPage);
  currentPage = url;
  forwardStack = [];
  document.getElementById("url").value = "";
  logAction("Visited " + currentPage);
  updateUI();
}
function goBack() {
  if (backStack.length === 0) {
    showToast("Back stack is empty");
    return;
  }
  forwardStack.push(currentPage);
  currentPage = backStack.pop();
  logAction("Back to " + currentPage);
  updateUI();
}
function goForward() {
  if (forwardStack.length === 0) {
    showToast("Forward stack is empty");
    return;
  }
  backStack.push(currentPage);
  currentPage = forwardStack.pop();
  logAction("Forward to " + currentPage);
  updateUI();
}
function clearHistory() {
  backStack = [];
  forwardStack = [];
  currentPage = "home.com";
  logAction("History cleared");
  showToast("History cleared");
  updateUI();
}
function stressTest() {
  const sites = ["google", "youtube", "github", "spotify", "netflix", "amazon"];
  for (let i = 0; i < 10; i++) {
    backStack.push(currentPage);
    currentPage = sites[Math.floor(Math.random() * sites.length)];
  }
  forwardStack = [];
  logAction("Stress test executed");
  showToast("Stress test completed");
  updateUI();
}
updateUI();