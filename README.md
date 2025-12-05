# ETHMumbai Avatar Generator

A full-stack AI application that transforms real human photos into ETHMumbai-style cartoon avatars using SDXL, ControlNet, and a custom LoRA.

## Project Overview

This system is designed to take a user-uploaded selfie and generate a stylized avatar in < 10 seconds using a serverless GPU backend.

**Key Features:**
- **Style Transfer:** Custom LoRA trained on ETHMumbai avatar dataset.
- **Identity Preservation:** Uses ControlNet (SoftEdge/Lineart) to keep facial features.
- **High Performance:** Deployed on RunPod Serverless for fast inference.
- **Modern Stack:** Built with Bun, Next.js, and Python.

## Project Structure

- **`frontend/`**: Next.js web application (Vercel).
- **`backend/`**: Inference logic and serverless handlers.
- **`training/`**: Dataset preparation and LoRA training scripts (Mac MPS).
- **`docs/`**: Detailed architectural documentation.

## Documentation

- [Master Plan](./docs/plan.md)
- [Architecture](./docs/architecture.md)
- [Pipeline Breakdown](./docs/pipeline.md)
- [Training Guide](./docs/lora-training.md)
- [Deployment Guide](./docs/runpod-deployment.md)

## Tech Stack

- **Runtime:** [Bun](https://bun.sh) (JavaScript/TypeScript)
- **ML Backend:** Python, PyTorch, Diffusers, RunPod
- **Frontend:** Next.js, TailwindCSS
- **Training:** Mac MPS (Metal Performance Shaders)

## Getting Started

1. **Install Dependencies:**
    ```bash
    bun install
    ```

2. **Prepare Dataset (Phase 2):**
    - Place human profiles in `training/dataset/human-profile/`
    - Place target styles in `training/dataset/human-ethmumbai/`
    - Run preprocessing:
      ```bash
      bun run training/preprocess.ts
      ```

3. **Training & Deployment:**
    Refer to the `docs/` folder for detailed phase-by-phase instructions.
