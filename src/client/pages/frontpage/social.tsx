import React from "react";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";

import {
  withStyles,
  createStyles,
  WithStyles,
  Typography,
  Paper,
  Theme,
  Container,
  IconButton,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
  YouTubeIcon,
  WeChatIcon,
  VKIcon,
} from "@onzag/itemize/client/fast-prototyping/mui-core";

/**
 * provides the styles for the social section
 * @param theme the mui theme
 * @returns a bunch of styles
 */
export const socialStyles = (theme: Theme) => createStyles({
  socialTitle: {
    marginTop: "4rem",
    paddingLeft: "1rem",
    borderLeft: "solid 1rem " + theme.palette.secondary.main,
    fontWeight: 300,
  },
  container: {
    padding: 0,
  },
  paper: {
    borderRadius: 0,
    border: 0,
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  paper2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
    padding: "1rem",
    flexWrap: "wrap",
  },
  button: {
    width: "8rem",
    height: "8rem",
    padding: "2rem",
  },
  icon: {
    fontSize: "4rem",
  },
  facebook: {
    color: "#3b5998",
  },
  youtube: {
    color: "#FF0000",
  },
  instagram: {
    color: "#C13584",
  },
  twitter: {
    color: "#1DA1F2",
  },
  reddit: {
    color: "#FF4500",
  },
  linkedin: {
    color: "#2867B2",
  },
  pinterest: {
    color: "#BD081C",
  },
});

/**
 * The social section provides the buttons and urls for the different social networks that can be
 * used as defined by the developer, these networks are language sensitive and are read
 * from the i18n properties data
 *
 * @param props the social props
 * @returns a react element
 */
export const Social = withStyles(socialStyles)((props: WithStyles<typeof socialStyles>) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <Paper className={props.classes.paper}>
        <Typography variant="h3" className={props.classes.socialTitle}>
          <I18nRead id="social" capitalize={true}/>
        </Typography>
        <Paper className={props.classes.paper2}>
          <I18nRead id="facebook_url">
            {(fbURL: string) => (
              fbURL ? <a href={fbURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <FacebookIcon className={props.classes.icon + " " + props.classes.facebook} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
          <I18nRead id="instagram_url">
            {(instagramURL: string) => (
              instagramURL ? <a href={instagramURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <InstagramIcon className={props.classes.icon + " " + props.classes.instagram} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
          <I18nRead id="linkedin_url">
            {(linkedInURL: string) => (
              linkedInURL ? <a href={linkedInURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <LinkedInIcon className={props.classes.icon + " " + props.classes.linkedin} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
          <I18nRead id="pinterest_url">
            {(pinterestURL: string) => (
              pinterestURL ? <a href={pinterestURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <PinterestIcon className={props.classes.icon + " " + props.classes.pinterest} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
          <I18nRead id="reddit_url">
            {(redditURL: string) => (
              redditURL ? <a href={redditURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <RedditIcon className={props.classes.icon + " " + props.classes.reddit} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
          <I18nRead id="twitter_url">
            {(twitterURL: string) => (
              twitterURL ? <a href={twitterURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <TwitterIcon className={props.classes.icon + " " + props.classes.twitter} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
          <I18nRead id="vk_url">
            {(vkURL: string) => (
              vkURL ? <a href={vkURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <VKIcon className={props.classes.icon} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
          <I18nRead id="wechat_url">
            {(wechatURL: string) => (
              wechatURL ? <a href={wechatURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <WeChatIcon className={props.classes.icon} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
          <I18nRead id="youtube_url">
            {(youtubeURL: string) => (
              youtubeURL ? <a href={youtubeURL} target="_blank">
                <IconButton className={props.classes.button}>
                  <YouTubeIcon className={props.classes.icon + " " + props.classes.youtube} />
                </IconButton>
              </a> : null
            )}
          </I18nRead>
        </Paper>
      </Paper>
    </Container>
  );
});
