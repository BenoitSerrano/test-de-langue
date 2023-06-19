import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { Student } from '../student/Student.entity';
import { Exam } from '../exam';
import { QcmAnswer } from '../qcmAnswer';

@Entity()
@Unique('One student has one shot for an exam', ['student', 'exam'])
export class Attempt {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamptz' })
    startedAt: number;

    @Column({ type: 'timestamptz', nullable: true })
    endedAt: number;

    @ManyToOne(() => Student)
    student: Student;

    @ManyToOne(() => Exam)
    exam: Exam;

    @OneToMany(() => QcmAnswer, (qcmAnswer) => qcmAnswer.attempt)
    qcmAnswers: QcmAnswer[];
}
