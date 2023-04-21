const btnClick = document.getElementById('downloadcsv');
btnClick.addEventListener('click', downloadFile);

function downloadFile() {
  (async () => {
    try {
      await fetch('http://localhost:5000/downloadsamplecsv')
        .then(response => {
            console.log('Response from controllere :', response)
          // return response.json();
          return response;
        })
        .then(data => {
          console.log(data);
        });
    } catch (e) {
      alert(e);
    } finally {
    }
  })();
}
