import { config } from '../../config';
import { acceptableAnswerType, questionKindType } from '../../types';
import { localSessionHandler } from '../localSessionHandler';

const api = {
    fetchStudents,
    fetchStudent,
    updateStudentNames,
    fetchStudentByEmailForExam,
    createStudents,
    deleteStudent,
    updateEstablishmentName,
    updateDefaultEdgeText,
    createQuestion,
    createExercise,
    updateExercise,
    deleteExercise,
    updateQuestion,
    addQuestionAcceptableAnswer,
    addQuestionAcceptableAnswerToTexteATrous,
    removeOkAnswer,
    removeOkAnswerFromTexteATrous,
    deleteQuestion,
    duplicateQuestion,
    updateQuestionsOrder,
    updateExercisesOrder,
    createResetPasswordRequest,
    fetchResetPasswordRequestUser,
    resetPassword,
    fetchEstablishmentWithClasses,
    createClasse,
    deleteClasse,
    changeClasse,
    fetchUserExams,
    fetchEstablishments,
    createEstablishment,
    updateClasseName,
    updateEstablishmentId,
    countStudentsByClasse,
};

const BASE_URL = `${config.API_URL}/api`;

async function performApiCall(
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: Object,
) {
    let response: Response;
    const token = localSessionHandler.getToken();

    if (method === 'GET') {
        response = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
    } else {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        });
    }
    if (!response.ok) {
        if (response.status === 401) {
            localSessionHandler.logout();
        }
        let message = response.statusText;
        try {
            message = await response.text();
        } catch (error) {
            console.error(error);
        } finally {
            throw new Error(message);
        }
    }
    return response.json();
}

type classeType = { id: string; name: string };

type establishmentWithClassesType = {
    id: string;
    name: string;
    classes: Array<classeType>;
};

async function fetchEstablishments(): Promise<Array<establishmentWithClassesType>> {
    const URL = `${BASE_URL}/establishments`;
    return performApiCall(URL, 'GET');
}

async function countStudentsByClasse(classeId: string): Promise<{ studentsCount: number }> {
    const URL = `${BASE_URL}/classes/${classeId}/studentsCount`;
    return performApiCall(URL, 'GET');
}

async function createEstablishment(params: {
    name: string;
}): Promise<{ id: string; name: string }> {
    const URL = `${BASE_URL}/establishments`;
    return performApiCall(URL, 'POST', { name: params.name });
}

async function updateEstablishmentId(params: { establishmentId: string; classeId: string }) {
    const URL = `${BASE_URL}/classes/${params.classeId}/establishmentId`;
    return performApiCall(URL, 'PATCH', { establishmentId: params.establishmentId });
}

async function fetchUserExams(userId: string) {
    const URL = `${BASE_URL}/users/${userId}/exams`;
    return performApiCall(URL, 'GET');
}

// TODO: ajouter l'exerciseId pour s'assurer qu'on est pas en train de faire de la merde
async function addQuestionAcceptableAnswer({
    examId,
    questionId,
    acceptableAnswer,
}: {
    examId: string;
    questionId: number;
    acceptableAnswer: acceptableAnswerType;
}) {
    const URL = `${BASE_URL}/exams/${examId}/questions/${questionId}/acceptable-answers`;
    return performApiCall(URL, 'POST', { acceptableAnswer });
}

// TODO: ajouter l'exerciseId pour s'assurer qu'on est pas en train de faire de la merde
async function addQuestionAcceptableAnswerToTexteATrous({
    examId,
    questionId,
    acceptableAnswer,
    blankIndex,
}: {
    examId: string;
    questionId: number;
    acceptableAnswer: acceptableAnswerType;
    blankIndex: number;
}) {
    const URL = `${BASE_URL}/exams/${examId}/questions/${questionId}/tat-acceptable-answers`;
    return performApiCall(URL, 'POST', { acceptableAnswer, blankIndex });
}

