import React from "react";
import { useOutlet, useParams } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";
import { IntlProvider } from "react-intl";
import Header from "../Header";
import { TRANSLATIONS } from "../../utils/translations";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import InactivityRedirect from "../InactivityRedirect";

const defaultLocale = "en";

const AuthLayout = () => {
  const outlet = useOutlet();
  let [locale] = useLocalStorage("locale");
  const params = useParams();
  const hideHeader = params.id && params.childId;
  locale = locale ? locale : defaultLocale;

  return (
    <IntlProvider
      locale={locale ? locale : defaultLocale}
      messages={TRANSLATIONS[locale]}
    >
      <AuthProvider>
        { !hideHeader && <Header /> }
        <div className={`h-screen${hideHeader ? '' : ' pt-[110px]'}`}>{outlet}</div>
        <InactivityRedirect />
      </AuthProvider>
    </IntlProvider>
  );
};

export default AuthLayout;
