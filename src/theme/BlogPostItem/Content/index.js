import React from 'react';
import Content from '@theme-original/BlogPostItem/Content';
import ShareButtons from '@site/src/components/ShareButtons';

export default function ContentWrapper(props) {
  return (
    <>
      <Content {...props} />
      <ShareButtons />
    </>
  );
}
