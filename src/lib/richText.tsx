import { ReactNode } from 'react';

export const richTags = {
  highlight: (chunks: ReactNode) => (
    <span className="highlight">{chunks}</span>
  ),
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  br: () => <br />,
};
