import CookieConsent from "react-cookie-consent";

export default function CookieConsentModal() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      buttonClasses="btn btn-primary btn-xs"
      cookieName="cookieConsent"
      //   style={{ background: "#2B373B" }}
      containerClasses="rounded mx-auto"
      //   buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
    >
      This website uses cookies to enhance the user experience.{" "}
      <span style={{ fontSize: "10px" }}>
        By clicking "Accept", you consent to our use of cookies.
      </span>
    </CookieConsent>
  );
}
