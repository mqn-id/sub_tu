let leagueId = 2021;
let token = '2835a968ebd74973ae3eb6d958b16a77';
let baseUrl = "https://api.football-data.org/v2/";
let standingUrl = `${baseUrl}competitions/${leagueId}/standings`;
let teamUrl = `${baseUrl}teams/`;

const fetchApi = url => {
  return fetch(url, 
    { 
      mode : 'cors',
      headers: {'X-Auth-Token': token }

    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getStandings() {
  if ('caches' in window) {
        caches.match(standingUrl)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                          resultStandingsJSON(data);
                          console.dir("getStandings " + data);
                      });
                      
                }
            });

  }
  fetchApi(standingUrl)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data)
      console.log(data)
      resultStandingsJSON(data)
      
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {

  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  let teamIdUrl = `${baseUrl}teams/${idParam}`;

  if ("caches" in window) {
      caches.match(teamIdUrl).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            // Menyusun komponen card artikel secara dinamis
            let teamHTML = `
            <div class="row">
            <div class="card-panel">
            <h4 class="light center grey-text text-darken-3"><img class="responsive-img" style="width:30px;" src="${data.crestUrl}"> <b>${data.name}</b></h4>
            <p align="center">Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Ground : ${data.venue}</p>
            </div>
            <div class="col m4">
            <div class="card-panel">
                <h5>Competitions</h5>
                <p>
                  <ul>
          `;
          data.activeCompetitions.forEach(function(item) {
          teamHTML += `
                    <li>${item.name}</li>
                      `;
          });
          teamHTML += `
                    </ul>
                  </p>
                </div>
              </div>
              <div class="col m8">
              <div class="card-panel center">
                <h5>Squad</h5>
                <p>
                      `;
          data.squad.forEach(function(item) {
          teamHTML += `
                    ${item.name} (${item.position}) ,
                      `;
          });
          teamHTML += `
                </p>
              </div>
          </div>
                      `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

  fetchApi(teamIdUrl)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      console.log(data);
      // tampilkan data detail team
      let teamHTML = `
        <div class="row">
          <div class="card-panel">
          <h4 class="light center grey-text text-darken-3"><img class="responsive-img" style="width:30px;" src="${data.crestUrl}"> <b>${data.name}</b></h4>
          <p align="center">Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Ground : ${data.venue}</p>
          </div>
          <div class="col m4">
          <div class="card-panel">
              <h5>Competitions</h5>
              <p>
                <ul>
        `;
        data.activeCompetitions.forEach(function(item) {
        teamHTML += `
                  <li>${item.name}</li>
                    `;
        });
        teamHTML += `
                  </ul>
                </p>
              </div>
            </div>
            <div class="col m8">
            <div class="card-panel center">
              <h5>Squad</h5>
              <p>
                    `;
        data.squad.forEach(function(item) {
        teamHTML += `
                  ${item.name} (${item.position}) ,
                    `;
        });
        teamHTML += `
              </p>
            </div>
        </div>
                    `;
      document.getElementById("body-content").innerHTML = teamHTML;
      resolve(data);
    });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    teams.forEach(function(team) {
		//sesuaikan dengan data json yg ada di db
		//let description = team.post_content.substring(0,100);
      teamsHTML += `
                  <div class="card horizontal">
                    <div class="card-panel center"><a href="./teams.html?id=${team.id}&saved=true"><img class="responsive-img" height="50" width="50" src="${team.crestUrl}" /></a></div>
                    <div class="card-content""><span class="card-title">${team.name}</span></div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = Number(urlParams.get("id"));
  
  getById(idParam).then(function(team) {
    let teamHTML = '';
    teamHTML = `
    <div class="card horizontal">
    <div class="card-panel center"><img class="responsive-img" height="150" width="150" src="${team.crestUrl}" /></div>
    <div class="fixed-action-btn">
    <a href="./teams.html?id=${team.id}&delete=true" class="btn-floating btn-large waves-effect waves-light red"><i class="small material-icons">delete</i></a>
    </div>
    <div class="card-content"><span class="card-title">${team.name}</span>Addres:&nbsp ${team.address}
    <br>Website:&nbsp<a href="${team.website}" target="_blank">${team.website}</a>
    <br>Founded:&nbsp${team.founded}
    <br>Venue:&nbsp${team.venue}
    </div>
    
    </div>
    
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function getDeleteTeam() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = Number(urlParams.get("id"));
    deleteData(idParam)
    .then(function(team) {
    console.log('Hapus Team');
    });
}