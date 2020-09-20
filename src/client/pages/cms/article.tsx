import React from "react";
import { ItemDefinitionProvider, IActionResponseWithId } from "@onzag/itemize/client/providers/item-definition";
import Entry from "@onzag/itemize/client/components/property/Entry";
import View from "@onzag/itemize/client/components/property/View";
import LocationStateReader from "@onzag/itemize/client/components/navigation/LocationStateReader";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import SubmitActioner from "@onzag/itemize/client/components/item-definition/SubmitActioner";

import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import { ItemDefinitionLoader } from "@onzag/itemize/client/fast-prototyping/components/item-definition-loader";
import { Paper, createStyles, withStyles,
  WithStyles, Container, TextField, Box, Typography,
  Card } from "@onzag/itemize/client/fast-prototyping/mui-core";

import { articlesStyles } from "../frontpage/articles";

/**
 * The styles for the article section
 */
const articleStyles = createStyles({
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

/**
 * Displays a single article, summary and summary image
 * @param props the single article props
 * @returns a react element
 */
const SingleArticle = withStyles(articlesStyles)((props: WithStyles<typeof articlesStyles>) => {
  return null;
  // return (
  //   <Card>
  //     <div>
  //       <View
  //         id="summary_image"
  //         rendererArgs={{
  //           // imageClassName: props.classes.articleImage,
  //           imageSizes: "300px",
  //           lazyLoad: true,
  //         }}
  //       />
  //     </div>
  //     <div className={props.classes.articleText}>
  //       <Typography variant="h4"><View id="title" /></Typography>
  //       <div className={props.classes.articleSummaryContainer}>
  //         <div className={props.classes.articleSummary}>
  //           <View id="summary" />
  //         </div>
  //       </div>
  //     </div>
  //   </Card>
  // );
});

const redirectOnSuccess = (status: IActionResponseWithId) =>
  `/cms/article?id=${status.id}&version=${status.version || ""}`;

/**
 * Page section that allows for creating and modifying articles
 * @param props the article props
 * @returns a react element
 */
export const Article = withStyles(articleStyles)((props: WithStyles<typeof articleStyles>) => {
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
            itemDefinition="article"
            properties={[
              "title",
              "content",
              "attachments",
              "locale",
              "summary",
              "summary_image",
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
                    <Box className={props.classes.box}>
                      <TextField
                        fullWidth={true}
                        value={locationState.id}
                        type="number"
                        onChange={updateLocationState.bind(null, "id")}
                        placeholder={i18nId}
                      />
                    </Box>
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

                <Entry id="locale" />
                <Entry id="title" />
                <Entry
                  id="content"
                  rendererArgs={{
                    requestAltOnImages: true,
                    supportsRawMode: true,
                  }}
                />
                <Entry id="summary" />
                <Entry id="summary_image" />

                <SubmitButton
                  i18nId="submit"
                  options={{
                    properties: [
                      "title",
                      "content",
                      "attachments",
                      "locale",
                      "summary",
                      "summary_image",
                    ],
                  }}
                  redirectOnSuccess={redirectOnSuccess}
                  redirectReplace={true}
                />

              </Paper>

              <Paper className={props.classes.paper2}>
                <ItemDefinitionLoader>
                  <SingleArticle />
                </ItemDefinitionLoader>
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
                    id="submit-article-error"
                    severity="error"
                    i18nDisplay={actioner.submitError}
                    open={!!actioner.submitError}
                    onClose={actioner.dismissError}
                  />
                  <Snackbar
                    id="submit-article-success"
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
