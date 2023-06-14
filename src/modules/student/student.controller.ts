import { buildStudentService } from './student.service';

export { buildStudentController };

function buildStudentController() {
    const studentService = buildStudentService();
    const studentController = {
        createStudent,
        getStudents,
    };

    return studentController;

    async function createStudent(params: { body: { firstName: string; lastName: string } }) {
        return studentService.createStudent(params.body.firstName, params.body.lastName);
    }

    async function getStudents() {
        return studentService.getStudents();
    }
}
