import { View, Image } from "@react-pdf/renderer";
import { ResumePDFSection } from "components/Resume/ResumePDF/common";
import type { ResumeCustom } from "lib/redux/types";

export const ResumePDFCustom = ({
  custom,
}: {
  custom: ResumeCustom;
}) => {
  const { selectedCertifications } = custom;

  return (
    <ResumePDFSection>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: -45 }}>
        {selectedCertifications.map((cert, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: 10, marginBottom: 10 }}>
            <Image
              src={cert}
              style={{
                marginRight:5,
                width: "75px",
                height: "75px",
              }}
            />
          </View>
        ))}
      </View>
    </ResumePDFSection>
  );
};
