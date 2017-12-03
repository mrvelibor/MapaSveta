export class ProgressStatus {
  progress: number;
  mode: string;

  constructor(progress: number, mode: string) {
    this.progress = progress;
    this.mode = mode;
  }
}
