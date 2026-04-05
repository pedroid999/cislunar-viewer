import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../components/scene-view', () => ({
  SceneView: () => <div data-testid="scene-view">Scene</div>
}));

import Page from './page';

describe('web app', () => {
  it('renders the main mission heading', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { name: /Crewed lunar flyby replay \+ live state/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Telemetry/i })).toBeTruthy();
  });
});
