document.getElementById("searchInput").addEventListener("input", function () {
  let term = this.value.trim();
  if (term.length === 0) {
    document.getElementById("results").innerHTML = "";
    return;
  }
  fetchResults(term);
});
async function fetchResults(term) {
  document.getElementById("loader").style.display = "block";
  document.getElementById("results").innerHTML = "";
  try {
    let response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song`);
    let data = await response.json();
    if (data.results.length === 0) {
      document.getElementById("results").innerHTML = "Nema rezultata za traženi termin.";
    } else {
      let resultsHTML = '<table border="1"><tr><th>Pjesma</th><th>Umjetnik</th></tr>';
      data.results.forEach((song) => {
        resultsHTML += `<tr><td>${song.trackName}</td><td>${song.artistName}</td></tr>`;
      });
      resultsHTML += "</table>";
      document.getElementById("results").innerHTML = resultsHTML;
    }
  } catch (error) {
    document.getElementById("results").innerHTML = "Došlo je do greške pri dohvaćanju podataka.";
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}
