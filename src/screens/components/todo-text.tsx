const TODO = /(\[TODO[^\]]*\])/;

/**
 * Texto que pode conter marcadores `[TODO: ...]` (conteúdo pendente).
 * Os marcadores aparecem destacados para ficarem fáceis de achar na página.
 */
export function TodoText({ text }: { text: string }) {
  if (!TODO.test(text)) return <>{text}</>;
  return (
    <>
      {text.split(TODO).map((part, i) =>
        TODO.test(part) ? (
          <mark
            key={i}
            className="rounded bg-amber-400/15 px-1 text-amber-200 ring-1 ring-dashed ring-amber-400/50 print:bg-transparent print:text-orange-700"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
