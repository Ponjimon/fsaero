import { render } from '@testing-library/react';

import FsaeroUi from './fsaero-ui';

describe('FsaeroUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FsaeroUi />);
    expect(baseElement).toBeTruthy();
  });
});
