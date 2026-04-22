const reports = [
    {
        id: 1,
        title: "Morning Workout",
        type: "physical",
        date: "2026-04-20",
        status: "completed"
    },
    {
        id: 2,
        title: "Mental Wellness Check",
        type: "mental",
        date: "2026-04-18",
        status: "excellent"
    },
    {
        id: 3,
        title: "Nutrition Summary",
        type: "nutrition",
        date: "2026-04-10",
        status: "pending"
    },
    {
        id: 4,
        title: "Sleep Cycle Review",
        type: "sleep",
        date: "2026-04-19",
        status: "completed"
    }
];

// ===== Pagination Settings =====
let currentPage = 1;
const itemsPerPage = 6;

// ===== Load Reports on Page Load =====
window.onload = () => {
    renderReports();
    renderPagination();
};

// ===== Render Reports =====
function renderReports(filtered = null) {
    const container = document.getElementById("reportsGrid");
    container.innerHTML = "";

    const data = filtered || reports;

    if (data.length === 0) {
        document.getElementById("noResults").style.display = "block";
        return;
    } else {
        document.getElementById("noResults").style.display = "none";
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = data.slice(start, end);

    paginated.forEach(report => {
        const card = document.createElement("div");
        card.className = "report-card";
        card.innerHTML = `
            <h3>${report.title}</h3>
            <p><strong>Type:</strong> ${report.type}</p>
            <p><strong>Date:</strong> ${report.date}</p>
            <p><strong>Status:</strong> ${report.status}</p>
        `;
        container.appendChild(card);
    });
}

// ===== Search Reports =====
function searchReports() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    const filtered = reports.filter(r =>
        r.title.toLowerCase().includes(query)
    );

    currentPage = 1;
    renderReports(filtered);
    renderPagination(filtered);
}

// ===== Filter Reports =====
function filterReports() {
    const type = document.getElementById("typeFilter").value;
    const date = document.getElementById("dateFilter").value;
    const status = document.getElementById("statusFilter").value;

    let filtered = reports;

    // Filter by type
    if (type) {
        filtered = filtered.filter(r => r.type === type);
    }

    // Filter by status
    if (status) {
        filtered = filtered.filter(r => r.status === status);
    }

    // Filter by date range
    const today = new Date();

    filtered = filtered.filter(r => {
        const reportDate = new Date(r.date);

        if (date === "today") {
            return reportDate.toDateString() === today.toDateString();
        }
        if (date === "week") {
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            return reportDate >= weekAgo;
        }
        if (date === "month") {
            return reportDate.getMonth() === today.getMonth();
        }
        if (date === "year") {
            return reportDate.getFullYear() === today.getFullYear();
        }
        return true;
    });

    currentPage = 1;
    renderReports(filtered);
    renderPagination(filtered);
}

// ===== Clear Filters =====
function clearFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("typeFilter").value = "";
    document.getElementById("dateFilter").value = "";
    document.getElementById("statusFilter").value = "";

    currentPage = 1;
    renderReports();
    renderPagination();
}

// ===== Pagination =====
function renderPagination(filtered = null) {
    const data = filtered || reports;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;

        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            currentPage = i;
            renderReports(filtered);
            renderPagination(filtered);
        };

        pagination.appendChild(btn);
    }
}
function searchReports() {
    // Show the sections when search is triggered
    document.querySelector(".reports-section").style.display = "block";
    document.querySelector(".pagination-section").style.display = "block";

    const query = document.getElementById("searchInput").value.toLowerCase();

    const filtered = reports.filter(r =>
        r.title.toLowerCase().includes(query)
    );

    currentPage = 1;
    renderReports(filtered);
    renderPagination(filtered);
}