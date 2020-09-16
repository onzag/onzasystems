import React from "react";

import { ItemDefinitionProvider, IActionResponseWithId } from "@onzag/itemize/client/providers/item-definition";
import Entry from "@onzag/itemize/client/components/property/Entry";
import View from "@onzag/itemize/client/components/property/View";
import LocationStateReader from "@onzag/itemize/client/components/navigation/LocationStateReader";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import SubmitActioner from "@onzag/itemize/client/components/item-definition/SubmitActioner";

import { Paper, createStyles, withStyles, WithStyles,
  Container, TextField, Box, Typography } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import { ItemDefinitionLoader } from "@onzag/itemize/client/fast-prototyping/components/item-definition-loader";

/**
 * The fragment styles
 */
const fragmentStyles = createStyles({
  paper: {
    padding: "1rem",
  },
  paper2: {
    padding: "1rem",
    marginTop: "1rem",
  },
  container: {
    paddingTop: "1rem",
  },
  box: {
    paddingBottom: "1rem",
  },
});

const redirectOnSuccess = (status: IActionResponseWithId) =>
  `/cms/fragment?id=${status.id}&version=${status.version || ""}`;

/**
 * The fragment section itself that allows modifying and creating new fragments
 * @param props the fragment styles
 * @returns a react element
 */
export const Fragment = withStyles(fragmentStyles)((props: WithStyles<typeof fragmentStyles>) => {
  return (
    <LocationStateReader defaultState={{ id: "", version: "" }} stateIsInQueryString={true}>
      {(locationState, setState) => {
        const updateLocationState = (which: string, e: React.ChangeEvent<HTMLInputElement>) => {
          setState({
            [which]: e.target.value,
          }, true);
        };
        return (
          <ItemDefinitionProvider
            itemDefinition="fragment"
            properties={[
              "title",
              "content",
              "attachments",
            ]}
            includePolicies={false}
            longTermCaching={false}
            forId={parseInt(locationState.id, 10) || null}
            forVersion={locationState.version || null}
          >
            <Container maxWidth="md" className={props.classes.container + " trusted"}>
              <Paper className={props.classes.paper}>

                <I18nRead id="id" capitalize={true}>
                  {(i18nId: string) => (
                    <TextField
                      fullWidth={true}
                      value={locationState.id}
                      type="number"
                      onChange={updateLocationState.bind(null, "id")}
                      placeholder={i18nId}
                    />
                  )}
                </I18nRead>
                <I18nRead id="version" capitalize={true}>
                  {(i18nVersion: string) => (
                    <TextField
                      fullWidth={true}
                      value={locationState.version}
                      onChange={updateLocationState.bind(null, "version")}
                      placeholder={i18nVersion}
                    />
                  )}
                </I18nRead>

                <Entry id="title" />
                <Entry
                  id="content"
                  rendererArgs={{
                    requestAltOnImages: true,
                    supportsRawMode: true,
                  }}
                />

                <SubmitButton
                  i18nId="submit"
                  options={{
                    properties: [
                      "title",
                      "content",
                      "attachments",
                    ],
                  }}
                  redirectOnSuccess={redirectOnSuccess}
                  redirectReplace={true}
                />

              </Paper>

              <Paper className={props.classes.paper2}>
                <ItemDefinitionLoader>
                  <Typography variant="h4"><View id="title" /></Typography>
                  <View id="content" />
                </ItemDefinitionLoader>
              </Paper>

            </Container>

            <SubmitActioner>
              {(actioner) => (
                <>
                  <Snackbar
                    id="submit-fragment-error"
                    severity="error"
                    i18nDisplay={actioner.submitError}
                    open={!!actioner.submitError}
                    onClose={actioner.dismissError}
                  />
                  <Snackbar
                    id="submit-fragment-success"
                    severity="success"
                    i18nDisplay="success"
                    open={actioner.submitted}
                    onClose={actioner.dismissSubmitted}
                  />
                </>
              )}
            </SubmitActioner>

          </ItemDefinitionProvider>);
      }}
    </LocationStateReader>
  );
});
