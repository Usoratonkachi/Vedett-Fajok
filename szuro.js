document.getElementById('filter-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Megakadályozzuk az alapértelmezett form beküldést

  const katid = document.getElementById('katid').value;
  const ertekid = document.getElementById('ertekid').value;
  const nev = document.getElementById('nev').value;

  // Lekérdezés küldése
  fetch(`/api/adatok?katid=${encodeURIComponent(katid)}&ertekid=${encodeURIComponent(ertekid)}&nev=${encodeURIComponent(nev)}`)
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('adatbazis-container');
          container.innerHTML = ''; // Az előző adatok törlése

          // Az adatok kiírása a DOM-ba
          data.forEach(item => {
              const div = document.createElement('div');
              div.innerHTML = `<strong>${item.nev}</strong> - Kategória ID: ${item.katid} - Érték ID: ${item.ertekid} - Év: ${item.ev}`;
              container.appendChild(div);
          });
      })
      .catch(error => console.error('Hiba:', error));
});
