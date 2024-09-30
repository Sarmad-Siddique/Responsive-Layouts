document.getElementById('jobApplicationForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const formData = new FormData(this);
    const phone = formData.get('phone');
    const email = formData.get('email');
    
    if (!/^\d{11}$/.test(phone)) {
        alert('Number must be 11 digits');
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Invlaid Email Address');
        return;
    }

    const applicantData = {};
    formData.forEach((value, key) => {
        applicantData[key] = value;
    });
    
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications.push(applicantData);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    alert('Application submitted successfully!');
});

document.getElementById('viewApplications').addEventListener('click', function () {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];

    if (applications.length === 0) {
        alert('No applications to display.');
        return;
    }

    const table = document.createElement('table');
    table.setAttribute('border', '1');
    
    const headers = ['First Name', 'Last Name', 'Phone', 'Email', 'Address', 'Resume', 'Cover Letter', 'Highest Education', 'School', 'Major', 'Graduation Year', 'Job Title', 'Company', 'Employment Dates', 'Job Responsibilities', 'Skills', 'Certifications', 'Start Date', 'Willing to Relocate', 'Work Schedule', 'Reference', 'Why Work Here'];
    const thead = table.createTHead();
    const headerRow = thead.insertRow();

    headers.forEach(header => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(header));
        headerRow.appendChild(th);
    });

    const tbody = table.createTBody();
    applications.forEach(applicant => {
        const row = tbody.insertRow();
        const rowData = [
            applicant.firstName,
            applicant.lastName,
            applicant.phone,
            applicant.email,
            applicant.address,
            applicant.resume,
            applicant.coverLetter,
            applicant.educationLevel,
            applicant.school,
            applicant.major,
            applicant.graduationYear,
            applicant.jobTitle,
            applicant.company,
            applicant.employmentDates,
            applicant.responsibilities,
            applicant.skills,
            applicant.certifications,
            applicant.startDate,
            applicant.relocation ? 'Yes' : 'No',
            applicant.workSchedule,
            `${applicant.referenceName} (${applicant.relationship})`,
            applicant.whyWorkHere
        ];

        rowData.forEach(data => {
            const cell = row.insertCell();
            cell.appendChild(document.createTextNode(data));
        });
    });

    const applicationsTable = document.getElementById('applicationsTable');
    applicationsTable.innerHTML = ''; 
    applicationsTable.appendChild(table);
});
