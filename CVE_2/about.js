
// On the second page, retrieve the CVE data and display it
fetch(`/api/cve/${cveId}`)
    .then(response => response.json())
    .then(data => {
        const cveData = data.cve;
        const accessVector = cveData.accessVector;
        const accessComplexity = cveData.accessComplexity;
        const confidentialityImpact = cveData.confidentialityImpact;
        const integrityImpact = cveData.integrityImpact;
        const availabilityImpact = cveData.availabilityImpact;

        const criteriaTable = `
            <table>
                <tr>
                    <th>Criteria</th>
                    <th>Match Criteria ID</th>
                    <th>Vulnerable</th>
                </tr>
                ${cveData.criteria.map(criteria => `
                    <tr>
                        <td>${criteria.criteria}</td>
                        <td>${criteria.matchCriteriaId}</td>
                        <td>${criteria.vulnerable}</td>
                    </tr>
                `).join("")}
            </table>
        `;

        const cvssV2MetricsTable = `
            <table>
                <tr>
                    <th>CVSS V2 Metrics</th>
                    <th>Scores</th>
                </tr>
                <tr>
                    <td>Access Vector: ${accessVector}</td>
                    <td>${cveData.cvssV2Metrics.accessVectorScore}</td>
                </tr>
                <tr>
                    <td>Access Complexity: ${accessComplexity}</td>
                    <td>${cveData.cvssV2Metrics.accessComplexityScore}</td>
                </tr>
                <tr>
                    <td>Confidentiality Impact: ${confidentialityImpact}</td>
                    <td>${cveData.cvssV2Metrics.confidentialityImpactScore}</td>
                </tr>
                <tr>
                    <td>Integrity Impact: ${integrityImpact}</td>
                    <td>${cveData.cvssV2Metrics.integrityImpactScore}</td>
                </tr>
                <tr>
                    <td>Availability Impact: ${availabilityImpact}</td>
                    <td>${cveData.cvssV2Metrics.availabilityImpactScore}</td>
                </tr>
            </table>
        `;

        const description = cveData.description;

        // Display the data in the user interface
        $("#cve-data").html(`
            <h2>CVE ${cveId}</h2>
            <p>${description}</p>
            ${criteriaTable}
            ${cvssV2MetricsTable}
        `);
    });

    // Create an API endpoint to retrieve the CVE data
app.get("/api/cve/:cveId", (req, res) => {
    const cveId = req.params.cveId;
    fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cveId}`)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        });
});