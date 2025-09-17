import React from "react";
import ReactMarkdown from "react-markdown";
import InputBar from "./InputBar";

function ExistingChat({
    chats,
    userQuestion,
    setUserQuestion,
    handleQuestionSend,
}) {
    return (
        <div className="flex flex-1 flex-col">
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-6 py-4 w-full max-w-4xl mx-auto">
                {chats?.map((chat, idx) => (
                    <div key={idx} className="mb-6">
                        {/* User Question */}
                        <div className="flex justify-end">
                            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs shadow">
                                {chat.question}
                            </div>
                        </div>

                        {/* AI Answer - full width */}
                        <div className="mt-3 w-full">
                            <div className="bg-white text-gray-700 px-6 py-4 rounded-lg shadow w-full">
                                <div className="prose max-w-none">
                                    <ReactMarkdown>{chat.answer}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Input Bar */}
            <div className="sticky bottom-0 bg-white w-full max-w-3xl mx-auto px-4 py-4 border-t">
                <InputBar
                    userQuestion={userQuestion}
                    setUserQuestion={setUserQuestion}
                    handleQuestionSend={handleQuestionSend}
                />
            </div>
        </div>
    );
}

export default ExistingChat;
