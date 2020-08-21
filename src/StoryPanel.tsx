import React from 'react';
import { useParameter } from '@storybook/api';
import { styled } from '@storybook/theming';
import {
  SyntaxHighlighter,
  SyntaxHighlighterProps,
} from '@storybook/components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)<SyntaxHighlighterProps>(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));

export const StoryPanel = () => {
  const defaults = {
    language: 'jsx',
    showLineNumbers: true,
    format: false,
    copyable: true,
    padded: true
  };
  const options = useParameter('storysource', [])
    .reduce((acc, option) => {
      if (option.tab && option.sourceLocation) {
        acc.push({ ...defaults, ...option });
      }
      return acc;
    }, []);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [allSource, setAllSource] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const promises = options.map(option => fetchData(option.sourceLocation));
      const data = await Promise.all(promises);
      setAllSource(data);
      setIsLoading(false);
    }
    getData();
  }, [])

  return options.length ? (<Tabs className={['react-tabs', 'preview-tabs']} onSelect={index => {
    setTabIndex(index);
  }} defaultIndex={tabIndex}>
    <TabList>
      {options.map(option => <Tab key={option.tab}>{option.tab}</Tab>)}
    </TabList>
    {options.map(option => {
      return <TabPanel key={option.tab}>
        <StyledSyntaxHighlighter
          language={option.language}
          showLineNumbers={option.showLineNumbers}
          format={option.format}
          copyable={option.copyable}
          padded={option.padded}
        >
          {isLoading ? 'loading source...' : allSource[tabIndex]}
        </StyledSyntaxHighlighter>
      </TabPanel>;
    })}
  </Tabs>) : null;
};

async function fetchData(url: string): Promise<string> {
  try {
    let response = await fetch(url);
    if (response.ok) {
      return await response.text();
    } else {
      return 'Source code not avialable';
    }
  } catch (error) {
    return 'Error occurred while fetching source code';
  }
}