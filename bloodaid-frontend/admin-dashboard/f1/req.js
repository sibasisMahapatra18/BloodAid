
// Check if user is logged in (has token)
function checkAuth() {
    const token = localStorage.getItem('token');
    // For development/testing, comment out this check
    // if (!token) {
    //     window.location.href = 'login.html';
    // }
    return token || "test-token"; // Return a dummy token for testing
}

const token = checkAuth();

// Logout function
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

// Initialize modals
const requestModal = new bootstrap.Modal(document.getElementById('requestModal'));
const requestDetailsModal = new bootstrap.Modal(document.getElementById('requestDetailsModal'));
const deleteRequestModal = new bootstrap.Modal(document.getElementById('deleteRequestModal'));

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Helper function to get blood type class
function getBloodTypeClass(bloodType) {
    if (bloodType.startsWith('A') && !bloodType.startsWith('AB')) {
        return 'blood-type-A';
    } else if (bloodType.startsWith('B') && !bloodType.startsWith('AB')) {
        return 'blood-type-B';
    } else if (bloodType.startsWith('AB')) {
        return 'blood-type-AB';
    } else if (bloodType.startsWith('O')) {
        return 'blood-type-O';
    }
    return '';
}

// Helper function to get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'URGENT':
            return 'status-urgent';
        case 'PENDING':
            return 'status-pending';
        case 'FULFILLED':
            return 'status-fulfilled';
        case 'EXPIRED':
            return 'status-expired';
        default:
            return 'bg-info';
    }
}

// Fetch all blood requests
function fetchRequests() {
    // For testing, use mock data
    const mockRequests = [
        {
            id: 1, 
            patientName: "John Smith", 
            bloodType: "A+", 
            location: "New York Hospital", 
            unitsNeeded: 2, 
            requestDate: "2023-04-01", 
            status: "URGENT",
            hospital: "New York General Hospital",
            contactPerson: "Dr. Jane Wilson",
            contactPhone: "123-456-7890",
            notes: "Emergency surgery scheduled",
            userId: { id: 101, name: "Maria Johnson" }
        },
        {
            id: 2, 
            patientName: "Lisa Brown", 
            bloodType: "O-", 
            location: "Chicago Medical Center", 
            unitsNeeded: 3, 
            requestDate: "2023-04-03", 
            status: "PENDING",
            hospital: "Chicago Medical Center",
            contactPerson: "Dr. Michael Chang",
            contactPhone: "312-555-1234",
            notes: "Scheduled for transfusion next week",
            userId: { id: 102, name: "Robert Davis" }
        },
        {
            id: 3, 
            patientName: "Carlos Rodriguez", 
            bloodType: "AB+", 
            location: "Miami General", 
            unitsNeeded: 1, 
            requestDate: "2023-03-28", 
            status: "FULFILLED",
            hospital: "Miami General Hospital",
            contactPerson: "Dr. Sarah Martinez",
            contactPhone: "305-123-4567",
            notes: "Donor found, transfusion completed successfully",
            userId: { id: 103, name: "Jennifer Wilson" }
        },
        {
            id: 4, 
            patientName: "Emily Chen", 
            bloodType: "B-", 
            location: "San Francisco Medical", 
            unitsNeeded: 2, 
            requestDate: "2023-03-15", 
            status: "EXPIRED",
            hospital: "SF Medical Center",
            contactPerson: "Dr. David Wong",
            contactPhone: "415-987-6543",
            notes: "Patient transferred to another facility",
            userId: { id: 104, name: "Thomas Lee" }
        }
    ];
    
    displayRequests(mockRequests);
    updateStatistics(mockRequests);
    
    // If API is ready, use this instead
    /*
    fetch('/api/blood-requests/get-all', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRequests(data);
        updateStatistics(data);
    })
    .catch(error => console.error('Error fetching blood requests:', error));
    */
}

// Search and filter requests
function searchAndFilterRequests() {
    const query = document.getElementById('search-input').value.trim();
    const bloodType = document.getElementById('blood-type-filter').value;
    const location = document.getElementById('location-filter').value;
    
    // For testing with mock data, just reload all data
    fetchRequests();
    
    // If API is ready, use this instead
    /*
    let url = '/api/blood-requests/search?';
    if (bloodType) url += `bloodType=${encodeURIComponent(bloodType)}&`;
    if (location) url += `location=${encodeURIComponent(location)}`;
    
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRequests(data);
    })
    .catch(error => console.error('Error searching requests:', error));
    */
}

