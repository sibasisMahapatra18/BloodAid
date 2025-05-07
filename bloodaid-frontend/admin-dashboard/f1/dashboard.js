
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





// Fetch dashboard data
function fetchDashboardData() {
    // Fetch users count
    fetch('/user', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('total-users').textContent = data.length;
        
        // Display recent users
        const recentUsers = data.slice(0, 3);
        const recentUsersDiv = document.getElementById('recent-users');
        recentUsersDiv.innerHTML = '';
        
        recentUsers.forEach(user => {
            const div = document.createElement('div');
            div.className = 'activity-item';
            div.innerHTML = `
                <p><strong>${user.name}</strong> joined</p>
                <p class="activity-time">${user.email}</p>
            `;
            recentUsersDiv.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
    
    // Fetch donors count
    fetch('/api/donors', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('total-donors').textContent = data.length;
    })
    .catch(error => console.error('Error fetching donors:', error));
    
    // Fetch blood requests
    fetch('/api/blood-requests/get-all', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('total-requests').textContent = data.length;
        
        // Count pending requests (assuming there's a status field)
        const pendingRequests = data.filter(request => request.status === 'PENDING');
        document.getElementById('pending-requests').textContent = pendingRequests.length;
        
        // Display recent requests
        const recentRequests = data.slice(0, 3);
        const recentRequestsDiv = document.getElementById('recent-requests');
        recentRequestsDiv.innerHTML = '';
        
        recentRequests.forEach(request => {
            const div = document.createElement('div');
            div.className = 'activity-item';
            div.innerHTML = `
                <p><strong>${request.bloodType}</strong> blood needed</p>
                <p class="activity-time">Location: ${request.location}</p>
            `;
            recentRequestsDiv.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching blood requests:', error));
}

// Initial data load
fetchDashboardData();

// Refresh data when button is clicked
document.getElementById('refresh-data').addEventListener('click', fetchDashboardData);

document.getElementById('logout-btn').addEventListener('click', function(e) {
e.preventDefault();

sessionStorage.clear();
localStorage.clear();

// Redirect to login page
window.location.href = 'login.html';
});
