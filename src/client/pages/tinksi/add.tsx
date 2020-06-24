import React from "react";
import { ItemDefinitionProvider, IPokeElementsType, IActionResponseWithId } from "@onzag/itemize/client/providers/item-definition";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import Entry from "@onzag/itemize/client/components/property/Entry";
import { createStyles, withStyles, WithStyles, Typography, Button } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { localizedRedirectTo } from "@onzag/itemize/client/components/navigation";
import PokeButtonActioner from "@onzag/itemize/client/components/item-definition/PokeButtonActioner";
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import SubmitActioner from "@onzag/itemize/client/components/item-definition/SubmitActioner";
import { BasicView } from "./view";

const tinksiStyles = createStyles({
  header: {
    width: "100%",
    paddingBottom: "1rem",
    fontWeight: 300,
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    alignContent: "space-between",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

function goToStep(n: number) {
  localizedRedirectTo("/tinksi/add/" + n);
}

function redirectOnSuccess(status: IActionResponseWithId) {
  return `/tinksi/view/${status.id}`;
}

interface ITinksiAddProps extends WithStyles<typeof tinksiStyles> {
  match: {
    params: {
      step: string;
    };
  };
}

export const TinksiAdd = withStyles(tinksiStyles)((props: ITinksiAddProps) => {
  const stepInt = parseInt(props.match.params.step, 10) || 1;
  let prevStep = stepInt - 1;
  if (prevStep === 0) {
    prevStep = null;
  }
  let nextStep = stepInt + 1;
  if (nextStep === 7) {
    nextStep = null;
  }

  let content: React.ReactNode = null;
  let elementsToPoke: IPokeElementsType = null;
  if (stepInt === 1) {
    content = (
      <>
        <div className={props.classes.header}>
          <Typography variant="h4">
            <I18nRead id="basic_info" capitalize={true} />
          </Typography>
        </div>
        <Entry id="status" />
        <Entry id="date_sold" />
      </>
    );
    elementsToPoke = {
      properties: ["status", "date_sold"],
      includes: [],
      policies: [],
    };
  } else if (stepInt === 2) {
    content = (
      <>
        <div className={props.classes.header}>
          <Typography variant="h4">
            <I18nRead id="client_details" capitalize={true} />
          </Typography>
        </div>
        <Entry id="customer" />
        <Entry id="customer_name" />
        <Entry id="customer_company" />
        <Entry id="customer_address" />
        <Entry id="customer_email" />
        <Entry id="customer_phone" />
      </>
    );
    elementsToPoke = {
      properties: ["customer", "customer_name", "customer_company", "customer_address", "customer_email", "customer_phone"],
      includes: [],
      policies: [],
    };
  } else if (stepInt === 3) {
    content = (
      <>
        <div className={props.classes.header}>
          <Typography variant="h4">
            <I18nRead id="shipment_details" capitalize={true} />
          </Typography>
        </div>
        <Entry id="activation_date" />
        <Entry id="shipment_date" />
        <Entry id="brand" />
        <Entry id="model" />
      </>
    );
    elementsToPoke = {
      properties: ["activation_date", "shipment_date", "brand", "model"],
      includes: [],
      policies: [],
    };
  } else if (stepInt === 4) {
    content = (
      <>
        <div className={props.classes.header}>
          <Typography variant="h4">
            <I18nRead id="sensor_details" capitalize={true} />
          </Typography>
        </div>
        <Entry id="serial_number" />
        <Entry id="dev_eui" />
        <Entry id="app_eui" />
        <Entry id="app_key" />
        <Entry id="abp_otaa" />
        <Entry id="nwk_skey" />
        <Entry id="app_skey" />
        <Entry id="dev_addrr" />
      </>
    );
    elementsToPoke = {
      properties: ["serial_number", "dev_eui", "app_eui", "app_key", "abp_otaa", "nwk_skey", "app_skey", "dev_addrr"],
      includes: [],
      policies: [],
    };
  } else if (stepInt === 5) {
    content = (
      <>
        <div className={props.classes.header}>
          <Typography variant="h4">
            <I18nRead id="additional_info" capitalize={true} />
          </Typography>
        </div>
        <Entry id="info" />
      </>
    );
    elementsToPoke = {
      properties: ["info", "attachments"],
      includes: [],
      policies: [],
    };
  } else if (stepInt === 6) {
    content = (
      <>
        <div className={props.classes.header}>
          <Typography variant="h4">
            <I18nRead id="submit_title" capitalize={true} />
          </Typography>
        </div>
        <BasicView/>
      </>
    );
  }
  return (
    <>
      <ItemDefinitionProvider
        itemDefinition="tinksi"
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
        {content}

        <div className={props.classes.buttonContainer}>
          {prevStep ? <Button color="secondary" onClick={goToStep.bind(null, prevStep)}>
            <I18nRead id="prev" />
          </Button> : <div/>}
          {nextStep ? (
            <PokeButtonActioner
              onSuccess={goToStep.bind(null, nextStep)}
              elementsToPoke={elementsToPoke}
              unpokeOnSuccess={true}
            >
              {(arg) => (
                <Button color="primary" onClick={arg.onAction}>
                  <I18nRead id="next" />
                </Button>
              )}
            </PokeButtonActioner>
          ) : (
            <SubmitButton
              redirectOnSuccess={redirectOnSuccess}
              i18nId="submit"
              options={{
                properties: [
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
                ],
              }}
            />
          )}
        </div>

        <SubmitActioner>
          {(actioner) => (
            <>
              <Snackbar
                severity="error"
                i18nDisplay={actioner.submitError}
                open={!!actioner.submitError}
                onClose={actioner.dismissError}
              />
            </>
          )}
        </SubmitActioner>
      </ItemDefinitionProvider>
    </>
  );
});
