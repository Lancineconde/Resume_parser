import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { ResumePDFProfile } from "components/Resume/ResumePDF/ResumePDFProfile";
import { ResumePDFWorkExperience } from "components/Resume/ResumePDF/ResumePDFWorkExperience";
import { ResumePDFEducation } from "components/Resume/ResumePDF/ResumePDFEducation";
import { ResumePDFProject } from "components/Resume/ResumePDF/ResumePDFProject";
import { ResumePDFSkills } from "components/Resume/ResumePDF/ResumePDFSkills";
import { ResumePDFCustom } from "components/Resume/ResumePDF/ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { SuppressResumePDFErrorMessage } from "components/Resume/ResumePDF/common/SuppressResumePDFErrorMessage";

const transformName = (name: string): string => {
  if (name.length < 3) return name;
  return name[0] + name.slice(-2);
};


export const ResumePDF = ({
  resume,
  settings,
  isPDF = false,
}: {
  resume: Resume;
  settings: Settings;
  isPDF?: boolean;
}) => {
  const { profile, workExperiences, educations, projects, skills, custom } = resume;
  const { fontFamily, fontSize, documentSize, formToHeading, formToShow, formsOrder, showBulletPoints } = settings;
  const themeColor = settings.themeColor || DEFAULT_FONT_COLOR;

  const showFormsOrder = formsOrder.filter((form) => formToShow[form]);

  const fileName = `${resume.profile.summary.toUpperCase()}_${transformName(resume.profile.name)}`;

  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: () => (
      <ResumePDFWorkExperience
        heading={formToHeading["workExperiences"]}
        workExperiences={workExperiences}
        themeColor={themeColor}
        showBulletPoints={true} />
    ),
    educations: () => (
      <ResumePDFEducation
        heading={formToHeading["educations"]}
        educations={educations}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["educations"]} />
    ),
    custom: () => (
      <ResumePDFCustom
        custom={custom}
        />
    ),
    projects: () => (
      <ResumePDFProject
        heading={formToHeading["projects"]}
        projects={projects}
        themeColor={themeColor}
      />
    ),
    skills: () => (
      <ResumePDFSkills
        heading={formToHeading["skills"]}
        skills={skills}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["skills"]}
      />
    ),
  };

  return (
    <>
      <Document
        title={fileName}
        author="R&S TELECOM"
        subject="R&S TELECOM"
        keywords="R&S TELECOM"
        producer="R&S TELECOM"
        creator="R&S TELECOM"
      >
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{...styles.flexCol,
            color: DEFAULT_FONT_COLOR,
            fontFamily,
            fontSize: fontSize + "pt",}} 
        >
          {Boolean(settings.themeColor) && (
            <View
              style={{
                width: spacing["full"],
                height: spacing[3.5],
                backgroundColor: themeColor,
              }}
            />
          )}
          <View
            style={{
              ...styles.flexCol,
              padding: `${spacing[0]} ${spacing[20]}`,
            }}
          >
            <ResumePDFProfile
              profile={profile}
              themeColor={themeColor}
              isPDF={isPDF}
            />
            {showFormsOrder
              .filter((form) => form !== "projects" && form !== "skills")
              .map((form) => {
                const Component = formTypeToComponent[form];
                return <Component key={form} />;
              })}
          </View>
        </Page>
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{...styles.flexCol,
            color: DEFAULT_FONT_COLOR,
            fontFamily,
            fontSize: fontSize + "pt",}} 
        >
          <View
            style={{
              ...styles.flexCol,
              padding: `${spacing[0]} ${spacing[20]}`,
            }}
          >
            {formToShow["projects"] && (
              <ResumePDFProject
                heading={formToHeading["projects"]}
                projects={projects}
                themeColor={themeColor}
              />
            )}
            {formToShow["skills"] && (
              <ResumePDFSkills
                heading={formToHeading["skills"]}
                skills={skills}
                themeColor={themeColor}
                showBulletPoints={showBulletPoints["skills"]}
              />
            )}
          </View>
        </Page>
      </Document>
      <SuppressResumePDFErrorMessage />
    </>
  );
};
