
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const quests = [
  "오늘 테크데이에 온 이유를 상대방에게 설명하기",
  "나의 개발자 성장 이야기를 1분 안에 이야기해보기",
  "최근 내가 가장 재밌게 해본 프로젝트 소개하기",
  "상대방의 개발 고민 들어주고, 내가 할 수 있는 조언 건네보기",
  "서로 닉네임/별명을 공유하고 기억하기 게임",
  "내가 겪은 슬럼프/번아웃 경험 짧게 나누기",
  "최근 해결한 문제나 버그 공유하기",
  "상대방에게 요즘 자주 쓰는 이모지 하나 추천받기",
  "개발 외에 요즘 관심 있는 분야 이야기 나누기",
  "지금까지 만난 사람 중 가장 인상 깊은 이야기 공유하기"
];

const 반짝반짝테크데이퀘스트 = () => {
  const [questIndex, setQuestIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [partnerNames, setPartnerNames] = useState<string[]>(Array(quests.length).fill(""));
  const [highlightName, setHighlightName] = useState("");

  const handleNext = () => {
    if (questIndex < quests.length - 1) {
      setQuestIndex(questIndex + 1);
      setCompleted(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...partnerNames];
    updated[questIndex] = e.target.value;
    setPartnerNames(updated);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-100 p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-yellow-600">✨ 반짝반짝 테크데이 퀘스트 ✨</h1>

      <motion.div
        key={questIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl bg-white">
          <CardContent className="text-center text-lg p-6">
            <div className="mb-4 font-semibold text-pink-700">퀘스트 {questIndex + 1} / {quests.length}</div>
            🧩 {quests[questIndex]}
            <input
              type="text"
              placeholder="대화를 나눈 상대방의 이름을 입력해 주세요."
              value={partnerNames[questIndex]}
              onChange={handleNameChange}
              className="mt-4 w-full border border-pink-300 rounded-xl p-2"
            />
          </CardContent>
        </Card>
      </motion.div>

      {!completed ? (
        <>
          <Button
            onClick={() => setCompleted(true)}
            className="mt-6 text-lg px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500"
          >
            입력 완료!
          </Button>
          <Button
            onClick={() => alert('현재까지의 퀘스트가 임시 저장되었습니다!')}
            className="mt-2 text-sm px-4 py-2 rounded-xl bg-blue-300 hover:bg-blue-400"
          >
            중간 제출하기
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={handleNext}
            className="mt-6 text-lg px-6 py-3 rounded-xl bg-pink-400 hover:bg-pink-500"
          >
            다음 퀘스트 ➡️
          </Button>
          <Button
            onClick={() => alert('현재까지의 퀘스트가 임시 저장되었습니다!')}
            className="mt-2 text-sm px-4 py-2 rounded-xl bg-blue-300 hover:bg-blue-400"
          >
            중간 제출하기
          </Button>
        </>
      )}

      {questIndex === quests.length - 1 && completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 w-full max-w-md text-center text-xl text-green-700 font-bold"
        >
          🎉 모든 퀘스트를 완료했어요! 반짝반짝 개발자 Lv.10 달성 🎉
          <div className="mt-6">
            <input
              type="text"
              placeholder="가장 인상 깊었던 사람의 이름은?"
              value={highlightName}
              onChange={(e) => setHighlightName(e.target.value)}
              className="w-full border border-green-300 rounded-xl p-2"
            />
            {highlightName && (
              <div className="mt-4 text-green-800">
                ✅ 오늘 가장 인상 깊었던 사람: <strong>{highlightName}</strong>
              </div>
            )}
          </div>

          <div className="mt-10 text-left text-base text-gray-800">
            <h2 className="text-lg font-bold mb-2">📝 내가 만난 사람들</h2>
            <ul className="list-disc list-inside space-y-1">
              {partnerNames.map((name, idx) => (
                <li key={idx}>
                  <strong>퀘스트 {idx + 1}:</strong> {quests[idx]} — <span className="text-pink-600">{name || "(이름 미입력)"}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default 반짝반짝테크데이퀘스트;
