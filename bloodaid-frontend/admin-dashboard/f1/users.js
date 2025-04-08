
// Check if user is logged in (has token)
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
    return token;
}

const token = checkAuth();

// Logout function
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

// Initialize modals
const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));

// Fetch all users
function fetchUsers() {
    fetch('/user', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        displayUsers(data);
    })
    .catch(error => console.error('Error fetching users:', error));
}

// Search users
function searchUsers(query) {
    fetch(`/user/search?query=${query}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        displayUsers(data);
    })
    .catch(error => console.error('Error searching users:', error));
}

// Display users in table
function displayUsers(users) {
    const tableBody = document.getElementById('users-data');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar me-3">
                        ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    ${user.name}
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}">${user.role}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${user.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${user.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(tr);
    });
    
    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            fetchUserDetails(userId);
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            document.getElementById('delete-user-id').value = userId;
            deleteUserModal.show();
        });
    });
}

// Fetch user details for editing
function fetchUserDetails(userId) {
    fetch(`/user/${userId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById('edit-user-id').value = user.id;
        document.getElementById('edit-name').value = user.name;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-role').value = user.role;
        
        editUserModal.show();
    })
    .catch(error => console.error('Error fetching user details:', error));
}

// Update user details
document.getElementById('save-user-btn').addEventListener('click', function() {
    const userId = document.getElementById('edit-user-id').value;
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const role = document.getElementById('edit-role').value;
    
    const userData = {
        name: name,
        email: email,
        role: role
    };
    
    fetch(`/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        editUserModal.hide();
        // Refresh users list
        fetchUsers();
        
        // Show alert
        alert('User updated successfully!');
    })
    .catch(error => console.error('Error updating user:', error));
});

// Delete user
document.getElementById('confirm-delete-btn').addEventListener('click', function() {
    const userId = document.getElementById('delete-user-id').value;
    
    fetch(`/user/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        deleteUserModal.hide();
        // Refresh users list
        fetchUsers();
        
        // Show alert
        alert('User deleted successfully!');
    })
    .catch(error => console.error('Error deleting user:', error));
});

// Search button click handler
document.getElementById('search-btn').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        searchUsers(query);
    } else {
        fetchUsers();
    }
});

// Search input enter key handler
document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
});

// Initial data load
fetchUsers();
