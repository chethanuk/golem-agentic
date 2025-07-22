declare module 'wasi:clocks/monotonic-clock@0.2.3' {
  import * as wasiIo023Poll from 'wasi:io/poll@0.2.3';
  export function now(): Instant;
  export function resolution(): Duration;
  export function subscribeInstant(when: Instant): Pollable;
  export function subscribeDuration(when: Duration): Pollable;
  export type Pollable = wasiIo023Poll.Pollable;
  export type Instant = number;
  export type Duration = number;
}
