import { NextResponse } from "next/server";
import { promisify } from "node:util";
import { execFile } from "node:child_process";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);

export async function GET() {
  try {
    const result = await execFileAsync("which", ["ffmpeg"]);
    const version = await execFileAsync("ffmpeg", ["-version"]);
    
    return NextResponse.json({
      which: result.stdout.trim(),
      version: version.stdout.split("\n")[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "ffmpeg not found",
      },
      { status: 500 }
    );
  }
}