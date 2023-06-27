import { dataSource } from '../../dataSource';
import { Student } from './Student.entity';

export { buildStudentService };

function buildStudentService() {
    const studentService = {
        createStudent,
        patchStudent,
        createStudents,
        getStudentsWithAttempts,
        getStudentId,
    };

    return studentService;

    async function getStudentsWithAttempts() {
        const studentRepository = dataSource.getRepository(Student);
        return studentRepository.find({ relations: ['attempts', 'attempts.exam'] });
    }

    async function getStudentId(email: string) {
        const studentRepository = dataSource.getRepository(Student);
        return studentRepository.findOneOrFail({ where: { email }, select: ['id'] });
    }

    async function createStudent(email: string) {
        const studentRepository = dataSource.getRepository(Student);
        const student = new Student();
        student.email = email;
        return studentRepository.save(student);
    }

    async function createStudents(emails: string[]) {
        const studentRepository = dataSource.getRepository(Student);

        const students = emails.map((email) => {
            const student = new Student();
            student.email = email;
            return student;
        });
        return studentRepository.save(students);
    }

    async function patchStudent(studentId: string, { comment }: { comment: string }) {
        const studentRepository = dataSource.getRepository(Student);

        const result = await studentRepository.update({ id: studentId }, { comment });
        return result.affected == 1;
    }
}
