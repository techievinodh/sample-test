let addresses = [];
convertExcelFileToJsonUsingXlsx();

function convertExcelFileToJsonUsingXlsx() {

  (async () => {
    try {
      await fetch('http://127.0.0.1:5000/convert', {
        method: 'POST',
      })
        .then(response => {
          return response.json();
          return response.json().then(response => {
            let msg = response.hasOwnProperty('fault') ? response.fault.faultstring : response.error.message;
            throw msg;
          });
        })
        .then(data => {
          console.log(data.data);         

          data.data.forEach(address => {
            const row = [
              { BUILDING_NUMBER: address.BUILDING_NUMBER },
              { THOROUGHFARE_NAME: address.THOROUGHFARE_NAME },
              { POST_TOWN: address.POST_TOWN },
              { POSTCODE: address.POSTCODE },
              { UPRN: address.UPRN }
            ];

            addresses.push(row);
          });

          addressViewTable = document.getElementById('addressViewTable');
          //addressViewTable.dataset = myData.addresses;
          // const selResults = document.getElementById('uploadData');
          //   selResults.onchange = function() {
          //       let selectedValue = this.options[this.selectedIndex].value;
          //   }


          //   data.data.forEach(function(val, i) {
          //       const option = document.createElement('option');
          //       option.value = i;
          //       option.text = val;
          //       selResults.add(option);
          //   });
          return addresses;          
        });
    } catch (e) {
      alert(e);
    } finally {
    }
  })();

}

