import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { QuestionChoixMultiple } from '../questionChoixMultiple';
import { Attempt } from '../attempt';

@Entity()
@Unique('One answer corresponds to one question and one attempt', [
    'questionChoixMultiple',
    'attempt',
])
export class QcmAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    choice: number;

    @ManyToOne(() => QuestionChoixMultiple)
    questionChoixMultiple: QuestionChoixMultiple;

    @ManyToOne(() => Attempt)
    attempt: Attempt;
}
