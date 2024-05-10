





//display 
async function getData(){
    const data = await fetch('https://services.nvd.nist.gov/rest/json/cves/2.0');
    const records = await data.json();

    let tab = '';
    records.vulnerabilities.forEach(function(vulnerabilities){
        tab +=` <tr>
        <td>${vulnerabilities.cve.id}</td>
        <td>${vulnerabilities.cve.sourceIdentifier}</td>
        <td>${vulnerabilities.cve.published}</td>
        <td>${vulnerabilities.cve.lastModified}</td>
        <td>${vulnerabilities.cve.vulnStatus}</td>
        </tr>`
    })

    document.getElementById('tbody').innerHTML = tab;
}