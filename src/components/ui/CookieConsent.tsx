import CookieConsent from "react-cookie-consent";

export default function CookieConsentModal() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Got it!"
      cookieName="cookieConsent"
      buttonStyle={{
        backgroundColor: "#4caf50",
        color: "white",
        borderRadius: "5px",
      }}
      expires={150}
    >
      This website uses cookies to enhance the user experience.
      <span style={{ fontSize: "10px" }}>
        By using this website, you consent to our use of cookies.
      </span>
    </CookieConsent>
  );
}
