"use client";
import { createSuggestion, SuggestionState } from "@/app/lib/actions";
import BaseSubmitButton from "@/app/ui/baseSubmitButton";
import { useActionState } from "react";
import BasicAlert from "../basicAlert";
import { redirectToPrev } from "@/app/lib/cookie";

export default function SuggestionForm({
  position_id,
}: {
  position_id: string;
}) {
  const initialState: SuggestionState = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    (prevState: SuggestionState, formData: FormData) => {
      return createSuggestion(prevState, formData, position_id);
    },
    initialState
  );

  return (
    <>
      <form action={formAction}>
        <div className=" w-full mt-4">
          {/* <input
        className=" w-full border border-gray-50 px-2 py-1 rounded-lg"
        placeholder="제목을 작성해주세요."
      /> */}
          <textarea
            id="suggestion_content"
            name="suggestion_content"
            className=" w-full h-80  border border-gray-50 px-2 py-1 rounded-lg mt-4"
            placeholder="내용을 작성해주세요."
          />
          <div className="flex justify-end min-h-7">
            {state.errors?.suggestion_content &&
              state.errors.suggestion_content.map((error: string) => (
                <p className="mb-1 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <BaseSubmitButton text="제출" />
        </div>
      </form>
      {state?.submitted == true ? (
        <BasicAlert onClick={() => redirectToPrev()}>
          {state?.fullfilled == true ? (
            <div className="text-text-base">제출이 완료되었습니다.</div>
          ) : (
            <div className="text-text-base">제출 중 문제가 발생하였습니다.</div>
          )}
        </BasicAlert>
      ) : undefined}
    </>
  );
}
