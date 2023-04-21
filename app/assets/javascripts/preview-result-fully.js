// const uploadData = document.getElementById('uploadData');
// uploadData.addEventListener("dblclick", );
var addresses = [];
var UID = 0;
var UIDArr = [];
var paginationArr = [];
var current_page = 1;
var rows = 10;
var start = 0;
var end = 0;
if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

let queryParam2 = document.getElementById('fileName').innerHTML;
queryParam2 = encodeURI(queryParam2.split('.')[0]);

var urlPath = `http://localhost:5000/getpreviewrecords?exportType=full&filename=${queryParam2}`;
getAddressGridData(0);
function getAddressGridData(UID) {
  (async () => {
    try {
      await fetch(urlPath)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          if (data.data) {
            addresses = data.data;
            console.log(addresses);
            // UID = data.lastItem.UID;
            // UIDArr.push(UID);
            //localStorage.setItem('UID', UID);
            end = current_page * rows;
            start = end - 10;
            var arr = addresses.slice(start, end);
            console.log(arr);
            createTable(arr);
          }
        });
    } catch (e) {
      // alert(e);
    } finally {
    }
  })();
}

function createTable(data) {
  var html = '';
  document.getElementById('govuk-table__body').innerHTML = html;

  data.forEach(address => {
    if (address.MATCHING_RATING == 2) {
      html =
        '<tr class="govuk-table__row">' +
        '<td class="govuk-table__cell govuk-!-padding-left-4">' +
        address.RAW_INPUT +
        '</td>' +
        '<td  class="govuk-table__cell">' +
        address.OS_MATCHING_SCORE +
        '</td>' +
        '<td  class="govuk-table__cell">' +
        address.X_COORDINATE +
        ',' +
        address.Y_COORDINATE +
        '</td>' +
        '<td  class="govuk-table__cell">' +
        address.TARGET_AREA_NAMES.join(', ') +
        '</td>' +
        '<td  class="govuk-table__cell">' +
        address.TARGET_AREA_CODE.join(', ') +
        '</td>' +
        '<td  class="govuk-table__cell"></td>' +
        '</tr>';
      document.getElementById('govuk-table__body').innerHTML += html;
    }
  });
  // createPages(current_page);
}
function prevPage() {
  if (current_page > 1) {
    current_page--;
    document.getElementsByClassName('govuk-link govuk-pagination__link')[0].classList.remove('noCursor');
    document.getElementsByClassName('govuk-link govuk-pagination__link')[1].classList.remove('noCursor');
  }
  if (current_page <= 1) {
    document.getElementsByClassName('govuk-link govuk-pagination__link')[0].classList.add('noCursor');
  }
  end = current_page * rows;
  start = end - 10;
  createTable(addresses.slice(start, end));
}

function nextPage() {
  current_page++;
  let count = Math.ceil(addresses.length / 10);
  if (count < current_page + 1) {
    console.log(document.getElementsByClassName('govuk-pagination__next'));
    document.getElementsByClassName('govuk-link govuk-pagination__link')[1].classList.add('noCursor');
  } else {
    document.getElementsByClassName('govuk-link govuk-pagination__link')[1].classList.remove('noCursor');
    document.getElementsByClassName('govuk-link govuk-pagination__link')[0].classList.remove('noCursor');
  }
  //createPages(current_page);
  end = current_page * rows;
  start = end - 10;
  // addresses.slice(start,end);
  createTable(addresses.slice(start, end));
  //getAddressGridData(UID);
}

function getPage(current_page) {
  end = current_page * rows;
  start = end - 10;
  createTable(addresses.slice(start, end));
}

function createPages(currentPage) {
  let count = Math.ceil(addresses.length / 10);
  for (let i = 0; i < count; i++) {
    currentPage++;
    console.log(currentPage);
    if (count >= currentPage) {
      var html = '';
      var referenceNode = '';
      html = `<a class="govuk-link govuk-pagination__link" href="javascript:getPage(${currentPage})"  aria-label="Page ${currentPage}"> ${currentPage} </a>`;
      var el = document.createElement('li');
      el.classList.add('govuk-pagination__item'); //govuk-pagination__item--current
      el.setAttribute('id', 'govuk-pagination__item' + currentPage);

      let item = currentPage - 2;
      referenceNode = document.getElementsByClassName('govuk-pagination__item');
      referenceNode[item].parentNode.insertBefore(el, referenceNode[item].nextSibling);
      document.getElementById('govuk-pagination__item' + currentPage).innerHTML += html;
    }
  }
}
