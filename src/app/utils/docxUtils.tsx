import { Paragraph, TextRun, ShadingType, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';

// Profile Section
export const createProfileSection = (): Paragraph[] => {
  const name = "John Doe";
  const jobTitle = "Ingenieur Reseaux et Systeme";
  
  const profileParagraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({ text: name, bold: true, size: 24 }),
        new TextRun({ text: `\n${jobTitle}`, break: 1 }),
      ],
      spacing: { after: 200 },
    }),
  ];

  return profileParagraphs;
};

// Work Experience Section
export const createWorkExperienceSection = (themeColor: string): Paragraph[] => {
  const workExperiences = [
    {
      company: "BOUYGUES TELECOM",
      jobTitle: "Ingénieur réseau télécom",
      date: "28 MOIS (2021-AUJOURD'HUI)",
      descriptions: [
        "Support technique sur les opérations de transmission et radio (Equipements Cisco Nokia).",
        "Troubleshooting et identifications erreurs de configurations (BGP, VRF, CONF MIN)",
        "Coordination entre les équipes de déploiements et les usines de production.",
        "Suivi et Reporting Hebdo des KPI sur les différentes opérations réalisées.",
        "Pilotage de déploiement du réseau de bout en bout, pour les projets 3G/4G/5G industriels.",
        "Mise en place des plans d'actions & des axes d'amélioration, dans le but d'assurer une meilleure performance opérationnelle.",
        "Amélioration continue des méthodes et processus pour augmenter le taux de réussite."
      ]
    },
    {
      company: "CAPGEMINI",
      jobTitle: "Ingénieur systèmes et réseaux informatiques",
      date: "6 MOIS (2020-2021)",
      descriptions: [
        "Mise en place et administration des serveurs (Windows server, 2019).",
        "Configuration et durcissement de l'architecture réseau.",
        "Mise en place et gestion de divers services (DNS, DHCP, AD DS, GPO, NFS, NTP, Wake On Lan, bureau à distance...).",
        "Assistance Informatique pour les groupes utilisateurs.",
        "Provisioning du serveur à partir des scripts PowerShell.",
        "Mise en place d'un POC.",
        "Mise en place d'un système de cluster VMware.",
        "Configuration des switchs HIRSCHMANN.",
        "Rédaction documentaire (doc d'installation, cahier de test)."
      ]
    },
  ];

  const workExperienceParagraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({ text: "EXPERIENCE PROFESSIONNELLE", bold: true, color: 'FFFFFF', size: 24 }),
      ],
      shading: {
        type: ShadingType.SOLID,
        color: '1E90FF',
        fill: '1E90FF',
      },
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    ...workExperiences.map(({ company, jobTitle, date, descriptions = [] }) => {
      return [
        new Paragraph({
          children: [
            new TextRun({ text: company, bold: true, size: 20 }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: date, color: '888888', size: 18 }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: jobTitle, italics: true, size: 20 }),
          ],
          spacing: { after: 100 },
        }),
        ...descriptions.map(description => new Paragraph({
          children: [
            new TextRun({ text: `• ${description}`, size: 20 }),
          ],
          spacing: { after: 100 },
        })),
      ];
    }).flat(),
  ];

  return workExperienceParagraphs;
};

// Education Section
export const createEducationSection = (themeColor: string): Paragraph[] => {
  const educations = [
    {
      school: "Université de Bretagne Occidentale (U.B.O)",
      degree: "Master 2 en réseaux et télécommunications",
      date: "2021",
      gpa: "",
      descriptions: []
    },
    // Add more education entries if needed
  ];

  const educationParagraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({ text: "EDUCATION", bold: true, color: 'FFFFFF', size: 24 }),
      ],
      shading: {
        type: ShadingType.SOLID,
        color: '1E90FF',
        fill: '1E90FF',
      },
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    ...educations.map(({ school, degree, date, gpa, descriptions = [] }) => {
      return [
        new Paragraph({
          children: [
            new TextRun({ text: school, bold: true, size: 20 }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: date, color: '888888', size: 18 }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: degree, italics: true, size: 20 }),
          ],
          spacing: { after: 100 },
        }),
        ...descriptions.map(description => new Paragraph({
          children: [
            new TextRun({ text: `• ${description}`, size: 20 }),
          ],
          spacing: { after: 100 },
        })),
      ];
    }).flat(),
  ];

  return educationParagraphs;
};

// Skills Section
export const createSkillsSection = (themeColor: string): Paragraph[] => {
  const skills = {
    descriptions: [],
    featuredSkills: [
      { skill: "Outils", description: "Ansible, AWX, Netshot, HPNA, Zabbix, Grafana" },
      { skill: "Système d'exploitation", description: "Windows, Windows Server, Linux" },
      { skill: "Méthode d'analyse", description: "Power BI, BO, documentation cycle en V" },
      { skill: "Virtualisation", description: "VMware, Hyper-V, VirtualBox" },
      { skill: "Logiciels", description: "HIVision, eNSP, GNS3, Atoll, GLPI, WiFi Planner, HPE Data Protector, Clonezilla, Wireshark, PuTTY" },
      // Add more skills if needed
    ]
  };

  const skillsParagraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({ text: "COMPETENCES TECHNIQUES", bold: true, color: 'FFFFFF', size: 24 }),
      ],
      shading: {
        type: ShadingType.SOLID,
        color: '1E90FF',
        fill: '1E90FF',
      },
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    ...skills.featuredSkills.map(skill => new Paragraph({
      children: [
        new TextRun({ text: skill.skill, bold: true, size: 20 }),
        new TextRun({ text: `: ${skill.description}`, size: 20 }),
      ],
      spacing: { after: 100 },
    })),
    ...skills.descriptions.map(description => new Paragraph({
      children: [
        new TextRun({ text: description, size: 20 }),
      ],
      spacing: { after: 100 },
    })),
  ];

  return skillsParagraphs;
};

// Projects Section
export const createProjectsSection = (themeColor: string): Paragraph[] => {
  const projects = [
    {
      project: "",
      descriptions: ["Algorithmique", "TCP/IP, BGP, MPLS, VoIP", "Système d’exploitation ", "Gestion de l’Active Directory"]
    },
    // Add more projects if needed
  ];

  const projectsParagraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({ text: "SAVOIR FAIRE", bold: true, color: 'FFFFFF', size: 24 }),
      ],
      shading: {
        type: ShadingType.SOLID,
        color: '1E90FF',
        fill: '1E90FF',
      },
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    ...projects.map(({ project, descriptions = [] }) => {
      return [
        new Paragraph({
          children: [
            new TextRun({ text: project, bold: true, size: 20 }),
          ],
          spacing: { after: 100 },
        }),
        ...descriptions.map(description => new Paragraph({
          children: [
            new TextRun({ text: `• ${description}`, size: 20 }),
          ],
          spacing: { after: 100 },
        })),
      ];
    }).flat(),
  ];

  return projectsParagraphs;
};
