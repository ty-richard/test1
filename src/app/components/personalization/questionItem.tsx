import { Personalization } from "@/types/personalization";

interface QuestionItemProps {
    question: Personalization;
    onSelect: (questionId: number, answer: string) => void;
    selectedAnswer?: string;
}

export default function QuestionItem({ question, onSelect, selectedAnswer }: QuestionItemProps) {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-navy">{question.question}</h2>
            <div className="space-y-3">
                {question.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onSelect(question.id, option)}
                        className={`w-full p-4 text-left rounded-lg transition-colors ${
                            selectedAnswer === option
                                ? 'bg-navy text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-navy'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
