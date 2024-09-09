"use client";
import { startTransition, useActionState, useState } from "react";
import { PASS_STATUS, PROBLEM_TYPE, TR_CAREER } from "../lib/constants";
import Input from "../ui/input";
import LanguageToggleButton from "./profile/languageToggleButton";
import BaseSubmitButton from "./baseSubmitButton";
import TrComboBox from "./testReview/trCombobox";
import { TestReviewState, createTestReview } from "../lib/actions";
import Select from "./select";
import TrFormRow from "./testReview/trFormRow";
const years: number[] = [];
for (let i = 2024; i >= 2000; i--) {
  years.push(i);
}

export default function TrForm() {
  const [problems, setProblems] = useState<Set<string>>(new Set());
  const addProblem = (problem: string) => {
    const newSet = new Set(problems);
    newSet.add(problem);
    setProblems(newSet);
  };
  const removeProblem = (problem: string) => {
    const newSet = new Set(problems);
    newSet.delete(problem);
    setProblems(newSet);
  };
  const initialState: TestReviewState = {
    message: null,
    errors: {},
  };
  const [state, formAction] = useActionState(createTestReview, initialState);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("tr_problem_type", Array.from(problems).toString());
    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-3xl font-bold">코딩테스트 후기 작성</div>
      <div className="px-5 py-16">
        <div className="border-b border-gray-30 py-6">
          <TrFormRow required={false} label={"기업명"} error={state.errors?.company_name}>
            {" "}
            <Input name="company_name" id="company_name" required={false} />
          </TrFormRow>
          <TrFormRow label={"지원직무(선택)"} required={false}>
            {" "}
            <Input name="tr_position" id="tr_position" />
          </TrFormRow>
          <TrFormRow label={"채용형태"}>
            {" "}
            <Select name="tr_career" id="tr_career" required={false}>
              {TR_CAREER.map((el) => (
                <option key={el}>{el}</option>
              ))}
            </Select>
          </TrFormRow>
          <TrFormRow label={"응시년도"}>
            <Select name="tr_year" id="tr_year" required={false}>
              {years.map((el) => (
                <option value={el} key={el}>
                  {el}년
                </option>
              ))}
            </Select>
          </TrFormRow>
        </div>
        <div className="border-b border-gray-30 py-6">
        <TrFormRow label={"전체 문제 수"}>
            {" "}
            <Input
                name="tr_problem_num"
                id="tr_problem_num"
                type={"number"}
                required={false}
              />
          </TrFormRow>
          <TrFormRow label={"푼 문제 수"}>
            {" "}
            <Input
                name="tr_solve_num"
                id="tr_solve_num"
                type={"number"}
                required={false}
              />
          </TrFormRow>
          <TrFormRow label={"합격 여부"}>
            {" "}
            <Select id="tr_pass_status" name="tr_pass_status" required={false}>
                {PASS_STATUS.map((el) => (
                  <option key={el}>{el}</option>
                ))}
              </Select>
          </TrFormRow>

        </div>
        <div className="border-b border-gray-30 py-6">
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full  ">
              문제 유형<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full mt-4 flex justify-end">
              <div className="text-text-base w-full mt-4 flex flex-col">
                <TrComboBox
                  className="max-w-full"
                  list={PROBLEM_TYPE}
                  onClick={addProblem}
                />
                <div>
                  {Array.from(problems).map((el: string) => (
                    <LanguageToggleButton
                      key={el}
                      text={el}
                      onClick={() => removeProblem(el)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" py-6">
          <div className="text-base py-4 flex flex-wrap w-full ">
            <div className="text-gray-80 font-bold w-full  ">
              한줄 후기<span className="text-main-base textsm"> *</span>
            </div>
            <div className="text-text-base w-full mt-4 flex justify-end">
              <textarea
                id="tr_comment"
                name="tr_comment"

                className=" w-full border border-gray-50 px-2 py-1 rounded-lg h-36"
                placeholder="간단한 시험 후기를 들려주세요! 직접적으로 시험의 지문, 테스트케이스, 힌트 등을 게시하게 되면 문제 유출로 간주될 수 있으니 조심해주세요!"
              />
            </div>
          </div>
        </div>
      </div>
      <BaseSubmitButton text="제출" />
    </form>
  );
}
