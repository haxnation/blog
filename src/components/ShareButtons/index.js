import React, { useState } from 'react';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function legacyCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // The async Clipboard API can stall indefinitely (never resolve or
    // reject) when the browser's permission state is unsettled, so race
    // it against a short timeout and fall back to the older, synchronous
    // execCommand approach rather than leaving the UI stuck.
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('clipboard-timeout')), 1000),
    );
    try {
      await Promise.race([navigator.clipboard.writeText(text), timeout]);
      return;
    } catch (err) {
      // Fall through to the legacy fallback below
    }
  }
  legacyCopy(text);
}

export default function ShareButtons() {
  const { metadata } = useBlogPost();
  const { siteConfig } = useDocusaurusContext();
  const [copied, setCopied] = useState(false);

  const url = siteConfig.url.replace(/\/$/, '') + metadata.permalink;
  const { title, description } = metadata;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
        return;
      } catch (err) {
        // User cancelled the native share sheet — no fallback needed
        if (err && err.name === 'AbortError') return;
      }
    }
    // No native share support — fall back to copying the link
    await handleCopy();
  };

  const handleCopy = async () => {
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="hax-share-row">
      <span className="hax-share-label">// SHARE</span>
      <button
        type="button"
        className="hax-share-btn"
        onClick={handleShare}
        title="Share this post">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 1 0-3-3c0 .24.04.47.09.7L7.04 9.81A3 3 0 1 0 4 14.81c.76 0 1.44-.3 1.96-.77l7.13 4.15c-.05.21-.09.42-.09.65a2.92 2.92 0 1 0 5.84 0 2.92 2.92 0 0 0-2.92-2.92Z"
          />
        </svg>
        <span>Share</span>
      </button>
      <button
        type="button"
        className="hax-share-btn"
        onClick={handleCopy}
        title="Copy link to this post">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            fill="currentColor"
            d="M3.9 12a5 5 0 0 1 5-5H12v2H8.9a3 3 0 0 0 0 6H12v2H8.9a5 5 0 0 1-5-5Zm7.1 1v-2h6v2h-6Zm2-6h3.1a5 5 0 0 1 0 10H13v-2h3.1a3 3 0 0 0 0-6H13V7Z"
          />
        </svg>
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}
