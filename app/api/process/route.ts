import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { buildFilterChain } from "@/lib/ffmpeg";

const execFileAsync = promisify(execFile);

export async function POST(req: NextRequest) {
  let inputPath: string | null = null;
  let outputPath: string | null = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const intensityRaw = formData.get("intensity");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No valid file uploaded." }, { status: 400 });
    }

    const intensity = Number(intensityRaw ?? 0.5);
    const bytes = Buffer.from(await file.arrayBuffer());

    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const timestamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    inputPath = path.join(tempDir, `input-${timestamp}`);
    outputPath = path.join(tempDir, `output-${timestamp}.wav`);

    fs.writeFileSync(inputPath, bytes);

    const ffmpegArgs = [
      "-y",
      "-i",
      inputPath,
      "-af",
      buildFilterChain(Number.isFinite(intensity) ? intensity : 0.5),
      outputPath,
    ];

    await execFileAsync("ffmpeg", ffmpegArgs);

    const outputBuffer = fs.readFileSync(outputPath);

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Disposition": 'attachment; filename="raw2base-output.wav"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Processing failed. Make sure FFmpeg is installed and available in PATH." },
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