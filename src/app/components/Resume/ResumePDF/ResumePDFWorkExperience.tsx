import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeWorkExperience } from "lib/redux/types";

export const ResumePDFWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  workExperiences: ResumeWorkExperience[];
  themeColor: string;
  showBulletPoints: true;
}) => {
  return (
    <ResumePDFSection>
      {/* Display the title "EXPERIENCE PROFESSIONNELLE" */}
      <View
        style={{
          backgroundColor: themeColor,
          padding: spacing["1"],
          marginTop: spacing["4"],
          marginBottom: spacing["2"],
        }}
        wrap // Enable wrapping here
      >
        <ResumePDFText bold style={{ fontSize: "16pt", color: "white" }}>
          EXPERIENCES PROFESSIONNELLES
        </ResumePDFText>
      </View>
      {workExperiences.map(
        ({ company, jobTitle, date, descriptions = [], environments }, idx) => {
          // Hide company name if it is the same as the previous company
          const hideCompanyName =
            idx > 0 && company === workExperiences[idx - 1].company;
          const showDescriptions = descriptions.join() !== "";

          return (
            <View key={idx} wrap> {/* Enable wrapping here */}
              {!hideCompanyName && (
                <View style={{ ...styles.flexRowBetween, marginTop: spacing["1.5"] }}>
                  <ResumePDFText bold={true} style={{ color: themeColor }}>{company}</ResumePDFText>
                  <ResumePDFText style={{ color: themeColor }}>{date}</ResumePDFText>
                </View>
              )}
              <View
                style={{
                  ...styles.flexRowBetween,
                  marginTop: hideCompanyName
                    ? "-" + spacing["1"]
                    : spacing["1.5"],
                }}
              >
                <ResumePDFText bold={true}>{jobTitle}</ResumePDFText> {/* Make job title bold */}
              </View>
              {showDescriptions && (
                <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }} wrap> {/* Enable wrapping here */}
                  <ResumePDFBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              )}
              {environments && environments.trim() !== "" && (
                <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }} wrap> {/* Enable wrapping here */}
                  <ResumePDFText bold style={{ marginBottom: spacing["0.5"] }}>Environnements</ResumePDFText>
                  <ResumePDFText style={{ color: 'grey' }}>{environments}</ResumePDFText>
                </View>
              )}
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
