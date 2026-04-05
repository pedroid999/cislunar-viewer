import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Card } from './index';

describe('ui package', () => {
  it('renders card content', () => {
    const html = renderToStaticMarkup(<Card title="Telemetry">Hello</Card>);
    expect(html).toContain('Telemetry');
    expect(html).toContain('Hello');
  });
});
