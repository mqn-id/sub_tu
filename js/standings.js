function resultStandingsJSON(data) {
  let standingTableHtml = ''
  data.standings.forEach(function(standing) {
    let dataStandingTable = ''

    standing.table.forEach(function (item) {
      item = JSON.parse(JSON.stringify(item).replace(/http:/g, 'https:'));
        console.log("cek url logo team: " + item.team.crestUrl)

      dataStandingTable += `
        <tr>
          <td>${item.position}</td>
          <td><a href="./teams.html?id=${item.team.id}"><img class="responsive-img" style="width:25px;" src="${item.team.crestUrl}"></a></td>
          <td><a href="./teams.html?id=${item.team.id}">${item.team.name}</a></td>
          <td>${item.playedGames}</td>
          <td>${item.won}</td>
          <td>${item.draw}</td>
          <td>${item.lost}</td>
          <td>${item.points}</td>
        </tr>
      `;
    })

    standingTableHtml += `
        <div class="card">
          <table style="font-size:12px;" class="responsive-table">
            <thead>
              <tr >
                <th></th>
                <th></th>
                <th style="text-align:center">Club</th>
                <th>Games</th>
                <th>Won</th>
                <th>Draw</th>
                <th>Lost</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>` + dataStandingTable + `</tbody>
            </table>
            </div>`
  });
   
  document.getElementById("standings").innerHTML = standingsTabelHtml;
}