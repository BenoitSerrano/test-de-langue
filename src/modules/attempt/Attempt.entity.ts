import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { AttemptInterface } from './attempt.interface';
import { Exam } from '../exam';
import { StudentInterface } from '../student/student.interface';
import { User } from '../user';

@Entity()
@Unique('One student has one shot for an exam', ['student', 'exam'])
export class Attempt implements AttemptInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamptz' })
    startedAt: string;

    @Column({ type: 'timestamptz', nullable: true })
    updatedAt: string;

    @ManyToOne('Student', { onDelete: 'CASCADE', nullable: false })
    student: StudentInterface;

    @ManyToOne(() => Exam, { onDelete: 'CASCADE', nullable: false })
    exam: Exam;

    @Column({ default: 0 })
    roundTrips: number;

    @Column({ default: 0 })
    timeSpentOutside: number;

    @Column('simple-array', { default: '' })
    answers: string[];

    @Column('simple-array', { default: '' })
    manualMarks: string[];

    @Column({ type: 'timestamptz', nullable: true })
    endedAt: string | null;

    @Column({ type: 'timestamptz', nullable: true })
    correctedAt: string | null;

    @Column({ type: 'timestamptz', nullable: true })
    treatedAt: string | null;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
    user: User;
}
