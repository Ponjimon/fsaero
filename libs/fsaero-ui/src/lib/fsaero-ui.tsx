import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FsaeroUiProps {}

const StyledFsaeroUi = styled.div`
  color: pink;
`;

export function FsaeroUi(props: FsaeroUiProps) {
  return (
    <StyledFsaeroUi>
      <h1>Welcome to FsaeroUi!</h1>
    </StyledFsaeroUi>
  );
}

export default FsaeroUi;
