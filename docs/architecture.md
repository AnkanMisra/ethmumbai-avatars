# Architecture Overview – ETHMumbai Avatar Generator

## 1. System Summary
The ETHMumbai Avatar Generator converts a human photo into a stylized ETHMumbai avatar using a pipeline built from SDXL, ControlNet, and a custom LoRA.

The system has three major layers:

1. Frontend UI (Next.js on Vercel)
2. GPU Inference Backend (RunPod Serverless)
3. Training + Utilities (Local Mac MPS)

---

## 2. High-Level Architecture

User → Vercel Frontend → RunPod Serverless GPU → SDXL + ControlNet + LoRA Pipeline → Cloud Storage → Frontend Output

---

## 3. Components

### A. Frontend (Vercel)
• Built using Next.js  
• Handles file upload  
• Shows generation loading state  
• Displays result image  
• Downloads result  

### B. Backend (RunPod Serverless)
Runs the ML pipeline:

• Preprocessing (resize, crop, segment face)  
• Lineart extraction for ControlNet  
• Apply LoRA to SDXL  
• Generate stylized avatar  
• Composite background  
• Return base64 PNG  

### C. Training (Local Mac)
• LoRA training via MPS  
• Dataset preparation  
• Validation runs  

---

## 4. Detailed Data Flow

1. User uploads photo in browser  
2. Frontend encodes to base64  
3. Sends JSON request to RunPod URL  
4. RunPod handler decodes image  
5. Preprocessing applied  
6. ControlNet receives lineart  
7. SDXL + LoRA render avatar  
8. Background composited  
9. PNG returned as base64  
10. Frontend displays final output  

---

## 5. Storage Design
Generated images may be stored temporarily in:

• Cloudflare R2  
• AWS S3  

This enables:

• user history  
• analytics  
• caching  

---

## 6. Model Dependencies

• SDXL Base Model  
• ControlNet SoftEdge or Lineart  
• ETHMumbai LoRA (trained)  

---

## 7. Runtime Requirements

Frontend:
• No GPU  
• Runs on Vercel Edge/Serverless  

Backend:
• GPU server via RunPod  
• Cold start model load  
• Inference <10 seconds  

---

## 8. Deployment Summary

Frontend: Vercel  
Backend: RunPod Serverless  
Storage: R2 or S3  
Monitoring: Vercel Analytics, RunPod logs  
