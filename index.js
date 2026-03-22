const API_BASE = "https://atlas-index-server-production.up.railway.app";

let allRatings;
async function fetch_players() {
    try {
        const response = await fetch(`${API_BASE}/api/ranking`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET"
        });

        if (!response.ok) throw new Error(response.statusText);
        allRatings = await response.json();
        console.log(allRatings)
    } catch {
        // Mock data
        allRatings = mockData();
    }
    populateTable(allRatings);
}
/*
 * {
    "id": 1,
    "player_id": 2,
    "discord_username": "mariofeeh",
    "character": "AKIHA",
    "moon": "HALF",
    "elo": 1044,
    "games_played": 3,
    "wins": 3
  }
 * */
function mockData() {
    const chars = ["Akiha", "Ciel", "Nero", "Arcueid"];
    const moons = ["Crescent", "Half", "Full"];
    const names = ["Player A", "Player B", "Player C", "Player D"];
    const rows = [];

    for (let i = 0; i < 4; i++) {
        const wins = Math.floor(Math.random() * 40) + 5;
        const losses = Math.floor(Math.random() * 20) + 1;
        rows.push({
            player: {
                discord_username:names[i % names.length]
            },
            character: chars[i % chars.length],
            moon: moons[i % moons.length],
            elo: 1600 - i * 47 + Math.floor(Math.random() * 30),
            games_played: wins + losses,
        });
    }
    return rows.sort((a, b) => b.elo - a.elo);
}

function populateTable(rows) {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = rows.map((r, i) => {
        return `
        <tr>
          <td>${i + 1}</td>
          <td>${r.discord_username}</td>
          <td>${r.character}</td>
          <td>${r.moon}</td>
          <td>${r.games_played ?? '—'}</td>
          <td>${r.elo}</td>
        </tr>`;
    }).join('');
}


// init
fetch_players();
