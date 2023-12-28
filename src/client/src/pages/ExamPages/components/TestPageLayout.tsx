import { Typography, styled } from '@mui/material';

function TestPageLayout(props: {
    title: string;
    subtitle?: string;
    studentEmail: string;
    result?: string;
    children: JSX.Element[] | JSX.Element;
    centerButtons?: JSX.Element[];
    rightButtons?: JSX.Element[];
}) {
    const shouldDisplayFooter = !!props.centerButtons;
    return (
        <Container>
            <TitleContainer>
                <Typography style={{ textAlign: 'center' }} variant="h2">
                    {props.title}
                </Typography>
                {!!props.subtitle && (
                    <Typography style={{ fontStyle: 'italic' }} variant="h5">
                        {props.subtitle}
                    </Typography>
                )}
            </TitleContainer>
            <StudentInfoContainer>
                <StudentEmail>Adresse e-mail : {props.studentEmail}</StudentEmail>
                {!!props.result && <Typography variant="caption">{props.result}</Typography>}
            </StudentInfoContainer>
            {props.children}
            {shouldDisplayFooter && (
                <FooterContainer>
                    <LeftFooterPart />
                    <CenterFooterPart>{props.centerButtons}</CenterFooterPart>
                    <RightFooterPart>{props.rightButtons}</RightFooterPart>
                </FooterContainer>
            )}
        </Container>
    );
}

const FOOTER_HEIGHT = 50;

const FooterContainer = styled('div')({
    display: 'flex',
    height: FOOTER_HEIGHT,
    position: 'fixed',
    width: '100%',
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
});

const CenterFooterPart = styled('div')({
    height: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const RightFooterPart = styled('div')({
    height: '100%',
    flex: 1,
    paddingRight: 10,
    display: 'flex',

    justifyContent: 'flex-end',
    alignItems: 'center',
});

const LeftFooterPart = styled('div')({
    height: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const StudentInfoContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const StudentEmail = styled(Typography)(({ theme }) => ({
    fontStyle: 'italic',
}));

const TitleContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
}));

const Container = styled('div')(({ theme }) => ({
    width: '60%',
    marginBottom: FOOTER_HEIGHT,
    borderRadius: 2,
    border: `solid ${theme.palette.common.black} 1px`,
    boxShadow: theme.shadows[4],
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
}));

export { TestPageLayout };
