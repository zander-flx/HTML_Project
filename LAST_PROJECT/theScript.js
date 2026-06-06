// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebar');
const addExpenseToggle = document.getElementById('addExpenseToggle');
const addExpenseSubmenu = document.getElementById('addExpenseSubmenu');
const mainContent = document.querySelector('.main-content');

if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
            sidebar.classList.toggle('active');
        } 
        else {
            sidebar.classList.toggle('collapsed');
            if (mainContent) {
                mainContent.classList.toggle('expanded');
            }
        }
    });
}

if (addExpenseToggle && addExpenseSubmenu) {
    addExpenseToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.innerWidth > 600 && sidebar.classList.contains('collapsed')) {
            return;
        }
        addExpenseSubmenu.classList.toggle('show');
        addExpenseToggle.classList.toggle('active');
    });
}

const dummyExpenses = [
    { id: 1, date: '2026-06-01', category: 'Foods', description: 'McDonald\'s Lunch', paymentMethod: 'Credit Card', amount: 12.50 },
    { id: 2, date: '2026-06-01', category: 'Transport', description: 'Gasoline - Shell Station', paymentMethod: 'Cash', amount: 45.00 },
    { id: 3, date: '2026-06-02', category: 'Bills', description: 'Internet - Globe At Home', paymentMethod: 'Online Payment', amount: 35.99 },
    { id: 4, date: '2026-06-02', category: 'Entertainment', description: 'Netflix Subscription', paymentMethod: 'Credit Card', amount: 15.99 },
    { id: 5, date: '2026-06-03', category: 'Foods', description: 'Grocery Shopping - Walmart', paymentMethod: 'Debit Card', amount: 87.35 },
    { id: 6, date: '2026-06-03', category: 'Transport', description: 'Parking Fee - Mall', paymentMethod: 'Cash', amount: 5.00 },
    { id: 7, date: '2026-06-04', category: 'Bills', description: 'Electricity - Meralco', paymentMethod: 'Online Payment', amount: 125.50 },
    { id: 8, date: '2026-06-04', category: 'Entertainment', description: 'Movie Tickets - SM Cinema', paymentMethod: 'Credit Card', amount: 28.00 },
    { id: 9, date: '2026-06-05', category: 'Foods', description: 'Coffee - Starbucks', paymentMethod: 'Debit Card', amount: 6.75 },
    { id: 10, date: '2026-06-05', category: 'Transport', description: 'Uber Ride', paymentMethod: 'Online Payment', amount: 18.50 }
];

function loadRecentExpenses() {
    const tableBody = document.getElementById('recentExpensesTable');
    if (tableBody) {
        const recentData = dummyExpenses.slice(0, 5);
        tableBody.innerHTML = recentData.map(expense => `
            <tr>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>$${expense.amount.toFixed(2)}</td>
            </tr>
        `)
    }
}

function loadAllExpenses() {
    const tableBody = document.getElementById('expensesTableBody');
    if (tableBody) {
        tableBody.innerHTML = dummyExpenses.map(expense => `
            <tr>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${expense.paymentMethod}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>
                    <button class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8rem;">Edit</button>
                    <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.8rem;">Delete</button>
                </td>
            </tr>
        `)
    }
}

function filterExpenses() {
    const categoryFilter = document.getElementById('filterCategory').value;
    const dateFilter = document.getElementById('filterDate').value;
    
    let filtered = dummyExpenses;
    
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(expense => 
            expense.category.toLowerCase() === categoryFilter.toLowerCase()
        );
    }
    
    if (dateFilter) {
        filtered = filtered.filter(expense => 
            expense.date.startsWith(dateFilter)
        );
    }
    
    const tableBody = document.getElementById('expensesTableBody');
    if (tableBody && filtered.length > 0) {
        tableBody.innerHTML = filtered.map(expense => `
            <tr>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${expense.paymentMethod}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>
                    <button class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8rem;">Edit</button>
                    <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.8rem;">Delete</button>
                </td>
            </tr>
        `)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadRecentExpenses();
    loadAllExpenses();
    
    const forms = document.querySelectorAll('.expense-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Expense saved successfully!');
            form.reset();
        });
    });
});

window.filterExpenses = filterExpenses;