import { computeDisplayedAnswer } from './computeDisplayedAnswer';

describe('computeDisplayedAnswer', () => {
    describe('questionTrou', () => {
        it('should return the completed title with "" if no answer', () => {
            const question = {
                id: 2,
                title: "Croyez-vous que John soit à l'origine de ces lettres anonymes ?",
                kind: 'questionTrou' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [{ points: 2, answer: 'Non, pas vraiment' }],
                answer: '',
                mark: 2,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'wrong');

            expect(displayedAnswer).toEqual({
                title: [
                    {
                        kind: 'text',
                        value: "Croyez-vous que John soit à l'origine de ces lettres anonymes ?",
                    },
                ],
                answer: [{ kind: 'coloredText', value: '', status: 'wrong' }],
            });
        });
        it('should return the completed title with color', () => {
            const question = {
                id: 2,
                title: "Croyez-vous que John soit à l'origine de ces lettres anonymes ?",
                kind: 'questionTrou' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [{ points: 2, answer: 'Oui !' }],
                acceptableAnswers: [],
                answer: 'Oui !',
                mark: 2,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'right');

            expect(displayedAnswer).toEqual({
                title: [
                    {
                        kind: 'text',
                        value: "Croyez-vous que John soit à l'origine de ces lettres anonymes ?",
                    },
                ],
                answer: [{ kind: 'coloredText', value: 'Oui !', status: 'right' }],
            });
        });
    });

    describe('texteATrous', () => {
        it('should return the title if answers empty', () => {
            const question = {
                id: 2,
                title: 'Portez-vous .... vêtements décontractés pour aller au travail ? Chez .... personne, vous remarquez en premier : .... yeux, .... silhouette, .... sourire?',
                kind: 'texteATrous' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [
                    { points: 0.4, answer: 'des' },
                    { points: 0.4, answer: 'une' },
                    { points: 0.4, answer: 'ses' },
                    { points: 0.4, answer: 'sa' },
                    { points: 0.4, answer: 'son' },
                ],
                answer: '',
                mark: 2,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'wrong');

            expect(displayedAnswer).toEqual({
                title: [
                    { kind: 'text', value: 'Portez-vous' },
                    { kind: 'coloredText', value: '....', status: 'wrong' },
                    { kind: 'text', value: 'vêtements décontractés pour aller au travail ? Chez' },
                    { kind: 'coloredText', value: '....', status: 'wrong' },
                    { kind: 'text', value: 'personne, vous remarquez en premier :' },
                    { kind: 'coloredText', value: '....', status: 'wrong' },
                    { kind: 'text', value: 'yeux,' },
                    { kind: 'coloredText', value: '....', status: 'wrong' },
                    { kind: 'text', value: 'silhouette,' },
                    { kind: 'coloredText', value: '....', status: 'wrong' },
                    { kind: 'text', value: 'sourire?' },
                ],
                answer: undefined,
            });
        });

        it('should return the title with color for right answers', () => {
            const question = {
                id: 2,
                title: 'Portez-vous .... vêtements décontractés pour aller au travail ? Chez .... personne, vous remarquez en premier : .... yeux, .... silhouette, .... sourire?',
                kind: 'texteATrous' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [
                    { points: 0.4, answer: 'des' },
                    { points: 0.4, answer: 'une' },
                    { points: 0.4, answer: 'ses' },
                    { points: 0.4, answer: 'sa' },
                    { points: 0.4, answer: 'son' },
                ],
                answer: 'des|une|ses|sa|son',
                mark: 2,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'wrong');

            expect(displayedAnswer).toEqual({
                title: [
                    { kind: 'text', value: 'Portez-vous' },
                    { kind: 'coloredText', value: 'des', status: 'right' },
                    { kind: 'text', value: 'vêtements décontractés pour aller au travail ? Chez' },
                    { kind: 'coloredText', value: 'une', status: 'right' },
                    { kind: 'text', value: 'personne, vous remarquez en premier :' },
                    { kind: 'coloredText', value: 'ses', status: 'right' },
                    { kind: 'text', value: 'yeux,' },
                    { kind: 'coloredText', value: 'sa', status: 'right' },
                    { kind: 'text', value: 'silhouette,' },
                    { kind: 'coloredText', value: 'son', status: 'right' },
                    { kind: 'text', value: 'sourire?' },
                ],
                answer: undefined,
            });
        });

        it('should return the title with different color for answers', () => {
            const question = {
                id: 2,
                title: 'Portez-vous .... vêtements décontractés pour aller au travail ? Chez .... personne, vous remarquez en premier : .... yeux, .... silhouette, .... sourire?',
                kind: 'texteATrous' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [
                    { points: 0.4, answer: 'des' },
                    { points: 0.4, answer: 'une' },
                    { points: 0.4, answer: 'ses' },
                    { points: 0.4, answer: 'sa' },
                    { points: 0.4, answer: 'son' },
                ],
                answer: 'des|truc|ses|sa|son',
                mark: 2,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'wrong');

            expect(displayedAnswer).toEqual({
                title: [
                    { kind: 'text', value: 'Portez-vous' },
                    { kind: 'coloredText', value: 'des', status: 'right' },
                    { kind: 'text', value: 'vêtements décontractés pour aller au travail ? Chez' },
                    { kind: 'coloredText', value: 'truc', status: 'wrong' },
                    { kind: 'text', value: 'personne, vous remarquez en premier :' },
                    { kind: 'coloredText', value: 'ses', status: 'right' },
                    { kind: 'text', value: 'yeux,' },
                    { kind: 'coloredText', value: 'sa', status: 'right' },
                    { kind: 'text', value: 'silhouette,' },
                    { kind: 'coloredText', value: 'son', status: 'right' },
                    { kind: 'text', value: 'sourire?' },
                ],
                answer: undefined,
            });
        });

        it('should return the title with several answers not filled', () => {
            const question = {
                id: 2,
                title: 'Portez-vous .... vêtements décontractés pour aller au travail ? Chez .... personne, vous remarquez en premier : .... yeux, .... silhouette, .... sourire?',
                kind: 'texteATrous' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [
                    { points: 0.4, answer: 'des' },
                    { points: 0.4, answer: 'une' },
                    { points: 0.4, answer: 'ses' },
                    { points: 0.4, answer: 'sa' },
                    { points: 0.4, answer: 'son' },
                ],
                answer: 'des||ses|sa|son',
                mark: 2,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'wrong');

            expect(displayedAnswer).toEqual({
                title: [
                    { kind: 'text', value: 'Portez-vous' },
                    { kind: 'coloredText', value: 'des', status: 'right' },
                    { kind: 'text', value: 'vêtements décontractés pour aller au travail ? Chez' },
                    { kind: 'coloredText', value: '....', status: 'wrong' },
                    { kind: 'text', value: 'personne, vous remarquez en premier :' },
                    { kind: 'coloredText', value: 'ses', status: 'right' },
                    { kind: 'text', value: 'yeux,' },
                    { kind: 'coloredText', value: 'sa', status: 'right' },
                    { kind: 'text', value: 'silhouette,' },
                    { kind: 'coloredText', value: 'son', status: 'right' },
                    { kind: 'text', value: 'sourire?' },
                ],
                answer: undefined,
            });
        });
    });

    describe('texteLibre', () => {
        it('should return the title and empty answer if not answer provided', () => {
            const question = {
                id: 2,
                title: 'Texte libre ?',
                kind: 'texteLibre' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [],
                answer: undefined,
                mark: 0,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'wrong');

            expect(displayedAnswer).toEqual({
                title: [{ kind: 'text', value: 'Texte libre ?' }],
                answer: [{ kind: 'coloredText', value: '', status: 'wrong' }],
            });
        });

        it('should return the title and colored answer if answer provided', () => {
            const question = {
                id: 2,
                title: 'Texte libre ?',
                kind: 'texteLibre' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [],
                answer: "Youpi j'ai une assez bonne note",
                mark: 1,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'acceptable');

            expect(displayedAnswer).toEqual({
                title: [{ kind: 'text', value: 'Texte libre ?' }],
                answer: [
                    {
                        kind: 'coloredText',
                        value: "Youpi j'ai une assez bonne note",
                        status: 'acceptable',
                    },
                ],
            });
        });
    });
    describe('phraseMelangee', () => {
        it('should return the title and colored answer if no answer provided', () => {
            const question = {
                id: 2,
                title: 'est la vie belle',
                kind: 'phraseMelangee' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [{ points: 2, answer: 'la vie est belle' }],
                answer: '',
                mark: 0,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'wrong');

            expect(displayedAnswer).toEqual({
                title: [{ kind: 'text', value: 'est la vie belle' }],
                answer: [
                    {
                        kind: 'coloredText',
                        value: '',
                        status: 'wrong',
                    },
                ],
            });
        });
        it('should return the title and colored answer if answer provided', () => {
            const question = {
                id: 2,
                title: 'est la vie belle',
                kind: 'phraseMelangee' as const,
                possibleAnswers: [],
                acceptableAnswersWithPoints: [{ points: 2, answer: 'la vie est belle' }],
                answer: 'la vie est belle',
                mark: 2,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'right');

            expect(displayedAnswer).toEqual({
                title: [{ kind: 'text', value: 'est la vie belle' }],
                answer: [
                    {
                        kind: 'coloredText',
                        value: 'la vie est belle',
                        status: 'right',
                    },
                ],
            });
        });
    });
    describe('qcm', () => {
        it('should return the title and colored answer if no answer provided', () => {
            const question = {
                id: 2,
                title: 'la couleur de mes yeux ?',
                kind: 'qcm' as const,
                possibleAnswers: ['rouge', 'bleu', 'vert', 'noir'],
                acceptableAnswersWithPoints: [{ points: 2, answer: 'bleu' }],
                answer: undefined,
                mark: 0,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'wrong');

            expect(displayedAnswer).toEqual({
                title: [{ kind: 'text', value: 'la couleur de mes yeux ?' }],
                answer: [
                    {
                        kind: 'coloredText',
                        value: '',
                        status: 'wrong',
                    },
                ],
            });
        });
        it('should return the title and colored answer if answer provided', () => {
            const question = {
                id: 2,
                title: 'la couleur de mes yeux ?',
                kind: 'qcm' as const,
                possibleAnswers: ['rouge', 'bleu', 'vert', 'noir'],
                acceptableAnswersWithPoints: [{ points: 2, answer: 'bleu' }],
                answer: '1',
                mark: 2,
                points: 2,
            };
            const displayedAnswer = computeDisplayedAnswer(question, 'right');

            expect(displayedAnswer).toEqual({
                title: [{ kind: 'text', value: 'la couleur de mes yeux ?' }],
                answer: [
                    {
                        kind: 'coloredText',
                        value: 'bleu',
                        status: 'right',
                    },
                ],
            });
        });
    });
});
