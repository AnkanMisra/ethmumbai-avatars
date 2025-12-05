# RunPod Deployment Guide – ETHMumbai Avatar Generator

## 1. Why RunPod Serverless?
• GPU inference <10s  
• Near-zero cost for low traffic  
• Pay-per-request  
• Easiest pathway to production-scale SDXL  

---

## 2. Steps to Deploy

### Step 1 — Create RunPod Account
Sign in → Navigate to “Serverless”.

---

### Step 2 — Create New Endpoint
Choose:
PyTorch 2.0 + CUDA template

---

### Step 3 — Prepare Folder for Upload

backend/serverless/
  handler.py  
  requirements.txt  
  model/
    ethmumbai-lora.safetensors  

Additional files:
• preprocessing module  
• segmentation  
• lineart  
• compositor  

---

### Step 4 — Understanding handler.py
handler.py responsibilities:

• Decode base64 image  
• Run segmentation  
• Extract lineart  
• Apply SDXL + ControlNet + LoRA  
• Composite background  
• Return base64 PNG  

The handler is the entrypoint RunPod executes.

---

### Step 5 — requirements.txt
Include:

torch  
diffusers  
transformers  
accelerate  
insightface  
opencv-python  
Pillow  
runpod  
controlnet_aux  

---

### Step 6 — Deploy to RunPod
Upload:
• Code  
• Requirements  
• Models  

RunPod will:
• Build the image  
• Launch serverless runtime  
• Provide endpoint URL  

---

### Step 7 — Testing Endpoint
Use Postman or your Next.js frontend to POST:

{
  "image": "<base64 encoded>"
}

Response:
{
  "avatar": "<base64 PNG>"
}

---

### Step 8 — Integrate With Frontend
Frontend calls the endpoint using fetch or axios.

---

## 3. Cold Start Notes
Cold start loads:
• SDXL  
• ControlNet  
• LoRA  

Expected cold startup: 15–30 seconds  
Warm invocations: 4–8 seconds  

---

## 4. Debugging
Monitor:
• RunPod logs  
• GPU utilization  
• Request time  

---

## 5. Deployment Tips
• Keep model weights local to container  
• Minimize imports  
• Preload pipeline in global scope  
• Use half-precision (fp16)  

---

## 6. Final Outcome
A fully functional GPU-powered endpoint ready for production use.  
