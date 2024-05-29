import { View, Text } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeProject } from "lib/redux/types";

export const ResumePDFProject = ({
  heading,
  projects,
  themeColor,
}: {
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection>
      {/* Display the heading provided in the props */}
      <View
        style={{
          backgroundColor: themeColor,
          padding: spacing["1"],
          marginTop: spacing["4"],
          marginBottom: spacing["2"],
        }}
        wrap // Ensure wrapping is enabled here
      >
        <ResumePDFText bold style={{ fontSize: "16pt", color: "white" }}>
          {heading}
        </ResumePDFText>
      </View>

      {/* Table Header */}
      {/* <View style={{ flexDirection: "row", backgroundColor: themeColor }}>
        <View style={{ width: "50%", padding: spacing["0.5"], borderRightWidth: 1, borderRightColor: "white" }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Project</Text>
        </View>
        <View style={{ width: "50%", padding: spacing["0.5"] }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Descriptions</Text>
        </View>
      </View> */}

      {/* Table Rows */}
      {projects.map(({ project, descriptions }, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: themeColor,
          }}
          wrap // Ensure wrapping is enabled here
        >
          {/* Column for project */}
          <View
            style={{
              width: "50%",
              padding: spacing["0.5"],
              borderRightWidth: 1,
              borderRightColor: themeColor,
            }}
            wrap // Ensure wrapping is enabled here
          >
            <ResumePDFText>{project}</ResumePDFText>
          </View>
          {/* Column for descriptions */}
          <View
            style={{ width: "50%", padding: spacing["0.5"] }}
            wrap // Ensure wrapping is enabled here
          >
            <ResumePDFBulletList items={descriptions} />
          </View>
        </View>
      ))}
    </ResumePDFSection>
  );
};
