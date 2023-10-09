import React, { useEffect } from "react";
import { UPLOAD_URL } from "../../config/constants";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";

//import default avatar
import { memo } from 'react'

function videoPlayer({ data }) {

  console.log("<<<<>>>>>",data)
  document.getElementsByClassName('tuby-poster')[0]?.setAttribute("alt", data?.title)
  return (
    <Player
      pictureInPicture={true}
      keyboardShortcut={{
        pause: true,
        forward: true,
        rewind: true,
        fullScreen: true,
        mute: true,
      }}
      src={[
        {
          quality: "Full HD",
          url: UPLOAD_URL + data?.fileUrl,
        },
      ]}
      
      poster={UPLOAD_URL + data?.image}

    >
      {(ref, { onPlay, ...others }) => (
        <video
          ref={ref}
          {...others}
          onPlay={(e) => {
            // The library original event
            onPlay && onPlay(e);
          }}
        />
      )}
    </Player>
  );
}

export default memo(videoPlayer)