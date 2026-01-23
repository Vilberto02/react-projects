export function Skill({
  title
}: {
  title: string;
}) {
  return (
    <div
      className="px-4 py-2 shadow-skill border border-stone-600 w-fit"
    >
      <p>{title}</p>
    </div>
  );
}
