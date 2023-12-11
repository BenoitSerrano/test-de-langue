import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { questionKindType, questionKinds } from './types';
import { Exercise } from '../exercise';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('enum', { enum: questionKinds })
    kind: questionKindType;

    @Column()
    title: string;

    @Column('float')
    points: number;

    @Column('simple-array', { default: '' })
    acceptableAnswers: string[];

    // Format décodé: [2:tu es la plus belle, 1.5:es-tu la plus belle]
    @Column('simple-array', { default: '' })
    acceptableAnswersWithPoints: string[];

    @Column('simple-array', { default: '' })
    rightAnswers: string[];

    @Column('int')
    order: number;

    @Column('simple-array', { default: '' })
    possibleAnswers: string[];

    @ManyToOne(() => Exercise, { onDelete: 'CASCADE', nullable: false })
    exercise: Exercise;
}
