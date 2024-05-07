export default function NoteCard({
  content,
  title,
}: {
  content: string;
  title: string;
}) {
  return (
    <div className="p-2 m-2 text-white border border-slate-600 rounded-xl cursor-pointer">
      <h4 className="text-lg font-bold p-2 border-b-[1px] border-slate-600 break-words">
        {title}
      </h4>
      <p className="text-sm text-gray-400 p-2 break-words">
        {content.slice(0, 97)}
        {content.length > 100 ? "..." : ""}
      </p>
    </div>
  );
}
