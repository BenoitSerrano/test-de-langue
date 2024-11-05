import { Attempt } from '../modules/attempt';
import { Exam } from '../modules/exam';
import { Classe } from '../modules/classe';
import { Student } from '../modules/student';
import { User } from '../modules/user';
import { UserConfiguration } from '../modules/userConfiguration';

const api = {
    fetchAllExams,
    fetchAllAttempts,
    fetchAllStudents,
    fetchAllClasses,
    fetchAllUsers,
    fetchAllUserConfigurations,
};

async function fetchAllExams(): Promise<Exam[]> {
    const URL = `https://tactic-app.fr/api/all-exams`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllUsers(): Promise<User[]> {
    const URL = `https://tactic-app.fr/api/all-users`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllUserConfigurations(): Promise<UserConfiguration[]> {
    const URL = `https://tactic-app.fr/api/all-user-configurations`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllStudents(): Promise<Student[]> {
    const URL = `https://tactic-app.fr/api/all-students`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllClasses(): Promise<Classe[]> {
    const URL = `https://tactic-app.fr/api/all-classes`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

async function fetchAllAttempts(): Promise<Attempt[]> {
    const URL = `https://tactic-app.fr/api/all-attempts`;

    const response = await fetch(URL);
    const parsedData = await response.json();
    return parsedData;
}

export { api };
