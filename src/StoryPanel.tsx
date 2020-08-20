import React from 'react';
import { useParameter } from '@storybook/api';
import { styled } from '@storybook/theming';
import {
  SyntaxHighlighter,
  SyntaxHighlighterProps,
} from '@storybook/components';

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)<SyntaxHighlighterProps>(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));

export const StoryPanel = () => {

  const story = "import React from 'react';";
  const source = {};
  const options = useParameter("storysource", []);
  return story ? (
    <StyledSyntaxHighlighter
      language="jsx"
      showLineNumbers
      format={false}
      copyable={false}
      padded
    >
      {story}
    </StyledSyntaxHighlighter>
  ) : null;
};
