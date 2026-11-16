// Carfax Abbey: React with TypeScript (source.tsx)
import { useMemo, useState, type ReactNode } from 'react';

type Hour = 'dusk' | 'dawn';

interface CryptProps {
  name: string;
  boxes?: number;
  children?: ReactNode;
}

const Host = ({ laid }: { laid: boolean }) => <span className={laid ? 'host laid' : 'host'} />;

function Crypt({ name, boxes = 50, children }: CryptProps) {
  return (
    <section aria-label={name} data-boxes={boxes}>
      <h2>{name}</h2>
      {children}
    </section>
  );
}

export function Chapel({ hours }: { hours: Hour[] }) {
  const [laid, setLaid] = useState<boolean>(false);
  const dusk = useMemo(() => hours.filter((hour) => hour === 'dusk').length, [hours]);

  return (
    <Crypt name="Carfax Abbey">
      <Host laid={laid} />
      <p>
        {dusk} dusk watches of {hours.length}
      </p>
      <button type="button" onClick={() => setLaid((value) => !value)}>
        {laid ? 'Lift the Host' : 'Lay the Host in the doorway'}
      </button>
    </Crypt>
  );
}
