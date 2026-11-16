// Carfax Abbey: TypeScript, including the semantic tokens the theme styles
// (enum members, readonly/const variables, namespaces, @deprecated).
import { Component, OnDestroy, OnInit } from '@angular/core';
import type { Subscription } from 'rxjs';

export namespace Carfax {
  export const BOXES = 50 as const;
}

export enum Form {
  Man = 'man',
  Bat = 'bat',
  Wolf = 'wolf',
  Mist = 'mist',
}

export interface Hunter<T extends string = string> {
  readonly id: number;
  name: T;
  faith?: number;
}

/** @deprecated Use `HuntService.trace()` instead. */
export function oldTrace(who: Hunter): string {
  return `Telegram for ${who.name}: the Count has left Carfax`;
}

export abstract class HuntService {
  abstract trace(who: Hunter): Promise<boolean>;
}

@Component({
  selector: 'app-abbey',
  templateUrl: './abbey.component.html',
  styleUrls: ['./abbey.component.css'],
})
export class AbbeyComponent implements OnInit, OnDestroy {
  private sub?: Subscription;
  hunters: Array<Hunter<'Harker' | 'Mina' | 'Seward'>> = [];
  form: Form = Form.Man;

  constructor(
    private readonly service: HuntService,
    public boxes: number = Carfax.BOXES,
  ) {}

  async ngOnInit(): Promise<void> {
    const ready = await this.service.trace({ id: 1, name: 'Harker' });
    const pattern = /Carfax\s*(\d+)?/i;
    if (ready && typeof this.boxes === 'number' && pattern.test(oldTrace(this.hunters[0]))) {
      this.form = Form.Mist;
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
