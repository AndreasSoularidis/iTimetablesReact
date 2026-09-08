import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f2f5 0%, #e6f0ff 100%)",
        padding: "0 24px",
      }}
    >
      <Title style={{ fontSize: 48, marginBottom: 16, textAlign: "center" }}>
        iTimetables
      </Title>
      <Paragraph
        style={{ fontSize: 18, color: "#555", textAlign: "center", maxWidth: 500, marginBottom: 40 }}
      >
        Διαχείριση ωρολογίων προγραμμάτων για σχολικές μονάδες. Οργανώστε
        εύκολα τμήματα, καθηγητές και διδασκαλίες.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        onClick={() => navigate("/login")}
        style={{ minWidth: 160 }}
      >
        Σύνδεση
      </Button>
    </div>
  );
}
