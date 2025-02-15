import { styled } from '@mui/material';
import { HEADER_HEIGHT } from '../constants';

function Header(props: {
    LeftContent: React.ReactNode;
    MiddleContent?: React.ReactNode;
    buttons: Array<React.ReactNode>;
}) {
    return (
        <FixedContainer>
            <ContentContainer>
                <LeftContainer>{props.LeftContent}</LeftContainer>

                {!!props.MiddleContent && <MiddleContainer>{props.MiddleContent}</MiddleContainer>}

                <ButtonsContainer>
                    {props.buttons.map((button, index) => (
                        <ButtonContainer key={`button-${index}`}>{button}</ButtonContainer>
                    ))}
                </ButtonsContainer>
            </ContentContainer>
        </FixedContainer>
    );
}

const FixedContainer = styled('div')(({ theme }) => ({
    height: HEADER_HEIGHT,
    backgroundColor: 'white',
    top: 0,
    position: 'fixed',
    width: '100vw',
    zIndex: 2,
    borderBottom: `${theme.palette.divider} 1px solid`,
}));

const ContentContainer = styled('div')(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
}));
const MiddleContainer = styled('div')({ display: 'flex', flex: 1 });
const LeftContainer = styled('div')({ display: 'flex' });

const ButtonsContainer = styled('div')({ display: 'flex', alignItems: 'center' });
const ButtonContainer = styled('div')(({ theme }) => ({
    marginLeft: theme.spacing(3),
}));

export { Header };
