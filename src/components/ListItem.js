import { timeElapsed } from "../utils";

const ListItem = ({
  title,
  author,
  points,
  createdAt,
  numComments,
  onClickHandler,
}) => {
  return (
    <div
      className="p-3 flex flex-col items-start mb-3 cursor-pointer box-border rounded-md shadow-[4px_0_16px_10px_rgba(30,30,30,0.08)]"
      onClick={onClickHandler}
    >
      <div className="text-lg font-bold">{title}</div>
      <div className="flex text-sm">
        <div className="mr-2">{points} points |</div>
        <div className="mr-2">{author} |</div>
        <div className="mr-2">{timeElapsed(createdAt)}</div>
        <div>{numComments} comments</div>
      </div>
    </div>
  );
};

export default ListItem;