// TODO: ajouter l'exerciseId pour s'assurer qu'on est pas en train de faire de la merde
async function removeOkAnswer({
    examId,
    questionId,
    okAnswer,
}: {
    examId: string;
    questionId: number;
    okAnswer: string;
}) {
    const URL = `${BASE_URL}/exams/${examId}/questions/${questionId}/ok-answers`;
    return performApiCall(URL, 'DELETE', { okAnswer });
}

async function removeOkAnswerFromTexteATrous({
    examId,
    questionId,
    okAnswer,
    blankIndex,
}: {
    examId: string;
    questionId: number;
    okAnswer: string;
    blankIndex: number;
}) {
    const URL = `${BASE_URL}/exams/${examId}/questions/${questionId}/tat-ok-answers`;
    return performApiCall(URL, 'DELETE', { okAnswer, blankIndex });
}

async function fetchStudentByEmailForExam(params: { email: string; examId: string }) {
    const URL = `${BASE_URL}/exams/${params.examId}/students/${params.email}`;
    return performApiCall(URL, 'GET');
}

async function deleteStudent(params: { studentId: string; classeId: string }) {
    const URL = `${BASE_URL}/classes/${params.classeId}/students/${params.studentId}`;
    return performApiCall(URL, 'DELETE');
}

async function fetchStudents(params: { classeId: string }) {
    const URL = `${BASE_URL}/classes/${params.classeId}/students`;
    return performApiCall(URL, 'GET');
}

async function fetchStudent(params: { studentId: string }) {
    const URL = `${BASE_URL}/students/${params.studentId}`;
    return performApiCall(URL, 'GET');
}

async function updateStudentNames(params: {
    studentId: string;
    firstName?: string;
    lastName?: string;
}) {
    const URL = `${BASE_URL}/students/${params.studentId}/names`;
    return performApiCall(URL, 'PATCH', { firstName: params.firstName, lastName: params.lastName });
}

async function createStudents(params: { emails: string[]; classeId: string }) {
    const URL = `${BASE_URL}/classes/${params.classeId}/students`;
    return performApiCall(URL, 'POST', { emails: params.emails });
}

async function updateEstablishmentName({
    establishmentId,
    name,
}: {
    establishmentId: string;
    name: string;
}) {
    const URL = `${BASE_URL}/establishments/${establishmentId}/name`;
    return performApiCall(URL, 'PATCH', { name });
}

async function updateClasseName({ classeId, name }: { classeId: string; name: string }) {
    const URL = `${BASE_URL}/classes/${classeId}/name`;
    return performApiCall(URL, 'PATCH', { name });
}

async function updateDefaultEdgeText({ kind, text }: { kind: 'start' | 'end'; text: string }) {
    const URL = `${BASE_URL}/user-configurations`;
    return performApiCall(URL, 'PATCH', { kind, text });
}

async function createExercise(params: {
    examId: string;
    name: string;
    instruction: string;
    defaultPoints: number | null;
    defaultQuestionKind: questionKindType;
    order?: number;
}) {
    const URL = `${BASE_URL}/exams/${params.examId}/exercises`;
    return performApiCall(URL, 'POST', {
        name: params.name,
        instruction: params.instruction,
        defaultPoints: params.defaultPoints,
        defaultQuestionKind: params.defaultQuestionKind,
        order: params.order,
    });
}

async function updateExercise(params: {
    examId: string;
    exerciseId: number;
    name: string;
    instruction: string;
    defaultPoints: number | null;
    defaultQuestionKind: questionKindType;
}) {
    const URL = `${BASE_URL}/exams/${params.examId}/exercises/${params.exerciseId}`;
    return performApiCall(URL, 'PUT', {
        name: params.name,
        instruction: params.instruction,
        defaultPoints: params.defaultPoints,
        defaultQuestionKind: params.defaultQuestionKind,
    });
}

async function deleteExercise(params: { examId: string; exerciseId: number }) {
    const URL = `${BASE_URL}/exams/${params.examId}/exercises/${params.exerciseId}`;
    return performApiCall(URL, 'DELETE');
}

