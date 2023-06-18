import { buildStudentService } from './student.service';

export { buildStudentController };

function buildStudentController() {
    const studentService = buildStudentService();
    const studentController = {
        createStudent,
        createStudents,
        getStudentsWithAttempts,
        getStudentId,
    };

    return studentController;

    async function createStudent(params: { body: { email: string } }) {
        return studentService.createStudent(params.body.email);
    }

    async function createStudents(params: { body: { emails: string[] } }) {
        return studentService.createStudents(params.body.emails);
    }

    async function getStudentsWithAttempts() {
        return studentService.getStudentsWithAttempts();
    }

    async function getStudentId(params: { urlParams: { email: string } }) {
        return studentService.getStudentId(params.urlParams.email);
    }
}
