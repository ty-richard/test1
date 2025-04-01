export interface Personalization {
    id: number;
    question: string;
    options: string[];
}

export interface PersonalizationAnswer {
    questionId: number;
    question: string;
    selectedOption: string;
}