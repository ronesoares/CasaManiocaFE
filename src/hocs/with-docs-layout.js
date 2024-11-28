import { DocsLayout } from '../components/docs/docs-layout';

export const withDocsLayout = (Component) => (props) => (
  <DocsLayout>
    <Component {...props} />
  </DocsLayout>
);
