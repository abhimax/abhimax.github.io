const uname = document.createElement("h1");
uname.textContent = "Hi, there!";
uname.className = "name";
document.getElementById("root").appendChild(uname);

const dateElement = document.createElement("p");
dateElement.className = "date";
document.getElementById("root").appendChild(dateElement);

function updateDateTime() {
  const now = new Date();
  dateElement.textContent = `Today is: ${now.toDateString()} - ${now.toLocaleTimeString()}`;
}

updateDateTime();

setInterval(updateDateTime, 1000);
