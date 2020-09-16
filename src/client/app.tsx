import React from "react";

import Route from "@onzag/itemize/client/components/navigation/Route";

import { Navbar } from "@onzag/itemize/client/fast-prototyping/components/navbar";
import { IMenuEntry } from "@onzag/itemize/client/fast-prototyping/components/navbar/menu";
import { ImportantDevicesIcon, HomeIcon, LibraryBooksIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";

import { Frontpage } from "./pages/frontpage";
import { Contact } from "./pages/contact";
import { PrivacyPolicy } from "./pages/privacy-policy";
import { TermsAndConditions } from "./pages/terms-and-conditions";
import { ResetPassword } from "./pages/reset-password";
import { Profile } from "./pages/profile";
import { MyProfile } from "./pages/my-profile";
import { ChangePassword } from "./pages/change-password";
import { News } from "./pages/news";
import { CMS } from "./pages/cms";

import { Avatar } from "./components/avatar";
import { Footer } from "./components/footer";
import { LoginDialog } from "./components/login-dialog";
import { SignupDialog } from "./components/signup-dialog";
import { RecoverDialog } from "./components/recover-dialog";

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

/**
 * The default admin entries
 */
export const MENU_ADMIN_ENTRIES: IMenuEntry[] = [
  {
    path: "/cms",
    icon: <ImportantDevicesIcon/>,
    module: "cms",
    role: "ADMIN",
    i18nProps: {
      id: "name",
      capitalize: true,
    },
  },
];

/**
 * The default menu entries
 */
export const MENU_ENTRIES: IMenuEntry[] = [
  {
    path: "/",
    icon: <HomeIcon />,
    i18nProps: {
      id: "home",
      capitalize: true,
    },
  },
  {
    path: "/news",
    icon: <LibraryBooksIcon />,
    module: "cms",
    idef: "article",
    i18nProps: {
      id: "news",
      capitalize: true,
    },
  },
];

export default function App() {
  return (
    <>
      <Navbar
        LoginDialog={LoginDialog}
        SignupDialog={SignupDialog}
        RecoverDialog={RecoverDialog}
        menuEntries={MENU_ENTRIES}
        menuAdminEntries={MENU_ADMIN_ENTRIES}
        avatarContextProperties={
          [
            "username",
            "app_country",
            "email",
            "e_validated",
            "role",
            "address",
            "profile_picture",
          ]
        }
        AvatarComponent={Avatar}
        avatarProps={{
          cacheImage: true,
          profileURL: "/my-profile",
          showWarnings: true,
        }}
      />

      <Route path="/" exact={true} component={Frontpage}/>

      <Route path="/profile/:id" component={Profile}/>
      <Route path="/my-profile" component={MyProfile}/>
      <Route path="/news" component={News}/>

      <Route path="/reset-password" component={ResetPassword}/>
      <Route path="/change-password" component={ChangePassword}/>

      <Route path="/cms" component={CMS}/>

      <Route path="/privacy-policy" component={PrivacyPolicy}/>
      <Route path="/terms-and-conditions" component={TermsAndConditions}/>
      <Route path="/contact" component={Contact}/>

      <Footer/>
    </>
  );
}
