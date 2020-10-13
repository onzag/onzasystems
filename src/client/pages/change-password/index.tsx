import React from "react";

import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import UserDataRetriever from "@onzag/itemize/client/components/user/UserDataRetriever";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import Entry from "@onzag/itemize/client/components/property/Entry";
import SubmitActioner from "@onzag/itemize/client/components/item/SubmitActioner";

import { ItemLoader } from "@onzag/itemize/client/fast-prototyping/components/item-loader";
import { Paper, createStyles, withStyles, WithStyles,
  Container, Divider, Box, DoneOutlineIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";

/**
 * Styles for the change password page
 */
const changePasswordStyles = createStyles({
  paper: {
    padding: "1rem",
  },
  container: {
    paddingTop: "1rem",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1.2rem",
  },
});

/**
 * A simple page designed to provide functionality to change the password
 * @param props the page props
 * @returns a react element
 */
export const ChangePassword = withStyles(changePasswordStyles)((props: WithStyles<typeof changePasswordStyles>) => {
  return (
    <UserDataRetriever>
      {(userData) => {
        return (
          <ModuleProvider module="users">
            <ItemProvider
              itemDefinition="user"
              properties={[
                "password",
              ]}
              forId={userData.id}
              assumeOwnership={true}
              includePolicies={true}
              disableExternalChecks={true}
              avoidLoading={true}
            >
              <I18nRead id="change_password" capitalize={true}>
                {(i18nChangePassword: string) => {
                  return (
                    <TitleSetter>
                      {i18nChangePassword}
                    </TitleSetter>
                  );
                }}
              </I18nRead>
              <ItemLoader>
                <Container maxWidth="md" className={props.classes.container}>
                  <Paper className={props.classes.paper}>

                    <form>
                      <I18nRead id="change_password_current_alt_label">
                        {(i18nAltCurrentPasswordLabel: string) => (
                          <I18nRead id="change_password_current_alt_placeholder">
                            {(i18nAltCurrentPasswordPlaceholder: string) => (
                              <Entry
                                id="password"
                                policyType="edit"
                                policyName="REQUIRES_PASSWORD_CONFIRMATION"
                                altLabel={i18nAltCurrentPasswordLabel}
                                altPlaceholder={i18nAltCurrentPasswordPlaceholder}
                                autoFocus={true}
                              />
                            )}
                          </I18nRead>
                        )}
                      </I18nRead>

                      <I18nRead id="change_password_new_alt_label">
                        {(i18nAltNewPasswordLabel: string) => (
                          <I18nRead id="change_password_new_alt_placeholder">
                            {(i18nAltNewPasswordPlaceholder: string) => (
                              <Entry
                                id="password"
                                altLabel={i18nAltNewPasswordLabel}
                                altPlaceholder={i18nAltNewPasswordPlaceholder}
                              />
                            )}
                          </I18nRead>
                        )}
                      </I18nRead>
                    </form>

                    <Divider />

                    <Box className={props.classes.buttonBox}>
                      <SubmitButton
                        i18nId="change_password"
                        options={{
                          properties: ["password"],
                          propertiesToRestoreOnSuccess: ["password"],
                          policies: [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]],
                          policiesToCleanOnSuccess: [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]],
                          unpokeAfterAny: true,
                        }}
                        buttonColor="primary"
                        buttonStartIcon={<DoneOutlineIcon />}
                        buttonVariant="contained"
                        redirectOnSuccess="/my-profile?msg=change_password_success&msgtitle=change_password"
                        redirectGoBack={true}
                        redirectReplace={true}
                      />
                    </Box>
                  </Paper>
                </Container>
              </ItemLoader>
              <SubmitActioner>
                {(actioner) => (
                  <Snackbar
                    id="change-password-error"
                    severity="error"
                    i18nDisplay={actioner.submitError}
                    open={!!actioner.submitError}
                    onClose={actioner.dismissError}
                  />
                )}
              </SubmitActioner>
            </ItemProvider>
          </ModuleProvider>
        );
      }}
    </UserDataRetriever>
  );
});
