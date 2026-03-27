import React from 'react';

import {
  FacebookShareButton,
  
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
 
  WhatsappIcon,
  LinkedinIcon,
} from 'react-share';
import { Button, ButtonGroup } from 'react-bootstrap';
import './SocialShare.css';

const SocialShare = ({ title, text, url }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out my fitness progress!';
  const shareText = text || 'I just achieved a new milestone on FitnessTrackApp!';

  return (
    <div className="social-share-container">
      <h6 className="mb-3">Share Your Achievement</h6>
      <ButtonGroup>
        <FacebookShareButton url={shareUrl} quote={shareTitle} hashtag="#FitnessTracker">
          <Button variant="primary" size="sm" className="social-btn">
            <FacebookIcon size={20} round /> Facebook
          </Button>
        </FacebookShareButton>

       

        <WhatsappShareButton url={shareUrl} title={shareText} separator=" - ">
          <Button variant="success" size="sm" className="social-btn">
            <WhatsappIcon size={20} round /> WhatsApp
          </Button>
        </WhatsappShareButton>

        <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareText}>
          <Button variant="secondary" size="sm" className="social-btn">
            <LinkedinIcon size={20} round /> LinkedIn
          </Button>
        </LinkedinShareButton>
      </ButtonGroup>
    </div>
  );
};

export default SocialShare;