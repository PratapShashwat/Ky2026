export interface ImageToUpload {
  localFile: string;
  remoteName: string;
  folder: string;
}

export interface UploadResult {
  name: string;
  url: string;
  skipped?: boolean;
}

export interface UploadSummary {
  uploaded: UploadResult[];
  skipped: string[];
  failed: string[];
}

export interface CliArgs {
  force: boolean;
  dryRun: boolean;
  filter?: string;
}
