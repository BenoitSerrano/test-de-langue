import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import { Loader } from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../lib/pathHandler';

type groupApiType = {
    id: string;
    name: string;
};

function Groups() {
    const query = useQuery<groupApiType[]>({
        queryKey: ['groups'],
        queryFn: api.fetchGroups,
    });
    const navigate = useNavigate();

    if (!query.data) {
        if (query.isLoading) {
            return <Loader />;
        }
        return <div />;
    }

    const groups = query.data;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell width={20}>N°</TableCell>
                    <TableCell width={100}>Actions</TableCell>
                    <TableCell>Nom</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {groups.map((group, index) => (
                    <TableRow key={group.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                            <Tooltip title="Accéder à la liste des questions">
                                <IconButton onClick={buildNavigateToStudents(group.id)}>
                                    <FormatListBulletedIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        <TableCell>{group.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    function buildNavigateToStudents(groupId: string) {
        return () => {
            navigate(pathHandler.getRoutePath('STUDENTS', { groupId }));
        };
    }
}

export { Groups };
