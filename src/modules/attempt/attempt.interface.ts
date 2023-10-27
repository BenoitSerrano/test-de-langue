import { Exam } from '../exam';

export interface AttemptInterface {
    id: string;

    startedAt: string;

    updatedAt: string;

    exam: Exam;

    roundTrips: number;

    timeSpentOutside: number;

    answers: string[];

    marks: string[];

    endedAt?: string;
}