async function createResetPasswordRequest(email: string) {
    const URL = `${BASE_URL}/reset-password-requests`;
    return performApiCall(URL, 'POST', {
        email,
    });
}

async function fetchResetPasswordRequestUser(resetPasswordRequestId: string) {
    const URL = `${BASE_URL}/reset-password-requests/${resetPasswordRequestId}/user`;
    return performApiCall(URL, 'GET');
}

async function resetPassword({
    password,
    resetPasswordRequestId,
}: {
    password: string;
    resetPasswordRequestId: string;
}) {
    const URL = `${BASE_URL}/reset-password-requests/${resetPasswordRequestId}/user/password`;
    return performApiCall(URL, 'PATCH', { password });
}

async function createQuestion(params: {
    examId: string;
    exerciseId: number;
    title: string;
    kind: questionKindType;
    order?: number;
    possibleAnswers: string[];
    acceptableAnswers: acceptableAnswerType[][];
    points: number;
}) {
    const URL = `${BASE_URL}/exams/${params.examId}/exercises/${params.exerciseId}/questions`;
    return performApiCall(URL, 'POST', {
        title: params.title,
        kind: params.kind,
        order: params.order,
        possibleAnswers: params.possibleAnswers,
        acceptableAnswers: params.acceptableAnswers,
        points: params.points,
    });
}

async function updateQuestion(params: {
    examId: string;
    exerciseId: number;
    questionId: number;
    title: string;
    possibleAnswers: string[];
    acceptableAnswers: acceptableAnswerType[][];
    points: number;
}) {
    const URL = `${BASE_URL}/exams/${params.examId}/exercises/${params.exerciseId}/questions/${params.questionId}`;
    return performApiCall(URL, 'PUT', {
        title: params.title,
        possibleAnswers: params.possibleAnswers,
        acceptableAnswers: params.acceptableAnswers,
        points: params.points,
    });
}

async function updateQuestionsOrder(params: {
    examId: string;
    exerciseId: number;
    orderedIds: number[];
}) {
    const URL = `${BASE_URL}/exams/${params.examId}/exercises/${params.exerciseId}/questions/order`;
    return performApiCall(URL, 'PATCH', {
        orderedIds: params.orderedIds,
    });
}

async function deleteQuestion(params: { examId: string; questionId: number }) {
    const URL = `${BASE_URL}/exams/${params.examId}/questions/${params.questionId}`;
    return performApiCall(URL, 'DELETE');
}

async function duplicateQuestion(params: {
    examId: string;
    questionId: number;
    exerciseId: number;
}) {
    const URL = `${BASE_URL}/exams/${params.examId}/exercises/${params.exerciseId}/questions/${params.questionId}/duplicate`;
    return performApiCall(URL, 'POST');
}

async function updateExercisesOrder(params: { examId: string; orderedIds: number[] }) {
    const URL = `${BASE_URL}/exams/${params.examId}/exercises/order`;
    return performApiCall(URL, 'PATCH', {
        orderedIds: params.orderedIds,
    });
}

async function fetchEstablishmentWithClasses(
    establishmentId: string,
): Promise<establishmentWithClassesType> {
    const URL = `${BASE_URL}/establishments/${establishmentId}`;
    return performApiCall(URL, 'GET');
}

async function createClasse(params: {
    name: string;
    establishmentId: string;
}): Promise<classeType> {
    const URL = `${BASE_URL}/establishments/${params.establishmentId}/classes`;
    return performApiCall(URL, 'POST', { name: params.name });
}

async function deleteClasse(params: { classeId: string }) {
    const URL = `${BASE_URL}/classes/${params.classeId}`;
    return performApiCall(URL, 'DELETE');
}

async function changeClasse(params: { classeId: string; studentId: string; newClasseId: string }) {
    const URL = `${BASE_URL}/classes/${params.classeId}/students/${params.studentId}/new-classe/${params.newClasseId}`;
    return performApiCall(URL, 'PATCH');
}

export { api };
export type { establishmentWithClassesType };
