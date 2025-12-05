
# Avatar Generation Pipeline – Technical Breakdown

## 1. Overview
The avatar pipeline transforms input images into stylized ETHMumbai avatars.  
It ensures identity preservation and consistent visual style.

---

## 2. Pipeline Steps (Detailed)

### Step 1 — Image Input
• Receive user-uploaded image from Next.js frontend  
• Convert base64 → RGB image  

---

### Step 2 — Preprocessing
• Resize to 1024×1024  
• Detect and crop face  
• Remove background using segmentation (Mediapipe / SAM2)  

---

### Step 3 — Lineart Extraction
ControlNet requires an auxiliary input.

We generate:
• SoftEdge  
• Lineart (Canny alternative)  

This allows consistent stylization across faces.

---

### Step 4 — LoRA-Enhanced SDXL Stylization
Pipeline uses:
• SDXL Base  
• ControlNet (SoftEdge or Lineart)  
• ETHMumbai LoRA weights  

Prompt example:
“ETHMumbai avatar style, strong lines, bold edges, vibrant colors”

Output:
• 1024×1024 stylized avatar  

---

### Step 5 — Background Compositor
Two options:

A. ETHMumbai branded red-themed background  
B. Dynamic backgrounds using your preset templates  

Avatar is placed in front with feathered edges.

---

### Step 6 — Final Output
Returned as:
• PNG (1024×1024)  
• Base64 string for web  

Frontend displays it directly without downloading files.  

---

## 3. Performance Goals
• Inference < 10 seconds  
• Cold start < 20 seconds  
• Consistent style identity  

---

## 4. Failure Handling
• Reject images without faces  
• Provide helpful error messages  
• Retry endpoint on transient RunPod failures  

---

## 5. Pipeline Code Structure

backend/inference/
  segmentation.py  
  lineart.py  
  stylize.py  
  compositor.py  
  utils.py  
