
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
        const donorModal = new bootstrap.Modal(document.getElementById('donorModal'));
        const donorDetailsModal = new bootstrap.Modal(document.getElementById('donorDetailsModal'));
        const deleteDonorModal = new bootstrap.Modal(document.getElementById('deleteDonorModal'));
        
        // Helper function to format date
        function formatDate(dateString) {
            if (!dateString) return "Never";
            
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays <= 30) {
                return `${diffDays} days ago`;
            } else {
                return date.toLocaleDateString();
            }
        }
        
        // Helper function to get blood type class
        function getBloodTypeClass(bloodType) {
            if (bloodType.startsWith('A')) {
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
                case 'ACTIVE':
                    return 'bg-success';
                case 'INACTIVE':
                    return 'bg-secondary';
                case 'PENDING':
                    return 'bg-warning text-dark';
                default:
                    return 'bg-info';
            }
        }
        
        // Fetch all donors
        function fetchDonors() {
            fetch('/api/donors', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(data => {
                displayDonors(data);
                updateStatistics(data);
            })
            .catch(error => console.error('Error fetching donors:', error));
        }
        
        // Search and filter donors
        function searchAndFilterDonors() {
            const query = document.getElementById('search-input').value.trim();
            const bloodType = document.getElementById('blood-type-filter').value;
            const status = document.getElementById('status-filter').value;
            
            let url = '/api/donors/search?';
            if (query) url += `query=${encodeURIComponent(query)}&`;
            if (bloodType) url += `bloodType=${encodeURIComponent(bloodType)}&`;
            if (status) url += `status=${encodeURIComponent(status)}`;
            
            fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(data => {
                displayDonors(data);
            })
            .catch(error => console.error('Error searching donors:', error));
        }
        
        // Update statistics
        function updateStatistics(donors) {
            document.getElementById('total-donors').textContent = donors.length;
            
            // Count blood types
            let typeACounts = donors.filter(donor => donor.bloodType.startsWith('A') && !donor.bloodType.startsWith('AB')).length;
            let typeBCounts = donors.filter(donor => donor.bloodType.startsWith('B') && !donor.bloodType.startsWith('AB')).length;
            let typeABCounts = donors.filter(donor => donor.bloodType.startsWith('AB')).length;
            let typeOCounts = donors.filter(donor => donor.bloodType.startsWith('O')).length;
            
            document.getElementById('type-a-count').textContent = typeACounts;
            document.getElementById('type-b-count').textContent = typeBCounts;
            document.getElementById('type-ab-count').textContent = typeABCounts;
            document.getElementById('type-o-count').textContent = typeOCounts;
        }
        
        // Display donors in table
        function displayDonors(donors) {
            const tableBody = document.getElementById('donors-data');
            tableBody.innerHTML = '';
            
            donors.forEach(donor => {
                const tr = document.createElement('tr');
                
                const bloodTypeClass = getBloodTypeClass(donor.bloodType);
                const statusBadgeClass = getStatusBadgeClass(donor.status);
                
                tr.innerHTML = `
                    <td>${donor.id}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="donor-avatar me-3">
                                ${donor.name ? donor.name.charAt(0).toUpperCase() : 'D'}
                            </div>
                            ${donor.name}
                        </div>
                    </td>
                    <td><span class="badge blood-type ${bloodTypeClass}">${donor.bloodType}</span></td>
                    <td>${donor.location}</td>
                    <td>${donor.phone}</td>
                    <td>${formatDate(donor.lastDonationDate)}</td>
                    <td><span class="badge ${statusBadgeClass}">${donor.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary view-btn" data-id="${donor.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-secondary edit-btn" data-id="${donor.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${donor.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                
                tableBody.appendChild(tr);
            });
            
            // Add event listeners
            document.querySelectorAll('.view-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const donorId = this.getAttribute('data-id');
                    viewDonorDetails(donorId);
                });
            });
            
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const donorId = this.getAttribute('data-id');
                    editDonor(donorId);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const donorId = this.getAttribute('data-id');
                    document.getElementById('delete-donor-id').value = donorId;
                    deleteDonorModal.show();
                });
            });
        }
        
        // View donor details
        function viewDonorDetails(donorId) {
            fetch(`/api/donors/${donorId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(donor => {
                document.getElementById('detail-donor-avatar').textContent = donor.name.charAt(0).toUpperCase();
                document.getElementById('detail-donor-name').textContent = donor.name;
                
                const bloodTypeEl = document.getElementById('detail-donor-blood-type');
                bloodTypeEl.textContent = donor.bloodType;
                bloodTypeEl.className = `badge blood-type ${getBloodTypeClass(donor.bloodType)}`;
                
                document.getElementById('detail-donor-id').textContent = donor.id;
                document.getElementById('detail-donor-email').textContent = donor.email;
                document.getElementById('detail-donor-phone').textContent = donor.phone;
                document.getElementById('detail-donor-location').textContent = donor.location;
                document.getElementById('detail-donor-last-donation').textContent = donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'Never donated';
                
                const statusEl = document.getElementById('detail-donor-status');
                statusEl.innerHTML = `<span class="badge ${getStatusBadgeClass(donor.status)}">${donor.status}</span>`;
                
                document.getElementById('detail-donor-notes').textContent = donor.notes || 'No notes available';
                
                // Store donor ID for edit button
                document.getElementById('edit-detail-btn').setAttribute('data-id', donor.id);
                
                donorDetailsModal.show();
            })
            .catch(error => console.error('Error fetching donor details:', error));
        }
        
        // Edit donor
        function editDonor(donorId) {
            // Change modal title
            document.getElementById('donorModalLabel').textContent = 'Edit Donor';
            
            fetch(`/api/donors/${donorId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(donor => {
                document.getElementById('donor-id').value = donor.id;
                document.getElementById('donor-name').value = donor.name;
                document.getElementById('donor-blood-type').value = donor.bloodType;
                document.getElementById('donor-status').value = donor.status;
                document.getElementById('donor-phone').value = donor.phone;
                document.getElementById('donor-email').value = donor.email;
                document.getElementById('donor-location').value = donor.location;
                document.getElementById('donor-last-donation').value = donor.lastDonationDate ? donor.lastDonationDate.split('T')[0] : '';
                document.getElementById('donor-notes').value = donor.notes || '';
                
                donorModal.show();
            })
            .catch(error => console.error('Error fetching donor details:', error));
        }
        
        // Reset form
        function resetForm() {
            document.getElementById('donor-form').reset();
            document.getElementById('donor-id').value = '';
            document.getElementById('donorModalLabel').textContent = 'Add Donor';
        }
        
        // Add event listeners
        document.getElementById('add-donor-btn').addEventListener('click', function() {
            resetForm();
            donorModal.show();
        });
        
        document.getElementById('edit-detail-btn').addEventListener('click', function() {
            const donorId = this.getAttribute('data-id');
            donorDetailsModal.hide();
            editDonor(donorId);
        });
        
        document.getElementById('save-donor-btn').addEventListener('click', function() {
            const donorId = document.getElementById('donor-id').value;
            const isNewDonor = !donorId;
            
            const donorData = {
                name: document.getElementById('donor-name').value,
                bloodType: document.getElementById('donor-blood-type').value,
                status: document.getElementById('donor-status').value,
                phone: document.getElementById('donor-phone').value,
                email: document.getElementById('donor-email').value,
                location: document.getElementById('donor-location').value,
                lastDonationDate: document.getElementById('donor-last-donation').value || null,
                notes: document.getElementById('donor-notes').value
            };
            
            const url = isNewDonor ? '/api/donors' : `/api/donors/${donorId}`;
            const method = isNewDonor ? 'POST' : 'PUT';
            
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(donorData)
            })
            .then(response => response.json())
            .then(data => {
                donorModal.hide();
                fetchDonors(); // Refresh the list
                alert(`Donor ${isNewDonor ? 'added' : 'updated'} successfully!`);
                alert(`Donor ${isNewDonor ? 'added' : 'updated'} successfully!`);
            })
            .catch(error => {
                console.error(`Error ${isNewDonor ? 'adding' : 'updating'} donor:`, error);
                alert(`Error ${isNewDonor ? 'adding' : 'updating'} donor. Please try again.`);
            });
        });
        
        document.getElementById('confirm-delete-btn').addEventListener('click', function() {
            const donorId = document.getElementById('delete-donor-id').value;
            
            fetch(`/api/donors/${donorId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                if (response.ok) {
                    deleteDonorModal.hide();
                    fetchDonors(); // Refresh the list
                    alert('Donor deleted successfully!');
                } else {
                    throw new Error('Failed to delete donor');
                }
            })
            .catch(error => {
                console.error('Error deleting donor:', error);
                alert('Error deleting donor. Please try again.');
            });
        });
        
        document.getElementById('search-btn').addEventListener('click', function() {
            searchAndFilterDonors();
        });
        
        document.getElementById('search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchAndFilterDonors();
            }
        });
        
        document.getElementById('blood-type-filter').addEventListener('change', function() {
            searchAndFilterDonors();
        });
        
        document.getElementById('status-filter').addEventListener('change', function() {
            searchAndFilterDonors();
        });
        
        document.getElementById('refresh-data').addEventListener('click', function() {
            fetchDonors();
            document.getElementById('search-input').value = '';
            document.getElementById('blood-type-filter').value = '';
            document.getElementById('status-filter').value = '';
        });
        
        // Initial data fetch
        fetchDonors();
    