import { Paragraph, TextRun } from "docx";
import type { ResumeEducation } from "lib/redux/types";

export const generateWordEducationSection = (
  heading: string,
  educations: ResumeEducation[],
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
          color: "FFFFFF", // Corrected hex value for white
        }),
      ],
      shading: {
        type: "solid",
        color: themeColor,
        fill: themeColor,
      },
    }),
  ];

  educations.forEach(({ school, degree, date, gpa, descriptions = [] }, idx) => {
    const hideSchoolName = idx > 0 && school === educations[idx - 1].school;
    const showDescriptions = descriptions.length > 0;

    if (!hideSchoolName) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: school,
              bold: true,
              size: 48, // Font size in half-points (24pt)
            }),
            new TextRun({
              text: ` ${date}`,
              size: 48, // Font size in half-points (24pt)
              color: "888888", // Corrected hex value for grey
            }),
          ],
        })
      );
    }

    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${degree} ${gpa ? ` - ${gpa} GPA` : ""}`,
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
