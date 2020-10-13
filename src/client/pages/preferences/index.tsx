import React from "react";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import { ItemLoader } from "@onzag/itemize/client/fast-prototyping/components/item-loader";
import { Paper, createStyles, withStyles, WithStyles, Container, Divider, Box,
  NotificationsIcon, MenuBookIcon, DoneOutlineIcon, PersonPinIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import { NeedsSubmitPrompt } from "@onzag/itemize/client/fast-prototyping/components/needs-submit-prompt";
import UserDataRetriever from "@onzag/itemize/client/components/user/UserDataRetriever";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import Entry from "@onzag/itemize/client/components/property/Entry";
import SubmitActioner from "@onzag/itemize/client/components/item/SubmitActioner";

/**
 * The styles for the preferences page
 */
const preferencesStyles = createStyles({
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
 * The preferences page will allow the user to modify things such as notifications, newsletters and address
 * as well as other information that do not affect the user itself
 * @param props the preferences props
 * @returns a react element
 */
export const Preferences = withStyles(preferencesStyles)((props: WithStyles<typeof preferencesStyles>) => {
  return (
    <UserDataRetriever>
      {(userData) => {
        const properties = [
          "e_notifications",
          "e_newsletter",
          "address",
        ];
        return (
          <ModuleProvider module="users">
            <ItemProvider
              itemDefinition="user"
              properties={properties}
              forId={userData.id}
              assumeOwnership={true}
              includePolicies={false}
              disableExternalChecks={true}
              longTermCaching={true}
              markForDestructionOnLogout={true}
              cleanOnDismount={{
                propertiesToRestoreOnAny: properties,
              }}
            >
              <I18nRead id="preferences" capitalize={true}>
                {(i18nPreferences: string) => {
                  return (
                    <TitleSetter>
                      {i18nPreferences}
                    </TitleSetter>
                  );
                }}
              </I18nRead>
              <NeedsSubmitPrompt
                properties={properties}
                i18nConfirm="update_your_preferences"
                confirmationSubmitOptions={{
                  properties,
                  differingOnly: true,
                }}
              />
              <ItemLoader>
                <Container maxWidth="md" className={props.classes.container}>
                  <Paper className={props.classes.paper}>
                    <Entry id="e_notifications" icon={<NotificationsIcon />} />
                    <Entry id="e_newsletter" icon={<MenuBookIcon />} />

                    <Entry id="address" icon={<PersonPinIcon />} rendererArgs={{ descriptionAsAlert: true }} />

                    <Divider />

                    <Box className={props.classes.buttonBox}>
                      <SubmitButton
                        i18nId="update_your_preferences"
                        options={{
                          properties: ["e_notifications", "e_newsletter", "address"],
                          differingOnly: true,
                          unpokeAfterAny: true,
                        }}
                        buttonColor="primary"
                        buttonStartIcon={<DoneOutlineIcon />}
                        buttonVariant="contained"
                      />
                    </Box>
                  </Paper>
                </Container>
              </ItemLoader>
              <SubmitActioner>
                {(actioner) => (
                  <React.Fragment>
                    <Snackbar
                      id="submit-preferences-error"
                      severity="error"
                      i18nDisplay={actioner.submitError}
                      open={!!actioner.submitError}
                      onClose={actioner.dismissError}
                    />
                    <Snackbar
                      id="submit-preferences-success"
                      severity="success"
                      i18nDisplay="preferences_updated_successfully"
                      open={actioner.submitted}
                      onClose={actioner.dismissSubmitted}
                    />
                  </React.Fragment>
                )}
              </SubmitActioner>
            </ItemProvider>
          </ModuleProvider>
        );
      }}
    </UserDataRetriever>
  );
});
