import { View, Image, Text } from "@react-pdf/renderer";
import { ResumePDFSection, ResumePDFText } from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeCustom } from "lib/redux/types";

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
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: spacing["1.5"] }}>
        {selectedCertifications.map((cert, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: spacing["1.5"], marginBottom: spacing["1.5"] }}>
            <Image
              src={cert}
              style={{
                marginRight: spacing["1"],
                width: "50px",
                height: "50px",
              }}
            />
          </View>
        ))}
      </View>
    </ResumePDFSection>
  );
};
