import { Paragraph, TextRun, ImageRun } from "docx";
import type { ResumeProfile } from "lib/redux/types";

// Keeping the logo base64 data empty as requested
const logoTelecomBase64 = 'data:image/jpeg;base64,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';

export const generateWordProfileSection = (profile: ResumeProfile, themeColor: string) => {
  if (!profile) {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "Profile data not available",
            bold: true,
            color: themeColor,
          }),
        ],
      }),
    ];
  }

  const { name, email, phone, url, summary, location } = profile;

  const transformedName = `${name[0]}${name.slice(-2)}`;

  const children = [
    new Paragraph({
      children: [
        logoTelecomBase64 && new ImageRun({
          data: logoTelecomBase64,
          transformation: {
            width: 45,
            height: 45,
          },
        }),
        new TextRun({
          text: "R&S TELECOM",
          bold: true,
          size: 48, // Font size in half-points (24pt)
          color: "444444", // Corrected hex value
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Votre réussite à portée de main",
          size: 40, // Font size in half-points (20pt)
          color: "888888", // Corrected hex value
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "8 rue des frères Caudron – 78140 Vélizy-Villacoublay",
          size: 40, // Font size in half-points (20pt)
          color: "444444", // Corrected hex value
        }),
      ],
      alignment: "right",
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: transformedName,
          bold: true,
          size: 72, // Font size in half-points (36pt)
          color: themeColor,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Ingénieur réseaux et systèmes",
          size: 48, // Font size in half-points (24pt)
          color: "888888", // Corrected hex value
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "PROFIL",
          bold: true,
          size: 64, // Font size in half-points (32pt)
          color: "FFFFFF", // Corrected hex value
          shading: {
            type: "solid",
            color: themeColor,
            fill: themeColor,
          },
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: summary,
          size: 48, // Font size in half-points (24pt)
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Email: ${email}`,
          size: 48, // Font size in half-points (24pt)
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Phone: ${phone}`,
          size: 48, // Font size in half-points (24pt)
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Website: ${url}`,
          size: 48, // Font size in half-points (24pt)
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Location: ${location}`,
          size: 48, // Font size in half-points (24pt)
        }),
      ],
    }),
  ];

  return children;
};
