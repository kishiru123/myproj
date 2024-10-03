


//----------------------------------------------------------------------EndAdmin 

//---------------------------------------------------------------------Start ApartmentList
const apartments = [
    {
        id: '101',
        building: 'Building A',
        floor: '1',
        type: '1-Bedroom',
        size: '45 sqm',
        status: 'Occupied',
        tenant: 'Jane Doe',
        rent: '₱15,000',
        inspection: '2024-01-10',
        condition: 'Needs painting'
    },
    {
        id: '102',
        building: 'Building A',
        floor: '1',
        type: 'Studio',
        size: '30 sqm',
        status: 'Available',
        tenant: '-',
        rent: '₱10,000',
        inspection: '2024-01-15',
        condition: 'Recently renovated'
    }
];

// Function to generate table rows
function genTableRows() {
    const tableBody = document.getElementById('apartment-table-body');
    tableBody.innerHTML = '';

    apartments.forEach(apartment => {
        const row = document.createElement('tr');
        row.setAttribute('data-bs-toggle', 'modal');
        row.setAttribute('data-bs-target', '#detailsModal');
        row.setAttribute('data-id', apartment.id);
        row.setAttribute('data-building', apartment.building);
        row.setAttribute('data-floor', apartment.floor);
        row.setAttribute('data-type', apartment.type);
        row.setAttribute('data-size', apartment.size);
        row.setAttribute('data-status', apartment.status);
        row.setAttribute('data-tenant', apartment.tenant);
        row.setAttribute('data-rent', apartment.rent);
        row.setAttribute('data-inspection', apartment.inspection);
        row.setAttribute('data-condition', apartment.condition);

        row.innerHTML = `
            <td>${apartment.id}</td>
            <td>${apartment.building}</td>
            <td>${apartment.floor}</td>
            <td>${apartment.type}</td>
            <td>${apartment.size}</td>
            <td>${apartment.status}</td>
            <td>${apartment.tenant}</td>
            <td>${apartment.rent}</td>
            <td>${apartment.inspection}</td>
            <td>${apartment.condition}</td>
            <td><button class="btn btn-info btn-sm">View Details</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to handle modal data population
function ModalData() {
    const modal = document.getElementById('detailsModal');
    modal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget; // Button that triggered the modal
        const row = button.closest('tr');

        document.getElementById('modal-apartment-id').textContent = row.getAttribute('data-id');
        document.getElementById('modal-building').textContent = row.getAttribute('data-building');
        document.getElementById('modal-floor').textContent = row.getAttribute('data-floor');
        document.getElementById('modal-type').textContent = row.getAttribute('data-type');
        document.getElementById('modal-size').textContent = row.getAttribute('data-size');
        document.getElementById('modal-status').textContent = row.getAttribute('data-status');
        document.getElementById('modal-tenant').textContent = row.getAttribute('data-tenant');
        document.getElementById('modal-rent').textContent = row.getAttribute('data-rent');
        document.getElementById('modal-inspection').textContent = row.getAttribute('data-inspection');
        document.getElementById('modal-condition').textContent = row.getAttribute('data-condition');
    });
}

// Initialize table and modal handling
$(document).ready(function() {
    console.log("Document is ready Apartment");
    genTableRows(); // Generate the rows first
    $('#apartmentTable').DataTable(); // Initialize DataTable
    ModalData(); // Handle modal data population
});

//---------------------------------------------------------------------End Apartment
//------------------------------------------------------------------------------Maintenance
const maintenanceRecords = [
    {
        id: 'M001',
        apartmentId: '101',
        date: '2024-08-01',
        type: 'Plumbing',
        description: 'Leaky faucet in kitchen.',
        status: 'Completed',
        technician: 'John Smith',
        cost: '₱1,200'
    },
    {
        id: 'M002',
        apartmentId: '102',
        date: '2024-08-05',
        type: 'Electrical',
        description: 'Faulty wiring in living room.',
        status: 'Pending',
        technician: 'Alice Johnson',
        cost: '₱2,500'
    }
];

// Function to generate table rows for maintenance records
function generateMaintenanceTableRows() {
    const tableBody = document.getElementById('maintenance-table-body');
    tableBody.innerHTML = '';

    maintenanceRecords.forEach(record => {
        const row = document.createElement('tr');
        row.setAttribute('data-bs-toggle', 'modal');
        row.setAttribute('data-bs-target', '#detailsModal');
        row.setAttribute('data-id', record.id);
        row.setAttribute('data-apartment-id', record.apartmentId);
        row.setAttribute('data-date', record.date);
        row.setAttribute('data-type', record.type);
        row.setAttribute('data-description', record.description);
        row.setAttribute('data-status', record.status);
        row.setAttribute('data-technician', record.technician);
        row.setAttribute('data-cost', record.cost);

        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.apartmentId}</td>
            <td>${record.date}</td>
            <td>${record.type}</td>
            <td>${record.description}</td>
            <td>${record.status}</td>
            <td>${record.technician}</td>
            <td>${record.cost}</td>
            <td><button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#maintenanceDetailsModal">View Details</button></td>
        `;

        tableBody.appendChild(row);
    });
}
// Function to handle modal data population for maintenance records
function handleMaintenanceModalData() {
    // Use a delegated event handler to ensure it works with dynamically added rows
    $(document).on('show.bs.modal', '#maintenanceDetailsModal', function (event) {
        const button = event.relatedTarget; // Button that triggered the modal
        const row = button.closest('tr'); // Find the closest row

        if (row.length) {
            // Populate modal fields with data from the row
            document.getElementById('modal-record-id').textContent = row.getAttribute('data-id');
            document.getElementById('modal-apartment-id').textContent = row.getAttribute('data-apartment-id');
            document.getElementById('modal-date').textContent = row.getAttribute('data-date');
            document.getElementById('modal-type').textContent = row.getAttribute('data-type');
            document.getElementById('modal-description').textContent = row.getAttribute('data-description');
            document.getElementById('modal-status').textContent = row.getAttribute('data-status');
            document.getElementById('modal-technician').textContent = row.getAttribute('data-technician');
            document.getElementById('modal-cost').textContent = row.getAttribute('data-cost');

            // Log to the console when the modal is clicked
            console.log("Maintenance modal clicked for Record ID:", row.getAttribute('data-id'));
        } else {
            console.error("No row found for the clicked button.");
        }
    });
}

