import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import { buildFilterChain } from "@/lib/ffmpeg";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);

export async function POST(req: NextRequest) {
  let inputPath: string | null = null;
  let outputPath: string | null = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const intensityRaw = formData.get("intensity");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No valid file uploaded." },
        { status: 400 }
      );
    }

    if (!ffmpegPath) {
      return NextResponse.json(
        { error: "FFmpeg binary not available." },
        { status: 500 }
      );
    }

    const intensity = Number(intensityRaw ?? 0.5);
    const safeIntensity = Number.isFinite(intensity) ? intensity : 0.5;
    const bytes = Buffer.from(await file.arrayBuffer());

    // Vercel writable temp directory
    const tempDir = "/tmp";

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const timestamp = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const originalExt = path.extname(file.name || "").toLowerCase() || ".wav";

    inputPath = path.join(tempDir, `input-${timestamp}${originalExt}`);
    outputPath = path.join(tempDir, `output-${timestamp}.wav`);

    fs.writeFileSync(inputPath, bytes);

    const ffmpegArgs = [
      "-y",
      "-i",
      inputPath,
      "-af",
      buildFilterChain(safeIntensity),
      outputPath,
    ];

    console.log("FFMPEG PATH:", ffmpegPath);
    console.log("INPUT PATH:", inputPath);
    console.log("OUTPUT PATH:", outputPath);

    await execFileAsync(ffmpegPath, ffmpegArgs);

    const outputBuffer = fs.readFileSync(outputPath);

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Disposition": 'attachment; filename="raw2base-output.wav"',
      },
    });
  } catch (error) {
    console.error("PROCESS ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Processing failed in production.",
      },
      { status: 500 }
    );
  } finally {
    for (const filePath of [inputPath, outputPath]) {
      if (filePath && fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch {}
      }
    }
  }
}