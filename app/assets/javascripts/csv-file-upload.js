const btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', uploadFile);

function uploadFile() {
  const file = document.getElementById('file-upload-1');
  console.log('enter');
  const formData = new FormData();

  formData.append('file', file.files[0]);

  console.log(...formData);

  (async () => {
    try {
      await fetch('http://127.0.0.1:5000/uploads', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          return response.json();
          return response.json().then(response => {
            let msg = response.hasOwnProperty('fault') ? response.fault.faultstring : response.error.message;
            throw msg;
          });
        })
        .then(data => {
          console.log(data);
        });
    } catch (e) {
      //alert(e);
    } finally {
    }
  })();
}
