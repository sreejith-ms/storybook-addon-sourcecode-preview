import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

import { StoryPanel } from './StoryPanel';
import { ADDON_ID, PANEL_ID } from '.';

export function register() {
  addons.register(ADDON_ID, (api) => {
    addons.addPanel(PANEL_ID, {
      title: 'Story source preview',
      type: types.PANEL,
      render: ({ active, key }) => (
        <AddonPanel active={active} key={key}>
          <StoryPanel />
        </AddonPanel>
      ),
      paramKey: 'storysource',
    });
  });
}
