let currentPage = 1;
const totalPages = 3;

async function fetchItems() {
    const response = await fetch('http://localhost:3000/items');
    const items = await response.json();
    items.forEach(item => {
        const pageElement = document.getElementById(`items${item.page}`);
        pageElement.innerHTML = item.items.map(i => `<p>${i}</p>`).join('');
    });
}

function updatePages() {
    for (let i = 1; i <= totalPages; i++) {
        const pageElement = document.getElementById(`page${i}`);
        pageElement.classList.remove('prev', 'next', 'active');
        
        if (i === currentPage) {
            pageElement.classList.add('active');
        } else if (i < currentPage) {
            pageElement.classList.add('prev');
        } else {
            pageElement.classList.add('next');
        }
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePages();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePages();
    }
}

function editItems(page) {
    document.getElementById('pageNumber').value = page;
    const items = document.getElementById(`items${page}`).innerText.split('\n').join('\n');
    document.getElementById('itemsTextarea').value = items;
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

async function saveItems() {
    const page = document.getElementById('pageNumber').value;
    const items = document.getElementById('itemsTextarea').value.split('\n');
    const response = await fetch('http://localhost:3000/items', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page, items })
    });
    const updatedItems = await response.json();
    document.getElementById(`items${page}`).innerHTML = updatedItems.items.map(i => `<p>${i}</p>`).join('');
    closeModal();
}

window.onload = function() {
    updatePages();
    fetchItems();
}
