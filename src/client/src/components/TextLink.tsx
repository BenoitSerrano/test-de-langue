import { styled, Typography } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';

function TextLink(props: {
    to: string;
    label: string;
    opensNewTab?: boolean;
    onClick?: () => void;
}) {
    const target = props.opensNewTab ? '_blank' : undefined;

    return (
        <StyledLink target={target} to={props.to} onClick={props.onClick}>
            <Typography>{props.label}</Typography>
        </StyledLink>
    );
}

export { TextLink };

const StyledLink = styled(ReactRouterLink)(({ theme }) => ({
    color: theme.palette.common.black,
    display: 'block',
    textDecoration: 'none',
    padding: theme.spacing(1),
    '&:hover': {
        textDecoration: 'underline',
    },
}));
