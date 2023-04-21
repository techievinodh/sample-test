  (async () => {
    try {
      await fetch('http://127.0.0.1:5000/getMatchingRating')
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
      alert(e);
    } finally {
    }
  })();

