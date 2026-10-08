const loadUsersButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const filterButton = document.getElementById("filter-btn");
const status = document.getElementById("status");
const usersList = document.getElementById("users-list");

const API_URL = "https://jsonplaceholder.typicode.com/users";

let users = [];

function renderUsers(list) {
  usersList.innerHTML = "";

  if (list.length === 0) {
    status.textContent = "No users match your filter.";
    return;
  }

  list.forEach((user) => {
    const listItem = document.createElement("li");

    const name = document.createElement("div");
    name.className = "user-name";
    name.textContent = user.name;

    const email = document.createElement("div");
    email.className = "user-email";
    email.textContent = user.email;

    const phone = document.createElement("div");
    phone.className = "user-phone";
    phone.textContent = user.phone;

    const location = document.createElement("div");
    location.className = "user-location";
    location.textContent =
      `${user.address.street}, ${user.address.city}`;

    listItem.appendChild(name);
    listItem.appendChild(email);
    listItem.appendChild(phone);
    listItem.appendChild(location);

    usersList.appendChild(listItem);
  });
}

async function loadUsers() {
  loadUsersButton.disabled = true;
  status.textContent = "Loading users...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    users = await response.json();

    renderUsers(users);

    status.textContent = `Loaded ${users.length} users.`;
  } catch (error) {
    status.textContent = "Failed to load users. Please try again.";

    console.error("Error loading users:", error);
  } finally {
    loadUsersButton.disabled = false;
  }
}

function filterUsers() {
  const searchText = filterInput.value.toLowerCase().trim();

  if (searchText === "") {
    renderUsers(users);
    status.textContent = `Showing all ${users.length} users.`;
    return;
  }

  const filteredUsers = users.filter((user) => {
    const searchableText = [
      user.name,
      user.email,
      user.phone,
      user.address.street,
      user.address.city,
      user.address.zipcode
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchText);
  });

  renderUsers(filteredUsers);

  if (filteredUsers.length > 0) {
    status.textContent =
      `Found ${filteredUsers.length} matching user(s).`;
  }
}

loadUsersButton.addEventListener("click", loadUsers);

filterButton.addEventListener("click", filterUsers);

filterInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    filterUsers();
  }
});