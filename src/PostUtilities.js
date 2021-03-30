import React, { useState } from "react";
import ShareIcon from "@material-ui/icons/Share";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Modal from "react-awesome-modal";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import "./PostUtilities.css";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

export default function PostUtilities({ismore}) {
  
  const [shareModal, setShareModal] = useState(false);

  return (
    <div className="postUtilities">
      <Modal
        visible={shareModal}
        width="400"
        height="200"
        effect="fadeInUp"
        onClickAway={() => setShareModal(false)}
      >
        <div className="modal">
          <div className="modal__header">
            <h2>Share</h2>
            <IconButton onClick={() => setShareModal(false)}>
              <CancelIcon />
            </IconButton>
          </div>
          <div className="modal__bottom">
            <FacebookShareButton quote={"title"} url={window.location.href}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton quote={"title"} url={window.location.href}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <TwitterShareButton quote={"title"} url={window.location.href}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton quote={"title"} url={window.location.href}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
          </div>
        </div>
      </Modal>
      <div>
        <IconButton>
          <ChatBubbleIcon />
        </IconButton>
        <p>3.3k comments</p>
      </div>
      <div onClick={() => setShareModal(true)}>
        <IconButton>
          <ShareIcon />
        </IconButton>
        <p>3.3k shares</p>
      </div>
      <div>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
        <p>save </p>
      </div>
      {ismore}
    </div>
  );
}
