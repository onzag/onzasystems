import React from "react";

import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import Link from "@onzag/itemize/client/components/navigation/Link";

import { createStyles, WithStyles, withStyles, Theme, CopyrightIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { LanguagePicker } from "@onzag/itemize/client/fast-prototyping/components/language-picker";
import { CurrencyPicker } from "@onzag/itemize/client/fast-prototyping/components/currency-picker";
import { CountryPicker } from "@onzag/itemize/client/fast-prototyping/components/country-picker";

/**
 * Styles of the footer
 * @param theme the mui theme
 * @returns a bunch of styles
 */
const footerStyles = (theme: Theme) => createStyles({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3rem",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "0.5rem 0",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 0",
    },
  },
  containerAbs: {
    position: "absolute",
    bottom: 0,
    backgroundColor: theme.palette.grey[900],
  },
  dataSet: {
    lineHeight: 0,
    height: "2.5rem",
    flex: "1 1 0",
    padding: "0.2rem 1rem",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flex: "1 0 100%",
      padding: "0.5rem 0",
    },
  },
  dataSetAbs: {
    "&:first-child": {
      flex: "2 1 0",
    },
    "&:not(:last-child)": {
      [theme.breakpoints.up("md")]: {
        borderRight: "solid 1px #aaa",
      },
    },
  },
  copyInfo: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  spacer: {
    width: "6px",
    display: "inline-block",
    height: "2px",
  },
});

/**
 * The footer itself
 * takes no props
 */
export const Footer = withStyles(footerStyles)((props: WithStyles<typeof footerStyles>) => {
  const year = (new Date()).getUTCFullYear();
  // the first represents the spacer, the second is the actual footer
  return (
    <>
      <div className={props.classes.container}>
        <div className={props.classes.dataSet}/>
        <div className={props.classes.dataSet}/>
        <div className={props.classes.dataSet}/>
        <div className={props.classes.dataSet}/>
      </div>
      <div className={props.classes.container + " " + props.classes.containerAbs}>
        <div className={props.classes.dataSet + " " + props.classes.dataSetAbs}>
          <CopyrightIcon />
          <span className={props.classes.spacer} />
          <span className={props.classes.spacer} />
          {year}
          <span className={props.classes.spacer} />
          <span className={props.classes.copyInfo}>
            <I18nRead id="app_name" capitalize={true} />
          </span>
          <span className={props.classes.spacer} />
          <span className={props.classes.spacer} />
          <LanguagePicker useCode={true} />
          <CountryPicker useCode={true} />
          <CurrencyPicker useCode={true} />
        </div>
        <div className={props.classes.dataSet + " " + props.classes.dataSetAbs}>
          <Link to="/contact" className={props.classes.link}>
            <I18nRead id="contact" capitalize={true} />
          </Link>
        </div>
        <div className={props.classes.dataSet + " " + props.classes.dataSetAbs}>
          <Link to="/terms-and-conditions" className={props.classes.link}>
            <I18nRead id="terms_and_conditions" capitalize={true} />
          </Link>
        </div>
        <div className={props.classes.dataSet + " " + props.classes.dataSetAbs}>
          <Link to="/privacy-policy" className={props.classes.link}>
            <I18nRead id="privacy_policy" capitalize={true} />
          </Link>
        </div>
      </div>
    </>
  );
});
