    // Define an empty JSON object to temporarily store the matched results.
    let oJson = {};

    // Define DPA and LPI field names (used to populate table structure).
    const fields = {
        'DPA': [
            'UPRN',
            'UDPRN',
            'ADDRESS',
            'DEPARTMENT_NAME',
            'ORGANISATION_NAME',
            'SUB_BUILDING_NAME',
            'BUILDING_NAME',
            'BUILDING_NUMBER',
            'PO_BOX_NUMBER',
            'DEPENDENT_THOROUGHFARE_NAME',
            'THOROUGHFARE_NAME',
            'DOUBLE_DEPENDENT_LOCALITY',
            'DEPENDENT_LOCALITY',
            'POST_TOWN',
            'POSTCODE',
            'RPC',
            'X_COORDINATE',
            'Y_COORDINATE',
            'LNG',
            'LAT',
            'STATUS',
            'LOGICAL_STATUS_CODE',
            'CLASSIFICATION_CODE',
            'CLASSIFICATION_CODE_DESCRIPTION',
            'LOCAL_CUSTODIAN_CODE',
            'LOCAL_CUSTODIAN_CODE_DESCRIPTION',
            'COUNTRY_CODE',
            'COUNTRY_CODE_DESCRIPTION',
            'POSTAL_ADDRESS_CODE',
            'POSTAL_ADDRESS_CODE_DESCRIPTION',
            'BLPU_STATE_CODE',
            'BLPU_STATE_CODE_DESCRIPTION',
            'TOPOGRAPHY_LAYER_TOID',
            'LAST_UPDATE_DATE',
            'ENTRY_DATE',
            'BLPU_STATE_DATE',
            'LANGUAGE',
            'MATCH',
            'MATCH_DESCRIPTION',
            'DELIVERY_POINT_SUFFIX'
        ],
        'LPI': [
            'UPRN',
            'ADDRESS',
            'USRN',
            'LPI_KEY',
            'ORGANISATION',
            'SAO_TEXT',
            'SAO_START_NUMBER',
            'SAO_START_SUFFIX',
            'SAO_END_NUMBER',
            'SAO_END_SUFFIX',
            'PAO_TEXT',
            'PAO_START_NUMBER',
            'PAO_START_SUFFIX',
            'PAO_END_NUMBER',
            'PAO_END_SUFFIX',
            'STREET_DESCRIPTION',
            'LOCALITY',
            'TOWN_NAME',
            'ADMINISTRATIVE_AREA',
            'POSTCODE_LOCATOR',
            'RPC',
            'X_COORDINATE',
            'Y_COORDINATE',
            'LNG',
            'LAT',
            'STATUS',
            'LOGICAL_STATUS_CODE',
            'CLASSIFICATION_CODE',
            'CLASSIFICATION_CODE_DESCRIPTION',
            'LOCAL_CUSTODIAN_CODE',
            'LOCAL_CUSTODIAN_CODE_DESCRIPTION',
            'COUNTRY_CODE',
            'COUNTRY_CODE_DESCRIPTION',
            'POSTAL_ADDRESS_CODE',
            'POSTAL_ADDRESS_CODE_DESCRIPTION',
            'BLPU_STATE_CODE_DESCRIPTION',
            'TOPOGRAPHY_LAYER_TOID',
            'PARENT_UPRN',
            'LAST_UPDATE_DATE',
            'ENTRY_DATE',
            'STREET_STATE_CODE',
            'STREET_STATE_CODE_DESCRIPTION',
            'LPI_LOGICAL_STATUS_CODE',
            'LPI_LOGICAL_STATUS_CODE_DESCRIPTION',
            'LANGUAGE',
            'MATCH',
            'MATCH_DESCRIPTION'
        ]
    };

    //initialiseTable(fields.DPA);

    // // Add an 'onclick' handler for the radio buttons.
    // const radios = 'find';
    // for( let i in radios ) {
    //     radios[i].onclick = function() {
    //         let isDisabled = this.value !== 'find' ? true : false;
    //         document.getElementById('minmatch').disabled = isDisabled;
    //     }
    // }

    // // Add a 'change' handler for the minmatch values (inclusive 0.1 - 1.0).
    // const minMatch = document.getElementById('minmatch');
    // minMatch.addEventListener('change', function() {
    //     if( this.value < 0.1 ) this.value = this.min;
    //     else if( this.value >= 1 ) this.value = this.max;
    // });

    // Add an event listener to handle when the user clicks the 'Submit' button.
    const btnSubmit = document.getElementById('submit');
    btnSubmit.addEventListener('click', getFeatures);
    //btnSubmit.click();
    
    // // Add an event listener to handle when the user clicks the 'Copy' button.
    // const btnCopy= document.getElementById('copy');
    // btnCopy.addEventListener('click', copyToClipboard);

    // // Define a [global scope] variable for the <textarea>.
    // const textarea = document.getElementsByTagName('textarea')[0];

    // Define a [global scope] variable for the loader.
    const loader = document.getElementsByClassName('loader')[0];

    // Add an 'onchange' handler for the results drop-down list.
    const selResults = document.getElementById('results');
    selResults.onchange = function() {
        let selectedValue = this.options[this.selectedIndex].value;
        let type = oJson[ selectedValue ].hasOwnProperty('DPA') ? 'DPA' : 'LPI';
        let result = oJson[ selectedValue ][ type ];

        //// Clear the form.
        // let elements = document.querySelectorAll("form input[type='text']");
        // elements.forEach(o => o.value = '');

        //// Clear the <textarea> contents.
        //textarea.value = '';

        // The following is based on the rules for generating multi-line addresses which are
        // documented in Chapter 9 of the AddressBase Premium Getting Started Guide:
        // https://www.ordnancesurvey.co.uk/documents/product-support/getting-started/addressbase-premium-getting-started-guide.pdf

        // // Define an empty address array variable.
        // let arrAddrLine = [];

        if( type == 'DPA' ) {
            // Define variables for DPA address components (blank if NULL).
            let dpaDepartmentName = result.DEPARTMENT_NAME || '';
            let dpaOrganisationName = result.ORGANISATION_NAME || '';
            let dpaSubBuildingName = result.SUB_BUILDING_NAME || '';
            let dpaBuildingName = result.BUILDING_NAME || '';
            let dpaBuildingNumber = result.BUILDING_NUMBER || '';
            let dpaPOBoxNumber = result.PO_BOX_NUMBER || '';
            let dpaDependentThoroughfareName = result.DEPENDENT_THOROUGHFARE_NAME || '';
            let dpaThoroughfareName = result.THOROUGHFARE_NAME || '';
            let dpaDoubleDependentLocality = result.DOUBLE_DEPENDENT_LOCALITY || '';
            let dpaDependentLocality = result.DEPENDENT_LOCALITY || '';
            let dpaPostTown = result.POST_TOWN || '';
            let dpaPostcode = result.POSTCODE || '';

            // Add a "PO BOX " prefix to the PO Box Number integer.
            if( dpaPOBoxNumber !== '' ) dpaPOBoxNumber = `PO BOX ${dpaPOBoxNumber}`;

            // Define arrays for the premises and thoroughfare components of the address.
            let arrPremises = [ dpaBuildingNumber, dpaSubBuildingName, dpaBuildingName ].filter(item => item);
            let arrThoroughfareLocality = [ dpaDependentThoroughfareName, dpaThoroughfareName, dpaDoubleDependentLocality, dpaDependentLocality ].filter(item => item);

            // Define an empty string to store the appropriately combined/structured premises and
            // thoroughfare components.
            let strPremisesThoroughfareLocality = '';

            // Define a regular expression to test for a letter suffix (e.g. '11A') or number
            // range (e.g. '3-5'). Combine the first values from the premises and thoroughfare
            // arrays into a string; before removing them from the array.
            const regex = /(^[1-9]+[a-zA-Z]$)|(^[1-9]+-[1-9]+$)/;
            if( regex.test(dpaSubBuildingName) || regex.test(dpaBuildingName) || dpaBuildingNumber !== '' ) {
                strPremisesThoroughfareLocality = `${arrPremises[0]} ${arrThoroughfareLocality[0]}`;
                arrThoroughfareLocality.shift();
                arrPremises.shift();
            }

            // Push the Organisation Name, Department Name and PO Box Number to the address array.
            arrAddrLine.push(dpaOrganisationName, dpaDepartmentName, dpaPOBoxNumber);

            // Merge the structured premises and thoroughfare components into the address array.
            arrAddrLine = arrAddrLine.concat(arrPremises);
            arrAddrLine = arrAddrLine.concat(strPremisesThoroughfareLocality);
            arrAddrLine = arrAddrLine.concat(arrThoroughfareLocality);

            // Remove any duplicates and blanks from the address array.
            arrAddrLine = [ ...new Set(arrAddrLine) ];
            arrAddrLine = arrAddrLine.filter(item => item);

            // Populate the "Address Line 1-4" fields using the address array.
            let counter = Math.min(arrAddrLine.length, 4);
            for( let i = 1; i <= counter; i++ ) {
                let elemId = `_addr${i}`;
                document.getElementById(elemId).value = arrAddrLine[i-1];
            }

            // Populate the remaining fields.
            document.getElementById('_town').value = dpaPostTown;
            document.getElementById('_postcode').value = dpaPostcode;
        }
        else if( type == 'LPI' ) {
            // Define variables for LPI address components (blank if NULL).
            let lpiOrganisation = result.ORGANISATION || '';
            let lpiSAOText = result.SAO_TEXT || '';
            let lpiSAOStartNumber = result.SAO_START_NUMBER || '';
            let lpiSAOStartSuffix = result.SAO_START_SUFFIX || '';
            let lpiSAOEndNumber = result.SAO_END_NUMBER || '';
            let lpiSAOEndSuffix = result.SAO_END_SUFFIX || '';
            let lpiPAOText = result.PAO_TEXT || '';
            let lpiPAOStartNumber = result.PAO_START_NUMBER || '';
            let lpiPAOStartSuffix = result.PAO_START_SUFFIX || '';
            let lpiPAOEndNumber = result.PAO_END_NUMBER || '';
            let lpiPAOEndSuffix = result.PAO_END_SUFFIX || '';
            let lpiStreetDescription = result.STREET_DESCRIPTION || '';
            let lpiLocality = result.LOCALITY || '';
            let lpiTownName = result.TOWN_NAME || '';
            let lpiAdministrativeArea = result.ADMINISTRATIVE_AREA || '';
            let lpiPostcodeLocator = result.POSTCODE_LOCATOR || '';

            // Create SAO number/range value (e.g. '1' or '1A' or '1-5' or '1A-5C').
            let lpiSAONumberRange = `${lpiSAOStartNumber}${lpiSAOStartSuffix}-${lpiSAOEndNumber}${lpiSAOEndSuffix}`;
            lpiSAONumberRange = lpiSAONumberRange.replace(/-+$/, "");

            // Create PAO number/range value (e.g. '1' or '1A' or '1-5' or '1A-5C').
            let lpiPAONumberRange = `${lpiPAOStartNumber}${lpiPAOStartSuffix}-${lpiPAOEndNumber}${lpiPAOEndSuffix}`;
            lpiPAONumberRange = lpiPAONumberRange.replace(/-+$/, "");

            // Combine the SAO number/range value and PAO text.
            let lpiSAONumberRangePAOText = [ lpiSAONumberRange, lpiPAOText ].join(' ').trim();

            // Combine the PAO number/range and street description.
            let lpiPAONumberRangeStreetDescription = [ lpiPAONumberRange, lpiStreetDescription ].join(' ').trim();

            // {Edge Case} If there is only a SAO number/range value and PAO number/range value; then
            // the SAO number/range should appear on the same line as the combined PAO number/range
            // and street description.
            if( lpiSAONumberRange !== '' && lpiSAOText === '' && lpiPAONumberRange !== '' && lpiPAOText === '' ) {
                lpiPAONumberRangeStreetDescription = `${lpiSAONumberRange}, ${lpiPAONumberRangeStreetDescription}`;
            }

            // Push the organisation, SAO text and combined PAO number/range and street description
            // to the address array.
            if( lpiOrganisation !== '' ) arrAddrLine.push(lpiOrganisation);
            if( lpiSAOText !== '' ) arrAddrLine.push(lpiSAOText);
            if( lpiSAONumberRangePAOText !== '' ) arrAddrLine.push(lpiSAONumberRangePAOText);

            // Add the combined PAO number/range and street description to the address array.
            arrAddrLine.push(lpiPAONumberRangeStreetDescription);

            // Remove any duplicates and blanks from the address array.
            arrAddrLine = [ ...new Set(arrAddrLine) ];
            arrAddrLine = arrAddrLine.filter(item => item);

            // Populate the "Address Line 1-4" fields using the address array.
            let counter = Math.min(arrAddrLine.length, 4);
            for( let i = 1; i <= counter; i++ ) {
                let elemId = `_addr${i}`;
                document.getElementById(elemId).value = arrAddrLine[i-1];
            }

            // Populate the remaining fields.
            document.getElementById('_locality').value = lpiLocality;
            document.getElementById('_town').value = lpiTownName;
            document.getElementById('_admin').value = lpiAdministrativeArea;
            document.getElementById('_postcode').value = lpiPostcodeLocator;
        }

        // // Populate the <textarea> from the completed form.
        // elements.forEach(o => {
        //     if( o.value !== '' ) textarea.value +=  o.value + '\r\n';
        // });

        // // Reset the table row values.
        // const rows = document.querySelectorAll('tr');
        // rows.forEach(o => o.childNodes[1].innerText = '');

        // // Loop through object keys to populate the matching table row (based on the
        // // textContent) with the object value.
        // for( let prop in result ) {
        //     for( let a of document.querySelectorAll('table tr') ) {
        //         if( a.textContent === prop ) {
        //             a.childNodes[1].innerText = result[ prop ];
        //         }
        //     }
        // }
    }
    const selAddTitle = document.getElementById('addTitle');
    const selSubTitle = document.getElementById('addSubTitle');
    const selAddLbl = document.getElementById('addLbl');
    // getFeatures();
    /**
     * Get features from the API.
     */
    function getFeatures() {
        
        const apikey = 'qsgsfnYwHAEpUA3e1fFeH9Z3m0vMkAhY';
        const query = document.getElementById('town').value;
        const resource = 'find';
        const dataset = 'dpa';

        let search = resource === 'find' ? 'query' : resource;

        // Define request parameters.
        const params = {
            key: apikey,
            [ search ]: query,
            dataset: dataset,
            output_srs: 'EPSG:4326'
        };

        if( resource === 'find' ) {
            params.minmatch = String(0.2);
        }

        const queryString = Object.keys(params).map(function(key) {
            return key + '=' + params[ key ];
        }).join('&');

        loader.style.display = 'inline-block';

        (async () => {
            try {
                // Use fetch() method to request address, postcode, or UPRN.
                await fetch('https://api.os.uk/search/places/v1/' + resource + '?' + queryString)
                    .then(response => {
                        if( response.ok ) return response.json();
                        return response.json().then(response => {
                            let msg = response.hasOwnProperty('fault') ?
                                response.fault.faultstring :
                                response.error.message;
                            throw msg;
                        });
                    })
                    .then(data => {
                        // Clear the results drop-down list.
                        // const options = document.querySelectorAll('#results option');
                        // options.forEach(o => o.remove());
                        console.log(data.results);

                        // Configure the form based on the dataset type.
                        // document.querySelectorAll("form input").forEach(o => o.value = '');
                        // document.getElementById('_locality').type = dataset === 'dpa' ? 'hidden' : 'text';
                        // document.getElementById('_admin').type = dataset === 'dpa' ? 'hidden' : 'text';

                        //textarea.value = '';

                        //initialiseTable(fields[ dataset.toUpperCase() ]);

                        if( data.header.totalresults == 0 || ! data.results ) {
                            throw 'Nothing found. Try modifiying your search or minimum match score.';
                        }

                        // Update the JSON object with the data results.
                        oJson = data.results;

                        // Loop through the data results; adding the address string as a new option
                        // to the results drop-down list.
                        data.results.forEach(function(val, i) {
                            const option = document.createElement('option');
                            option.value = i;
                            option.text = val[ dataset.toUpperCase() ].ADDRESS;
                            selResults.add(option);
                        });

                        // Scroll the results drop-down list back to the top.
                        selResults.scrollTo(0, 0);

                        // Display the request URI.
                        //document.getElementById('uri').innerText = data.header.uri;
                        // selAddTitle. = "true";
                        // selSubTitle.hidden = "true";
                        // selAddLbl.hidden = "true";
                        // query.hidden = "true";
                        // selResults.hidden = "false";
                        // loader.hidden = "false";
                    });
            } catch(e) {
                alert(e);
            } finally {
                loader.style.display = 'none';
            }
        })();
    }

    // /**
    //  * Helper function to generate a clean (empty) table structure.
    //  */
    // function initialiseTable(arr) {
    //     const table = document.getElementsByTagName('table')[0];
    //     table.innerHTML = '';

    //     for( let i = arr.length-1; i >= 0 ; i-- ) {
    //         let row = table.insertRow(0);
    //         let cell1 = row.insertCell(0);
    //         let cell2 = row.insertCell(1);
    //         cell1.innerHTML = arr[i];
    //     }
    // }

    // /**
    //  * Copy the contents of <textarea> to the clipboard.
    //  */
    // function copyToClipboard(e) {
    //     e.preventDefault();

    //     // Select the text field.
    //     textarea.select();
    //     textarea.setSelectionRange(0, 99999); /* For mobile devices */

    //     // Copy the text inside the text field.
    //     document.execCommand("copy");
    // }
