'use client'

import { dm_sans, inter } from "@/app/fonts";
import QuestionItem from "@/app/components/personalization/questionItem";
import personalizationData from "@/data/personalization.json";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import type { PersonalizationAnswer, Personalization } from "@/types/personalization";

export default function Personalization() {
    const [answers, setAnswers] = useState<PersonalizationAnswer[]>([]);
    const router = useRouter();

    const handleSelect = (questionId: number, question: string, selectedOption: string) => {
        setAnswers((prev) => {
            const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
            const newAnswer: PersonalizationAnswer = {
                questionId,
                question,
                selectedOption
            };
            
            if (existingAnswerIndex >= 0) {
                const newAnswers = [...prev];
                newAnswers[existingAnswerIndex] = newAnswer;
                return newAnswers;
            }
            
            return [...prev, newAnswer];
        });
    };

    const handleSubmit = async () => {
        try {
            // Uncomment and update with your actual API endpoint
            // await fetch('/api/personalization', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ answers }),
            // });
            console.log(answers);
            
            router.push('/home');
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };

    const handleCancel = () => {
        router.push('/home');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className={`text-5xl font-bold mb-8 text-center text-navy lowercase ${dm_sans.className}`}>
                personalization
            </h1>
            <div className="space-y-8">
                {personalizationData.personalizationQuestions.map((question) => (
                    <QuestionItem
                        key={question.id}
                        question={question}
                        onSelect={(questionId, selectedOption) => 
                            handleSelect(questionId, question.question, selectedOption)
                        }
                        selectedAnswer={answers.find(a => a.questionId === question.id)?.selectedOption}
                    />
                ))}
            </div>
            <div className="flex justify-start space-x-4 mt-8">
                <button
                    onClick={handleCancel}
                    className={`px-6 py-2 rounded-lg bg-navy text-white hover:bg-navy-300 transition-colors ${inter.className}`}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className={`px-6 py-2 rounded-lg border-2 border-navy bg-mint text-navy hover:bg-mint/90 transition-colors ${inter.className}`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}