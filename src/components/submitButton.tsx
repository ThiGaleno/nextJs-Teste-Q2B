import React from "react";

const SubmitButton = ({ isPending, text, pendingText }:
  {
    isPending: boolean,
    text?: string | undefined,
    pendingText?: string | undefined
  }
): JSX.Element => {

  return (
    <button
      className="btn-primary sm:w-full"
      type="submit"
      disabled={isPending}
    >
      {isPending && <i>@</i>}

      {isPending ? (
        <span>{pendingText || 'Carregando'}</span>
      ) : (
        <span>{text || 'Enviar'}</span>
      )}
    </button>
  );
}

export default SubmitButton;