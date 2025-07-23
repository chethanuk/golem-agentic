declare module 'wasi:io/poll@0.2.3' {
  export function poll(in_: Pollable[]): number[];
  export class Pollable {
    ready(): boolean;
    block(): void;
  }
}
