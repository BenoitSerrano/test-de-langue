import { ROUTE_KEYS } from './routeKeys';

const ROUTE_TITLES: Record<(typeof ROUTE_KEYS)[number], string> = {
    EXAM_TAKING: 'Examen en cours',
    STUDENT_AUTHENTICATION_EXAM_TAKING_SHORTENED: 'Connexion étudiant',
    STUDENT_HOME: 'Accueil étudiant',
    STUDENT_REGISTRATION: 'Formulaire inscription étudiant',
    STUDENT_AUTHENTICATION: 'Connexion étudiant',
    RESET_PASSWORD_FAILURE: 'Échec de réinitialisation du mot de passe',
    RESET_PASSWORD_SUCCESS: 'Mot de passe réinitialisé',
    RESET_PASSWORD_REQUESTED: 'Demande de réinitialisation de mot de passe envoyée',
    RESET_PASSWORD: 'Réinitialisation mot de passe',
    REQUEST_RESET_PASSWORD: 'Demande de réinitialisation de mot de passe',
    SIGN_IN: 'Connexion',
    SIGN_UP: 'Inscription',
    HOME: 'Accueil',
    EXAM_CONSULTING: 'Consultation de copie',
    EXAM_DONE: 'Examen terminé',
    EXAM_LIST: 'Examens',
    EXAM_LIST_ALL: 'Examens',
    STUDENTS: 'Étudiants',
    EXAM_PREVIEWING: "Prévisualisation d'examen",
    EXAM_EDITING_CONTENT: "Édition de l'examen",
    EXAM_PARAMETERS: "Paramètres de l'examen",
    EXAM_ATTEMPT_COLLECT: "Collecte des réponses de l'examen",
    EXAM_RESULTS: "Résultats de l'examen",
    EXAM_CONSULT: "Paramètres de consultation des copies de l'examen",
    EXAM_CHECKING: 'Correction de copie',
    TEACHER_HOME: 'Accueil professeur',
    CLASSES: 'Classes',
    ATTEMPT_NOT_CORRECTED: 'Erreur - copie non corrigée',
    NOT_FOUND: 'Page non trouvée',
    ADMIN_DASHBOARD: "Tableau d'administration",
    ADMIN_TEACHER_EXAMS: 'Examens',
};

export { ROUTE_TITLES };
