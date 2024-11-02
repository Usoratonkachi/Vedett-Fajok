document.getElementById('show-create-form').addEventListener('click', function() {
    const createFormContainer = document.getElementById('create-form-container');
    createFormContainer.style.display = createFormContainer.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('create-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nev = document.getElementById('create-nev').value;
    const katid = document.getElementById('create-kategoria').value;
    const ertekid = document.getElementById('create-ertekid').value;
    const ev = document.getElementById('create-ev').value;

    fetch('/api/allatok', {
        method: 'POST',
        body: JSON.stringify({ nev, katid, ertekid, ev }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error saving data');
        }
        return response.text();
    })
    .then(result => {
        alert('Adat sikeresen mentve');
        fetchAllatok(); // Adatok frissítése
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('read-button').addEventListener('click', function() {
    const readContainer = document.getElementById('read-container');
    if (readContainer.style.display === 'none' || readContainer.style.display === '') {
        fetchAllatok();
        readContainer.style.display = 'block';
    } else {
        readContainer.style.display = 'none';
    }
});

function fetchAllatok() {
    fetch('/api/allatok')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('read-container');
            container.innerHTML = ''; // Az előző adatok törlése
            data.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <strong>${item.nev}</strong> - Kategória: ${item.kategoria_nev} - Érték: ${item.forint} Ft - Év: ${item.ev}
                    <div>
                        <button onclick="editAllat(${item.id})">Módosítás</button>
                        <button onclick="deleteAllat(${item.id})">Törlés</button>
                    </div>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteAllat(id) {
    fetch(`/api/allatok/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error deleting data');
        }
        return response.text();
    })
    .then(result => {
        alert('Adat sikeresen törölve');
        fetchAllatok(); // Adatok frissítése
    })
    .catch(error => console.error('Error:', error));
}

function editAllat(id) {
    fetch(`/api/allatok`)
        .then(response => response.json())
        .then(data => {
            const allat = data.find(item => item.id === id);
            document.getElementById('update-id').value = allat.id;
            document.getElementById('update-nev').value = allat.nev;
            document.getElementById('update-kategoria').value = allat.katid;
            document.getElementById('update-ertekid').value = allat.ertekid;
            document.getElementById('update-ev').value = allat.ev;

            document.getElementById('create-form-container').style.display = 'none';
            document.getElementById('update-form-container').style.display = 'block';
            document.getElementById('delete-form-container').style.display = 'none';
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('update-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('update-id').value;
    const nev = document.getElementById('update-nev').value;
    const katid = document.getElementById('update-kategoria').value;
    const ertekid = document.getElementById('update-ertekid').value;
    const ev = document.getElementById('update-ev').value;

    fetch(`/api/allatok/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ nev, katid, ertekid, ev }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error updating data');
        }
        return response.text();
    })
    .then(result => {
        alert('Adat sikeresen módosítva');
        fetchAllatok(); // Adatok frissítése
    })
    .catch(error => console.error('Error:', error));
});

// Adatok betöltése az oldal betöltésekor
window.addEventListener('DOMContentLoaded', fetchAllatok);
