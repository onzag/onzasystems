import React from "react";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemDefinitionProvider, NoStateItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import View from "@onzag/itemize/client/components/property/View";
import AppLanguageRetriever from "@onzag/itemize/client/components/localization/AppLanguageRetriever";
import Link from "@onzag/itemize/client/components/navigation/Link";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import { ItemDefinitionLoader } from "@onzag/itemize/client/fast-prototyping/components/item-definition-loader";
import Reader from "@onzag/itemize/client/components/property/Reader";

import {
  withStyles, createStyles, WithStyles, CardActionArea, CardMedia,
  Typography, Paper, Theme, Card, Container, Button, Grid,
} from "@onzag/itemize/client/fast-prototyping/mui-core";

import { Avatar } from "../../components/avatar";

/**
 * The list of articles styles
 * @param theme the mui theme
 * @returns a bunch of styles
 */
export const articlesStyles = (theme: Theme) => createStyles({
  featuresTitle: {
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
  gridContainer: {
    padding: "1rem",
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
          <NoStateItemDefinitionProvider itemDefinition="article">
            <Typography variant="h2" className={props.classes.featuresTitle}>
              <I18nRead id="features" capitalize={true} />
            </Typography>
          </NoStateItemDefinitionProvider>
          <AppLanguageRetriever>
            {(languageData) => (
              <Grid container={true} spacing={3} className={props.classes.gridContainer}>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((itemId) => (
                  <Grid item={true} xs={12} sm={12} md={4} lg={4} key={itemId}>
                    <ItemDefinitionProvider
                      itemDefinition="article"
                      forId={itemId}
                      forVersion={languageData.currentLanguage.code}
                      static="NO_LISTENING"
                      properties={[
                        "title",
                        "summary",
                        "summary_image",
                        "content", // preloading the content even when it's not visible
                      ]}
                      longTermCaching={true}
                    >
                      <Link to={`/article/${itemId}`} as="div">
                        <Card>
                          <ItemDefinitionLoader>
                            <View id="summary" />
                          </ItemDefinitionLoader>
                        </Card>
                      </Link>
                    </ItemDefinitionProvider>
                  </Grid>
                ))}
              </Grid>
            )}
          </AppLanguageRetriever>
        </ModuleProvider>
      </Paper>
    </Container>
  );
});
