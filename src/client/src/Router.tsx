import { Routes, Route } from 'react-router-dom';
import { Exams } from './pages/Exams';
import { ExamEdition } from './pages/ExamEdition';
import { StudentsEdition } from './pages/StudentsEdition';
import { StudentAuthentication } from './pages/StudentAuthentication';
import { ExamTaking } from './pages/ExamTaking';
import { ExamResults } from './pages/ExamResults';
import { ExamChecking } from './pages/ExamChecking';
import { TeacherHome } from './pages/TeacherHome';
import { ExamDone } from './pages/ExamDone';
import { AttemptAlreadySubmitted } from './pages/AttemptAlreadySubmitted';
import { AttemptTimeout } from './pages/AttemptTimeout';
import { StudentHome } from './pages/StudentHome';
import { EmptyAttemptCreated } from './pages/EmptyAttemptCreated';
import { authentication } from './lib/authentication';
import { TeacherLogin } from './pages/TeacherLogin';
import { NotFound } from './pages/NotFound';
import { AdminPage } from './components/AdminPage';

function Router() {
    const encodedPassword = authentication.getEncodedPassword();
    return (
        <Routes>
            <Route path={`/teacher/${encodedPassword}/exams`} element={<Exams />} />
            <Route path={`/teacher/${encodedPassword}/students`} element={<StudentsEdition />} />
            <Route
                path={`/teacher/${encodedPassword}/exams/:examId/edit`}
                element={<ExamEdition />}
            />
            <Route
                path={`/teacher/${encodedPassword}/exams/:examId/results`}
                element={
                    <AdminPage>
                        <ExamResults />
                    </AdminPage>
                }
            />
            <Route
                path={`/teacher/${encodedPassword}/exams/:examId/results/:attemptId`}
                element={<ExamChecking />}
            />
            <Route path={`/teacher/${encodedPassword}/`} element={<TeacherHome />} />
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/student/exams/:examId" element={<StudentAuthentication />} />
            <Route path="/student/exams/:examId/students/:studentId" element={<StudentHome />} />
            <Route
                path="/student/students/:studentId/attempts/:attemptId"
                element={<ExamTaking />}
            />
            <Route path="/student/students/:studentId/exam-done" element={<ExamDone />} />
            <Route
                path="/student/attempt-already-submitted"
                element={<AttemptAlreadySubmitted />}
            />
            <Route path="/student/attempt-timeout" element={<AttemptTimeout />} />
            <Route path="/student/empty-attempt-created" element={<EmptyAttemptCreated />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

export { Router };
