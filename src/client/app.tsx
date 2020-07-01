import React from "react";

import { Navbar } from "@onzag/itemize/client/fast-prototyping/components/navbar";
import Route from "@onzag/itemize/client/components/navigation/Route";
import { Footer } from "@onzag/itemize/client/fast-prototyping/components/footer";

import { LoginDialog } from "@onzag/itemize/client/fast-prototyping/components/login-dialog";
import { SignupDialog } from "@onzag/itemize/client/fast-prototyping/components/signup-dialog";
import { RecoverDialog } from "@onzag/itemize/client/fast-prototyping/components/recover-dialog";
import { MyProfile } from "@onzag/itemize/client/fast-prototyping/pages/my-profile";
import { Profile } from "@onzag/itemize/client/fast-prototyping/pages/profile";
import { ChangePassword } from "@onzag/itemize/client/fast-prototyping/pages/change-password";
import { Preferences } from "@onzag/itemize/client/fast-prototyping/pages/preferences";
import { PrivacyPolicy } from "@onzag/itemize/client/fast-prototyping/pages/privacy-policy";
import { TermsAndConditions } from "@onzag/itemize/client/fast-prototyping/pages/terms-and-conditions";
import { Contact } from "@onzag/itemize/client/fast-prototyping/pages/contact";
import { ResetPassword } from "@onzag/itemize/client/fast-prototyping/pages/reset-password";
import { News } from "@onzag/itemize/client/fast-prototyping/pages/news";

import { CMS } from "@onzag/itemize/client/fast-prototyping/pages/cms";

import { Tinksi } from "./pages/tinksi";
import { Frontpage } from "./pages/frontpage";

// Remember that when adding fast prototyping components they might demand
// localization data, if you get an error named
// Uncaught Error: Unknown key in context: xxxxxxx from localization.tsx
// this means this is a required localization key you need to go to your
// schema .properties file, depending on the context, and add the missing key
// keys are self descriptive on what they should contain, it might be data for
// hard hearing, tooltips or just display text

// you need to run npm run build-data to rebuild language packs if you are
// in development mode with the service worker set up as `bypass for network`
// it should work out of the box after a refresh

export default function App() {
  return (
    <>
      <Navbar
        LoginDialog={LoginDialog}
        SignupDialog={SignupDialog}
        RecoverDialog={RecoverDialog}
        menuEntries={[
          {
            path: "/tinksi",
            icon: null,
            module: "suomi_connect_registry",
            idef: "tinksi",
            i18nProps: {
              id: "name",
              capitalize: true,
            },
          },
        ]}
        menuAdminEntries={[]}
      />

      <Route path="/" exact={true} component={Frontpage}/>

      <Route path="/my-profile" component={MyProfile}/>
      <Route path="/change-password" component={ChangePassword}/>
      <Route path="/profile/:id" component={Profile}/>
      <Route path="/preferences" component={Preferences}/>
      <Route path="/privacy-policy" component={PrivacyPolicy}/>
      <Route path="/terms-and-conditions" component={TermsAndConditions}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/reset-password" component={ResetPassword}/>

      <Route path="/cms" component={CMS}/>

      <Route path="/news" component={News}/>

      <Route path="/tinksi" component={Tinksi}/>

      <Footer/>
    </>
  );
}
