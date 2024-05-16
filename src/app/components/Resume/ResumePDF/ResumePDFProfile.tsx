import { View, Text } from "@react-pdf/renderer";
import { ResumePDFIcon, type IconType } from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { ResumePDFLink, ResumePDFSection, ResumePDFText } from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, location } = profile;
  const iconProps = { email, phone, location, url };

  const Wrapper = ({ children, type, value }: { children: React.ReactNode, type: string, value: string }) => {
    if (["email", "url", "phone"].includes(type)) {
      let src = "";
      switch (type) {
        case "email":
          src = `mailto:${value}`;
          break;
        case "phone":
          src = `tel:${value.replace(/[^\d+]/g, "")}`;
          break;
        default:
          src = value.startsWith("http") ? value : `https://${value}`;
      }
      return (
        <ResumePDFLink src={src} isPDF={isPDF}>
          {children}
        </ResumePDFLink>
      );
    }
    return <>{children}</>;
  };

  return (
    <ResumePDFSection>
      {/* Header */}
      <View style={{ ...styles.flexRowBetween, alignItems: "center", marginBottom: spacing["4"] }}>
        <View style={{ flex: 1, marginLeft: spacing["2"] }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: "12pt", color: "#444", fontWeight: "bold", marginRight: spacing["1"] }}>
              R&S TELECOM
            </Text>
            <Text style={{ fontSize: "10pt", color: "#888" }}>
              Votre réussite à portée de main
            </Text>
          </View>
        </View>
        <View style={{ borderLeft: `1pt solid ${themeColor}`, height: 20, marginHorizontal: spacing["2"] }}></View>
        <Text style={{ fontSize: "10pt", color: "#444", flex: 1, textAlign: "right" }}>
          8 rue des frères Caudron – 78140 Vélizy-Villacoublay
        </Text>
      </View>
      <View style={{ ...styles.flexRowBetween, flexWrap: "wrap" }}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <ResumePDFText bold themeColor={themeColor} style={{ fontSize: "18pt" }}>
          Ingénieur réseaux et systèmes
          </ResumePDFText>
          {/* Commented out everything below the name */}
          {/*
          {Object.entries(iconProps).map(([key, value]) => {
            if (!value) return null;

            let iconType: IconType = key as IconType;
            if (key === "url") {
              if (value.includes("github")) {
                iconType = "url_github";
              } else if (value.includes("linkedin")) {
                iconType = "url_linkedin";
              }
            }

            return (
              <View key={key} style={{ ...styles.flexRow, alignItems: "center", gap: spacing["1"], marginTop: spacing["0.5"] }}>
                <ResumePDFIcon type={iconType} isPDF={isPDF} />
                <Wrapper type={key} value={value}>
                  <ResumePDFText>{value}</ResumePDFText>
                </Wrapper>
              </View>
            );
          })}
          */}
        </View>
      </View>
      {/* Retaining the "PROFIL" section */}
      <View style={{ backgroundColor: themeColor, padding: spacing["1"], marginTop: spacing["4"], marginBottom: spacing["2"] }}>
        <ResumePDFText bold style={{ fontSize: "16pt", color: "white" }}>
          PROFIL
        </ResumePDFText>
      </View>
      {summary && <ResumePDFText style={{ marginVertical: spacing["1"] }}>{summary}</ResumePDFText>}
    </ResumePDFSection>
  );
};
