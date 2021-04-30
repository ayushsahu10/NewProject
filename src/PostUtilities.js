import React, { useState, useEffect } from "react";
import ShareIcon from "@material-ui/icons/Share";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Modal from "react-awesome-modal";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import "./PostUtilities.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';


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


const SharePost = ({shareModal,setShareModal,url,alert}) => {

  const [copied, setCopied] = useState(false)

  const setCopiedTrue = () => {
    setCopied(true);
    alert("success","URL Copied")
    setShareModal(false)
  }


   return <Modal
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
       <FacebookShareButton quote={"title"} url={url}>
         <FacebookIcon size={32} round={true} />
       </FacebookShareButton>
       <WhatsappShareButton quote={"title"} url={url}>
         <WhatsappIcon size={32} round={true} />
       </WhatsappShareButton>
       <TwitterShareButton quote={"title"} url={url}>
         <TwitterIcon size={32} round={true} />
       </TwitterShareButton>
       <LinkedinShareButton quote={"title"} url={url}>
         <LinkedinIcon size={32} round={true} />
       </LinkedinShareButton>
       <CopyToClipboard text={url}
          onCopy={() => setCopiedTrue()}>
          <IconButton>
          <FileCopyIcon />
          </IconButton>
        </CopyToClipboard>
     </div>
   </div>
 </Modal>
}

export default function PostUtilities({ismore,savedPosts,cmtLength,savePost,alert}) {
  
  const [shareModal, setShareModal] = useState(false);
  
  useEffect(() => {
    console.log(savedPosts);
  }, [])

  return (
    <div className="postUtilities">
      <SharePost shareModal={shareModal}  alert={alert} setShareModal={setShareModal}  url={window.location.href} />
      <div>
        <IconButton>
          <ChatBubbleIcon />
        </IconButton>
        <p>{`${cmtLength}  `}comments</p>
      </div>
      <div onClick={() => setShareModal(true)}>
        <IconButton>
          <ShareIcon />
        </IconButton>
        <p>share</p>
      </div>
      <div>
        <IconButton onClick={savePost} >
          <BookmarkBorderIcon />
        </IconButton>
        <p>save </p>
      </div>
      {ismore}
    </div>
  );
}

export {SharePost};