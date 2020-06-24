import React from "react";
import { ItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import Entry from "@onzag/itemize/client/components/property/Entry";
import { createStyles, withStyles, WithStyles, Typography, ExpansionPanel,
  ExpansionPanelSummary, ExpansionPanelDetails, ExpandMoreIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";

const tinksiStyles = createStyles({
  header: {
    width: "100%",
    paddingBottom: "1rem",
    fontWeight: 300,
  },
  heading: {
    fontSize: "1rem",
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  panel: {
    width: "100%",
  },
  panelContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

export const TinksiSearch = withStyles(tinksiStyles)((props: WithStyles<typeof tinksiStyles>) => {
  return (
    <>
      <ItemDefinitionProvider
        itemDefinition="tinksi"
        searchCounterpart={true}
        properties={
          [
            "status",
            "date_sold",
            "customer",
            "customer_name",
            "customer_company",
            "customer_address",
            "customer_email",
            "customer_phone",
            "info",
            "attachments",

            "activation_date",
            "shipment_date",
            "brand",
            "model",
            "serial_number",
            "dev_eui",
            "app_eui",
            "app_key",
            "abp_otaa",
            "nwk_skey",
            "app_skey",
            "dev_addrr",
          ]
        }
      >
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="basic_info"
            id="basic_info"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="basic_info" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="status" searchVariant="exact" />
            <Entry id="date_sold" searchVariant="from" />
            <Entry id="date_sold" searchVariant="to" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="client_details"
            id="client_details"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="client_details" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="customer" searchVariant="exact" />
            <Entry id="customer_name" searchVariant="search" />
            <Entry id="customer_company" searchVariant="search" />
            <Entry id="customer_address" searchVariant="location" />
            <Entry id="customer_address" searchVariant="radius" />
            <Entry id="customer_email" searchVariant="exact" />
            <Entry id="customer_phone" searchVariant="exact" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="shipment_details"
            id="shipment_details"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="shipment_details" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="activation_date" searchVariant="from" />
            <Entry id="activation_date" searchVariant="to" />
            <Entry id="shipment_date" searchVariant="from" />
            <Entry id="shipment_date" searchVariant="to" />
            <Entry id="brand" searchVariant="search" />
            <Entry id="model" searchVariant="exact" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="sensor_details"
            id="sensor_details"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="sensor_details" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="serial_number" searchVariant="exact" />
            <Entry id="dev_eui" searchVariant="exact" />
            <Entry id="app_eui" searchVariant="exact" />
            <Entry id="app_key" searchVariant="exact" />
            <Entry id="abp_otaa" searchVariant="exact" />
            <Entry id="nwk_skey" searchVariant="exact" />
            <Entry id="app_skey" searchVariant="exact" />
            <Entry id="dev_addrr" searchVariant="exact" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="additional_info"
            id="additional_info"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="additional_info" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="info" searchVariant="search" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </ItemDefinitionProvider>
    </>
  );
});
