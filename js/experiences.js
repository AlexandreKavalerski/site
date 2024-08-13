const experienceData = [
    {
        title: "Engenheiro de Software",
        company: "CESAR",
        companyUrl: "https://www.linkedin.com/company/cesar",
        location: "Recife - PE (remoto)",
        startDate: "07-01-2021",
        endDate: null,
    },
    {
        title: "Tutor de Projetos de Inovação",
        company: "Campus Mobile",
        location: "São Paulo - SP (remoto)",
        startDate: "11-01-2019",
        endDate: null,
        companyUrl: "https://www.linkedin.com/company/campus-mobile-brazil"
    },
    {
        title: "Consultor em Tecnologia",
        company: "The Digital Strategy Company",
        companyUrl: "https://tds.company",
        location: "Recife - PE",
        startDate: "09-01-2020",
        endDate: "07-01-2021",
    },
    {
        title: "Professor",
        company: "PRONATEC",
        companyUrl: "https://www.to.gov.br/seduc/pronatec",
        location: "Palmas - TO",
        startDate: "09-01-2019",
        endDate: "11-01-2019",
    },
    {
        title: "Engenheiro de Software",
        company: "ULBRA",
        companyUrl: "https://ulbra-to.br/",
        location: "Palmas - TO",
        startDate: "08-01-2016",
        endDate: "08-01-2019",
    }
];


function formatDate(dateStr) {
    if (dateStr === null) {
        return "o momento"
    }
    const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const parts = dateStr.split('-');

    const month = parseInt(parts[0], 10) - 1; // Convert month to zero-based index
    const day = parts[1];
    const year = parts[2];

    const monthName = monthNames[month];
    const formattedDate = (day === '01') ? `${monthName} ${year}` : `${monthName} ${year}`;

    return formattedDate;
}


function calculateExperienceDuration(startDate, endDate) {
    const monthsInYear = 12;

    const parseDate = (dateStr) => {
        const [month, day, year] = dateStr.split('-');
        return new Date(`${month} 1, ${year}`);
    };

    const now = new Date();
    const start = parseDate(startDate);
    const end = endDate === null ? now : parseDate(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years--;
        months += monthsInYear;
    }

    return { years, months };
}

function generateExperienceHTML(experience) {
    const { title, company, companyUrl, location, startDate, endDate } = experience;
    const { years, months } = calculateExperienceDuration(startDate, endDate);

    return `
      <div class="experiencia-carreira">
        <h4>${title}</h4>
        <p>
          <a href="${companyUrl}" target="_blank">${company}</a>
          <span> • ${location}</span>
        </p>
        <p>
          <span>${formatDate(startDate)} - ${formatDate(endDate)}</span>
          <span> • ${years > 0 ? `${years} ${`ano${years > 1 ? "s" : ""}`}` : ""} ${years && months ? "e" : ""} ${months > 0 ? `${months} ${months > 1 ? `meses` : "mês"}` : ""}</span>
        </p>
      </div>
    `;
}

function renderExperience() {
    const container = document.querySelector('#experience-container');
    container.innerHTML = experienceData.map(generateExperienceHTML).join('');
}

document.addEventListener('DOMContentLoaded', renderExperience);
