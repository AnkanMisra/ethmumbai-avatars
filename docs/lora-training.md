# LoRA Training Guide – ETHMumbai Avatar Style

## 1. Training Summary
You will train a LoRA model on your Mac using the MPS backend.  
Speed is slow but acceptable because training happens only once.

Goal:
Learn ETHMumbai stylization patterns while preserving identity.

---

## 2. Dataset Requirements

Folder structure:

training/dataset/human-profile/  
training/dataset/human-ethmumbai/  

Pairs:
human-1.png → human-eth-1.png  
human-2.png → human-eth-2.png  
...  
human-50.png → human-eth-50.png  

Image specs:
• 768–1024px resolution  
• Clean face visibility  
• Good lighting  
• Balanced diversity  

---

## 3. Caption Generation
Captions help training generalization.

Use:
• BLIP  
• LLaVA captions  
• Simple textual descriptors  

Example:
“portrait of a man, facing forward, neutral background, ETHMumbai style target for training”

Captions stored in:
training/captions/

---

## 4. Training Tools

Option A:
Diffusers LoRA trainer

Option B:
Kohya_ss (recommended because more stable for LoRA SDXL)

---

## 5. Recommended Training Settings

Base model:
stabilityai/stable-diffusion-xl-base-1.0  

Batch size:
1–2 (Mac limitation)

Learning rate:
1e-4 to 5e-5  

Epochs:
6–10  

Rank:
16 or 32  

Scheduler:
cosine or constant  

---

## 6. Training Steps

1. Preprocess dataset  
2. Generate captions  
3. Run training script  
4. Save output LoRA  
5. Validate with inference script  

---

## 7. Outputs

ethmumbai-lora.safetensors  
training guide logs  
sample outputs  

---

## 8. Next Steps After Training

Move your LoRA to:

backend/serverless/model/

Then deploy to RunPod.  
