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
  showBulletPoints: boolean;
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
      >
        <ResumePDFText bold style={{ fontSize: "16pt", color: "white" }}>
          EXPERIENCE PROFESSIONNELLE
        </ResumePDFText>
      </View>
      {workExperiences.map(
        ({ company, jobTitle, date, descriptions = [] }, idx) => {
          // Hide company name if it is the same as the previous company
          const hideCompanyName =
            idx > 0 && company === workExperiences[idx - 1].company;
          const showDescriptions = descriptions.join() !== "";

          return (
            <View key={idx}>
              {!hideCompanyName && (
                <View style={{ ...styles.flexRowBetween, marginTop: spacing["1.5"] }}>
                  <ResumePDFText bold={true}>{company}</ResumePDFText>
                  <ResumePDFText style={{ color: 'grey' }}>{date}</ResumePDFText>
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
                <ResumePDFText>{jobTitle}</ResumePDFText>
              </View>
              {showDescriptions && (
                <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                  <ResumePDFBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              )}
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
