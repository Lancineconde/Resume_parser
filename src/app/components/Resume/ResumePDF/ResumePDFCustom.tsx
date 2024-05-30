import { View, Image } from "@react-pdf/renderer";
import { ResumePDFSection } from "components/Resume/ResumePDF/common";
import { spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeCustom } from "lib/redux/types";

export const ResumePDFCustom = ({
  custom,
}: {
  custom: ResumeCustom;
}) => {
  const { selectedCertifications } = custom;

  return (
    <ResumePDFSection>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: spacing["1.5"] }}>
        {selectedCertifications.map((cert, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: spacing["1.5"], marginBottom: spacing["1.5"] }}>
            <Image
              src={cert}
              style={{
                marginRight: spacing["1"],
                width: "25px",
                height: "25px",
              }}
            />
          </View>
        ))}
      </View>
    </ResumePDFSection>
  );
};
