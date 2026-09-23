import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Header from '@theme-original/BlogPostItem/Header';
import ShareButtons from '@site/src/components/ShareButtons';

export default function HeaderWrapper(props) {
  const {isBlogPostPage} = useBlogPost();
  return (
    <>
      <Header {...props} />
      {isBlogPostPage && <ShareButtons />}
    </>
  );
}
