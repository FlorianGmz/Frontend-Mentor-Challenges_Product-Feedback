import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Feedback from "../ui/Feedback/Feedback";
import Header from "./Header";
import { Comment as CommentType, FeedbackType, User } from "../../@types/type";
import AddForm from "./AddForm/AddForm";
import useFormState from "../../hooks/UseFormState";
import Comment from "./Comment";
import { useFeedbacks } from "../../contexts/FeedbackContext";

interface FeedbackDetailPageProps {
  setLocalData: React.Dispatch<
    React.SetStateAction<{
      currentUser: User;
      productRequests: FeedbackType[];
    }>
  >;
}

const FeedbackDetailPage: React.FC<FeedbackDetailPageProps> = ({
  setLocalData,
}) => {
  const {
    comment,
    charCount,
    emptySubmit,
    setComment,
    setCharCount,
    setEmptySubmit,
  } = useFormState();

  const {
    currentFeedback,
    allFeedbacks,
    currentUser,
    getFeedback,
    addComment,
  } = useFeedbacks();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getFeedback(id);
  }, [allFeedbacks, id]);

  const totalComments = allFeedbacks.flatMap((request: FeedbackType) => {
    return request.comments || [];
  });

  const currentCommentId = totalComments?.length;
  const newCommentId = currentCommentId + 1;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      setEmptySubmit(false);
      const newComment: CommentType = {
        id: newCommentId,
        content: comment,
        user: currentUser,
        replies: [],
      };
      addComment(newComment, id);
      setComment("");
      setCharCount(250);
    } else {
      setEmptySubmit(true);
    }
  };

  const comments = currentFeedback?.comments || [];
  let numberOfComments = comments ? comments.length : 0;

  comments.forEach((comment: CommentType) => {
    if (comment.replies) {
      numberOfComments += comment.replies.length;
    }
  });

  return (
    <div className="flex w-full flex-col gap-[24px] py-[24px]">
      <Header />
      {currentFeedback && (
        <Feedback feedback={currentFeedback} feedbackDetailPage={true} />
      )}
      <div className="mx-auto w-[327px] rounded-xl bg-bt-white_def px-[32px] py-[24px] md:w-[689px] xl:w-[730px]">
        <h3 className="text-h3 text-el-font_def">
          {numberOfComments >= 1 ? `${numberOfComments}` : "No"} Comments
        </h3>
        {currentFeedback?.comments?.map(
          (comment: CommentType, index: number) => (
            <Comment
              key={comment.id}
              index={index}
              commentData={comment}
              feedbackId={currentFeedback.id}
            />
          ),
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <AddForm
          charCount={charCount}
          setCharCount={setCharCount}
          commentType="comment"
          comment={comment}
          setComment={setComment}
          emptySubmit={emptySubmit}
        />
      </form>
    </div>
  );
};

export default FeedbackDetailPage;
