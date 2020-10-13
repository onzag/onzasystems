import React from "react";

import { ItemProvider } from "@onzag/itemize/client/providers/item";
import Link from "@onzag/itemize/client/components/navigation/Link";
import { LogActioner } from "@onzag/itemize/client/components/login/LogActioner";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import Entry from "@onzag/itemize/client/components/property/Entry";
import AppLanguageRetriever from "@onzag/itemize/client/components/localization/AppLanguageRetriever";
import Setter from "@onzag/itemize/client/components/property/Setter";
import AppCountryRetriever from "@onzag/itemize/client/components/localization/AppCountryRetriever";
import AppCurrencyRetriever from "@onzag/itemize/client/components/localization/AppCurrencyRetriever";
import I18nReadError from "@onzag/itemize/client/components/localization/I18nReadError";
import I18nReadMany from "@onzag/itemize/client/components/localization/I18nReadMany";

import { Button, createStyles, withStyles, WithStyles,
  Typography, Divider, DoneIcon, AccountCircleIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { ProgressingElement } from "@onzag/itemize/client/fast-prototyping/components/util";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import { DialogResponsive } from "@onzag/itemize/client/fast-prototyping/components/dialog";

/**
 * The signup dialog styles
 */
const signupDialogStyles = createStyles({
  welcomeTitle: {
    paddingBottom: "1rem",
    fontWeight: 300,
  },
  signupComplyCaption: {
    fontWeight: 300,
    width: "100%",
    textAlign: "center",
    paddingTop: "1rem",
    display: "inline-block",
  },
  signupButtonWrapper: {
    marginTop: "1.5rem",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  forgotPasswordButton: {
    marginTop: "1rem",
  },
  divider: {
    margin: "1rem 0",
  },
});

/**
 * The props for the signup dialog that it needs to take
 */
interface ISignupDialogProps extends WithStyles<typeof signupDialogStyles> {
  /**
   * Whether the dialog is currently open
   */
  open: boolean;
  /**
   * Triggers when the dialog is closed
   */
  onClose: () => void;
  /**
   * when the user requests to login rather than signup
   */
  onLoginRequest: () => void;
}

/**
 * run many functions at once
 * @param functions the functions to run
 */
function runManyFunctions(functions: Array<() => void>) {
  functions.forEach((f) => f());
}

/**
 * A fully compatible with the navbar fast prototyping signup dialog for the user
 * to fill in, contains its own item definition provider, but it must be into
 * a module provider context
 * @param props the login props
 * @returns a react component
 */
export const SignupDialog = withStyles(signupDialogStyles)((props: ISignupDialogProps) => {
  return (
    <ItemProvider
      itemDefinition="user"
      properties={[
        "username",
        "password",
        "app_language",
        "app_country",
        "app_currency",
      ]}
    >
      <LogActioner>
        {(actioner) => (
          <I18nRead id="signup" capitalize={true}>
            {(i18nSignup: string) => (
              <DialogResponsive
                open={props.open}
                onClose={
                  runManyFunctions.bind(
                    null,
                    [actioner.dismissError, actioner.cleanUnsafeFields, props.onClose],
                    )
                  }
                title={i18nSignup}
              >
                <div className={props.classes.titleContainer}>
                  <Typography variant="h4" className={props.classes.welcomeTitle}>
                    <I18nRead id="signup_welcome" capitalize={true}/>
                  </Typography>
                </div>
                <form>
                  <Entry
                    id="username"
                    onEntryDrivenChange={actioner.dismissError}
                    showAsInvalid={!!actioner.error}
                    icon={<AccountCircleIcon/>}
                    autoFocus={true}
                  />
                  <Entry id="password" onEntryDrivenChange={actioner.dismissError} showAsInvalid={!!actioner.error} />
                  <AppLanguageRetriever>
                    {(languageData) => (
                      <Setter id="app_language" value={languageData.currentLanguage.code}/>
                    )}
                  </AppLanguageRetriever>
                  <AppCountryRetriever>
                    {(countryData) => (
                      <Setter id="app_country" value={countryData.currentCountry.code}/>
                    )}
                  </AppCountryRetriever>
                  <AppCurrencyRetriever>
                    {(currencyData) => (
                      <Setter id="app_currency" value={currencyData.currentCurrency.code}/>
                    )}
                  </AppCurrencyRetriever>

                  <I18nReadError error={actioner.error} />
                </form>
                <ProgressingElement
                  isProgressing={actioner.isLoggingIn}
                  fullWidth={true}
                  className={props.classes.signupButtonWrapper}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    aria-label={i18nSignup}
                    startIcon={<DoneIcon />}
                    onClick={actioner.signup.bind(null, true)}
                    fullWidth={true}
                  >
                    {i18nSignup}
                  </Button>
                </ProgressingElement>
                <I18nReadMany
                  data={[{
                    id: "terms_and_conditions",
                  }, {
                    id: "privacy_policy",
                  }]}
                >
                  {(i18nTermsAndConditions: string, i18nPrivacyPolicy: string) => (
                    <Typography variant="caption" className={props.classes.signupComplyCaption}>
                      <I18nRead
                        id="signup_accept_terms"
                        capitalize={true}
                        args={[
                          <Link to="/terms-and-conditions">{i18nTermsAndConditions}</Link>,
                          <Link to="/privacy-policy">{i18nPrivacyPolicy}</Link>,
                        ]}
                      />
                    </Typography>
                  )}
                </I18nReadMany>
                <Divider className={props.classes.divider}/>
                <I18nRead id="login_instead">
                  {(i18nLoginInstead: string) => (
                    <Button
                      color="secondary"
                      variant="text"
                      fullWidth={true}
                      aria-label={i18nLoginInstead}
                      onClick={props.onLoginRequest}
                    >
                      {i18nLoginInstead}
                    </Button>
                  )}
                </I18nRead>
                <Snackbar
                  id="signup-dialog-error"
                  severity="error"
                  i18nDisplay={actioner.error}
                  open={!!actioner.error}
                  onClose={actioner.dismissError}
                />
              </DialogResponsive>
            )}
          </I18nRead>
        )}
      </LogActioner>
    </ItemProvider>
  );
});
