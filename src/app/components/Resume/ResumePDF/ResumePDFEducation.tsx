import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeEducation } from "lib/redux/types";

export const ResumePDFEducation = ({
  heading,
  educations,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  educations: ResumeEducation[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection>
      {/* Display the title "EDUCATION" */}
      <View
        style={{
          backgroundColor: themeColor,
          padding: spacing["1"],
          marginTop: spacing["4"],
          marginBottom: spacing["2"],
        }}
      >
        <ResumePDFText bold style={{ fontSize: "16pt", color: "white" }}>
          EDUCATION
        </ResumePDFText>
      </View>
      {educations.map(
        ({ school, degree, date, gpa, descriptions = [] }, idx) => {
          // Hide school name if it is the same as the previous school
          const hideSchoolName =
            idx > 0 && school === educations[idx - 1].school;
          const showDescriptions = descriptions.join() !== "";

          return (
            <View key={idx}>
              {!hideSchoolName && (
                <View style={{ ...styles.flexRowBetween, marginTop: spacing["1.5"] }}>
                  <ResumePDFText bold={true}>{school}</ResumePDFText>
                  <ResumePDFText style={{ color: 'grey' }}>{date}</ResumePDFText>
                </View>
              )}
              <View
                style={{
                  ...styles.flexRowBetween,
                  marginTop: hideSchoolName
                    ? "-" + spacing["1"]
                    : spacing["1.5"],
                }}
              >
                <ResumePDFText>{`${
                  gpa
                    ? `${degree} - ${Number(gpa) ? gpa + " GPA" : gpa}`
                    : degree
                }`}</ResumePDFText>
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
