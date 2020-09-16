import React from "react";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemDefinitionProvider, ParentItemDefinitionContextProvider } from "@onzag/itemize/client/providers/item-definition";
import SearchLoader from "@onzag/itemize/client/components/search/SearchLoader";
import View from "@onzag/itemize/client/components/property/View";
import Reader from "@onzag/itemize/client/components/property/Reader";
import AppLanguageRetriever from "@onzag/itemize/client/components/localization/AppLanguageRetriever";
import Link from "@onzag/itemize/client/components/navigation/Link";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";

import { withStyles, createStyles, WithStyles,
  Typography, Paper, Theme, Box, Container, Button } from "@onzag/itemize/client/fast-prototyping/mui-core";

import { Avatar } from "../../components/avatar";

/**
 * The list of articles styles
 * @param theme the mui theme
 * @returns a bunch of styles
 */
export const articlesStyles = (theme: Theme) => createStyles({
  newsTitle: {
    marginTop: "2rem",
    paddingLeft: "1rem",
    borderLeft: "solid 1rem " + theme.palette.secondary.main,
  },
  paper: {
    borderRadius: 0,
    border: 0,
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  container: {
    padding: 0,
  },
  articleContainer: {
    "backgroundColor": "white",
    "marginTop": "2rem",
    "boxShadow": "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    "transition": "box-shadow ease-in-out 0.3s",
    "borderTop": "solid 1px rgba(0,0,0,0.12)",
    "cursor": "pointer",
    "display": "flex",
    "alignItems": "flex-start",
    "justifyContent": "center",
    "position": "relative",
    "width": "100%",
    "flexWrap": "wrap",
    "&:nth-child(even)": {
      flexDirection: "row-reverse",
    },
    [theme.breakpoints.up("sm")]: {
      "&:nth-child(odd) $publisherInfoBox": {
        left: "calc(300px + 1.5rem)",
      },
      "&:nth-child(even) $articleText": {
        paddingRight: "calc(1.5rem + 300px)",
      },
      "&:nth-child(odd) $articleText": {
        paddingLeft: "calc(1.5rem + 300px)",
      },
      "&:nth-child(even) $articleImageContainer": {
        right: 0,
      },
      "&:nth-child(odd) $articleImageContainer": {
        left: 0,
      },
    },
    [theme.breakpoints.up("md")]: {
      "&:nth-child(odd) $publisherInfoBox": {
        left: "calc(300px + 2rem)",
      },
      "&:nth-child(even) $articleText": {
        paddingRight: "calc(2rem + 300px)",
      },
      "&:nth-child(odd) $articleText": {
        paddingLeft: "calc(2rem + 300px)",
      },
    },
    "&:hover, &:active": {
      boxShadow: "0px 6px 6px -1px rgba(0,0,0,0.2), 0px 6px 6px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    "&:hover $articleImage, &:active $articleImage": {
      transform: "scale(1.05)",
    },
  },
  articleImageContainer: {
    width: "300px",
    lineHeight: 0,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    bottom: 0,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "300px",
      position: "relative",
    },
  },
  articleImage: {
    transition: "transform ease-in-out 0.3s",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  articleText: {
    width: "50%",
    position: "relative",
    flex: "1 1 50%",
    padding: "1.5rem",
    [theme.breakpoints.up("md")]: {
      padding: "2rem",
    },
  },
  articleSummary: {
    padding: "1rem 0",
  },
  articleSummaryContainer: {
    paddingBottom: "calc(40px + 2rem)",
    [theme.breakpoints.up("md")]: {
      paddingBottom: "calc(40px + 3rem)",
    },
  },
  publisherInfoBox: {
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: "1.5rem",
    left: "1.5rem",
    [theme.breakpoints.up("md")]: {
      bottom: "2rem",
      left: "2rem",
    },
  },
  publisherInfoDetailsBox: {
    flex: "1 1 50%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "0 1rem",
    flexDirection: "column",
  },
  moreNewsContainer: {
    marginTop: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  moreNewsButton: {

  },
});

/**
 * Provides a list of articles for fast prototyping that the user can interact with, this is meant
 * to be placed within the frontpage
 * @param props the article list props
 * @returns a react element
 */
export const Articles = withStyles(articlesStyles)((props: WithStyles<typeof articlesStyles>) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <Paper className={props.classes.paper}>
        <ModuleProvider module="cms">
          <AppLanguageRetriever>
            {(languageData) => (
              <ItemDefinitionProvider
                itemDefinition="article"
                searchCounterpart={true}
                setters={[
                  {
                    id: "locale",
                    searchVariant: "search",
                    value: languageData.currentLanguage.code,
                  },
                ]}
                automaticSearch={{
                  requestedProperties: [
                    "title",
                    "locale",
                    "summary",
                    "summary_image",
                  ],
                  searchByProperties: [
                    "locale",
                  ],
                  traditional: true,
                  limit: 5,
                  offset: 0,
                }}
              >
                <Typography variant="h2" className={props.classes.newsTitle}>
                  <I18nRead id="news" capitalize={true} />
                </Typography>
                <SearchLoader
                  pageSize={5}
                  currentPage={0}
                  static="TOTAL"
                >
                  {(loader) => {
                    return loader.searchRecords.map((searchRecord) => {
                      return (
                        <ItemDefinitionProvider {...searchRecord.providerProps}>
                          <Link to={`/news/${searchRecord.id}`} as="div" className={props.classes.articleContainer}>
                            <div className={props.classes.articleImageContainer}>
                              <View
                                id="summary_image"
                                rendererArgs={{
                                  imageClassName: props.classes.articleImage,
                                  imageSizes: "300px",
                                  lazyLoad: true,
                                }}
                              />
                            </div>
                            <div className={props.classes.articleText}>
                              <Typography variant="h4"><View id="title" /></Typography>
                              <div className={props.classes.articleSummaryContainer}>
                                <div className={props.classes.articleSummary}>
                                  <View id="summary" />
                                </div>
                              </div>
                            </div>
                            <Reader id="created_by">
                              {(createdBy: number) => (
                                <ModuleProvider module="users">
                                  <ItemDefinitionProvider
                                    itemDefinition="user"
                                    forId={createdBy}
                                    static="TOTAL"
                                    disableExternalChecks={true}
                                    properties={[
                                      "username",
                                      "profile_picture",
                                      "role",
                                    ]}
                                    injectParentContext={true}
                                  >
                                    <Box className={props.classes.publisherInfoBox}>
                                      <Avatar
                                        hideFlag={true}
                                        size="small"
                                      />
                                      <Box className={props.classes.publisherInfoDetailsBox}>
                                        <Typography variant="body1"><View id="username" /></Typography>
                                        <Typography variant="body2">
                                          <ParentItemDefinitionContextProvider>
                                            <View id="created_at" rendererArgs={{ dateFormat: "LLL" }} />
                                          </ParentItemDefinitionContextProvider>
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </ItemDefinitionProvider>
                                </ModuleProvider>
                              )}
                            </Reader>
                          </Link>
                        </ItemDefinitionProvider>
                      );
                    });
                  }}
                </SearchLoader>
                <div className={props.classes.moreNewsContainer}>
                  <Link to="/news">
                    <Button size="large" className={props.classes.moreNewsButton} variant="contained" color="primary">
                      <I18nRead id="more_news" capitalize={true} />
                    </Button>
                  </Link>
                </div>
              </ItemDefinitionProvider>
            )}
          </AppLanguageRetriever>
        </ModuleProvider>
      </Paper>
    </Container>
  );
});
