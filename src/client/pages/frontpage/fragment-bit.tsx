import React from "react";
import { ItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import AppLanguageRetriever from "@onzag/itemize/client/components/localization/AppLanguageRetriever";
import { ItemDefinitionLoader } from "@onzag/itemize/client/fast-prototyping/components/item-definition-loader";
import View from "@onzag/itemize/client/components/property/View";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";

import {
  withStyles,
  createStyles,
  WithStyles,
  Typography,
  Paper,
  Theme,
  Container,
} from "@onzag/itemize/client/fast-prototyping/mui-core";

/**
 * provides the styles for the fragmentBit section
 * @param theme the mui theme
 * @returns a bunch of styles
 */
export const fragmentBitStyles = (theme: Theme) => createStyles({
  fragmentBitTitle: {
    marginTop: "4rem",
    paddingLeft: "1rem",
    borderLeft: "solid 1rem " + theme.palette.secondary.main,
    fontWeight: 300,
  },
  container: {
    padding: 0,
  },
  container2: {
    padding: "2rem 0 1rem 0",
  },
  paper: {
    borderRadius: 0,
    border: 0,
    boxShadow: "none",
    backgroundColor: "transparent",
  },
});

interface IFragmentBitProps extends WithStyles<typeof fragmentBitStyles> {
  id: number;
}

/**
 * The fragmentBit section provides the buttons and urls for the different fragments that can be
 * used as defined by the developer, these networks are language sensitive and are read
 * from the i18n properties data
 *
 * @param props the fragmentBit props
 * @returns a react element
 */
export const FragmentBit = withStyles(fragmentBitStyles)((props: IFragmentBitProps) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <Paper className={props.classes.paper}>
        <ModuleProvider module="cms">
          <AppLanguageRetriever>
            {(languageData) => (
              <ItemDefinitionProvider
                itemDefinition="fragment"
                forId={props.id}
                forVersion={languageData.currentLanguage.code}
                static="NO_LISTENING"
                properties={[
                  "title",
                  "content",
                  "attachments",
                ]}
                longTermCaching={true}
              >
                <Typography variant="h3" className={props.classes.fragmentBitTitle}>
                  <View id="title" capitalize={true} />
                </Typography>
                <div className={props.classes.container2}>
                  <ItemDefinitionLoader>
                    <View id="content" />
                  </ItemDefinitionLoader>
                </div>
              </ItemDefinitionProvider>
            )}
          </AppLanguageRetriever>
        </ModuleProvider>
      </Paper>
    </Container>
  );
});