// Update statistics
function updateStatistics(requests) {
    document.getElementById('total-requests').textContent = requests.length;
    
    // Count by status
    let urgentCount = requests.filter(req => req.status === 'URGENT').length;
    let pendingCount = requests.filter(req => req.status === 'PENDING').length;
    let fulfilledCount = requests.filter(req => req.status === 'FULFILLED').length;
    let expiredCount = requests.filter(req => req.status === 'EXPIRED').length;
    
    document.getElementById('urgent-count').textContent = urgentCount;
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('fulfilled-count').textContent = fulfilledCount;
    document.getElementById('expired-count').textContent = expiredCount;
}

// Display requests in table
function displayRequests(requests) {
    const tableBody = document.getElementById('requests-data');
    tableBody.innerHTML = '';
    
    requests.forEach(request => {
        const tr = document.createElement('tr');
        
        const bloodTypeClass = getBloodTypeClass(request.bloodType);
        const statusBadgeClass = getStatusBadgeClass(request.status);
        
        tr.innerHTML = `
            <td>${request.id}</td>
            <td>${request.userId ? request.userId.name : 'Unknown'}</td>
            <td><span class="badge blood-type ${bloodTypeClass}">${request.bloodType}</span></td>
            <td>${request.location}</td>
            <td>${request.unitsNeeded} units</td>
            <td>${formatDate(request.requestDate)}</td>
            <td><span class="badge request-status ${statusBadgeClass}">${request.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary view-btn" data-id="${request.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary edit-btn" data-id="${request.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${request.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(tr);
    });
    
    // Add event listeners
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            viewRequestDetails(requestId);
        });
    });
    
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            editRequest(requestId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            document.getElementById('delete-request-id').value = requestId;
            deleteRequestModal.show();
        });
    });
}

// View request details
function viewRequestDetails(requestId) {
    // For testing, find the request in mock data
    // In production, replace with API call
    const mockRequests = [
        {
            id: 1, 
            patientName: "John Smith", 
            bloodType: "A+", 
            location: "New York Hospital", 
            unitsNeeded: 2, 
            requestDate: "2023-04-01", 
            status: "URGENT",
            hospital: "New York General Hospital",
            contactPerson: "Dr. Jane Wilson",
            contactPhone: "123-456-7890",
            notes: "Emergency surgery scheduled",
            userId: { id: 101, name: "Maria Johnson" }
        }
    
    ];
    
    const request = mockRequests.find(req => req.id == requestId);
    
    if (request) {
        document.getElementById('detail-patient-name').textContent = request.patientName;
        document.getElementById('detail-blood-type').textContent = request.bloodType;
        document.getElementById('detail-blood-type').className = `badge blood-type ${getBloodTypeClass(request.bloodType)}`;
        document.getElementById('detail-status').textContent = request.status;
        document.getElementById('detail-status').className = `badge request-status ${getStatusBadgeClass(request.status)}`;
        document.getElementById('detail-request-id').textContent = request.id;
        document.getElementById('detail-requester').textContent = request.userId ? request.userId.name : 'Unknown';
        document.getElementById('detail-units').textContent = request.unitsNeeded;
        document.getElementById('detail-location').textContent = request.location;
        document.getElementById('detail-hospital').textContent = request.hospital;
        document.getElementById('detail-contact').textContent = request.contactPerson;
        document.getElementById('detail-phone').textContent = request.contactPhone;
        document.getElementById('detail-date').textContent = formatDate(request.requestDate);
        document.getElementById('detail-notes').textContent = request.notes || 'No additional notes';
        
        // Store ID for edit button
        document.getElementById('edit-detail-btn').setAttribute('data-id', request.id);
        
        requestDetailsModal.show();
    }
    
    // For production with API:
    /*
    fetch(`/api/blood-requests/${requestId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(request => {
        // Same code as above to populate the modal
        requestDetailsModal.show();
    })
    .catch(error => console.error('Error fetching request details:', error));
    */
}

// Edit request
function editRequest(requestId) {
    // For testing, find the request in mock data
    // In production, replace with API call
    const mockRequests = [
        {
            id: 1, 
            patientName: "John Smith", 
            bloodType: "A+", 
            location: "New York Hospital", 
            unitsNeeded: 2, 
            requestDate: "2023-04-01", 
            status: "URGENT",
            hospital: "New York General Hospital",
            contactPerson: "Dr. Jane Wilson",
            contactPhone: "123-456-7890",
            notes: "Emergency surgery scheduled"
        }
    ];
    
    const request = mockRequests.find(req => req.id == requestId);
    
    if (request) {
        document.getElementById('requestModalLabel').textContent = 'Edit Blood Request';
        document.getElementById('request-id').value = request.id;
        document.getElementById('request-patient-name').value = request.patientName;
        document.getElementById('request-blood-type').value = request.bloodType;
        document.getElementById('request-status').value = request.status;
        document.getElementById('request-units').value = request.unitsNeeded;
        document.getElementById('request-location').value = request.location;
        document.getElementById('request-hospital').value = request.hospital;
        document.getElementById('request-contact').value = request.contactPerson;
        document.getElementById('request-phone').value = request.contactPhone;
        document.getElementById('request-notes').value = request.notes || '';
        
        requestModal.show();
    }
    
    // For production with API:
    /*
    fetch(`/api/blood-requests/${requestId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(request => {
        // Same code as above to populate the modal
        requestModal.show();
    })
    .catch(error => console.error('Error fetching request details:', error));
    */
}

// Save request (add or update)
function saveRequest() {
    const requestId = document.getElementById('request-id').value;
    const requestData = {
        id: requestId ? parseInt(requestId) : null,
        patientName: document.getElementById('request-patient-name').value,
        bloodType: document.getElementById('request-blood-type').value,
        status: document.getElementById('request-status').value,
        unitsNeeded: parseInt(document.getElementById('request-units').value),
        location: document.getElementById('request-location').value,
        hospital: document.getElementById('request-hospital').value,
        contactPerson: document.getElementById('request-contact').value,
        contactPhone: document.getElementById('request-phone').value,
        notes: document.getElementById('request-notes').value
    };
    
    // For testing, just reload the table
    requestModal.hide();
    fetchRequests();
    
    // For production with API:
    /*
    const url = requestId ? `/api/blood-requests/update/${requestId}` : '/api/blood-requests/create';
    const method = requestId ? 'PUT' : 'POST';
    
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        requestModal.hide();
        fetchRequests();
    })
    .catch(error => console.error('Error saving request:', error));
    */
}

// Delete request
function deleteRequest(requestId) {
    // For testing, just reload the table
    deleteRequestModal.hide();
    fetchRequests();
    
    // For production with API:
    /*
    fetch(`/api/blood-requests/delete/${requestId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        deleteRequestModal.hide();
        fetchRequests();
    })
    .catch(error => console.error('Error deleting request:', error));
    */
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initial loading of requests
    fetchRequests();
    
    // Add request button
    document.getElementById('add-request-btn').addEventListener('click', function() {
        document.getElementById('requestModalLabel').textContent = 'Add Blood Request';
        document.getElementById('request-form').reset();
        document.getElementById('request-id').value = '';
        requestModal.show();
    });
    
    // Refresh data button
    document.getElementById('refresh-data').addEventListener('click', fetchRequests);
    
    // Search button
    document.getElementById('search-btn').addEventListener('click', searchAndFilterRequests);
    
    // Blood type and location filters
    document.getElementById('blood-type-filter').addEventListener('change', searchAndFilterRequests);
    document.getElementById('location-filter').addEventListener('change', searchAndFilterRequests);
    
    // Save request button
    document.getElementById('save-request-btn').addEventListener('click', saveRequest);
    
    // Edit from details modal
    document.getElementById('edit-detail-btn').addEventListener('click', function() {
        const requestId = this.getAttribute('data-id');
        requestDetailsModal.hide();
        editRequest(requestId);
    });
    
    // Confirm delete button
    document.getElementById('confirm-delete-btn').addEventListener('click', function() {
        const requestId = document.getElementById('delete-request-id').value;
        deleteRequest(requestId);
    });
});