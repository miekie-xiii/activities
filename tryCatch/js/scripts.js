const loadButton = document.getElementById("loadUsers");
loadButton.addEventListener("click", loadUsers);

async function loadUsers() {
  const message = document.getElementById("message");
  message.textContent = "Loading...";
  message.className = "loading";

  const usersContainer = document.getElementById("users");
  usersContainer.innerHTML = "";
  
  const API_URL = "https://jsonplaceholder.typicode.com/users";
  loadButton.disabled = true;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to retrieve users.");
    }

    const users = await response.json();
    message.textContent = "";
    message.className = "";

    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.innerHTML = `
        <h2>${user.name}</h2>
        <p><span class="label">Username:</span>${user.username}</p>
        <p><span class="label">Email:</span>${user.email}</p>
        <p><span class="label">Phone:</span>${user.phone}</p>
        <p><span class="label">Company:</span>${user.company.name}</p>
      `;
      usersContainer.appendChild(userCard);
    });
    loadButton.remove();
  } catch (error) {
    message.textContent =
      "Please try again.";
    message.className = "error";
    console.error(error);
  }
}