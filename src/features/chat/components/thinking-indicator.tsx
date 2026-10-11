export default function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-1 anim-think" aria-label="El asistente está pensando">
      {[0, 1, 2].map((i) => (
        <span key={i} className="block size-2 rounded-full bg-primary" />
      ))}
    </div>
  );
}
