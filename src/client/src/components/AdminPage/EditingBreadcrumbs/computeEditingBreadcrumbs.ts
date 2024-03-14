import { pathHandler } from '../../../lib/pathHandler';
import { breadcrumbItemType } from '../types';

const EDITING_EXAM_ROUTE_KEYS = [
    'EXAM_EDITING_CONTENT',
    'EXAM_EDITING_PARAMETERS',
    'EXAM_EDITING_COLLECT',
    'EXAM_EDITING_RESULTS',
] as const;

const editingExamLabelMapping: Record<(typeof EDITING_EXAM_ROUTE_KEYS)[number], string> = {
    EXAM_EDITING_CONTENT: 'Examen',
    EXAM_EDITING_PARAMETERS: 'Paramètres',
    EXAM_EDITING_COLLECT: 'Collecte des réponses',
    EXAM_EDITING_RESULTS: 'Résultats',
};

function computeEditingBreadcrumbs(currentPath: string): Array<breadcrumbItemType> {
    const parsedPath = pathHandler.parsePath(currentPath);
    if (!parsedPath) {
        return [];
    }
    if (!EDITING_EXAM_ROUTE_KEYS.includes(parsedPath.routeKey as any)) {
        return [];
    }
    return EDITING_EXAM_ROUTE_KEYS.map((EDITING_EXAM_ROUTE_KEY) => ({
        label: editingExamLabelMapping[EDITING_EXAM_ROUTE_KEY],
        isActive: EDITING_EXAM_ROUTE_KEY === parsedPath.routeKey,
    }));
}

export { computeEditingBreadcrumbs };