// Initialize maintenance records and modal handling
$(document).ready(function() {
    console.log("Maintenance Document is ready");
    generateMaintenanceTableRows();
    $('#maintenanceTable').DataTable();

    // Handle the modal data population
    handleMaintenanceModalData();
});


//------------------------------------------------------------------------------Leases
const leases = [
    { id: 'L001', apartmentId: '101', tenant: 'Jane Doe', startDate: '2024-01-01', endDate: '2024-12-31', rent: '₱15,000', status: 'Active' },
    { id: 'L002', apartmentId: '102', tenant: 'John Smith', startDate: '2024-03-01', endDate: '2024-08-31', rent: '₱10,000', status: 'Expired' }
];

// Function to generate the entire lease table HTML
function generateLeaseTableHTML() {
    const rows = leases.map(lease => `
        <tr data-bs-toggle="modal" data-bs-target="#leaseDetailsModal" 
            data-id="${lease.id}" data-apartment-id="${lease.apartmentId}" 
            data-tenant="${lease.tenant}" data-start-date="${lease.startDate}" 
            data-end-date="${lease.endDate}" data-rent="${lease.rent}" 
            data-status="${lease.status}">
            <td>${lease.id}</td>
            <td>${lease.apartmentId}</td>
            <td>${lease.tenant}</td>
            <td>${lease.startDate}</td>
            <td>${lease.endDate}</td>
            <td>${lease.rent}</td>
            <td>${lease.status}</td>
            <td><button class="btn btn-info btn-sm">View Details</button></td>
        </tr>
    `).join('');

    return `
        <table id="leaseTable" class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Lease ID</th>
                    <th scope="col">Apartment ID</th>
                    <th scope="col">Tenant</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Rent</th>
                    <th scope="col">Status</th>
                    <th scope="col">Details</th>
                </tr>
            </thead>
            <tbody id="lease-table-body">
                ${rows}
            </tbody>
        </table>
    `;
}

// Function to handle modal data population for leases
function handleLeaseModalData() {
    const row = $(this).closest('tr');

    $('#modal-lease-id').text(row.data('id'));
    $('#modal-apartment-id').text(row.data('apartment-id'));
    $('#modal-tenant').text(row.data('tenant'));
    $('#modal-start-date').text(row.data('start-date'));
    $('#modal-end-date').text(row.data('end-date'));
    $('#modal-rent').text(row.data('rent'));
    $('#modal-status').text(row.data('status'));
}

