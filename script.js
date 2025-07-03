const API_KEY = "AIzaSyDnVRX9wx45PFaBnW1-csKdz1YVAkhjzSA";
const CSE_ID = "e1a819986c80343e9"; // PGSearch CSE ID

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;
  const resultsBox = document.getElementById("results");
  resultsBox.innerHTML = "<p>Keresés folyamatban...</p>";

  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.items) {
      resultsBox.innerHTML = "";
      data.items.forEach((item) => {
        resultsBox.innerHTML += `
          <div class="result">
            <a href="${item.link}" target="_blank">${item.title}</a>
            <p>${item.snippet}</p>
          </div>
        `;
      });
    } else {
      resultsBox.innerHTML = "<p>Nincs találat 🤷</p>";
    }
  } catch (err) {
    resultsBox.innerHTML = "<p>Hiba történt a keresés során!</p>";
    console.error(err);
  }
});