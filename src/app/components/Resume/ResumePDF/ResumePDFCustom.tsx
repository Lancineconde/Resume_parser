import { View, Image, Text } from "@react-pdf/renderer";
import { ResumePDFSection, ResumePDFText } from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeCustom } from "lib/redux/types";
import { certifications } from "components/Resume/certification"; 

export const ResumePDFCustom = ({
  heading,
  custom,
  themeColor,
}: {
  heading: string;
  custom: ResumeCustom;
  themeColor: string;
}) => {
  const { selectedCertifications } = custom;

  return (
    <ResumePDFSection>
      <View
        style={{
          backgroundColor: themeColor,
          padding: spacing["1"],
          marginTop: spacing["4"],
          marginBottom: spacing["2"],
        }}
      >
        <ResumePDFText bold style={{ fontSize: "16pt", color: "white" }}>
          {heading}
        </ResumePDFText>
      </View>
      {selectedCertifications.map(certId => {
        const certification = certifications.find(cert => cert.id === certId);
        return certification ? (
          <View key={certId} style={{ ...styles.flexRow, alignItems: "center", marginTop: spacing["1.5"] }}>
            <Text style={{ marginRight: spacing["1"] }}>•</Text>
            <Image
              src={certification.picture}
              style={{
                marginRight: spacing["1"],
                width: "25px",
                height: "25px",
              }}
            />
            <ResumePDFText>{certification.name}</ResumePDFText>
          </View>
        ) : null;
      })}
    </ResumePDFSection>
  );
};