// Initialize lease records
$(document).ready(function() {
    console.log("Lease Document is ready");
    $('#leaseRecordsContainer').html(generateLeaseTableHTML());
    $('#leaseTable').DataTable();
    $('#leaseTable').on('click', 'button', handleLeaseModalData);
});

//--------------------------------------------------------------------EMERGENCY RESPONSE
const emergencies = [
    {
        id: 'E001',
        unitNumber: '101',
        date: '2024-01-15',
        type: 'Fire',
        description: 'Minor kitchen fire in unit 101.',
        status: 'Resolved'
    },
    {
        id: 'E002',
        unitNumber: '102',
        date: '2024-02-20',
        type: 'Flood',
        description: 'Water leakage from the ceiling in unit 102.',
        status: 'Pending'
    }
];

// Function to generate table rows and initialize DataTables
function emergencyTableRows() {
    const tableBody = document.getElementById('emergency-table-body');
    tableBody.innerHTML = '';

    emergencies.forEach(emergency => {
        const row = document.createElement('tr');
        row.setAttribute('data-bs-toggle', 'modal');
        row.setAttribute('data-bs-target', '#emergencyDetailsModal');
        row.setAttribute('data-id', emergency.id);
        row.setAttribute('data-unit-number', emergency.unitNumber);
        row.setAttribute('data-date', emergency.date);
        row.setAttribute('data-type', emergency.type);
        row.setAttribute('data-description', emergency.description);
        row.setAttribute('data-status', emergency.status);

        row.innerHTML = `
            <td>${emergency.id}</td>
            <td>${emergency.unitNumber}</td>
            <td>${emergency.date}</td>
            <td>${emergency.type}</td>
            <td>${emergency.description}</td>
            <td>${emergency.status}</td>
            <td><button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#emergencyDetailsModal">View Details</button></td>
        `;

        tableBody.appendChild(row);
    });

    // Initialize DataTables
    $('#emergencyTable').DataTable();
}

// Function to handle modal data population
function emergencyModalData() {
    const modal = document.getElementById('emergencyDetailsModal');
    modal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget; // Button that triggered the modal
        const row = button.closest('tr'); // Find the closest row

        // Populate modal fields with data from the row
        document.getElementById('modal-emergency-id').textContent = row.getAttribute('data-id');
        document.getElementById('modal-unit-number').textContent = row.getAttribute('data-unit-number');
        document.getElementById('modal-date').textContent = row.getAttribute('data-date');
        document.getElementById('modal-type').textContent = row.getAttribute('data-type');
        document.getElementById('modal-description').textContent = row.getAttribute('data-description');
        document.getElementById('modal-status').textContent = row.getAttribute('data-status');
    });
}

// Initialize table and modal
document.addEventListener('DOMContentLoaded', () => {
    console.log("Emergency data ready");
    emergencyTableRows();
    emergencyModalData();
});


//------------------------------------------------------------------------------visitors
const SHEET_ID = 'SHEET_ID'; 
const API_KEY = 'API_KEY';
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:D?key=${API_KEY}`;



async function fetchResponses() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    const rows = data.values.slice(1); // Skip header row
    const userTableBody = document.getElementById('visitorTable');

    userTableBody.innerHTML = ''; // Clear existing rows

    rows.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
            <td>
                <button class="btn btn-info btn-sm viewResponseBtn" data-index="${index}">View</button>
            </td>
        `;
        userTableBody.appendChild(tr);
    });

    attachViewButtons();
}

function attachViewButtons() {
    document.querySelectorAll('.viewResponseBtn').forEach((button) => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const row = document.querySelectorAll('#visitorTable tr')[index].children;

            // Populate modal with response data
            document.getElementById('responseName').textContent = row[0].textContent;
            document.getElementById('responseVisitorType').textContent = row[1].textContent;
            document.getElementById('responseVisitDate').textContent = row[2].textContent;
            document.getElementById('responsePurpose').textContent = row[3].textContent;
            $('#responseModal').modal('show'); // Show modal
        });
    });
}

// fetchResponses on page load
window.onload = fetchResponses;


