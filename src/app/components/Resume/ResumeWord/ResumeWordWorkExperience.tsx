import { Paragraph, TextRun } from "docx";
import type { ResumeWorkExperience } from "lib/redux/types";

export const generateWordWorkExperienceSection = (
  heading: string,
  workExperiences: ResumeWorkExperience[],
  themeColor: string,
  showBulletPoints: boolean
) => {
  const sections = [
    new Paragraph({
      children: [
        new TextRun({
          text: heading,
          bold: true,
          size: 64, // Font size in half-points (32pt)
          color: "FFFFFF", // Corrected hex value
        }),
      ],
      shading: {
        type: "solid",
        color: themeColor,
        fill: themeColor,
      },
    }),
  ];

  workExperiences.forEach(({ company, jobTitle, date, descriptions = [] }, idx) => {
    const hideCompanyName = idx > 0 && company === workExperiences[idx - 1].company;
    const showDescriptions = descriptions.length > 0;

    if (!hideCompanyName) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: company,
              bold: true,
              size: 48, // Font size in half-points (24pt)
            }),
            new TextRun({
              text: ` ${date}`,
              size: 48, // Font size in half-points (24pt)
              color: "888888", // Corrected hex value
            }),
          ],
        })
      );
    }

    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: jobTitle,
            size: 48, // Font size in half-points (24pt)
          }),
        ],
      })
    );

    if (showDescriptions) {
      descriptions.forEach((desc) => {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: desc,
                size: 48, // Font size in half-points (24pt)
              }),
            ],
            bullet: showBulletPoints ? { level: 0 } : undefined,
          })
        );
      });
    }
  });

  return sections;
};
