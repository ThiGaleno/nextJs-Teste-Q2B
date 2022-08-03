import React from "react";
import { Loading } from '../components/icons';

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
      {isPending && <i>{<Loading />}</i>}

      {isPending ? (
        <span>{pendingText || 'Carregando'}</span>
      ) : (
        <span>{text || 'Enviar'}</span>
      )}
    </button>
  );
}

export default SubmitButton;