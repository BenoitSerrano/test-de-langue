import { ExamDone } from '../pages/ExamDone';
import { ExamChecking } from '../pages/ExamPages/ExamChecking';
import { ExamConsulting } from '../pages/ExamPages/ExamConsulting';
import { ExamPreviewing } from '../pages/ExamPages/ExamPreviewing';
import { ExamTaking } from '../pages/ExamPages/ExamTaking';
import { ExamResults } from '../pages/ExamResults';
import { Home } from '../pages/Home';
import { RequestResetPassword } from '../pages/RequestResetPassword';
import { ResetPassword } from '../pages/ResetPassword';
import { ResetPasswordFailure } from '../pages/ResetPasswordFailure';
import { ResetPasswordRequested } from '../pages/ResetPasswordRequested';
import { ResetPasswordSuccess } from '../pages/ResetPasswordSuccess';
import { SignIn } from '../pages/SignIn';
import { StudentAuthentication } from '../pages/StudentAuthentication';
import { StudentHome } from '../pages/StudentHome';
import { Students } from '../pages/StudentsPages/Students';
import { ROUTE_KEYS } from './routeKeys';
import { ExamEditingContent } from '../pages/ExamPages/ExamEditingContent';
import { AttemptNotCorrected } from '../pages/AttemptNotCorrected';
import { ExamParameters } from '../pages/ExamParameters';
import { ExamCollect } from '../pages/ExamCollect';
import { ExamConsult } from '../pages/ExamConsult';
import { StudentRegistration } from '../pages/StudentRegistration';
import { NotFound } from '../pages/NotFound';
import { StudentAuthenticationExamTakingRedirection } from '../pages/StudentAuthenticationExamTakingRedirection';
import { AdminDashboard } from '../pages/AdminDashboard';
import { AdminTeacherExams } from '../pages/AdminTeacherExams';
import { userRoleType } from '../constants';
import { TeacherHome } from '../pages/TeacherHome';
import { Establishment } from '../pages/Establishment';
import { Classe } from '../pages/Classe';
import { Onboarding } from '../pages/Onboarding';
import { usersApi } from '../lib/api/usersApi';
import { Privacy } from '../pages/Privacy';
import { TermsAndConditions } from '../pages/TermsAndConditions';
import { FAQ } from '../pages/FAQ';

const ROUTE_ELEMENTS: Record<
    (typeof ROUTE_KEYS)[number],
    { element: JSX.Element; authorizedRole?: userRoleType }
> = {
    PRIVACY: { element: <Privacy /> },
    TERMS_AND_CONDITIONS: { element: <TermsAndConditions /> },
    FAQ: { element: <FAQ /> },
    EXAM_TAKING: {
        element: <ExamTaking />,
    },
    EXAM_EDITING_CONTENT: {
        authorizedRole: 'teacher',
        element: <ExamEditingContent />,
    },
    EXAM_PARAMETERS: {
        authorizedRole: 'teacher',
        element: <ExamParameters />,
    },
    EXAM_ATTEMPT_COLLECT: {
        authorizedRole: 'teacher',
        element: <ExamCollect />,
    },
    EXAM_RESULTS: {
        authorizedRole: 'teacher',
        element: <ExamResults />,
    },
    EXAM_CONSULT: {
        authorizedRole: 'teacher',
        element: <ExamConsult />,
    },
    STUDENT_HOME: {
        element: <StudentHome />,
    },
    STUDENT_AUTHENTICATION: {
        element: <StudentAuthentication />,
    },
    STUDENT_REGISTRATION: {
        element: <StudentRegistration />,
    },
    RESET_PASSWORD_FAILURE: {
        element: <ResetPasswordFailure />,
    },
    RESET_PASSWORD_SUCCESS: {
        element: <ResetPasswordSuccess />,
    },
    RESET_PASSWORD_REQUESTED: {
        element: <ResetPasswordRequested />,
    },
    RESET_PASSWORD: {
        element: <ResetPassword />,
    },
    REQUEST_RESET_PASSWORD: {
        element: <RequestResetPassword />,
    },
    SIGN_IN: {
        element: (
            <SignIn shouldDisplayResetPasswordLink apiCall={usersApi.login} title="Se connecter" />
        ),
    },
    SIGN_UP: {
        element: <SignIn apiCall={usersApi.createUser} title="Créer un compte" />,
    },
    HOME: {
        element: <Home />,
    },
    EXAM_CONSULTING: {
        element: <ExamConsulting />,
    },
    EXAM_DONE: {
        element: <ExamDone />,
    },
    CLASSE: {
        authorizedRole: 'teacher',
        element: <Classe />,
    },
    STUDENTS: { authorizedRole: 'teacher', element: <Students /> },
    EXAM_PREVIEWING: {
        authorizedRole: 'teacher',
        element: <ExamPreviewing />,
    },
    EXAM_CHECKING: {
        authorizedRole: 'teacher',

        element: <ExamChecking />,
    },
    TEACHER_HOME: {
        authorizedRole: 'teacher',
        element: <TeacherHome />,
    },
    ESTABLISHMENT: { authorizedRole: 'teacher', element: <Establishment /> },
    ATTEMPT_NOT_CORRECTED: { element: <AttemptNotCorrected /> },
    STUDENT_AUTHENTICATION_EXAM_TAKING_SHORTENED: {
        element: <StudentAuthenticationExamTakingRedirection />,
    },
    NOT_FOUND: { element: <NotFound /> },
    ADMIN_DASHBOARD: { element: <AdminDashboard />, authorizedRole: 'admin' },
    ADMIN_TEACHER_EXAMS: { element: <AdminTeacherExams />, authorizedRole: 'admin' },
    ONBOARDING: { element: <Onboarding />, authorizedRole: 'teacher' },
};

export { ROUTE_ELEMENTS };
