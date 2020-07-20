let dbPromised = idb.open("football-highlight", 1, function(upgradeDb) {
  let teamsObjectStore = upgradeDb.createObjectStore("teams", {
	keyPath: "id"
  });
  teamsObjectStore.createIndex("post_title", "post_title", { unique: false });
});
  
function saveForLater(team) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
	  store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil di simpan.");
    })
    .catch(function() {
      console.error('Team gagal disimpan.')
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function deleteData(id) {
  let getId = parseInt(id);
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      store.delete(getId);
      return tx.complete;
    })
    .then(function() {
      console.log(getId);
      console.log('Team Berhasil dihapus');
    });
  });
}

