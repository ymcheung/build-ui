import { RemixBrowser, RemixBrowserProps } from '@remix-run/react';
import { hydrate } from 'react-dom';

function EntryClient(props: RemixBrowserProps) {
  return <RemixBrowser {...props} />
}

hydrate(<EntryClient />, document)
