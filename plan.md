# ETHMumbai Avatar Generator – Systematic Master Plan  
Version 2.2 (with .rules Integration)

# 1. Project Summary
The ETHMumbai Avatar Generator transforms real human photos into ETHMumbai-style cartoon avatars using SDXL, ControlNet, a custom LoRA, a GPU backend on RunPod Serverless, and a Vercel-hosted frontend.

This project also includes a .rules folder that defines how the agent behaves, how tools are invoked, how edits are applied, and how requests are handled. All development phases must respect the .rules instructions.

# 2. .rules Directory Integration

Your project currently contains:

.rules/
agent.txt  
chat-titles.txt  
nes-tab-completion.txt  
prompt.txt  

Purpose of these files:

agent.txt  
Defines how the AI coding agent behaves, how it edits files, and how it uses tools.  

prompt.txt  
Defines identity, tool rules, file editing rules, safety constraints, and execution logic.  

chat-titles.txt  
Defines rules for generating short, compliant conversation titles.  

nes-tab-completion.txt  
Controls how autocompletion behaves in tagged sections of code.

Impact on the project:

• All code generation must follow tool rules defined in .rules  
• All file edits must be applied through allowed mechanisms  
• No direct editing outside tool rules  
• All future components of the project must be structured in a way compatible with agent-driven development  

PLAN.md acknowledges this environment and structures the project so the coding agent can execute it systematically.

# 3. Project Phases (Systematic Workflow)

# Phase 1 — Planning & Rule Integration (current phase)
Purpose:  
Define full roadmap, integrate .rules constraints, and prepare the architecture.

Outputs:  
• Final PLAN.md  
• docs folder  
• Initial skeleton folders  
• Architecturally consistent plan for agent execution  

# Phase 2 — Dataset Preparation
Goal: Build the paired dataset needed for LoRA training.

Tasks:  
• Gather 50 human profile images  
• Generate 50 ETHMumbai-style avatars using Gemini or Nano Banana Pro  
• Organize into folders:  
  training/dataset/human-profile/  
  training/dataset/human-ethmumbai/  
• Preprocess images (crop, align, resize)  
• Auto-generate captions  
• Validate dataset consistency

Outputs:  
• preprocess.py  
• captions directory  
• ready-to-train dataset  

# Phase 3 — LoRA Training (Mac MPS)
You will train your LoRA on the Mac using the MPS backend. Slow but acceptable.

Tasks:  
• Setup training environment (Diffusers or Kohya)  
• Run training for 5–8 hours  
• Monitor loss curves  
• Export final LoRA model  

Outputs:  
• ethmumbai-lora.safetensors  
• training logs  
• training documentation (training-guide.md)  

# Phase 4 — Local Inference Pipeline Prototype
Goal: Build and test the complete avatar generation pipeline locally before deploying.

Pipeline components:  
• Face segmentation  
• Lineart extraction  
• SDXL base model  
• ControlNet (SoftEdge or Lineart)  
• ETHMumbai LoRA application  
• Background compositor  

Outputs:  
• local_test.py  
• working inference prototype  
• pipeline folder structure  

# Phase 5 — Backend Deployment (RunPod Serverless GPU)
Goal: Deploy the production inference pipeline on GPU for fast (<10 seconds) results.

Tasks:  
• Create RunPod Serverless project  
• Implement handler.py  
• Upload LoRA + models  
• Write requirements.txt  
• Test endpoint responses  
• Optimize cold starts  

Outputs:  
• backend/serverless folder  
• Live GPU inference endpoint URL  

# Phase 6 — Frontend Development (Next.js + Vercel)
Goal: Create a modern, clean web UI.

Tasks:  
• File uploader component  
• API client that calls RunPod endpoint  
• Preview of uploaded image  
• Loading animation during inference  
• Display final avatar  
• Download button  
• Error handling  

Outputs:  
• Next.js project in frontend folder  
• Clean UI with TailwindCSS  
• Deployed frontend on Vercel  

# Phase 7 — Integration & Optimization
Goal: Connect frontend to backend and refine performance.

Tasks:  
• Connect Vercel frontend to RunPod backend  
• Reduce generation time to 5–10 seconds  
• Add caching and retries  
• Improve segmentation quality  
• Tune LoRA (optional)  
• Improve background compositor  

Outputs:  
• Fully functional avatar generator  
• Stable performance and output quality  

# Phase 8 — Production Launch
Goal: Make the project public.

Tasks:  
• Deploy frontend to custom domain  
• Monitor traffic and billing  
• Add simple analytics  
• Optional: add rate limits or credits  
• Optional: user accounts  

Outputs:  
• Live ETHMumbai Avatar Generator  
• Sustainable GPU usage  
• UI + backend optimized  

# 4. Final Folder Structure

ethmumbai-avatar-generator/
  .rules/
  training/
    dataset/
      human-profile/
      human-ethmumbai/
    captions/
    preprocess.py
    train_lora.py
  backend/
    inference/
      segmentation.py
      lineart.py
      stylize.py
      compositor.py
    serverless/
      handler.py
      requirements.txt
      model/
        ethmumbai-lora.safetensors
  frontend/
    src/
    public/
  docs/
    architecture.md
    pipeline.md
    lora-training.md
    runpod-deployment.md
  PLAN.md

# 5. High-Level Avatar Pipeline
Input → Preprocess (crop, segment face) → Lineart extraction → SDXL + ControlNet + LoRA stylization → Background compositor → Output 1024×1024 PNG.

# 6. Final Goal
Launch a fast (<10s), low-cost GPU-powered ETHMumbai Avatar Generator accessible to anyone through a clean web interface.

<runtime>
Always use **Bun** as the default JavaScript/TypeScript runtime and package manager for every part of the project.

Rules:
1. All Node.js commands must be replaced with Bun equivalents.
2. All package installations must use:
   bun add <pkg>
3. All dev installs must use:
   bun add -d <pkg>
4. Scripts must be run using:
   bun run <scriptname>
5. If any starter template requires npm, yarn, or pnpm, convert it to Bun automatically.
6. In the Next.js project, ensure:
   - bun create next ./app
   - bun run dev
   - bun run build
7. For backend util scripts (dataset prep, preprocessing, image tooling), use:
   bun <script>.ts or bun run <script>
8. For any API route in Next.js, assume Bun’s fast server runtime characteristics.
9. No use of npm, yarn, or pnpm anywhere in the project unless explicitly overridden by the user.

Bun must be the default everywhere.
</runtime>


# END OF PLAN.md
